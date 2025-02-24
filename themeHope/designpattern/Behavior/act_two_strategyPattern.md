---
# 这是文章的标题
title: 2、策略设计模式
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 2
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
  - 策略模式
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

- [策略设计模式](#策略设计模式)
  - [策略模式介绍](#策略模式介绍)
  - [策略模式类图](#策略模式类图)
  - [策略模式使用场景](#策略模式使用场景)
  - [策略模式使用案例](#策略模式使用案例)
    - [消除if-else案例](#消除if-else案例)
      - [定义抽象策略接口](#定义抽象策略接口)
      - [定义具体策略类](#定义具体策略类)
      - [定义上下文环境类](#定义上下文环境类)
      - [客户端](#客户端)
    - [策略模式优化](#策略模式优化)
    - [改写if-else](#改写if-else)
      - [定义策略接口](#定义策略接口)
      - [定义具体策略类](#定义具体策略类-1)
      - [上下文](#上下文)
      - [Client](#client)
  - [策略模式骨架](#策略模式骨架)
  - [策略模式优点](#策略模式优点)
    - [优点](#优点)
    - [缺点](#缺点)

<!-- /TOC -->

# 策略设计模式

## 策略模式介绍

在现实生活中常常遇到实现某种目标存在多种策略可供选择的情况，例如，出行旅游可以乘坐飞机、乘坐火车、骑自行车或自己开私家车等，超市促销可以釆用打折、送商品、送积分等方法。

在软件开发中也常常遇到类似的情况，当实现某一个功能存在多种算法或者策略，我们可以根据环境或者条件的不同选择不同的算法或者策略来完成该功能，如数据排序策略有冒泡排序、选择排序、插入排序、二叉树排序等。

如果使用多重条件转移语句实现（即硬编码），不但使条件语句变得很复杂，而且增加、删除或更换算法要修改原代码，不易维护，违背开闭原则。如果采用策略模式就能很好解决该问题。

**策略（Strategy）模式的定义**：该模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。策略模式属于对象行为模式，它通过对算法进行封装，把使用算法的责任和算法的实现分割开来，并委派给不同的对象对这些算法进行管理。

## 策略模式类图

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131521717.png)

策略模式有三个组成角色：

- 抽象策略(Strategy)类：策略、 算法家族的抽象， 通常为接口，定义每个策略或算法必须具有的方法和属性。
- 具体策略(Concrete Strategy)类:实现抽象策略中的操作，该类含有具体的算法。
- 环境(Context)类:它也叫做上下文角色， 起承上启下封装作用，屏蔽高层模块对策略、算法的直接访问，封装可能存在的变化，是一个中间层，负责屏蔽底层策略，封装对外访问接口。

## 策略模式使用场景

1. 一个系统需要动态的在几种算法中选择一种算法时，可以将每个算法封装到策略类中。
2. 一个类定义了多种行为，并且这些行为在这个类的操作中以多个条件语句的形式出现，可以将每一个条件分支移入他们各自的策略类中以代替这些条件语句。
3. 系统中各算法彼此独立，且要求对客户隐藏具体算法的实现细节时。
4. 多个类之区别于表现形式不同，可以使用策略模式，在运行时候动态选择要执行的行为。

## 策略模式使用案例

### 消除if-else案例

使用策略模式消除代码中的if-else

#### 定义抽象策略接口
```java
//抽象策略类
interface Strategy {
    //策略方法
    public void strategyMethod();
}
```

#### 定义具体策略类

具体策略类实现策略接口里面的方法；

```java
//具体策略类A
class ConcreteStrategyA implements Strategy {
    public void strategyMethod() {
        System.out.println("具体策略A的策略方法被访问！");
    }
}
//具体策略类B
class ConcreteStrategyB implements Strategy {
    public void strategyMethod() {
        System.out.println("具体策略B的策略方法被访问！");
    }
}
```

#### 定义上下文环境类

```java
//环境类
class Context {
    //持有策略接口的引用
    private Strategy strategy;
    public Strategy getStrategy() {
        return strategy;
    }
    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }
    //调用策略方法
    public void strategyMethod() {
        strategy.strategyMethod();
    }
}
```

#### 客户端

```java
public class StrategyPattern {
//测试
    public static void main(String[] args) {
        Context c = new Context();
        //具体策略实例
        Strategy s = new ConcreteStrategyA();
        //传入具体策略引用
        c.setStrategy(s);
        c.strategyMethod();
        System.out.println("-----------------");
        //创建具体策略引用
        s = new ConcreteStrategyB();
        c.setStrategy(s);
        c.strategyMethod();
    }
}
```

首先定义一个策略接口Strategy，然后有两个具体策略子类实现此接口，具体策略子类就类似上文中我们说的多种算法，然后再Context环境类总通过持有Strategy对象调用不同的具体策略方法，其实是利用java多态的特性来实现if-else功能。

但是针对不同的具体策略调用，依然是需要使用if-else分支判断,通常情况下我们会写出下面的逻辑判断：

```java
if{
    // 逻辑1
    ......
} else {
    // 逻辑2
    ......
}
```

如果改用策略模式实现，依然无法避免if-else,唯一的改变是对具体的算法策略进行了封装。

```java
Context c = new Context();
    if(conditions){
        // 逻辑1
        Strategy s = new ConcreteStrategyA();
        c.setStrategy(s);
        c.strategyMethod();
    } else {
        // 逻辑2
        Strategy s = new ConcreteStrategyB();
        c.setStrategy(s);
        c.strategyMethod();
    }
}
```

因此策略模式本质上，还是避免不了if-else判断，而它的优化点是抽象了出了接口，将业务逻辑封装成一个一个的实现类，任意地替换。在复杂场景（业务逻辑较多）时比直接 if else 来的好维护些。

> 策略类的核心是在上下文Context对象中持有策略接口的引用，通过传入具体的策略对象实现对不同的策略调用；

### 策略模式优化

上面实现的策略模式，其一，如果算法类型很多，那么就会导致庞大的具体策略类，其二，本质上还是无法消除if-else逻辑判断，因此针对存在的两个问题，还可以进一步优化。

第一个问题我们其实可以这样解决，把抽象策略和具体策略放在一个枚举类里

```java
public enum Strategy {
    A{

        @Override
        public void exe() {
            System.out.println("执行具体策略A");
        }

    },
    B{
        @Override
        public  void exe() {
            System.out.println("执行具体策略B");
        }

    };

    public abstract void exe();

}
```

**方法 exe() 相当于抽象策略，而A和B就相当于实现了抽象策略的具体策略**

对于第二个问题，可以使用map解决，Map<条件，具体策略>既可以避免使用if-else判断。

### 改写if-else

假设我们要处理一个office文件，分为三种类型 docx、xlsx、pptx，分别表示Word文件、Excel文件、PPT文件，根据文件后缀分别解析。

常规写法：

```java
public class OfficeHandler {
 
    public void handleFile(String filePath){
        if(filePath == null){
            return;
        }
        String fileExtension = getFileExtension(filePath);
        if(("docx").equals(fileExtension)){
            handlerDocx(filePath);
        }else if(("xlsx").equals(fileExtension)){
            handlerXlsx(filePath);
        }else if(("pptx").equals(fileExtension)){
            handlerPptx(filePath);
        }
    }
 
    public void handlerDocx(String filePath){
        System.out.println("处理docx文件");
    }
    public void handlerXlsx(String filePath){
        System.out.println("处理xlsx文件");
    }
    public void handlerPptx(String filePath){
        System.out.println("处理pptx文件");
    }
    private static String getFileExtension(String filePath){
        // 解析文件名获取文件扩展名,比如 文档.docx，返回 docx
        String fileExtension = filePath.substring(filePath.lastIndexOf(".")+1);
        return fileExtension;
    }
}
```

处理逻辑全部放在一个类中，会导致整个类特别庞大，假设我们要新增一种类型处理，比如对于2007版之前的office文件，后缀分别是 doc/xls/ppt，那我们得增加 else if 逻辑，违反了开闭原则.

策略模式改写如下:

#### 定义策略接口

```java
public interface OfficeHandlerStrategy {
    void handlerOffice(String filePath);
}
```

#### 定义具体策略类

```java
public class OfficeHandlerDocxStrategy implements OfficeHandlerStrategy {
    @Override
    public void handlerOffice(String filePath) {
        System.out.println("处理docx");
    }
}
```

OfficeHandlerXlsxStrategy/OfficeHandlerPptxStrategy 也是同样的具体抽象策略。

#### 上下文

```java
public class OfficeHandlerStrategyFactory {
    private static final Map<String,OfficeHandlerStrategy> map = new HashMap<>();
    static {
        map.put("docx",new OfficeHandlerDocxStrategy());
        map.put("xlsx",new OfficeHandlerXlsxStrategy());
        map.put("pptx",new OfficeHandlerPptxStrategy());
    }
    public static OfficeHandlerStrategy getStrategy(String type){
        return map.get(type);
    }
}
```

#### Client

```java
public static void main(String[] args) {
        String filePath = "C://file/123.xlsx";
        String type = getFileExtension(filePath);
        OfficeHandlerStrategy strategy = OfficeHandlerStrategyFactory.getStrategy(type);
        strategy.handlerOffice(filePath);
    }
```

## 策略模式骨架

```java
//上下文类
public class Context {
    // 抽象策略
    private Strategy strategy = null;
    // 构造函数设置具体策略
    public Context(Strategy strategy) {
        this.strategy = strategy;
    }
    // 封装后的策略方法
    public void doAnything(){
        this.strategy.doSomething();
    }
}
// 策略接口
public interface Strategy {

    // 策略模式的运算法则

    public void doSomething();

}

//具体策略
public class ConcreteStrategy1 implements Strategy{
    @Override
    public void doSomething() {
        System.out.println("ConcreteStrategy1");
    }
}
...
    
//测试
public class StrategyClient {
    public static void main(String[] args) {
        // 声明一个具体的策略
        Strategy strategy = new ConcreteStrategy1();
        // 声明上下文对象
        Context context = new Context(strategy);
        // 执行封装后的方法
        context.doAnything();
    }
}
```

## 策略模式优点

### 优点

1、算法可以自由切换

这是策略模式本身定义的，只要实现抽象策略，它就成为策略家族的一个成员，通过封装角色对其进行封装，保证对外提供“可自由切换”的策略。

2、避免使用多重条件判断

简化多重if-else，或多个switch-case分支。

3、扩展性良好

增加一个策略，只需要实现一个接口即可。

4、开闭原则 :

策略模式提供了对开闭原则的支持,可以在不修改原有系统的基础上 , 选择不同的行为,也可以额外扩展其它行为;

5、避免代码冗余 :

可以避免使用多重条件判定语句; 可以避免出现大量的 if … else … 语句 , switch 语句等 ;

6、安全保密 :

策略模式可以提高算法的保密性和安全性; 在终端使用策略时 , 只需要知道策略的作用即可,不需要知道策略时如何实现的;

### 缺点

- 策略类选择 :客户端 必须 知道所有的 策略类 , 并且自行决定 使用哪个策略类 ;
- 增加复杂性 :如果系统很复杂,会产生很多策略类;