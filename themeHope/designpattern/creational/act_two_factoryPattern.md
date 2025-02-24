---
# 这是文章的标题
title: 2、工厂设计模式
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
  - 工厂模式
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

- [1、工厂模式介绍](#1工厂模式介绍)
  - [1.1、需求](#11需求)
  - [1.2、传统方式解决](#12传统方式解决)
  - [1.3、简单工厂介绍](#13简单工厂介绍)
  - [1.4、工厂方法模式](#14工厂方法模式)
      - [工厂方法介绍](#工厂方法介绍)
  - [1.5、抽象工厂模式](#15抽象工厂模式)
    - [1.5.1、抽象工厂类图](#151抽象工厂类图)
    - [1.5.2、抽象工厂实现披萨创建](#152抽象工厂实现披萨创建)
- [小结](#小结)

<!-- /TOC -->

# 1、工厂模式介绍

工厂模式的作用：**实现创建者和调用者的分离**。

本质：

- **实例化对象不使用new，用工厂方法代替**
- **将选择实现类，创建对象统一管理和控制。从而将调用者跟我们的实现类解耦**

**满足OOP七大原则中的三个：**

- **开闭原则**： 一个软件的实体应当对扩展开放，对修改关闭
- **依赖倒转原则**： 要针对接口编程，不要针对实现编程
- **迪米特法则：只与你直接的朋友通信，而避免和陌生人通信**

## 1.1、需求

看一个披萨的项目：要便于披萨种类的扩展，要便于维护

1. 披萨的种类很多(比如 GreekPizz、CheesePizz 等)
2. 披萨的制作有 prepare，bake, cut, box等步骤。
3. 完成披萨店订购功能。

## 1.2、传统方式解决

传统解决方式定义一个抽象的pizza类，然后使各种披萨都继承与抽象披萨类，实现抽象类中的抽象方法即可。额外写一个订购类，专门用来管理订购的各种披萨。

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131231718.png)

**代码说明**

```java
public class PizzaStore {
    public static void main(String[] args) throws IOException {
        new OrderPizza();

    }
}
class OrderPizza{
    public OrderPizza() throws IOException {
        Pizza pizza=null;
        String PizzaType;//订购披萨的类型
        do{
            PizzaType=getType();
            if(PizzaType.equals("CheesePizza")){
                pizza=new CheesePizza();
                pizza.setName("奶酪披萨");
            }else if(PizzaType.equals("GreekPizza")){
                pizza=new GreekPizza();
                pizza.setName("希腊披萨");
            }else {
                break;
            }
//            输出披萨制作过程
            pizza.prepare();
            pizza.bake();
            pizza.cut();
            pizza.boxing();

        }while (true);
    }

//    获取用户想订购披萨的种类
    public String  getType() throws IOException {
        BufferedReader b=new BufferedReader(new InputStreamReader(System.in));
        System.out.println("请输入你想订购的披萨种类:");
        String type=b.readLine();
        return type;
    }
}

abstract class Pizza{
    protected String name;

    public Pizza(){}

    public Pizza(String name) {
        this.name = name;
    }
//准备做pizza的原材料，因此做成抽象方法
    public abstract void prepare();

    public void bake(){
        System.out.println(name+"  baking ......");
    }

    public void cut(){
        System.out.println(name+"  cuting.......");
    }

    public void boxing(){
        System.out.println(name+"  boxing.....");
    }

    public void setName(String name) {
        this.name = name;
    }
}

class CheesePizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("给制作奶酪披萨准备原材料。。。。。");
    }
}

class GreekPizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("给制作希腊披萨准备原材料。。。。。");
    }
}
```

**优缺点分析**

1. 优点是比较好理解，简单易操作。
2. 缺点是违反了设计模式的 **ocp** 原则，即对扩展开放，对修改关闭。即当我们给类增加新功能的时候，尽量不修改代码，或者尽可能少修改代码.
3. 比如我们这时要新增加一个**Pizza**的种类(Pepper披萨)，我们需要做如下修改. 
   1. 新增加披萨类继承于Pizza类，实现具体pizza的制作 
   2. 而对于OrderPizza类，我们也需要进行修改，增加新增种类披萨的预定操作，如果有多个预定披萨的类，那么我们就要进行多处的修改，所以没有遵从ocp原则。

![img](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131231410.png)

**改进思路分析**

- 分析：修改代码可以接受，但是如果我们在其它的地方也有创建 Pizza 的代码，就意味着，也需要修改，而创建 Pizza的代码，往往有多处。
- 思路：把创建 **Pizza** 对象封装到一个类中，这样我们有新的 **Pizza** 种类时，只需要修改该类就可，其它有创建到 Pizza对象的代码就不需要修改了，所有创建对象的操作都封装到这个工厂类中.-> 简单工厂模式

## 1.3、简单工厂介绍

简单工厂模式是**属于创建型模式**，是工厂模式的一种。**简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例**。简单工厂模式是工厂模式家族中最简单实用的模式

简单工厂模式：定义了一个**创建对象的类**，由这个类来封装实例化对象的行为(代码).

在软件开发中，当我们会用到大量的创建某种、某类或者某批对象时，就会使用到工厂模式.

![简单工厂模式](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131231061.png)



| 组成（角色）                 | 关系                                   | 作用                                         |
| ---------------------------- | -------------------------------------- | -------------------------------------------- |
| 抽象产品（product）          | 具体产品的父类                         | 一般用来描述产品的公共接口                   |
| 具体产品（Concrete product） | 抽象产品的子类：工厂方法创建的目标产品 | 具体的产品实现                               |
| 工厂（Creator）              | 提供给外界的创建产品接口               | 根据传入的不同参数从而创建不同具体的产品实力 |

**使用步骤：**

- **创建**抽象产品类，用于定义具体产品的公共接口；
- **创建**具体产品类（继承抽象产品类） & 定义生产的具体产品;
- **创建**工厂类，通过创建静态方法根据传入不同参数从而创建不同具体产品类的实例;
- 外界通过调用工厂类的静态方法，传入不同参数从而创建不同具体产品类的实例;

简单工厂模式的设计方案: 定义一个可以实例化 Pizaa 对象的类SimpleFactory（工厂类，负责创建具体的产品），封装创建对象的代码。由SimpleFectory来维护我们需要创建的披萨种类，并且实例化。

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131213914.png)

**代码实现**

```java
public class PizzaStore {
    public static void main(String[] args) throws IOException {
//        使用简单工厂模式创建披萨
        new OrderPizzaFactory(new SimpleFactory("CheesePizza"));
    }
}

/**
 * @Description 制作pizza的简单工厂类
 * @Author bugcode.online
 * @Date 2024/5/17 12:30
 */
@Data
public class SimpleFactory {

//    pizza的种类
    private String pizzaType;

    public SimpleFactory(String pizzaType){
        this.pizzaType = pizzaType;
    }

    //    根据PizzaType，返回一个pizza的实例
    public Pizza createPizza(String PizzaType){
        Pizza pizza=null;
        if(PizzaType.equals("CheesePizza")){
            pizza=new CheesePizza();
            pizza.setName("奶酪披萨");
        }else if(PizzaType.equals("GreekPizza")){
            pizza=new GreekPizza();
            pizza.setName("希腊披萨");
        }
        return pizza;
    }
}

public class OrderPizzaFactory {
    //    定义一个简单工厂的实例
    SimpleFactory simpleFactory;
    //    具体产品的引用
    Pizza pizza = null;

    /**
     * 构造器方法
     *
     * @param simpleFactory 简单工厂对象
     * @throws IOException
     */
    public OrderPizzaFactory(SimpleFactory simpleFactory) throws IOException {
        setFactory(simpleFactory);
    }

    public void setFactory(SimpleFactory simpleFactory) throws IOException {
        String orderType = "";
        this.simpleFactory = simpleFactory;

//            获取具体的pizza种类，然后根据类型制作不同的pizza
        orderType = simpleFactory.getPizzaType();
        pizza = this.simpleFactory.createPizza(orderType);
        if (pizza != null) {
            pizza.prepare();
            pizza.bake();
            pizza.cut();
            pizza.boxing();
        } else {
            System.out.println("订购披萨失败");
        }
    }
}

class GreekPizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("给制作希腊披萨准备原材料。。。。。");
    }
}
```

对于使用SimpleFactory去维护具体创建的披萨的类型，如果我们再想添加一个pizza时，只需要修改SimpleFactory即可，不需要再去修改OrderPizza类，**因为真正实例化披萨的过程是在工厂方法中,根据传入的不同pizza类型创建不同的披萨，使用简单工厂方法扩展时候，我们只需要修改一处即可**。

简单工厂的缺点：

1. 违反开放-封闭原则（OCP）： 当需要新增一种产品时，需要修改工厂类的源代码来添加新的产品类型，这违反了开放-封闭原则。每次修改都会导致工厂类的变化，可能引发其他代码的修改和重新测试，增加了维护成本和风险，需要添加if-else判断进行添加具体的产品类型。

2. 单一职责原则问题： 简单工厂模式中的工厂类负责创建不同类型的产品，导致工厂类的职责不够单一，违反了单一职责原则。随着产品类型的增加，工厂类的代码逐渐变得臃肿，难以维护和理解。

3. 不易扩展： 如果需要新增一种产品类型，除了要修改工厂类的代码外，还可能需要修改客户端代码来传递正确的参数类型。这种做法不够灵活，难以应对产品类型的频繁变化。

4. 隐藏了产品的创建细节： 虽然简单工厂模式封装了对象的创建过程，但它也隐藏了产品的具体创建细节，导致客户端无法直接控制对象的创建过程，无法灵活地定制对象的创建方式。

综上所述，简单工厂模式虽然简单易懂，但在面对复杂的需求变化时，其不足之处会逐渐显现出来，可能不够灵活和可维护。因此，在某些情况下，可以考虑使用其他创建型设计模式，如工厂方法模式或抽象工厂模式，以更好地应对系统的变化和扩展



## 1.4、工厂方法模式

**看一个新的需求**

披萨项目新的需求：客户在点披萨时，可以点不同口味的披萨，比如北京的奶酪 pizza、北京的胡椒 pizza 或者是伦敦的奶酪 pizza、伦敦的胡椒 pizza。

**思路一**

使用简单工厂模式，创建不同的简单工厂类，比如 BJPizzaSimpleFactory、LDPizzaSimpleFactory 等等.从当前这个案例来说，也是可以的，但是考虑到项目的规模，以及软件的可维护性、可扩展性并不是特别好，如果我们有多个地方的披萨，那么我们创建的工厂也很多。

#### 工厂方法介绍

1. 工厂方法模式设计方案：将披萨项目的**实例化功能抽象成抽象方法**，在不同的口味点餐子类中具体实现。
2. 工厂方法模式：定义了一个创建对象的抽象方法，由子类决定要实例化的类。**工厂方法模式将对象的实例化推迟到子类**。

**工厂方法应用案例图解**

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131231127.png)

**代码实现**

```java
public class factoryMethod {
    public static void main(String[] args) throws IOException {
        new BJorderPizza();
    }
}

//LD工厂的实现 具体工厂实现
class LDorderPizza extends  OrderPizza{
    public LDorderPizza() throws IOException {
    }

    @Override
    public Pizza createPizza(String PizzaType) {
        Pizza pizza=null;
        if(PizzaType.equals("LDCheesePizza")){
            pizza=new LDCheesePizza();
        }else if(PizzaType.equals("LDGreekPizza")){
            pizza=new LDGreekPizza();
        }
        return pizza;
    }
}
//BJ工厂的实现
class BJorderPizza extends  OrderPizza{
    public BJorderPizza() throws IOException {
    }

    @Override
    public Pizza createPizza(String PizzaType) {
        Pizza pizza=null;
        if(PizzaType.equals("BJCheesePizza")){
            pizza=new BJCheesePizza();
        }else if(PizzaType.equals("BJGreekPizza")){
            pizza=new BJGreekPizza();
        }
        return pizza;
    }
}

// 抽象工厂类 预定披萨
abstract class OrderPizza{
//    定义一个抽象方法 createpizza()，让工厂自己去实现
    public abstract Pizza createPizza(String PizzaType);

    public OrderPizza() throws IOException {
        Pizza pizza = null;
        String PizzaType;//订购披萨的类型
        do {
            PizzaType = getType();
            pizza = createPizza(PizzaType);//抽象方法，需要子类实现
//            输出披萨制作过程
            pizza.prepare();
            pizza.bake();
            pizza.cut();
            pizza.boxing();

        } while (true);
    }

    //    获取用户想订购披萨的种类
    public String  getType() throws IOException {
        BufferedReader b=new BufferedReader(new InputStreamReader(System.in));
        System.out.println("请输入你想订购的披萨种类:");
        String type=b.readLine();
        return type;
    }
}
// 抽象产品
abstract class Pizza{
    protected String name;

    public Pizza(){}

    public Pizza(String name) {
        this.name = name;
    }
    //准备做pizza的原材料，因此做成抽象方法
    public abstract void prepare();

    public void bake(){
        System.out.println(name+"  baking ......");
    }

    public void cut(){
        System.out.println(name+"  cuting.......");
    }

    public void boxing(){
        System.out.println(name+"  boxing.....");
    }

    public void setName(String name) {
        this.name = name;
    }
}
// BJ具体产品实现
class BJCheesePizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("北京的BJCheesePizza");
    }
}
// LD具体产品的实现
class LDGreekPizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("伦敦的LDGreekPizza");
    }
}

class BJGreekPizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("北京的LDGreekPizza");
    }
}
class LDCheesePizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("伦敦的BJCheesePizza");
    }
}
```

1. 工厂模式相比简单工厂，抽象了工厂的接口，可以有多个具体工厂的实现类创建不同的具体产品。
2. 相较于简单工厂模式，工厂方法模式摒弃了在工厂类内部显式地运用条件判断来指向具体类的设计方式，转而只需通过新增相应的工厂类来轻松实现功能扩展，从而显著增强了我们代码的可扩展性和可维护性。然而，在面对大量类型需求时，可能会导致工厂类数量的增长与膨胀。

## 1.5、抽象工厂模式

**抽象工厂模式介绍**

1. 抽象工厂模式：定义了一个 **interface** 用于创建相关或有依赖关系的对象簇，而无需指明具体的类
2. 抽象工厂模式可以将**简单工厂模式和工厂方法模式**进行整合。
3. 从设计层面看，抽象工厂模式就是对简单工厂模式的改进(或者称为进一步的抽象)。
4. 将工厂抽象成两层，**AbsFactory(**抽象工厂) 和 具体实现的工厂子类。程序员可以根据创建对象类型使用对应的工厂子类。这样将单个的简单工厂类变成了工厂簇，更利于代码的维护和扩展。

### 1.5.1、抽象工厂类图

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131231497.png)

**抽象工厂模式包含以下几个核心角色：**

- 抽象工厂（Abstract Factory）：声明了一组用于创建产品对象的方法，每个方法对应一种产品类型。抽象工厂可以是**接口或抽象类**。
- 具体工厂（Concrete Factory）：实现了抽象工厂接口，负责创建具体产品对象的实例。
- 抽象产品（Abstract Product）：定义了一组产品对象的共同接口或抽象类，描述了产品对象的公共方法。
- 具体产品（Concrete Product）：实现了抽象产品接口，定义了具体产品的特定行为和属性。

抽象工厂模式通常涉及一族相关的产品，每个具体工厂类负责创建该族中的具体产品。客户端通过使用抽象工厂接口来创建产品对象，而不需要直接使用具体产品的实现类。

### 1.5.2、抽象工厂实现披萨创建

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202407131228611.png)AbsFactor:抽象的工厂类，定义createPizza()创建披萨的方法。BJFactory和LDFactory是具体的工厂，实现createPizza()方法创建具体的产品。

**代码说明**

```java
public class AbstractFactoryDemo {
    public static void main(String[] args) {
        new OrderPizza1(new BJorderPizza1());
    }
}

class OrderPizza1{

  AbstractFactory abstractFactory;
    
    public OrderPizza1(AbstractFactory abstractFactory)  {
        setFactory(abstractFactory);
    }
    
    private void setFactory(AbstractFactory abstractFactory)  {
        Pizza1 pizza1=null;
        String Pizza1Type="";
        this.abstractFactory=abstractFactory;
        do {
            Pizza1Type=getType();
            pizza1=abstractFactory.createPizza(Pizza1Type);
            if(pizza1 != null){
                //            输出披萨制作过程
                pizza1.prepare();
                pizza1.bake();
                pizza1.cut();
                pizza1.boxing();
            }else {
                System.out.println("披萨订购失败");
                break;
            }
        }while (true);

    }
    //    获取用户想订购披萨的种类
    public String  getType() {
        String type=" ";
      try {
          BufferedReader b=new BufferedReader(new InputStreamReader(System.in));
          System.out.println("请输入你想订购的披萨种类:");
         type=b.readLine();
      }catch (Exception e){
          e.printStackTrace();
      }
        return type;
    }
}

//定义抽象工厂
interface AbstractFactory{
//    让下面工厂的子类具体实现
    public Pizza1 createPizza(String PizzaType);

}

class LDorderPizza1 implements AbstractFactory{

    @Override
    public Pizza1 createPizza(String Pizza1Type) {
        System.out.println("使用抽象工厂模式");
        Pizza1 Pizza1=null;
        if(Pizza1Type.equals("LDCheesePizza1")){
            Pizza1=new LDCheesePizza1();
        }else if(Pizza1Type.equals("LDGreekPizza1")){
            Pizza1=new LDGreekPizza1();
        }
        return Pizza1;
    }
}

class BJorderPizza1 implements AbstractFactory{

    @Override
    public Pizza1 createPizza(String Pizza1Type) {
        System.out.println("使用抽象工厂模式");
        Pizza1 Pizza1=null;
        if(Pizza1Type.equals("BJCheesePizza1")){
            Pizza1=new BJCheesePizza1();
        }else if(Pizza1Type.equals("BJGreekPizza1")){
            Pizza1=new BJGreekPizza1();
        }
        return Pizza1;
    }
}

abstract class Pizza1{
    protected String name;

    public Pizza1(){}

    public Pizza1(String name) {
        this.name = name;
    }
    //准备做Pizza1的原材料，因此做成抽象方法
    public abstract void prepare();

    public void bake(){
        System.out.println(name+"  baking ......");
    }

    public void cut(){
        System.out.println(name+"  cuting.......");
    }

    public void boxing(){
        System.out.println(name+"  boxing.....");
    }

    public void setName(String name) {
        this.name = name;
    }
}

class BJCheesePizza1 extends Pizza1{

    @Override
    public void prepare() {
        System.out.println("北京的BJCheesePizza1");
    }
}

class LDGreekPizza1 extends Pizza1{

    @Override
    public void prepare() {
        System.out.println("伦敦的LDGreekPizza1");
    }
}

class BJGreekPizza1 extends Pizza1{

    @Override
    public void prepare() {
        System.out.println("北京的LDGreekPizza1");
    }
}
class LDCheesePizza1 extends Pizza1{

    @Override
    public void prepare() {
        System.out.println("伦敦的BJCheesePizza1");
    }
}
```

# 小结

- 简单工厂模式(静态工厂模式)
  - 虽然某种程度上不符合设计原则，但实际使用最多!

- 工厂方法模式 
  - 不修改已有类的前提下，通过增加新的工厂类实现扩展。

- 抽象工厂模式 
  - 不可以增加产品，可以增加产品族!

应用场景:
- JDK中Calendar的getlInstance方法
- JDBC中的Connection对象的获取
- Spring中IOC容器创建管理bean对象反射中Class对象的newInstance方法

简单工厂：只有一个工厂，新增具体产品，都需要修改工厂方法，即新增if-else判断，违反开放封闭原则。

工厂模式:工厂方法模式将对象的实例化推迟到子类,定义抽象工厂，每一类具体产品实现抽象工厂接口。