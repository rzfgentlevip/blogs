---
# 这是文章的标题
title: 2、映射器的注册和使用
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 2
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

# 2、映射器的注册和使用

## 1、目标

第一章节主要解决一个核心问题：为DAO接口创建映射器代理类，然后再使用代理类完成一些接口中的方法调用，但是在创建代理类的时候，需要具体指明代理的是哪一个类，其次，初步使用sqlSession对接口调用返回一些固定格式的结果。

因此本章中，需要实现对映射器的注册自动化，自动扫描mapper包下面的所有接口，自动进行注册，不需要在指定注册哪一个DAO类，另外需要对SqlSession进行抽象和包装，封装映射器代理和方法调用，方便后续进行扩展操作。



## 2、设计

本章节第一个目标是实现自动扫描用户指定包路径下的所有DAO接口，然后自动创建DAO接口的代理类注册，因此就需要包装一个可以扫描整个包路径的组件完成代理类生成的注册器。

当然我们还要把上一章节中简化的 SqlSession 进行完善，由 SqlSession 定义数据库处理接口和获取 Mapper 对象的操作，并把它交给映射器代理类进行使用。*这一部分是对上一章节内容的完善*

有了 SqlSession 以后，你可以把它理解成一种功能服务，有了功能服务以后还需要给这个功能服务提供一个工厂，来对外统一提供这类服务。比如我们在 Mybatis 中非常常见的操作，开启一个 SqlSession。

![第二章.drawio](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407060842823.png)



以包装接口提供映射器代理类为目标，补全映射器注册机 `MapperRegistry`，自动扫描包下接口并把每个接口类映射的代理类全部存入映射器代理的 HashMap 缓存中。

而 SqlSession、SqlSessionFactory 是在此注册映射器代理的上层使用标准定义和对外服务提供的封装，便于用户使用。*我们把使用方当成用户* 经过这样的封装就就可以更加方便我们后续在框架上功能的继续扩展了，也希望大家可以在学习的过程中对这样的设计结构有一些思考，它可以帮助你解决一些业务功能开发过程中的领域服务包装。

## 3、实现

### 3.1、核心类图实现

![step02-mybatis-simple-proxyFactory.drawio](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407060900393.png)



- MapperRegistry 提供包路径的扫描和映射器代理类注册机服务，完成接口对象的代理类注册处理。
- SqlSession、DefaultSqlSession 用于定义执行 SQL 标准、获取映射器以及将来管理事务等方面的操作。基本我们平常使用 Mybatis 的 API 接口也都是从这个接口类定义的方法进行使用的。
- SqlSessionFactory 是一个简单工厂模式，用于提供 SqlSession 服务，屏蔽创建细节，延迟创建过程。

### 3.2、映射器注册类

```java
/**
 * @Description 负责解析mapper报下的所有mapper接口，并且将接口对应的映射代理工厂注入到容器中
 * @Author bugcode.online
 * @Date 2024/5/19 16:17
 */
public class MapperRegistry {

//    将已添加的应设计代理添加到hashmap中
//    key:接口类信息 value:映射器代理工厂
    private final Map<Class<?>,MapperProxyFactory> knownMappers = new HashMap<>();

    /**
     * 获取映射器的代理工厂
     * @param type
     * @param sqlSession
     * @param <T>
     * @return
     */
    public <T> T getMapper(Class<T> type, SqlSession sqlSession) {

//        从map中获取应设计代理工厂
        final MapperProxyFactory<T> mapperProxyFactory = (MapperProxyFactory<T>) knownMappers.get(type);
        if (mapperProxyFactory == null) {
            throw new RuntimeException("Type " + type + " is not known to the MapperRegistry.");
        }
        try {
            return mapperProxyFactory.newInstance(sqlSession);
        } catch (Exception e) {
            throw new RuntimeException("Error getting mapper instance. Cause: " + e, e);
        }
    }

    /**
     * 将扫描出来的mapper接口全部添加到容器当中
     * @param type
     * @param <T>
     */
    public <T> void addMapper(Class<T> type){

//        mapper必须是接口才能够注册
        if(type.isInterface()){
            if(hasMapper(type)){
//                如果重复添加 报错
                throw new RuntimeException("");
            }
//            注册映射器代理工厂
            knownMappers.put(type,new MapperProxyFactory(type));
        }
    }

    /**
     * 判断set中是否已经添加了接口
     * @param type
     * @param <T>
     * @return
     */
    public <T> boolean hasMapper(Class<T> type){
        return knownMappers.containsKey(type);
    }


    /**
     * 扫描mapper包下面的接口信息 然后添加到knownMappers 容器里面
     * @param packageName
     */
    public void addMappers(String packageName) {
        Set<Class<?>> mapperSet = ClassScanner.scanPackage(packageName);
        for (Class<?> mapperClass : mapperSet) {
            addMapper(mapperClass);
        }
    }
}
```

- MapperRegistry 映射器注册类的核心主要在于提供了 `ClassScanner.scanPackage` 扫描包路径，调用 `addMapper` 方法，给接口类创建 `MapperProxyFactory` 映射器代理类，并写入到 knownMappers 的 HashMap 缓存中。
- 另外就是这个类也提供了对应的 getMapper 获取映射器代理类的方法，其实这步就包装了我们上一章节手动操作实例化的过程，更加方便在 DefaultSqlSession 中获取 Mapper 时进行使用。

### 3.3、SqlSession会话接口

```java
public interface SqlSession {

    /**
     * Retrieve a single row mapped from the statement key
     * 根据指定的SqlID获取一条记录的封装对象
     *
     * @param <T>       the returned object type 封装之后的对象类型
     * @param statement sqlID
     * @return Mapped object 封装之后的对象
     */
    <T> T selectOne(String statement);

    /**
     * Retrieve a single row mapped from the statement key and parameter.
     * 根据指定的SqlID获取一条记录的封装对象，只不过这个方法容许我们可以给sql传递一些参数
     * 一般在实际使用中，这个参数传递的是pojo，或者Map或者ImmutableMap
     *
     * @param <T>       the returned object type
     * @param statement Unique identifier matching the statement to use.
     * @param parameter A parameter object to pass to the statement.
     * @return Mapped object
     */
    <T> T selectOne(String statement, Object parameter);

    /**
     * Retrieves a mapper.
     * 得到映射器，这个巧妙的使用了泛型，使得类型安全
     *
     * @param <T>  the mapper type
     * @param type Mapper interface class
     * @return a mapper bound to this SqlSession
     */
    <T> T getMapper(Class<T> type);
}
```

在 SqlSession 中定义用来执行 SQL、获取映射器对象以及后续管理事务操作的标准接口。

目前这个接口中对于数据库的操作仅仅只提供了 selectOne，后续还会有相应其他方法的定义

**SqlSession默认实现类**

```java
public class DefaultSqlSession implements SqlSession {

     /**
     * 映射器注册机
     */
    private MapperRegistry mapperRegistry;


    public DefaultSqlSession(MapperRegistry mapperRegistry){
        this.mapperRegistry = mapperRegistry;
    }

    // 省略构造函数
    @Override
    public <T> T selectOne(String statement) {
        return null;
    }

    @Override
    public <T> T selectOne(String statement, Object parameter) {
        return (T) ("你被代理了！" + "方法：" + statement + " 入参：" + parameter);
    }

    /**
     * 获取被代理的类
     * @param type Mapper interface class
     * @param <T>
     * @return
     */
    @Override
    public <T> T getMapper(Class<T> type) {
        return mapperRegistry.getMapper(type, this);
    }

}
```

- 通过 DefaultSqlSession 实现类对 SqlSession 接口进行实现。
- getMapper 方法中获取映射器对象是通过 MapperRegistry 类进行获取的，后续这部分会被配置类进行替换。
- 在 selectOne 中是一段简单的内容返回，目前还没有与数据库进行关联，这部分在我们渐进式的开发过程中逐步实现。

### 3.4、SqlSessionFactory 工厂定义和实现

```java
public interface SqlSessionFactory {

    /**
     * 打开一个 session
     * @return SqlSession
     */
    SqlSession openSession();
}
```

SqlSessionFactory:定义用户获取SqlSession的工厂类

**默认实现**

```java
public class DefaultSqlSessionFactory implements SqlSessionFactory {

    /**
     * 映射器注册机
     */
    private final MapperRegistry mapperRegistry;

    public DefaultSqlSessionFactory(MapperRegistry mapperRegistry) {
        this.mapperRegistry = mapperRegistry;
    }

    @Override
    public SqlSession openSession() {
        return new DefaultSqlSession(mapperRegistry);
    }
}
```

默认的简单工厂实现，处理开启 SqlSession 时，对 DefaultSqlSession 的创建以及传递 mapperRegistry，这样就可以在使用 SqlSession 时获取每个代理类的映射器对象了。



## 4、测试

### 4.1、测试用例

在同一个mapper包路径下，定义两个接口。

```java
public interface ISchoolDao {
    String querySchoolName(String uId);
}

public interface IUserDao {

    String queryUserName(String id);

    Integer queryUserAge(String id);
}
```



### 4.2、测试类

```java
    @Test
    public void test_MapperProxyFactory() {
        // 1. 注册 Mapper
        MapperRegistry registry = new MapperRegistry();
//        包扫描路径
        registry.addMappers("bugcode.online.mybatis.dao");

        // 2. 从 SqlSession 工厂获取 Session
        SqlSessionFactory sqlSessionFactory = new DefaultSqlSessionFactory(registry);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        // 3. 获取映射器对象
        IUserDao userDao = sqlSession.getMapper(IUserDao.class);

        // 4. 测试验证
        String res = userDao.queryUserName("10001");
        System.out.println(res);
    }
```



**测试结果**

```java
你被代理了！方法：queryUserName 入参：[Ljava.lang.Object;@4534b60d

Process finished with exit code 0
```





## 5、总结

本章主要关注点，设计模式：

创建SqlSession使用抽象工厂设计模式。



