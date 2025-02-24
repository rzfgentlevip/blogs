---
# 这是文章的标题
title: 3、自动解析注册Mapper
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: bugcode
# 设置写作时间
date: 2020-01-01
# 一个页面可以有多个分类
category:
  - MYBATIS
  - ORM
  - JAVA
# 一个页面可以有多个标签
tag:
  - 后端
  - mybatis
  - orm
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: Spring基础
# 你可以自定义版权信息
copyright: bugcode
---


# 3、自动解析注册Mapper

## 1、目标

在实现简易mybatis框架的过程中，始终围绕着一个核心，给DAO接口提供一个代理类，这个代理类能够完成用户定义的DAO接口到mapper.xml文件的映射关系，然后执行数据库操作。

![image-20240706091443334](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407060914402.png)

上一个章节中完成了对DAO接口的扫描注册功能，仍然使用sqlSession对象模拟数据库查询的结果进行返回，本章节中继续完成对mapper.xml文件的解析操作，然后将解析的结果和DAO接口中的方法做映射，这样调用DAO接口中的方法就可以直接进行sql的调用执行。



## 2、设计

![第三章.drawio](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407060949551.png)



- 首先需要定义 `SqlSessionFactoryBuilder` 工厂建造者模式类，通过入口 IO 的方式对 XML 文件进行解析。当前我们主要以解析 SQL 部分为主，并注册映射器，串联出整个核心流程的脉络。
- 文件解析以后会存放到 Configuration 配置类中，接下来你会看到这个配置类会被串联到整个 Mybatis  流程中，所有内容存放和读取都离不开这个类。如我们在 DefaultSqlSession 中获取 Mapper 和执行 selectOne  也同样是需要在 Configuration 配置类中进行读取操作。

## 3、实现

### 3.1、核心类图实现

![mybatis-mapper-xml-parse-register.drawio](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407060932320.png)

- SqlSessionFactoryBuilder 作为整个 Mybatis 的入口，提供建造者工厂，包装 XML 解析处理，并返回对应 SqlSessionFactory 处理类。
- 通过解析把 XML 信息注册到 Configuration 配置类中，再通过传递 Configuration 配置类到各个逻辑处理类里，包括 DefaultSqlSession 中，这样就可以在获取映射器和执行SQL的时候，从配置类中拿到对应的内容了。



### 3.2、构建SqlSessionFactory建造者工厂

```java
public class SqlSessionFactoryBuilder {

    /**
     * 解析读进来的字符流
     * @param reader
     * @return
     */
    public SqlSessionFactory build(Reader reader) {
//        初始化文档
        XMLConfigBuilder xmlConfigBuilder = new XMLConfigBuilder(reader);
//        xmlConfigBuilder.parse()：解析xml文件和注册接口
        return build(xmlConfigBuilder.parse());
    }

    public SqlSessionFactory build(Configuration config) {
        return new DefaultSqlSessionFactory(config);
    }
}
```

- SqlSessionFactoryBuilder 是作为整个 Mybatis 的入口类，通过指定解析XML的IO，引导整个流程的启动。
- 从这个类开始新增加了 XMLConfigBuilder、Configuration 两个处理类，分别用于解析 XML 和串联整个流程的对象保存操作。接下来我们会分别介绍这些新引入的对象。

### 3.3、XMLConfigBuilder解析处理

```java
public class XMLConfigBuilder extends BaseBuilder {

    private Element root;

    public XMLConfigBuilder(Reader reader) {
        // 1. 调用父类初始化Configuration
        super(new Configuration());
        // 2. dom4j 处理 xml
        SAXReader saxReader = new SAXReader();
        try {
            Document document = saxReader.read(new InputSource(reader));
            root = document.getRootElement();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    /**
     * 解析配置；类型别名、插件、对象工厂、对象包装工厂、设置、环境、类型转换、映射器
     *
     * @return Configuration
     */
    public Configuration parse() {
        try {
            // 解析映射器
            mapperElement(root.element("mappers"));
        } catch (Exception e) {
            throw new RuntimeException("Error parsing SQL Mapper Configuration. Cause: " + e, e);
        }
        return configuration;
    }

    private void mapperElement(Element mappers) throws Exception {
        List<Element> mapperList = mappers.elements("mapper");
        for (Element e : mapperList) {
            String resource = e.attributeValue("resource");
            Reader reader = Resources.getResourceAsReader(resource);
            SAXReader saxReader = new SAXReader();
            Document document = saxReader.read(new InputSource(reader));
            Element root = document.getRootElement();

            //命名空间
            String namespace = root.attributeValue("namespace");

//            下面循环对应一个接口，遍历接口注册每一个方法
            // SELECT
            List<Element> selectNodes = root.elements("select");
            for (Element node : selectNodes) {
                String id = node.attributeValue("id");
                String parameterType = node.attributeValue("parameterType");
                String resultType = node.attributeValue("resultType");
                String sql = node.getText();

                // ? 匹配
                Map<Integer, String> parameter = new HashMap<>();
                Pattern pattern = Pattern.compile("(#\\{(.*?)})");
                Matcher matcher = pattern.matcher(sql);
                for (int i = 1; matcher.find(); i++) {
                    String g1 = matcher.group(1);
                    String g2 = matcher.group(2);
                    parameter.put(i, g2);
                    sql = sql.replace(g1, "?");
                }

                String msId = namespace + "." + id;
//                sql类型
                String nodeName = node.getName();
//                封装sql类型
                SqlCommandType sqlCommandType = SqlCommandType.valueOf(nodeName.toUpperCase(Locale.ENGLISH));
                MappedStatement mappedStatement = new MappedStatement.Builder(configuration, msId, sqlCommandType, parameterType, resultType, sql, parameter).build();
                // 添加解析 SQL
                configuration.addMappedStatement(mappedStatement);
            }

            // 注册Mapper映射器 添加映射器工厂代理到map中
//            key:接口名字 value:映射器代理类
            configuration.addMapper(Resources.classForName(namespace));
        }
    }
}
```

- XMLConfigBuilder 核心操作在于初始化 Configuration，因为 Configuration 的使用离解析 XML 和存放是最近的操作，所以放在这里比较适合。
- 之后就是具体的 parse() 解析操作，并把解析后的信息，通过 Configuration 配置类进行存放，包括：添加解析 SQL、注册Mapper映射器。
- 解析配置整体包括：类型别名、插件、对象工厂、对象包装工厂、设置、环境、类型转换、映射器，但目前我们还不需要那么多，所以只做一些必要的 SQL 解析处理。

### 3.4、通过配置类包装注册机和SQL语句

```java
public class Configuration {

    /**
     * 映射注册机，key:接口类信息 value:映射器代理工厂
     */
    protected MapperRegistry mapperRegistry = new MapperRegistry(this);

    /**
     * 映射的语句，存在Map里
     */
    protected final Map<String, MappedStatement> mappedStatements = new HashMap<>();

    public void addMappers(String packageName) {
        mapperRegistry.addMappers(packageName);
    }

    /**
     * 添加映射器工厂代理
     * @param type
     * @param <T>
     */
    public <T> void addMapper(Class<T> type) {
        mapperRegistry.addMapper(type);
    }

    public <T> T getMapper(Class<T> type, SqlSession sqlSession) {
        return mapperRegistry.getMapper(type, sqlSession);
    }

    public boolean hasMapper(Class<?> type) {
        return mapperRegistry.hasMapper(type);
    }

    /**
     *将解析的sql放到mappedStatements里面
     * @param ms
     */
    public void addMappedStatement(MappedStatement ms) {
//        key:方法名 value:sql语句
        mappedStatements.put(ms.getId(), ms);
    }

    public MappedStatement getMappedStatement(String id) {
        return mappedStatements.get(id);
    }
}
```

在配置类中添加映射器注册机和映射语句的存放；

- 映射器注册机是我们上一章节实现的内容，用于注册 Mapper 映射器锁提供的操作类。
- 另外一个 MappedStatement 是本章节新添加的 SQL 信息记录对象，包括记录：SQL类型、SQL语句、入参类型、出参类型等。*详细可参照源码*

### 3.5、DefaultSqlSession结合配置项获取信息

```java
public class DefaultSqlSession implements SqlSession {

    /**
     * 映射器注册机
     */
//    private MapperRegistry mapperRegistry;

    private Configuration config;


    public DefaultSqlSession(Configuration config){
        this.config = config;
    }

    // 省略构造函数

    @Override
    public <T> T selectOne(String statement) {
        return (T) ("你被代理了！" + statement);
    }

    @Override
    public <T> T selectOne(String statement, Object parameter) {
        MappedStatement mappedStatement = config.getMappedStatement(statement);
        return (T) ("你被代理了！" + "\n方法：" + statement + "\n入参：" + parameter + "\n待执行SQL：" + mappedStatement.getSql());
    }

    @Override
    public <T> T getMapper(Class<T> type) {
        return config.getMapper(type,this);
    }

    @Override
    public Configuration getConfiguration() {
        return config;
    }
}
```

- DefaultSqlSession 相对于上一章节，这里把 `MapperRegistry mapperRegistry` 替换为 `Configuration configuration`，这样才能传递更丰富的信息内容，而不只是注册器操作。
- 之后在 DefaultSqlSession#selectOne、DefaultSqlSession#getMapper 两个方法中都使用 configuration 来获取对应的信息。
- 目前 selectOne 方法中只是把获取的信息进行打印，后续将引入 SQL 执行器进行结果查询并返回。

### 3.6、资源读取

```java
public class Resources {

    public static Reader getResourceAsReader(String resources)throws IOException {
        return new InputStreamReader(getResourceAsStream(resources));
    }

    private static InputStream getResourceAsStream(String resource) throws IOException {
//       获取类加载器
        ClassLoader[] classLoaders = getClassLoaders();
        for (ClassLoader classLoader : classLoaders) {
            InputStream inputStream = classLoader.getResourceAsStream(resource);
            if (null != inputStream) {
                return inputStream;
            }
        }
        throw new IOException("Could not find resource " + resource);
    }

    private static ClassLoader[] getClassLoaders() {
        return new ClassLoader[]{
                ClassLoader.getSystemClassLoader(),
                Thread.currentThread().getContextClassLoader()};
    }

    /*
     * Loads a class
     *
     * @param className - the class to fetch
     * @return The loaded class
     * @throws ClassNotFoundException If the class cannot be found (duh!)
     */
    public static Class<?> classForName(String className) throws ClassNotFoundException {
        return Class.forName(className);
    }
}
```

Resources类注要负责xml文件流的读取，根据用户传入的配置文件，然后将配置文件中指定的xml文件读取到内存中。



## 4、测试

### 4.1、测试用例

**DAO接口**

```java
public interface IUserDao {

    String queryUserInfoById(String id);

    String queryUserByUserHead(String userHead);
}
```

DAO接口对应的xml文件

```java
<mapper namespace="bugcode.online.mybatis.dao.IUserDao">

    <select id="queryUserInfoById" parameterType="java.lang.Long" resultType="bugcode.online.mybatis.po.User">
        SELECT id, userId, userHead, createTime
        FROM user
        where id = #{id}
    </select>

    <select id="queryUserByUserHead" parameterType="java.lang.Long" resultType="bugcode.online.mybatis.po.User">
        SELECT id, userId, userHead, createTime
        FROM user
        where userHead = #{userHead}
    </select>

</mapper>
```





### 4.2、测试案例

```java
 @Test
    public void testMapperXml() throws IOException {

        // 1. 从SqlSessionFactory中获取SqlSession
        Reader reader = Resources.getResourceAsReader("mybatis-config-datasource.xml");
//        解析xml，将每一个接口对应的映射器代理工厂添加到map中
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
//        创建sqlSession
        SqlSession sqlSession = sqlSessionFactory.openSession();

        // 2. 获取映射器对象 其实是一个代理类
        IUserDao userDao = sqlSession.getMapper(IUserDao.class);

        // 3. 测试验证
        String res = userDao.queryUserInfoById("10001");
        logger.info("测试结果：{}", res);

    }
```



## 5、总结

SqlSessionFactoryBuilder作为应用程序入口，使用建造者模式，创建出SqlSessionFactory对象。

