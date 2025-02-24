---
# 这是文章的标题
title: 4、原型模式
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 4
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

- [原型模式](#原型模式)
  - [原型模式介绍](#原型模式介绍)
  - [原型模式类图说明](#原型模式类图说明)
  - [浅拷贝](#浅拷贝)
  - [深拷贝](#深拷贝)
  - [原型模式实现邮件复制](#原型模式实现邮件复制)
    - [浅拷贝](#浅拷贝-1)
      - [克隆对象实现](#克隆对象实现)
      - [附件对象](#附件对象)
      - [客户端克隆](#客户端克隆)
    - [深拷贝](#深拷贝-1)
      - [附件类 Attachment](#附件类-attachment)
      - [具体原型类Email(邮件类)](#具体原型类email邮件类)
      - [客户端](#客户端)
  - [原型模型优缺点](#原型模型优缺点)
    - [优点](#优点)
    - [缺点](#缺点)
  - [原型模型应用场景](#原型模型应用场景)

<!-- /TOC -->

# 原型模式

> Java 中 Object 类是所有类的根类，Object 类提供了一个 clone()方法，该方法可以将一个 Java 对象复制一份，但是需要实现 clone 的 Java 类必须要实现一个接口 Cloneable，该接口表示该类能够复制且具有复制的能力  =>原型模式

## 原型模式介绍

原型（Prototype）模式的定义如下：用一个已经创建的实例作为原型，通过复制该原型对象来创建一个和原型相同或相似的新对象。在这里，原型实例指定了要创建的对象的种类。用这种方式创建对象非常高效，根**本无须知道对象创建的细节。**

原型模式（Prototype Pattern）是用于创建**重复**的对象，同时又能保证性能。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

在软件系统中,有时候需要多次创建某一类型的对象，为了简化创建过程,可以只创建一个对象,然后再通过克隆的方式复制出多个相同的对象,这就是原型模式的设计思想。

原型模式的基本工作原理是通过将一个原型对象传给那个要发动创建的对象,这个要发动创建的对象通过请求原型对象复制原型自己来实现创建过程。

**总的来说分三点：**

1. 原型模式(Prototype 模式)是指：用原型实例指定创建对象的种类，并且通过拷贝这些原型，创建新的对象
2. 原型模式是一种创建型设计模式，允许一个对象再创建另外一个可定制的对象，无需知道如何创建的细节
3. 工作原理是:通过将一个原型对象传给那个要发动创建的对象，这个要发动创建的对象通过请求原型对象拷贝它们自己来实施创建，即 对象**.clone**()
4. **默认的克隆方法会对字符串和基本数据类型进行拷贝**

## 原型模式类图说明

![1608791575540](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/design/202012/24/143257-798291.png)

1. Prototype :抽象原型类是定义具有克隆自己的方法的接口,是所有具体原型类的公共父类,可以是抽象类,也可以是接口。
2. ConcretePrototype:具体原型类实现具体的克隆方法,在克隆方法中返回自己的一个克隆对象。
3. Client: 客户类让一个原型克隆自身,从而创建一个新的对象。在客户类中只需要直接实例化或通过工厂方法等方式创建一个对象,再通过调用该对象的克隆方法复制得到多个相同的对象。

> Java 中的 Object 类提供了浅克隆的 clone() 方法，具体原型类只要实现 Cloneable 接口就可实现对象的浅克隆，这里的 Cloneable 接口就是抽象原型类。

原型模式的拷贝有深拷贝和浅拷贝之分，下面详细介绍：

## 浅拷贝

1. 对于数据类型是基本数据类型的成员变量，浅拷贝会直接进行值传递，也就是将该属性值复制一份给新的对象。
2. 对于数据类型是引用数据类型的成员变量，比如说成员变量是某个数组、某个类的对象等，那么浅拷贝会进行**引用传递**，也就是只是将该成员变量的引用值（内存地址）复制一份给新的对象。因为实际上两个对象的该成员变量都指向同一个实例。在这种情况下，在一个对象中修改该成员变量会影响到另一个对象的该成员变量值
3. 前面我们克隆羊就是浅拷贝
4. 浅拷贝是使用默认的 clone()方法来实现

```java
sheep = (Sheep) super.clone();
```

浅拷贝示意图：

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20241223190134828.png)

## 深拷贝

1. 复制对象的所有基本数据类型的成员变量值
2. 为所有引用数据类型的成员变量申请存储空间，并复制每个引用数据类型成员变量所引用的对象，直到该对象可达的所有对象。也就是说，对象进行深拷贝要对整个对象**(**包括对象的引用类型**)**进行拷贝
3. 深拷贝实现方式 1：**重写 clone 方法来实现深拷贝**
4. 深拷贝实现方式 2：**通过对象序列化实现深拷贝(推荐)**

**深拷贝示意图**

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20241223190228080.png)

## 原型模式实现邮件复制

抽象原型类Object（无需创建），Object作为抽象原型类,在Java语言中,所有的类都是Object的子类,在Object 中提供了克隆方法clone(),用于创建一个原型对象,其 clone()方法具体实现由JVM完成,用户在使用时无须关心。

### 浅拷贝

#### 克隆对象实现

Email类是具体原型类,也是Object类的子类。在Java语言中,只有实现了Cloneable接口的类才能够使用clone()方法来进行复制，因此Email类实现了Cloneable接口。在Email类中覆盖了Object的clone()方法,通过直接或者间接调用Object的clone()方法返回一个克隆的原型对象。在Email类中定义了一个成员对象attachment,其类型为Attachment。

```java
/*邮件对象需要实现克隆接口*/
public class Email implements Cloneable{
    /*附件对象引用*/
    private Attachment attachment=null;

    /*邮件构造方法*/
    public Email(){
        this.attachment=new Attachment();
    }

    @Override
    public Object clone(){
        Email clone =null;
        try {
            clone=(Email) super.clone();
        }catch (CloneNotSupportedException e){
            System.out.println("Clone failure!");
        }
        return clone;
    }

    /*获取附件防范*/
    public Attachment getAttachment(){
        return this.attachment;
    }

    /*展示邮件方法*/
    public void display(){
        System.out.println("查看邮件");
    }
}
```

Email是被克隆的对象，实现Cloneable中的clone方法，但是此方法是浅克隆；Email中持有引用附件Attachment对象，浅克隆此对象不会被重新创建，而是公用一个附件对象；

#### 附件对象

为了更好地说明浅克隆和深克隆的区别,在本实例中引入了附件类Attachment,邮件类Email与附件类是组合关联关系,在邮件类中定义一个附件类对象,作为其成员对象。

```java
public class Attachment {

    /*附件类 和邮件对象是组合关系*/
    public void download(){
        System.out.println("下载附件");
    }
}
```

#### 客户端克隆

```java
public class Prototype_clone_test_API {

    public static void main(String[] args) {

        /*创建邮件引用*/
        Email email,copyEmail;

        email = new Email();

        /*克隆邮件*/
        copyEmail = (Email) email.clone();

        /*判断邮件是否克隆*/
        System.out.println("email == copyEmail :"+String.valueOf(email==copyEmail));

        /*判断邮件中的附件是否克隆*/
        System.out.println("email.getAttachment() == copyEmail.getAttachment():"+String.valueOf(email.getAttachment() == copyEmail.getAttachment()));
    }
}
//执行结果
email == copyEmail :false
email.getAttachment() == copyEmail.getAttachment():true
```

从结果可以看出，email被重新创建，但是email中的引用对象并没有被重新创建，而是公用一个附件对象；

### 深拷贝

#### 附件类 Attachment

作为Email类的成员对象,在深克隆中,Attachment类型的对象也将被写入流中,因此Attachment类也需要实现Serializable接口。

```java
public class AttachmentDeep implements Serializable {
    public void download(){
        System.out.println("下载附件");
    }
}
```

#### 具体原型类Email(邮件类)

Email作为具体原型类,由于实现的是深克隆,无须使用Object的  clone()方法,因此无须实现Cloneable接口;可以通过序列化的方式实现深克隆(代码中粗体部分),由于要将Email类型的对象写入流中,因此Email类需要实现Serializable接口。

```java
public class EmailDeep implements Serializable {
    private AttachmentDeep attachment=null;

    public EmailDeep(){
        this.attachment=new AttachmentDeep();
    }

    public Object deepClone() throws IOException,ClassNotFoundException, OptionalDataException {
        //将对象写入流中
        ByteArrayOutputStream bao=new ByteArrayOutputStream();
        ObjectOutputStream oos =new ObjectOutputStream(bao);
        oos.writeObject(this);

        //将对象从流中取出
        ByteArrayInputStream bis =new ByteArrayInputStream(bao.toByteArray());
        ObjectInputStream ois =new ObjectInputStream(bis);
        return (ois.readObject());
    }


    public AttachmentDeep getAttachment(){
        return this.attachment;
    }
    public void display(){
        System.out.println("查看邮件");
    }
}
```

#### 客户端

```java
public class Prototype_clone_deep_test_API {

    public static void main(String[] args) {

        EmailDeep email,copyEmail = null;
        email=new EmailDeep();

        try {
            copyEmail  = (EmailDeep) email.deepClone();
        }catch (Exception e){
            e.printStackTrace();
        }

        System.out.println("email==copyEmail?");
        System.out.println(email==copyEmail);

        System.out.println("email.getAttachment()==copyEmail.getAttachment()?");
        System.out.println(email.getAttachment()==copyEmail.getAttachment());
    }
}
//执行结果
email==copyEmail?
false
email.getAttachment()==copyEmail.getAttachment()?
false
```

从执行结果看，email对象地址法神变化，并且其内部的附件对象地址也变化，因此实现了深拷贝;

## 原型模型优缺点

### 优点

- Java自带的原型模式基于内存二进制流的复制，在性能上比直接 new 一个对象更加优良。
- 可以使用深克隆方式保存对象的状态，使用原型模式将对象复制一份，并将其状态保存起来，简化了创建对象的过程，以便在需要的时候使用（例如恢复到历史某一状态），可辅助实现撤销操作。

### 缺点

- 需要为每一个类都配置一个 clone 方法
- clone 方法位于类的内部，当对已有类进行改造的时候，需要修改代码，违背了开闭原则。
- 当实现深克隆时，需要编写较为复杂的代码，而且当对象之间存在多重嵌套引用时，为了实现深克隆，每一层对象对应的类都必须支持深克隆，实现起来会比较麻烦。因此，深克隆、浅克隆需要运用得当。

## 原型模型应用场景

原型模式通常适用于以下场景。 

- 对象之间相同或相似，即只是个别的几个属性不同的时候。
- 创建对象成本较大，例如初始化时间长，占用CPU太多，或者占用网络资源太多等，需要优化资源。
- 创建一个对象需要繁琐的数据准备或访问权限等，需要提高性能或者提高安全性。
- 系统中大量使用该类对象，且各个调用者都需要给它的属性重新赋值。