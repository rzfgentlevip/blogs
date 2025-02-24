---
# 这是文章的标题
title: 1、适配器模式
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
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
  - 适配器
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

- [适配器模式](#适配器模式)
  - [基本介绍](#基本介绍)
  - [工作原理](#工作原理)
  - [模式的结构](#模式的结构)
    - [类适配器结构](#类适配器结构)
    - [对象适配器结构](#对象适配器结构)
  - [类适配器](#类适配器)
    - [介绍](#介绍)
    - [类适配器实现](#类适配器实现)
    - [定义适配者（Adaptee）](#定义适配者adaptee)
    - [定义Target接口](#定义target接口)
    - [定义适配者](#定义适配者)
    - [客户端](#客户端)
  - [对象适配器](#对象适配器)
    - [设计实现](#设计实现)
    - [定义适配者（Adaptee）](#定义适配者adaptee-1)
    - [定义Target接口](#定义target接口-1)
    - [定义对象适配器](#定义对象适配器)
    - [定义客户端](#定义客户端)
  - [接口适配器模式](#接口适配器模式)
    - [定义适配者接口](#定义适配者接口)
    - [定义适配器](#定义适配器)
    - [定义客户端](#定义客户端-1)
  - [适配器模式的注意细节](#适配器模式的注意细节)
  - [优缺点](#优缺点)
    - [优点](#优点)
    - [缺点](#缺点)
    - [应用场景](#应用场景)
  - [不同类型适配器实现](#不同类型适配器实现)

<!-- /TOC -->

# 适配器模式

- 在现实生活中，经常出现两个对象因接口不兼容而不能在一起工作的实例，这时需要第三者进行适配。例如，讲中文的人同讲英文的人对话时需要一个翻译，用直流电的笔记本电脑接交流电源时需要一个电源适配器，用计算机访问照相机的 SD 内存卡时需要一个读卡器等。
- 在软件设计中也可能出现：需要开发的具有某种业务功能的组件在现有的组件库中已经存在，但它们与当前系统的接口规范不兼容，如果重新开发这些组件成本又很高，这时用适配器模式能很好地解决这些问题。

## 基本介绍

1. 适配器模式(Adapter Pattern)将某个类的接口转换成客户端期望的另一个接口表示，主要目的是兼容性，让原本因接口不匹配不能一起工作的两个类可以协同工作。其别名为包装器(Wrapper)
2. 适配器模式属于结构型模式
3. 主要分为三类：**类适配器模式、对象适配器模式、接口适配器模式**

适配器模式（Adapter）的定义如下：将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类能一起工作。适配器模式分为类结构型模式和对象结构型模式两种，前者类之间的耦合度比后者高，且要求程序员了解现有组件库中的相关组件的内部结构，所以应用相对较少些。

## 工作原理

1. 适配器模式：将一个类的接口转换成另一种接口.让原本接口不兼容的类可以兼容；
2. 从用户的角度看不到被适配者，是解耦的；
3. 用户调用适配器转化出来的目标接口方法，适配器再调用被适配者的相关接口方法；
4. 用户收到反馈结果，感觉只是和目标接口交互

## 模式的结构

适配器模式（Adapter）包含以下主要角色。

1. 目标（Target）接口：当前系统业务所**期待**的接口，它可以是**抽象类或接口**。
2. 适配者（Adaptee）类：它是被访问和适配的现存组件库中的组件接口。
3. 适配器（Adapter）类：它是一个转换器，通过**继承或引用适配者的对象**，把适配者接口转换成目标接口，让客户按目标接口的格式访问适配者。

### 类适配器结构

![1609227233432](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131348885.png)

类适配器，使用过继承和实现新接口实现适配功能；

### 对象适配器结构

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131348450.png)

对象适配器是通过持有待适配对象的引用实现适配功能；

## 类适配器

### 介绍

- 基本介绍：Adapter 类，通过继承 src 类，实现 dst  类接口，完成 src->dst 的适配。
- 类适配器模式可采用多重继承方式实现，如 C++可定义一个适配器类来同时继承当前系统的业务接口和现有组件库中已经存在的组件接口；Java不支持多继承，但可以定义一个适配器类来实现当前系统的业务接口，同时又继承现有组件库中已经存在的组件。

### 类适配器实现

以生活中充电器的例子来讲解适配器，充电器本身相当于Adapter，220V交流电相当于 src (即被适配者)，我们的目 dst(即 目标)是 5V 直流电；

**类图分析**

![1609217588981](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131348248.png)

### 定义适配者（Adaptee）

```java
/*被适配的类*/
public class Voltage220v {

    /*定义适配者，在系统中是已经存在的类 被适配者*/
    public int output220V(){
        int src=220;
        System.out.println("输出电压："+src);
        return src;
    }
}
```

### 定义Target接口

target是系统希望的输出接口；

```java
/*适配器接口*/
public interface Ivoltage5V {
    public int output5v();
}
```

### 定义适配者

适配者相当于一个转换器，起到转换作用;

```java
/*是陪着通过继承待适配者，实现接口的方式做适配*/
public class ViltageAdapter extends Voltage220v implements Ivoltage5V{
    @Override
    public int output5v() {
        //        获取220v电压
        int srcV=output220V();
//        处理电压
        int distV=srcV/44;
        return distV;
    }
}
```

在java中类适配一般是通过继承已存在类并且实现新target接口实现适配转换；

### 客户端

```java
public class Phone {
    //    充电的方法
    public void charging(Ivoltage5V ivoltage5V){
        if(ivoltage5V.output5v() == 5){
            System.out.println("电压是5v，可以充电");
        }else {
            System.out.println("电压不是5v，不可以充电");
        }
    }
}

//客户端
public class ClassAdapter {

    public static void main(String[] args) {
        Phone p=new Phone();
        p.charging(new ViltageAdapter());
    }
}
```

**注意事项**

1. Java 是单继承机制，所以类适配器需要**继承** src 类这一点算是一个缺点, 因为这要求 dst 必须是接口，有一定局限性;继承关系会增强耦合度。
2. src 类的方法在 Adapter 中都会暴露出来，也增加了使用的成本。
3. 由于其继承了 src 类，所以它可以根据需求重写 src 类的方法，使得 Adapter 的灵活性增强了。

## 对象适配器

### 设计实现

**介绍**

1. 基本思路和类的适配器模式相同，只是将 Adapter 类作修改，不是继承 src 类，而是持有 src 类的实例，以

   解决兼容性的问题。 即：持有 src 类，实现 dst  类接口，完成 src->dst 的适配，继承会增加类之间的耦合度。

2. 根据“合成复用原则”，在系统中尽量使用关联关系（聚合）来替代继承关系。

3. 对象适配器模式是适配器模式常用的一种

**案例演示**

以生活中充电器的例子来讲解适配器，充电器本身相当于Adapter，220V交流电相当于 src (即被适配者)，我

们的目 dst(即目标)是 5V 直流电，使用对象适配器模式完成。

**类图实现**

![1609218794598](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131347847.png)

### 定义适配者（Adaptee）

```java
//被适配的类
class Voltage220v{

    public int output220V(){
        int src=220;
        System.out.println("输出电压："+src);
        return src;
    }
}
```

### 定义Target接口

```java
interface Ivoltage5V{
    public int output5v();
}
```

### 定义对象适配器

```java
//对象适配器
class ObjectAdapter implements Ivoltage5V{
//    体现出关联关系中的聚合关系
    private Voltage220v v;

    public ObjectAdapter(Voltage220v v) {
        this.v = v;
    }

    @Override
    public int output5v() {
        int dst=0;
        if(null != v){
//            获取220v的电压
            int src=v.output220V();
            System.out.println("使用对象适配器适配电压:"+src);
            dst=src/44;
            System.out.println("适配后的电压:"+dst);
        }

        return dst;
    }
}
```

注意类适配器和对象适配器的区别，类适配器是通过继承的方式实现适配功能；

对象适配器是通过持有适配者对象引用实现适配功能；

### 定义客户端

```java
public class ClassAdapter {

    public static void main(String[] args) {
        Phone p=new Phone();
//        原来是继承关系，所以不需要传入参数，但是现在是聚合关系，需要传入待适配的对象
        p.charging(new ObjectAdapter(new Voltage220v()));

    }
}

class Phone{
//    充电的方法
    public void charging(Ivoltage5V ivoltage5V){
        if(ivoltage5V.output5v() == 5){
            System.out.println("电压是5v，可以充电");
        }else {
            System.out.println("电压不是5v，不可以充电");
        }
    }
}
```

**注意事项**

1. 对象适配器和类适配器其实算是同一种思想，只不过实现方式不同。
2. 根据合成复用原则，使用组合替代继承， 所以它解决了类适配器必须继承 src 的局限性问题，也不再要求 dst必须是接口。
3. 使用成本更低，更灵活。

## 接口适配器模式

比如我们有一个接口适配器，其中有很多的方法，但是我们不需要其中的所有方法，那么此时我们就可以写一个抽象类去实现接口中的方法，把接口中的方法默认实现，然后我们使用匿名对象，使用的时候可以只实现抽象类中的某一个方法。

**主要适用于需要被适配的接口中，只有用到个别接口，也就是说不需要实现它的全部接口。通过一个中间抽象类或接口实现。**

### 定义适配者接口

```java
//接口
interface InterAdapter
{
    public void method01();
    public void method02();
    public void method03();
    public void method04();
    public void method05();
}
```

适配者接口中通常包含多个方法；

### 定义适配器

```java
abstract class AbsAdapter implements InterAdapter{
//    实现接口中的全部方法，都是默认的实现
    @Override
    public void method01() {

    }

    @Override
    public void method02() {

    }

    @Override
    public void method03() {

    }

    @Override
    public void method04() {

    }

    @Override
    public void method05() {

    }
}
```

适配器是一个抽象类，实现接口中的所有方法；

### 定义客户端

```java
public class InterfaceAdapter {
    public static void main(String[] args) {
//        匿名对象实现具体方法
        AbsAdapter absAdapter = new AbsAdapter() {
            @Override
            public void method02() {
                System.out.println("具体实现method02()方法");
            }
        };
        absAdapter.method02();
    }
}

```

子类也可以去实现抽象类，然后重写具体的方法，这样不同的子类就拥有不同的功能。

## 适配器模式的注意细节

1. 三种命名方式，是根据 src 是以怎样的形式给到 Adapter（在 Adapter 里的形式）来命名的。
2. 类适配器：以类给到，在 Adapter 里，就是将 src 当做类，继承；
  3. 对象适配器：以对象给到，在 Adapter 里，将 src 作为一个对象；
  4. 持有接口适配器：以接口给到，在 Adapter 里，将 src 作为一个接口，实现；
5. Adapter 模式最大的作用还是将原本不兼容的接口融合在一起工作。
6. 实际开发中，实现起来不拘泥于我们讲解的三种经典形式

## 优缺点

### 优点

- 客户端通过适配器可以透明地调用目标接口。
- 复用了现存的类，程序员不需要修改原有代码而重用现有的适配者类。
- 将目标类和适配者类解耦，解决了目标类和适配者类接口不一致的问题。
- 在很多业务场景中符合开闭原则。

### 缺点

- 适配器编写过程需要结合业务场景全面考虑，可能会增加系统的复杂性。
- 增加代码阅读难度，降低代码可读性，过多使用适配器会使系统代码变得凌乱。

### 应用场景

适配器模式（Adapter）通常适用于以下场景。

- 以前开发的系统存在满足新系统功能需求的类，但其接口同新系统的接口不一致。
- 使用第三方提供的组件，但组件接口定义和自己要求的接口定义不同。

## 不同类型适配器实现

1. 类适配模式：需要实现的目标功能抽象成接口方法，适配器中通过继承获取源类方法，进行适配来实现目标功能

2. 对象适配模式：需要实现的目标功能抽象成接口方法，适配器中通过构造器获取源类方法，进行适配来实现目标功能，同时也可以重载源类方法

3. 接口适配模式：所有的待实现功能添加到接口当中，同时用抽象类去空实现接口中的功能，具体的实现交给具体的功能适配器继承实现，该功能适配器的构造方法中传入源类对象，然后重写父类对应功能方法。