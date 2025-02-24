---
# 这是文章的标题
title: 3、装饰器设计模式
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
  - 装饰器设计模式
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

- [装饰器设计模式](#装饰器设计模式)
  - [装饰器模式](#装饰器模式)
  - [星巴克咖啡订单项目（咖啡馆）](#星巴克咖啡订单项目咖啡馆)
    - [方案一](#方案一)
    - [方案二](#方案二)
  - [装饰器模式定义](#装饰器模式定义)
  - [装饰器模式原理](#装饰器模式原理)
  - [装饰器模式简单实现](#装饰器模式简单实现)
    - [抽象组件接口](#抽象组件接口)
    - [定义具体构件](#定义具体构件)
    - [定义抽象装饰器](#定义抽象装饰器)
    - [定义具体装饰器](#定义具体装饰器)
    - [客户端类](#客户端类)
  - [装饰器模式解决星巴克咖啡问题](#装饰器模式解决星巴克咖啡问题)
    - [类设计](#类设计)
    - [抽象接口类](#抽象接口类)
    - [具体咖啡类](#具体咖啡类)
    - [装饰器类](#装饰器类)
    - [具体装饰器](#具体装饰器)
    - [客户端](#客户端)
    - [装饰器在jdk源码中的分析](#装饰器在jdk源码中的分析)
    - [装饰器模式的优缺点](#装饰器模式的优缺点)
    - [装饰器模式的应用场景](#装饰器模式的应用场景)

<!-- /TOC -->

# 装饰器设计模式

## 装饰器模式

在软件开发过程中，有时想用一些现存的组件。这些组件可能只是完成了一些核心功能。但在不改变其结构的情况下，可以动态地扩展其功能。所有这些都可以釆用装饰模式来实现。

## 星巴克咖啡订单项目（咖啡馆）

- 咖啡种类/单品咖啡：Espresso(意大利浓咖啡)、ShortBlack、LongBlack(美式咖啡)、Decaf(无因咖啡)
- 调料：Milk、Soy(豆浆)、Chocolate
- 要求在扩展新的咖啡种类时，具有良好的扩展性、改动方便、维护方便
- 使用 OO 的来计算不同种类咖啡的费用:  客户可以点单品咖啡，也可以单品咖啡+调料组合。

### 方案一

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131428882.png)

**缺点**

1. Drink 是一个抽象类，表示饮料
2. des 就是对咖啡的描述, 比如咖啡的名字
3. cost() 方法就是计算费用，Drink 类中做成一个抽象方法.
4. Decaf 就是单品咖啡， 继承 Drink,  并实现 cost
5. Espress && Milk 就是单品咖啡+调料， 这个组合很多，代码量很大，扩展性不好。

问题：这样设计，会有很多类，当我们增加一个单品咖啡，或者一个新的调料，类的数量就会倍增，就会出现类爆炸

### 方案二

前面分析到方案 1 因为咖啡单品+调料组合会造成类的倍增，因此可以做改进，将调料内置到Drink 类，这样就不会造成类数量过多。从而提高项目的维护性(如图)

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131429044.png)

说明: milk,soy,chocolate 可以设计为 Boolean,表示是否要添加相应的调料.

## 装饰器模式定义

装饰（Decorator）模式的定义：指在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式，它属于对象结构型模式。

**说明**

1. 装饰者模式：动态的将新功能附加到对象上。在对象功能扩展方面，它比继承更有弹性，装饰者模式也体现了开闭原则**(ocp**)
2. 这里提到的动态的将新功能附加到对象和 ocp 原则，在后面的应用实例上会以代码的形式体现，

## 装饰器模式原理

通常情况下，扩展一个类的功能会使用继承方式来实现。但继承具有静态特征，耦合度高，并且随着扩展功能的增多，子类会很膨胀。

如果使用组合关系来创建一个包装对象（即装饰对象）来包裹真实对象，并在保持真实对象的类结构不变的前提下，为其提供额外的功能，这就是装饰模式的目标。

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131434313.png)

装饰模式主要包含以下角色。

1. 抽象构件（Component）角色：定义一个抽象接口以规范准备接收附加责任的对象。
2. 具体构件（ConcreteComponent）角色：实现抽象构件，通过装饰角色为其添加一些职责。
3. 抽象装饰（Decorator）角色：继承抽象构件，并包含具体构件的实例，可以通过其子类扩展具体构件的功能。
4. 具体装饰（ConcreteDecorator）角色：实现抽象装饰的相关方法，并给具体构件对象添加附加的责任。

**说明**

- 装饰者模式就像打包一个快递
  - 主体：比如：陶瓷、衣服 (Component)是被装饰者
  - 包装：比如：报纸填充、塑料泡沫、纸板、木板(Decorator)
- Component 主体：比如类似前面的 Drink
- ConcreteComponent 和 Decorator
  - ConcreteComponent：具体的主体， 比如前面的各个单品咖啡
- Decorator: 装饰者，比如各调料.

Component 与 ConcreteComponent 之间，如果 ConcreteComponent 类很多,还可以设计一个缓冲层，将共有的部分提取出来，抽象层一个类。

## 装饰器模式简单实现

### 抽象组件接口

```java
/*定义抽象构件角色*/
public interface Component {
    void operation();
}
```

### 定义具体构件

```java
/*定义具体构件*/
public class ConcreteComponent implements Component{
    @Override
    public void operation() {
        System.out.println("ConcreteComponent: Basic operation.");
    }
}
```

### 定义抽象装饰器

```java
public abstract class Decorator implements Component {

    /*持有组件引用*/
    protected Component component;

    public Decorator(Component component) {
        this.component = component;
    }

    @Override
    public void operation() {
        // 转发调用给被装饰的组件
        component.operation();
    }
}
```

### 定义具体装饰器

```java
public class ConcreteDecoratorA extends Decorator{
    public ConcreteDecoratorA(Component component) {
        super(component);
    }

    @Override
    public void operation() {
        super.operation(); // 调用原有组件的功能
        addedBehaviorA();  // 添加新的功能
    }

    // 新增的功能
    private void addedBehaviorA() {
        System.out.println("ConcreteDecoratorA: Added behavior A.");
    }
}

//定义具体装饰器B
public class ConcreteDecoratorB extends Decorator{
    public ConcreteDecoratorB(Component component) {
        super(component);
    }

    @Override
    public void operation() {
        super.operation(); // 调用原有组件的功能
        addedBehaviorB();  // 添加新的功能
    }

    // 新增的功能
    private void addedBehaviorB() {
        System.out.println("ConcreteDecoratorB: Added behavior B.");
    }
}
```

### 客户端类

```java
public class Decorator_test_API {

    public static void main(String[] args) {
        // 创建基础组件对象
        Component component = new ConcreteComponent();

        // 使用装饰器A装饰组件
        Component decoratorA = new ConcreteDecoratorA(component);

        // 使用装饰器B继续装饰
        Component decoratorB = new ConcreteDecoratorB(decoratorA);

        // 调用最终装饰后的对象
        decoratorB.operation();
    }
}
```



## 装饰器模式解决星巴克咖啡问题

### 类设计

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131432427.png)

### 抽象接口类

```java
abstract class Drink{
    public String desc;
    private float price=0.0f;
//    计算费用的抽象方法,子类去实现
    public abstract float cost();

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Drink{" +
                "desc='" + desc + '\'' +
                ", price=" + price +
                '}';
    }
}

//抽象出所有咖啡的共同点,作为缓冲层出现
class Coffee extends Drink{

    @Override
    public float cost() {
        //获取咖啡的单价
        return super.getPrice();
    }
}
```

### 具体咖啡类

```java
//具体的咖啡类
class Espresso extends Coffee{
    public Espresso(){
        setDesc("Espresso");
        setPrice(6.06f);
    }
}

class LongBlack extends Coffee{
    public LongBlack(){
        setDesc("LongBlack");
        setPrice(5.0f);
    }
}
class ShortBlack extends Coffee{
    public ShortBlack(){
        setDesc("ShortBlack");
        setPrice(4.0f);
    }
}

```

### 装饰器类

```java
//装饰器
class Decorator extends Drink{
    private Drink drink;
//这里体现的是组合关系
    public Decorator(Drink drink) {
        this.drink = drink;
    }
//起到装饰的作用，计算价格
    @Override
    public float cost() {
//        自己的价格加上单品咖啡的价格
        return super.getPrice()+drink.getPrice();
    }

    @Override
    public String getDesc() {
//        drink.getDesc()被装饰者的描述信息
        return super.getDesc()+"  "+super.getPrice()+"  "+drink.getDesc();
    }
}
```

### 具体装饰器

```java
//具体的调味品，作为装饰器出现
class Chocolate extends Decorator{

    public Chocolate(Drink drink) {
        super(drink);
//        设置具体调味品的信息
        setDesc("巧克力调味品");
        setPrice(3.0f);
    }
}

class Milk extends Decorator{

    public Milk(Drink drink) {
        super(drink);
//        设置具体调味品的信息
        setDesc("牛奶调味品");
        setPrice(2.0f);
    }
}
class Soy extends Decorator{

    public Soy(Drink drink) {
        super(drink);
//        设置具体调味品的信息
        setDesc("豆浆调味品");
        setPrice(1.0f);
    }
}
```

### 客户端

```java
public class DecoratorDemo {
    public static void main(String[] args) {
//        先点一份单品咖啡
        Drink longBlack = new LongBlack();
        System.out.println(longBlack.getDesc());
        System.out.println("longBlack cost:"+longBlack.cost());
        System.out.println("**********************");
//        添加一份牛奶
        longBlack=new Milk(longBlack);
        System.out.println(longBlack.getDesc());
        float a=longBlack.cost();
        System.out.println("longBlack cost:"+longBlack.cost());
        System.out.println("**********************");
//        添加一份巧克力
        longBlack=new Chocolate(longBlack);
        //System.out.println(longBlack.getDesc());
        float money=longBlack.cost();
        System.out.println("longBlack cost:"+longBlack.cost());

//        longBlack=new Chocolate(longBlack);
//        System.out.println(longBlack.getDesc());
//        System.out.println("longBlack cost:"+longBlack.cost());
    }
}



```

扩展很容易，如果想添加一种咖啡，只需要增加一个咖啡类继承`Coffee`类即可

```java
class Decaf extends Coffee{
    public Decaf(){
        setDesc("ShortBlack");
        setPrice(1.0f);
    }
}
```

### 装饰器在jdk源码中的分析

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131433197.png)

- InputStream就是抽象的类，类似于前面的Drink抽象类。是被装饰的对象
- FileInputStream是InputStream子类，也就是具体的咖啡类
- FilterInputStream也是InputStream子类，类似于Decorator，而BufferInputStream是FilterInputStream子类，也就是具体的修饰者。

```java
//说明
//1. InputStream  是抽象类,  类似我们前面讲的 Drink
//2. FileInputStream 是  InputStream  子类，类似我们前面的 DeCaf, LongBlack
//3. FilterInputStream  是   InputStream 子类：类似我们前面 的 Decorator 修饰者
//4. DataInputStream  是 FilterInputStream  子类，具体的修饰者，类似前面的 Milk, Soy 等
//5. FilterInputStream 类  有 protected volatile InputStream in;  即含被装饰者
//6. 分析得出在 jdk 的 io 体系中，就是使用装饰者模式
```

### 装饰器模式的优缺点

装饰（Decorator）模式的主要优点有：

- 装饰器是继承的有力补充，比继承灵活，在不改变原有对象的情况下，动态的给一个对象扩展功能，即插即用
- 通过使用不用装饰类及这些装饰类的排列组合，可以实现不同效果
- 装饰器模式完全遵守开闭原则

其主要缺点是：装饰模式会增加许多子类，过度使用会增加程序得复杂性

### 装饰器模式的应用场景

前面讲解了关于装饰模式的结构与特点，下面介绍其适用的应用场景，装饰模式通常在以下几种情况使用。

- 当需要给一个现有类添加附加职责，而又不能采用生成子类的方法进行扩充时。例如，该类被隐藏或者该类是终极类或者采用继承方式会产生大量的子类。
- 当需要通过对现有的一组基本功能进行排列组合而产生非常多的功能时，采用继承关系很难实现，而采用装饰模式却很好实现。
- 当对象的功能要求可以动态地添加，也可以再动态地撤销时。