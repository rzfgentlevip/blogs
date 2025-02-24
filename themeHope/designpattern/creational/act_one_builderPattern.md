---
# 这是文章的标题
title: 1、建造者设计模式
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
  - 建造者
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

- [建造者模式](#建造者模式)
  - [建造者模式的基本介绍](#建造者模式的基本介绍)
  - [建造者模式类图](#建造者模式类图)
  - [建造者模式实现步骤](#建造者模式实现步骤)
  - [构件文档对象案例](#构件文档对象案例)
    - [创建具体的产品对象](#创建具体的产品对象)
    - [定义抽象建造者](#定义抽象建造者)
    - [定义具体的产品建造者](#定义具体的产品建造者)
    - [定义指挥者](#定义指挥者)
    - [客户端](#客户端)
  - [建造者模式在jdk源码中的分析](#建造者模式在jdk源码中的分析)
  - [建造者模式的注意细节](#建造者模式的注意细节)
  - [建造者模式的优缺点](#建造者模式的优缺点)
  - [建造者模式应用场景](#建造者模式应用场景)

<!-- /TOC -->


# 建造者模式

## 建造者模式的基本介绍

1. 建造者模式（**Builder Pattern**） 又叫**生成器模式**，是一种对象构建模式。**它可以将复杂对象的建造过程抽象出来（抽象类别）**，**使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象**。
2. 建造者模式 是一步一步创建一个复杂的对象，它允许用户只通过指定复杂对象的类型和内容就可以构建它们， 用户不需要知道内部的具体构建细节。
3. 建造者（Builder）模式的定义：**指将一个复杂对象的构造与它的表示分离，使同样的构建过程可以创建不同的表示**，这样的设计模式被称为建造者模式。它是将一个复杂的对象分解为多个简单的对象，然后一步一步构建而成。它将变与不变相分离，即产品的组成部分是不变的，但每一部分是可以灵活选择的。

## 建造者模式类图

![](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/design/202012/27/144135-911206.png)

建造者模式的基本角色：

1. Product（产品角色）： 最终要创建的对象，通常包含多个组成部分。
2. Builder（抽象建造者）： 创建一个 Product 对象的各个部件指定的 **接口/抽象类**，抽象出建造的流程，不用考虑细节问题。
3. ConcreteBuilder（具体建造者）： 实现Builder接口的类，提供构建产品的具体实现。它负责创建产品对象的各个部分，并记录产品各部分的构造过程。
4. Director（指挥者）： 构建一个使用 Builder 接口的对象。它主要是用于创建一个复杂的对象。它主要有两个作用，一是：隔离了客户与对象的生产过程，二是：负责控制产品对象的生产过程。
5. **客户端（Client）**：使用生成器模式的地方，它将指导者和具体生成器关联起来，以创建复杂对象。

## 建造者模式实现步骤

1. 定义产品类：创建一个包含多个组成部件的复杂对象。
2. 定义生成器接口：声明在所有类型生成器中通用的产品构造步骤。
3. 实现具体生成器：为创建一个特定的产品变体提供实现。
4. 定义指导者类：定义调用构建步骤的顺序来创建产品的方法。
5. 客户端代码：创建一个生成器对象，将其传递给指导者，然后初始化构造过程。最后，从生成器对象中获取最终结果。

## 构件文档对象案例

考虑一个案例，一个文档对象包括标题，正文，图像等内容，因此我们可以使用建造者模式来构件文档这个对象，因为文档对象包含多个部分；

### 创建具体的产品对象

```java
public class Document {

    /*文档对象包含的内容*/
    private String title;
    private String body;
    private List<String> images = new ArrayList<>();

    public void showDocument() {
        System.out.println("Document Title: " + title);
        System.out.println("Body: " + body);
        System.out.println("Images: " + String.join(", ", images));
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void addImage(String image) {
        images.add(image);
    }
}
```

创建一个文档对象，但是文档创建很复杂，包含标题，文档主题以及图片部分，因此我们封装整个文档对象，将文档对象作为产品；

### 定义抽象建造者

```java
/*定义抽象生成器，生成器中定义构件文档对象的方法和步骤*/
public interface DocumentBuilder {
    void buildTitle(String title);
    void buildBody(String body);
    void buildImage(String image);
    Document getDocument();
}
```

定义一个Builder建造者接口，接口中定义创建具体产品的方法和步骤；

### 定义具体的产品建造者

```java
/*定义具体的生成器*/
public class ConcreteDocumentBuilder implements DocumentBuilder{

    private Document document = new Document();

    @Override
    public void buildTitle(String title) {
        document.setTitle(title);
    }

    @Override
    public void buildBody(String body) {
        document.setBody(body);
    }

    @Override
    public void buildImage(String image) {
        document.addImage(image);
    }

    @Override
    public Document getDocument() {
        return document;
    }
}
```

具体产品建造者实现抽象建造者接口，主要实现建造的过程；

### 定义指挥者

```java
/*定义指挥者*/
public class Director {

    /*组合关系 包含文档Builder对象*/
    private DocumentBuilder builder;

    public Director(DocumentBuilder builder) {
        this.builder = builder;
    }

    /*构件一个文档对象*/
    public void builder(String title, String body, List<String> images) {
        builder.buildTitle(title);
        builder.buildBody(body);
        for (String image : images) {
            builder.buildImage(image);
        }
    }
}
```

指挥者是提供给客户端的一个接口用来构件复杂对象，指挥者里面包含一个builder方法，通过此方法就可以构件复杂的产品对象；

### 客户端

```java
public class Builder_test_API {

    public static void main(String[] args) {

        /*创建一个具体的文档构件器*/
        ConcreteDocumentBuilder builder = new ConcreteDocumentBuilder();
        Director director = new Director(builder);

        List<String> images = Arrays.asList("Image1", "Image2");
        /*构件文档*/
        director.builder("My Title", "This is the body.", images);

        /*获取文档对象*/
        Document document = builder.getDocument();
        document.showDocument();
    }
}
//结果
Document Title: My Title
Body: This is the body.
Images: Image1, Image2
```

在客户端中，可以看到，我们通过将具体的产品建造者注入到指挥者对象中，然后通过指挥者的builder方法构件文档产品对象，这样就可以将一个复杂对象的构造过程进行封装；

## 建造者模式在jdk源码中的分析

`java.lang.StringBuilder `中的建造者模式

**代码分析**

![1609049698383](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/design/202012/27/141501-413811.png)

**角色分析**

1. Appendable 接口定义了多个 append 方法(**抽象方法**), 即 Appendable 为抽象建造者, 定义了抽象方法
2. AbstractStringBuilder  实现了  Appendable  接口方法，这里的  AbstractStringBuilder 已经是**建造者**，只是不能实例化
3. StringBuilder **即充当了指挥者角色，同时充当了具体的建造者**，建造方法的实现是由 AbstractStringBuilder 完成 , 而 StringBuilder 继承了 AbstractStringBuilder

## 建造者模式的注意细节

1. 客户端(使用程序)不必知道产品内部组成的细节，将产品本身与产品的创建过程解耦，使得相同的创建过程可以创建不同的产品对象
2. 每一个具体建造者都相对独立，而与其他的具体建造者无关，因此可以很方便地替换具体建造者或增加新的具体建造者， 用户使用不同的具体建造者即可得到不同的产品对象
3. 可以更加精细地控制产品的创建过程 。将复杂产品的创建步骤分解在不同的方法中，使得创建过程更加清晰， 也更方便使用程序来控制创建过程
4. 增加新的具体建造者无须修改原有类库的代码，指挥者类针对抽象建造者类编程，系统扩展方便，符合“开闭原则”
5. 建造者模式所创建的产品一般具有较多的共同点，其组成部分相似，如果产品之间的差异性很大，则不适合使用建造者模式，因此其使用范围受到一定的限制。
6. 如果产品的内部变化复杂，可能会导致需要定义很多具体建造者类来实现这种变化，导致系统变得很庞大，因此在这种情况下，要考虑是否选择建造者模式.

**抽抽象工厂模式和建造者模式对比**

- 建造者模式更加注重方法的**调用顺序**，工厂模式注重**创建对象**。
- 创建对象的力度不同，**建造者模式创建复杂的对象，由各种复杂的部件组成，工厂模式创建出来的对象都一样**
- 关注重点不一样，工厂模式只需要把对象创建出来就可以了，而建造者模式不仅要创建出对象，还要知道对象由哪些部件组成。
- 建造者模式根据建造过程中的顺序不一样，最终对象部件组成也不一样。
- 抽象工厂模式实现对产品家族的创建，一个产品家族是这样的一系列产品：具有不同分类维度的产品组合，采用抽象工厂模式不需要关心构建过程，只关心什么产品由什么工厂生产即可。而建造者模式则是要求按照指定的蓝图建造产品，它的主要目的是通过组装零配件而产生一个新产品

**建造者（Builder）模式和工厂模式的关注点不同：建造者模式注重零部件的组装过程，而工厂方法模式更注重零部件的创建过程，但两者可以结合使用。**

## 建造者模式的优缺点

**优点**

1. 封装性好，构建和表示分离。
2. 扩展性好，各个具体的建造者相互独立，有利于系统的解耦。
3. 客户端不必知道产品内部组成的细节，建造者可以对创建过程逐步细化，而不对其它模块产生任何影响，便于控制细节风险。

 **其缺点如下：** 

1. 产品的组成部分必须相同，这限制了其使用范围。
2. 如果产品的内部变化复杂，如果产品内部发生变化，则建造者也要同步修改，后期维护成本较大。

## 建造者模式应用场景

- 建造者模式唯一区别于工厂模式的是**针对复杂对象的创建**。也就是说，如果创建简单对象，通常都是使用工厂模式进行创建，而如果创建复杂对象，就可以考虑使用建造者模式。
- 当需要创建的产品具备复杂创建过程时，可以抽取出共性创建过程，然后交由具体实现类自定义创建流程，使得同样的创建行为可以生产出不同的产品，分离了创建与表示，使创建产品的灵活性大大增加。
- 建造者模式主要适用于以下应用场景：
  - 相同的方法，不同的执行顺序，产生不同的结果。
  - 多个部件或零件，都可以装配到一个对象中，但是产生的结果又不相同。
  - 产品类非常复杂，或者产品类中不同的调用顺序产生不同的作用。
  - 初始化一个对象特别复杂，参数多，而且很多参数都具有默认值