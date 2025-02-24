---
# 这是文章的标题
title: 1、简单映射器代理工厂
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
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

# 1、简单映射器代理工厂

## 1、目标

当我们设计一个ORM框架的时候，应该从三个角度考虑给用户提供最方便的操作，1、如何给用户提供简单易用的查询接口；2、如何最方便的让用户定义自己的sql操作语句3、如何将用户定义的操作语句放到数据库中去执行。

参考用户使用jdbc的查询方式，1、获取数据库连接，2、定义sql执行查询操作，3、数据库执行用户的操作并将结果进行封装，然后返回查询结果给用户，4、用户收到数据库返回的封装结果然后进行解析使用，可以看到用户操作数据库其实是一个固定的步骤，那这个过程其实就可以被精心设计和抽象封装，做成一个组件提供给大家使用，这也是mybatis的工作。

参考mybatis的使用方式，用户只需要简单的配置就可以操作数据库：

1. 配置数据源信息以及DAO接口，xml文件的位置。
2. 用户在xml文件中定义自己的sql语句。
3. 数据库执行查询并将结果封装返回。

所以说mybatis的核心就是解决了用户定义的DAO接口，xml配置文件以及数据库之间三者的关联。



## 2、设计

既然我们的目标是解决用户定义的操作接口，xml配置的sql语句以及数据库之间的关系，最简单的方法就是使用代理设计模式，因为代理设计模式可以封装一个复杂的流程为接口对象的实现类，然后让代理对象帮我用户定义的接口操作数据库，这中间一系列的复杂映射都在代理类中实现，既然明白了思路，那么我们可以按照下图的组件设计完成目标。

![第一章.drawio](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407060817829.png)

- 首先提供一个映射器的代理实现类 `MapperProxy`，通过代理类包装对数据库的操作，目前我们本章节会先提供一个简单的包装，模拟对数据库的调用。
- 之后对 `MapperProxy` 代理类，提供工厂实例化操作 MapperProxyFactory#newInstance，为每个 IDAO 接口生成代理类。*这块其实用到的就是一个简单工厂模式*

*接下来我们就按照这个设计实现一个简单的映射器代理操作，编码过程比较简单。如果对代理知识不熟悉可以先补充下。*



## 3、实现

### 3.1、核心类图



![mybatis-simple-proxyFactory.drawio.png](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407050701925.png)

1. MapperProxy：映射器的代理实现类，通过代理类包装了对数据库的操作，所有的调用最终都会调用到实现的invoke()方法上，框架会对用户自定义的每一个DAO对象生成一个代理类去操作数据库，而MapperProxyFactory就是负责为每一个DAO对象创建出一个代理类的工厂类。
2. MapperProxyFactory#newInstance  ：代理类的工厂实例化操作，负责为每一个DAO接口生成一个代理类，如果不使用工厂模式，那么以后为每一个接口创建映射代理类的时候都需要使用Proxy.newProxyInstance方法，所以使用简单工厂模式可以方便复用代码。

设计中用到了代理模式和简单工厂模式：

1. 工厂模式主要解决为每一个DAO接口生成代理类的时候服用Proxy.newProxyInstance代码。
2. 代理模式：为每一个DAO接口生成一个代理对象，代理对象封装对xml文件的解析和查询操作，最终用户对所有的方法调用都会调用到代理对象的invoke()方法上。



### 3.2、映射器代理类

**映射器代理类**

```java
/** jdk代理
 * @Description 代理类
 * @Author bugcode.online
 * @Date 2024/5/19 14:48
 */
public class MapperProxy<T> implements InvocationHandler, Serializable {

    private static final long serialVersionUID = -6424540398559729838L;

    private Map<String, String> sqlSession;
    private final Class<T> mapperInterface;

    public MapperProxy(Map<String, String> sqlSession, Class<T> mapperInterface) {
        this.sqlSession = sqlSession;
        this.mapperInterface = mapperInterface;
    }

    /**
     * 代理类调用的方法
     * @param proxy
     * @param method
     * @param args
     * @return
     * @throws Throwable
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (Object.class.equals(method.getDeclaringClass())) {
            return method.invoke(this, args);
        } else {
            return "你的被代理了！" + sqlSession.get(mapperInterface.getName() + "." + method.getName());
        }
    }

}
```

通过实现 InvocationHandler#invoke 代理类接口，封装操作逻辑的方式，对外接口提供数据库操作对象。

目前我们这里只是简单的封装了一个 sqlSession 的 Map 对象，你可以想象成所有的数据库语句操作，都是通过`接口名称+方法名称作为key`，操作作为逻辑的方式进行使用的。那么在反射调用中则获取对应的操作直接执行并返回结果即可。*当然这还只是最核心的简化流程，后续不断补充内容后，会看到对数据库的操作*

另外这里要注意如果是 Object 提供的 toString、hashCode 等方法是不需要代理执行的，所以添加 `Object.class.equals(method.getDeclaringClass())` 判断



### 3.3、代理类工厂

```java
/**
 * @Description 代理类的简单工厂
 * @Author bugcode.online
 * @Date 2024/5/19 14:56
 */
public class MapperProxyFactory<T> {

//    类信息
    private final Class<T> mapperInterface;

    public MapperProxyFactory(Class<T> mapperInterface) {
        this.mapperInterface = mapperInterface;
    }
//代理对象创建
    public T newInstance(Map<String, String> sqlSession) {
        final MapperProxy<T> mapperProxy = new MapperProxy<>(sqlSession, mapperInterface);
        return (T) Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[]{mapperInterface}, mapperProxy);
    }

}
```



工厂操作相当于把代理的创建给封装起来了，如果不做这层封装，那么每一个创建代理类的操作，都需要自己使用 `Proxy.newProxyInstance` 进行处理，那么这样的操作方式就显得比较麻烦了。



## 4、测试

### 4.1、测试用例

DAO对象

```java
public interface IUserDao {

    String queryUserName(String id);

    Integer queryUserAge(String id);
}
```

用户自定义DAO接口，然后接口中定义操作数据库的方法。

### 4.2、测试结果

```java
    @Test
    public void test_proxy_factory(){

//        创建一个工厂，告诉代理类代理哪一个接口
        MapperProxyFactory<IUserDao> factory = new MapperProxyFactory<>(IUserDao.class);
        Map<String, String> sqlSession = new HashMap<>();

//        接口中模拟查询语句
        sqlSession.put("bugcode.online.mybatis.dao.IUserDao.queryUserName", "模拟执行 Mapper.xml 中 SQL 语句的操作：查询用户姓名");
        sqlSession.put("bugcode.online.mybatis.dao.IUserDao.queryUserAge", "模拟执行 Mapper.xml 中 SQL 语句的操作：查询用户年龄");
//        返回代理类
        IUserDao userDao = factory.newInstance(sqlSession);

//        代理类调用用户的方法
        String res = userDao.queryUserName("10001");
        System.out.println("测试结果："+res);
    }
```

- 在单测中创建 MapperProxyFactory 工厂，并手动给 sqlSession Map 赋值，这里的赋值相当于模拟数据库中的操作。
- 接下来再把赋值信息传递给代理对象实例化操作，这样就可以在我们调用具体的 DAO 方法时从 sqlSession 中取值了。



## 5、总结

本章重点问题：

1. 为DAO接口创建映射器代理类
2. 使用到代理模式和简单工厂设计模式











