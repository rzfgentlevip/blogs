---
# 这是文章的标题
title: 3、单例设计模式
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: bugcode
# 设置写作时间
date: 2023-01-01
# 一个页面可以有多个分类
category:
  - DESIGN PATTERN
  - JAVA
  - 设计模式
# 一个页面可以有多个标签
tag:
  - 后端
  - java
  - 单例模式
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: java基础
# 你可以自定义版权信息
copyright: bugcode
---

<!-- TOC -->

- [3、单例设计模式](#3单例设计模式)
  - [1、单例设计模式的介绍](#1单例设计模式的介绍)
    - [1.1、饿汉式（静态常量）](#11饿汉式静态常量)
    - [1.2、饿汉式（静态代码块）](#12饿汉式静态代码块)
    - [1.3、懒汉式（线程不安全）](#13懒汉式线程不安全)
    - [1.4、懒汉式（线程安全1）](#14懒汉式线程安全1)
    - [1.5、懒汉式（线程安全2）](#15懒汉式线程安全2)
    - [1.6、双重检查](#16双重检查)
    - [1.7、静态内部类](#17静态内部类)
    - [1.8、枚举](#18枚举)
  - [2、单例模式在jdk源码中的分析](#2单例模式在jdk源码中的分析)
      - [单例模式注意事项](#单例模式注意事项)
      - [单例模式的应用场景](#单例模式的应用场景)
      - [单例模式优缺点分析](#单例模式优缺点分析)

<!-- /TOC -->


# 3、单例设计模式

## 1、单例设计模式的介绍

所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在**一个对象实例**， 并且该类只提供一个取得其对象实例的方法(**静态方法**)。

比如 `Hibernate` 的` SessionFactory`，它充当数据存储源的代理，并负责创建 `Session` 对象。`SessionFactory `并不是轻量级的，一般情况下，一个项目通常只需要一个 `SessionFactory `就够，这是就会使用到单例模式。

**单例模式的3个特点**

1. 单例类只有一个实例对象；
2. 该单例对象必须由单例类自行创建；
3. 单例类对外提供一个访问该单例的全局访问点。

**类图**

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131319974.png)

单例模式有八种方式：

1. 饿汉式**(**静态常量)
2. 饿汉式（静态代码块）
3. 懒汉式(线程不安全)
4. 懒汉式(线程安全，同步方法）
5. 懒汉式(线程安全，同步代码块)
6. 双重检查
7. 静态内部类
8. 枚举

### 1.1、饿汉式（静态常量）

**代码实现**

```java
public class Singleton01 {
    public static void main(String[] args) {
        Singleton singleton=Singleton.getInstance();
        Singleton singleton1=Singleton.getInstance();
//        判断获取的两个实例是否是同一个实例
        System.out.println(singleton == singleton1);//true
//        从哈希码方面判断，也是同一个对象
        System.out.println(singleton.hashCode());
        System.out.println(singleton1.hashCode());
    }
}


//饿汉式，使用静态变量
class Singleton{
//    1 提供一个私有的构造方法，外部不可以new
    private Singleton(){

    }
//    2 提供一个对象实例
    private  final static Singleton instance=new Singleton();
//    提供一个共有的静态方法，用于返回实例对象
    public static Singleton getInstance(){
        return instance;
    }
```

**优缺点说明**

**优点：**

1. 这种写法比较简单，就是在**类装载的时候就完成实例化。避免了线程同步问题。**

**缺点：**

1. 在类装载的时候就完成实例化，没有达到` Lazy Loading `(懒加载)的效果。如果从始至终从未使用过这个实例，则会造成内存的浪费
2. 这种方式基于 `classloder `机制避免了多线程的同步问题，不过，instance 在类装载时就实例化，在单例模式中大多数都是调用 `getInstance` 方法， 但是导致类装载的原因有很多种，因此不能确定有其他的方式（或者其他的静态方法）导致类装载，这时候初始化 `instance` 就没有达到` lazy loading `的效果

> 结论：**这种单例模式可用，可能造成内存浪费**

### 1.2、饿汉式（静态代码块）

**代码实现**

```java
public class Singleton02 {
    public static void main(String[] args) {
        Singleton1 singleton=Singleton1.getInstance();
        Singleton1 singleton1=Singleton1.getInstance();
//        判断获取的两个实例是否是同一个实例
        System.out.println(singleton == singleton1);//true
//        从哈希码方面判断，也是同一个对象
        System.out.println(singleton.hashCode());
        System.out.println(singleton1.hashCode());
    }
}

//饿汉式，使用静态变量
class Singleton1{
    //    1 提供一个私有的构造方法，外部不可以new
    private Singleton1(){

    }
    //    2 提供一个对象实例
    private  final static Singleton1 instance;
//    把单例对象的创建放在静态代码块中
    static {
        instance=new Singleton1();
    }
    //    提供一个共有的静态方法，用于返回实例对象
    public static Singleton1 getInstance(){
        return instance;
    }
}
```

**优缺点分析**

1. 这种方式和上面的方式其实类似，只不过将类实例化的过程放在了静态代码块中，也是在**类装载**的时候，就执行静态代码块中的代码，初始化类的实例。优缺点和上面是一样的。

> 结论：**这种单例模式可用，但是可能造成内存浪费（单例对象被创建，但是又没有使用的情况下）**

### 1.3、懒汉式（线程不安全）

**代码实现**

```java
public class Singleton03Test {
    public static void main(String[] args) {
        Singleton2 singleton=Singleton2.getInstance();
        Singleton2 singleton1=Singleton2.getInstance();
//        判断获取的两个实例是否是同一个实例
        System.out.println(singleton == singleton1);//true
//        从哈希码方面判断，也是同一个对象
        System.out.println(singleton.hashCode());
        System.out.println(singleton1.hashCode());
    }
}

class Singleton2{
    private static Singleton2 instance;
//    创建私有的构造方法
    private Singleton2(){}

//    对外提供一个共有的方法，当需要单例对象的时候，才创建对象,既懒汉式
    public static Singleton2 getInstance(){
        if(instance == null){
            instance=new Singleton2();
        }
        return instance;
    }
}
```

**优缺点分析**

1. 起到了 **`Lazy Loading`** 的效果，但是只能在单线程下使用。
2. 如果在多线程下，一个线程进入了 `if (singleton == null)`判断语句块，还未来得及往下执行，另一个线程也通过了这个判断语句，这时便会产生多个实例。所以在多线程环境下不可使用这种方式

> 结论：**在实际开发中，不要使用这种方式.**

### 1.4、懒汉式（线程安全1）

**代码实现**

```java
public class Singleton03Test {
    public static void main(String[] args) {
        Singleton2 singleton=Singleton2.getInstance();
        Singleton2 singleton1=Singleton2.getInstance();
//        判断获取的两个实例是否是同一个实例
        System.out.println(singleton == singleton1);//true
//        从哈希码方面判断，也是同一个对象
        System.out.println(singleton.hashCode());
        System.out.println(singleton1.hashCode());
    }
}

class Singleton2{
    private static Singleton2 instance;
//    创建私有的构造方法
    private Singleton2(){}

//    对外提供一个共有的方法，当需要单例对象的时候，才创建对象,既懒汉式
//    添加同步锁，解决线程安全问题
    public static synchronized Singleton2 getInstance(){
        if(instance == null){
            instance=new Singleton2();
        }
        return instance;
    }
}
```

**优缺点分析**

1. 解决了线程安全问题
2. 效率太低了，每个线程在想获得类的实例时候，执行` getInstance()`方法都要进行同步。而其实这个方法只执行一次实例化代码就够了，后面的想获得该类实例，直接` return `就行了。方法进行同步效率太低

> 结论：在实际开发中，不推荐使用这种方式

### 1.5、懒汉式（线程安全2）

**代码实现**

```java
public class Singleton03Test {
    public static void main(String[] args) {
        Singleton2 singleton=Singleton2.getInstance();
        Singleton2 singleton1=Singleton2.getInstance();
//        判断获取的两个实例是否是同一个实例
        System.out.println(singleton == singleton1);//true
//        从哈希码方面判断，也是同一个对象
        System.out.println(singleton.hashCode());
        System.out.println(singleton1.hashCode());
    }
}

class Singleton2{
    private static Singleton2 instance;
//    创建私有的构造方法
    private Singleton2(){}

//    对外提供一个共有的方法，当需要单例对象的时候，才创建对象,既懒汉式
//    添加同步锁，解决线程安全问题
    public static  Singleton2 getInstance(){
        if(instance == null){
           synchronized (Singleton2.class){
               instance=new Singleton2();
           }
        }
        return instance;
    }
}
```

**优缺点**

- 这种实现方式不能不能起到线程同步的作用，

> 结论：在实际开发中，不推荐使用这种方式

### 1.6、双重检查

**代码实现**

```java
public class Singleton04Test {
    public static void main(String[] args) {
        Singleton5 singleton5=Singleton5.getInstance();
        Singleton5 singleton51=Singleton5.getInstance();
        System.out.println(singleton5 == singleton51);// true

    }
}

class Singleton5{
//    volatile关键字，保证对内存可见，也就是对象一旦改变。他会把这种改变立即同步到内存中
    private static volatile Singleton5 instance;

//    私有的构造方法
    private Singleton5(){}

//加入双重检查的代码，解决线程安全问题，同时解决懒加载问题
    public static Singleton5 getInstance(){
        if(instance == null){//只要单例对象不空，其余的线程就不会做线程安全同步的检测，提高效率
//            下面的操作是原子操作
            synchronized (Singleton5.class){//解决线程安全问题
                if(instance == null){
                    instance=new Singleton5();//懒加载问题
                }
            }
        }
        return instance;
    }
}
```

**优缺点分析**

1. `Double-Check `概念是多线程开发中常使用到的，如代码中所示，我们进行了两次 `if (singleton == null)`检查，这样就可以保证线程安全了。
2. 这样，实例化代码只用执行一次，后面再次访问时，判断 if (singleton == null)，直接 return 实例化对象，也避免的反复进行方法同步.
3. 线程安全；延迟加载；效率较高

> **结论：在实际开发中，推荐使用这种单例设计模式**

### 1.7、静态内部类

静态内部类的特点：当静态内部类的外部类被装载的时候，静态内部类并不会被装载

在调用静态内部类的静态对象的时候，会导致静态内部类进行装载，并且装载时是线程安全的。因此不会有线程安全性问题。所以通过静态内部类，可以保证懒加载，还可以保证线程安全问题。

**代码说明**

```java
public class Singleton05Test {
    public static void main(String[] args) {
        Singleton6 singleton6=Singleton6.getInstance();
        Singleton6 singleton61=Singleton6.getInstance();
        System.out.println(singleton6 == singleton61);

    }
}


//推荐使用
class Singleton6{

    private Singleton6(){}

//    静态内部类
    private static class SingletonInstance{
        private static final Singleton6 INSTANCE=new Singleton6();
    }
//    提供一个静态方法，直接返回属性INSTANCE
    public static Singleton6 getInstance(){
        return SingletonInstance.INSTANCE;
    }

}
```

**优缺点**

1. 这种方式采用了类装载的机制来保证初始化实例时只有一个线程。
2. 静态内部类方式在` Singleton6` 类被装载时并不会立即实例化，而是在需要实例化时，调用 `getInstance` 方法，才会装载 `SingletonInstance `类，从而完成 `Singleton `的实例化。
3. 类的静态属性只会在第一次加载类的时候初始化，所以在这里，`JVM `帮助我们保证了线程的安全性，在类进行初始化时，别的线程是无法进入的。
4. 优点：避免了线程不安全，利用静态内部类特点实现延迟加载，效率高

> 结论：**推荐使用.**

### 1.8、枚举

**代码说明**

```java
public class Singleton06Test {
    public static void main(String[] args) {
        Singleton7 singleton7=Singleton7.INSTANCE;
        Singleton7 singleton71=Singleton7.INSTANCE;
        System.out.println(singleton7 == singleton71);//true
        singleton7.method();//say hello

    }
}

enum Singleton7{
    INSTANCE;// 属性
    public void method(){
        System.out.println("say hello");
    }
}
```

**优缺点**

1. 这借助` JDK1.5 `中添加的枚举来实现单例模式。不仅能避免多线程同步问题，而且还能防止反序列化重新创建新的对象。
2. 这种方式是 **`Effective Java`** 作者 **`Josh Bloch`**  提倡的方式

> 结论：推荐使用

## 2、单例模式在jdk源码中的分析

**源码分析**

```java
public class Runtime {
    private static Runtime currentRuntime = new Runtime();

    /**
     * Returns the runtime object associated with the current Java application.
     * Most of the methods of class <code>Runtime</code> are instance
     * methods and must be invoked with respect to the current runtime object.
     *
     * @return  the <code>Runtime</code> object associated with the current
     *          Java application.
     */
    public static Runtime getRuntime() {
        return currentRuntime;
    }

    /** Don't let anyone else instantiate this class */
    private Runtime() {}//私有构造
}
```

Runtime实际上使用的是饿汉式

#### 单例模式注意事项

1. 单例模式保证了 系统内存中该类只存在一个对象，节省了系统资源，对于一些需要频繁创建销毁的对象，使用单例模式可以提高系统性能
2. 当想实例化一个单例类的时候，必须要记住使用相应的获取对象的方法，而不是使用 `new`
3. 单例模式使用的场景：需要频繁的进行创建和销毁的对象、创建对象时耗时过多或耗费资源过多(即：重量级对象)，但又经常用到的对象、工具类对象、频繁访问数据库或文件的对象(比如数据源、**session** 工厂等)

#### 单例模式的应用场景

对于 Java来说，单例模式可以保证在一个 JVM 中只存在单一实例。单例模式的应用场景主要有以下几个方面。

- 需要频繁创建的一些类，使用单例可以降低系统的内存压力，减少 GC。
- 某类只要求生成一个对象的时候，如一个班中的班长、每个人的身份证号等。
- 某些类创建实例时占用资源较多，或实例化耗时较长，且经常使用。
- 某类需要频繁实例化，而创建的对象又频繁被销毁的时候，如多线程的线程池、网络连接池等。
- 频繁访问数据库或文件的对象。
- 对于一些控制硬件级别的操作，或者从系统上来讲应当是单一控制逻辑的操作，如果有多个实例，则系统会完全乱套。
- 当对象需要被共享的场合。由于单例模式只允许创建一个对象，共享该对象可以节省内存，并加快对象访问速度。如 Web 中的配置对象、数据库的连接池等。

#### 单例模式优缺点分析

**优点**

- 单例模式可以保证内存里只有一个实例，减少了内存的开销。
- 可以避免对资源的多重占用。
- 单例模式设置全局访问点，可以优化和共享资源的访问。

**缺点**

- 单例模式一般没有接口，扩展困难。如果要扩展，则除了修改原来的代码，没有第二种途径，违背开闭原则。
- 在并发测试中，单例模式不利于代码调试。在调试过程中，如果单例中的代码没有执行完，也不能模拟生成一个新的对象。
- 单例模式的功能代码通常写在一个类中，如果功能设计不合理，则很容易违背单一职责原则。