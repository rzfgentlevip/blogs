---
# 这是文章的标题
title: 设计模式类图总览
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
  - 模板
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

- [1、类图总览](#1类图总览)
  - [一、创建型](#一创建型)
    - [1. Simple Factory Method（简单工厂方法）](#1-simple-factory-method简单工厂方法)
    - [2、Factory Method（工厂方法）](#2factory-method工厂方法)
    - [3. Abstract Factory（抽象工厂）](#3-abstract-factory抽象工厂)
    - [3. Builder（生成器模式）](#3-builder生成器模式)
    - [4. Prototype（原型模式）](#4-prototype原型模式)
    - [5. Singleton（单件模式）](#5-singleton单件模式)
  - [二、结构性](#二结构性)
    - [1. Adapter（适配器模式（类、对象））](#1-adapter适配器模式类对象)
    - [2. Bridge（桥连模式）](#2-bridge桥连模式)
    - [3. Composite（组合模式）](#3-composite组合模式)
    - [4. Decorator（装饰模式）](#4-decorator装饰模式)
    - [5. Facade（外观模式）](#5-facade外观模式)
    - [6. Flyweight（享元模式）](#6-flyweight享元模式)
    - [7. Proxy（代理模式）](#7-proxy代理模式)
  - [三、行为型](#三行为型)
    - [1. Interpreter（解释器模式）](#1-interpreter解释器模式)
    - [2. Template Method（模板方法）](#2-template-method模板方法)
    - [3. Chain of Responsibility（职责链模式）](#3-chain-of-responsibility职责链模式)
    - [4. Command（命令模式）](#4-command命令模式)
    - [5. Iterator（迭代模式）](#5-iterator迭代模式)
    - [6. Mediator（中介模式）](#6-mediator中介模式)
    - [7. Memento（备忘录模式）](#7-memento备忘录模式)
    - [8. Observer（观察者模式）](#8-observer观察者模式)
    - [9. State（状态模式）](#9-state状态模式)
    - [10. Strategy（策略模式）](#10-strategy策略模式)
    - [11. Visitor（访问者模式）](#11-visitor访问者模式)

<!-- /TOC -->

# 1、类图总览

## 一、创建型

### 1. Simple Factory Method（简单工厂方法）

定义：定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类。

类图：

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406111953482.png)

案例说明：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406201837277.png)

### 2、Factory Method（工厂方法）

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406201838833.png)

### 3. Abstract Factory（抽象工厂）

*定义：提供一个接口，用于创建相关或依赖对象的家族，而不需要明确指定具体类。*

*类图：*

![img](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.png)


### 3. Builder（生成器模式）

*定义：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E7%94%9F%E6%88%90%E5%99%A8%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

实例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211001742.png)

### 4. Prototype（原型模式）

*定义：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom: 150%;" />

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211009260.png)

### 5. Singleton（单件模式）

*定义：确保一个类只有一个实例，并提供全局访问点。*

*类图：*

![image-20240611195845945](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.png)

*代码：*

```java
public class Singleton
{
    private volatile static Singleton uniqueInstance;
    private static object singletonData = new Object();
    private Singleton()
    { }
    public static Singleton GetInstance()
    {
        if (uniqueInstance == null)
        {
            lock (singletonData)
            {
                if (uniqueInstance == null)
                {
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211011262.png)

## 二、结构性

### 1. Adapter（适配器模式（类、对象））

*定义：将一个类的接口转换成客户期望的另一个接口，适配器让原本接口不兼容的类可以合作无间。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E9%80%82%E9%85%8D%E5%99%A8.png" alt="img" style="zoom:150%;" />

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211014964.png)

### 2. Bridge（桥连模式）

定义：将抽象部分与它的实现部分分离，使它们都可以独立地变化。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E6%A1%A5%E6%8E%A5.png" alt="img" style="zoom:150%;" />

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211016194.png)

### 3. Composite（组合模式）

定义：将对象组合成树形结构以表示“部分-整体”的层次结构。Composite使得用户对单个对象和组合对象的使用具有一致性。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E7%BB%84%E5%90%88%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211018285.png)

### 4. Decorator（装饰模式）

定义：动态地给一个对象添加一些额外的职责。就增加功能来说，Decorator模式相比生成子类更加灵活。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E8%A3%85%E9%A5%B0%E5%99%A8.png" alt="img" style="zoom:150%;" />

案例
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211016983.png)

### 5. Facade（外观模式）

*定义：为子系统中的一组接口提供一个一致的界面，Facade模式定义了一个高级接口，这个接口使得这一子系统更加容易使用。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E5%A4%96%E8%A7%82.png" alt="img" style="zoom:150%;" />

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211017371.png)

### 6. Flyweight（享元模式）

定义：运用共享技术有效地支持大量细粒度的对象。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E4%BA%AB%E5%85%83%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211019356.png)

### 7. Proxy（代理模式）

定义：为其他对象提供一种代理以控制对这个对象的访问。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

案例：
![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202406211012682.png)

## 三、行为型

### 1. Interpreter（解释器模式）

定义：给定一个语言，定义它的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E8%A7%A3%E9%87%8A%E5%99%A8%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 2. Template Method（模板方法）

*定义：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。TemplateMethod使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E6%A8%A1%E6%9D%BF%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 3. Chain of Responsibility（职责链模式）

*定义：**使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E8%81%8C%E8%B4%A3%E9%93%BE%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 4. Command（命令模式）

定义：将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 5. Iterator（迭代模式）

定义：提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E8%BF%AD%E4%BB%A3%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 6. Mediator（中介模式）

定义：用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显示地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 7. Memento（备忘录模式）

定义：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。



*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E5%A4%87%E5%BF%98%E5%BD%95%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 8. Observer（观察者模式）

定义：定义对象间的一种一对多的依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都得到通知并被自动更新。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 9. State（状态模式）

定义：允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E7%8A%B6%E6%80%81%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 10. Strategy（策略模式）

*定义：定义一系列的算法，把它们一个个封装起来，并且使它们可互相替换。本模式使得算法可独立于使用它的客户而变化。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />

### 11. Visitor（访问者模式）

*定义：表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的前提下定义作用于这些元素的新操作。*

*类图：*

<img src="https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/%E8%AE%BF%E9%97%AE%E8%80%85%E6%A8%A1%E5%BC%8F.png" alt="img" style="zoom:150%;" />




