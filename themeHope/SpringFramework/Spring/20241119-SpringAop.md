---
# 这是文章的标题
title: Spring Aop
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-11-19
# 一个页面可以有多个分类
category:
  - SPRING
  - JAVA
# 一个页面可以有多个标签
tag:
  - spring
  - java
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 分布式
# 你可以自定义版权信息
copyright: bugcode
---

# Spring Aop

> ioc中主要是**容器对对象的管理**，主要通过**注解和xml文件**方式进行装配。第三方的jar包通常不能使用注解的方式装配，因为里面大多是class文件，不能修改源码，所以通常使用xml文件的方式装配。 自己写的类可以使用注解+扫描的方式管理。

## **3.1、场景模拟**

### **3.1.1、声明接口**

声明计算器接口Calculator，包含加减乘除的抽象方法

```java
 public interface Calculator {
     int add(int i, int j);
     int sub(int i, int j);
     int mul(int i, int j);
     int div(int i, int j);
 }
```

### **3.1.2、创建实现类**

```java
 public class CalculatorPureImpl implements Calculator {
     @Override
     public int add(int i, int j) {
         int result = i + j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
     @Override
     public int sub(int i, int j) {
         int result = i - j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
     @Override
     public int mul(int i, int j) {
         int result = i * j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
     @Override
     public int div(int i, int j) {
         int result = i / j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
 }
```

### **3.1.3、创建带日志功能的实现类**

```java
 public class CalculatorLogImpl implements Calculator {
     @Override
     public int add(int i, int j) {
         System.out.println("[日志] add 方法开始了，参数是：" + i + "," + j);
         int result = i + j;
         System.out.println("方法内部 result = " + result);
         System.out.println("[日志] add 方法结束了，结果是：" + result);
         return result;
     }
     @Override
     public int sub(int i, int j) {
         System.out.println("[日志] sub 方法开始了，参数是：" + i + "," + j);
         int result = i - j;
         System.out.println("方法内部 result = " + result);
         System.out.println("[日志] sub 方法结束了，结果是：" + result);
         return result;
     }
     @Override
     public int mul(int i, int j) {
         System.out.println("[日志] mul 方法开始了，参数是：" + i + "," + j);
         int result = i * j;
         System.out.println("方法内部 result = " + result);
         System.out.println("[日志] mul 方法结束了，结果是：" + result);
         return result;
     }
     @Override
     public int div(int i, int j) {
         System.out.println("[日志] div 方法开始了，参数是：" + i + "," + j);
         int result = i / j;
         System.out.println("方法内部 result = " + result);
         System.out.println("[日志] div 方法结束了，结果是：" + result);
         return result;
     }
 }
```

### **3.1.4、提出问题**

### **①现有代码缺陷**

针对带日志功能的实现类，我们发现有如下缺陷：

- 对核心业务功能有干扰，导致程序员在开发核心业务功能时分散了精力，日志的输出和加法器减法器的计算混搅在一起。
- 附加功能分散在各个业务功能方法中，不利于统一维护

### **②解决思路**

解决这两个问题，核心就是：**解耦**。**我们需要把附加功能从业务功能代码中抽取出来**。

### **③困难**

解决问题的困难：要抽取的代码在方法内部，靠以前把子类中的重复代码抽取到父类的方式没法解决。所以需要引入新的技术。

## **3.2、代理模式**

### **3.2.1、概念**

### **①介绍**

二十三种设计模式中的一种，属于结构型模式。它的作用就是通过提供一个代理类，让我们在调用目标方法的时候，不再是直接对目标方法进行调用，而是通过代理类**间接**调用。让不属于目标方法核心逻辑的代码从目标方法中剥离出来——**解耦**。**调用目标方法时先调用代理对象的方法，减少对目标方法的调用和打扰，同时让附加功能能够集中在一起也有利于统一维护**。

使用代理后：

### **②生活中的代理**

- 广告商找大明星拍广告需要经过**经纪人**
- 合作伙伴找大老板谈合作要约见面时间需要经过**秘书**
- 房产**中介**是买卖双方的代理

### **③相关术语**

- 代理：将非核心逻辑剥离出来以后，封装这些非核心逻辑的类、对象、方法。
- 目标：被代理“套用”了非核心逻辑代码的类、对象、方法。

### **3.2.2、静态代理**

创建静态代理类：

```java
 public class CalculatorStaticProxy implements Calculator {
     // 将被代理的目标对象声明为成员变量
     private Calculator target;
     public CalculatorStaticProxy(Calculator target) {
         this.target = target;
     }
     @Override
     public int add(int i, int j) {
         // 附加功能由代理类中的代理方法来实现
         System.out.println("[日志] add 方法开始了，参数是：" + i + "," + j);
         // 通过目标对象来实现核心业务逻辑
         int addResult = target.add(i, j);
         System.out.println("[日志] add 方法结束了，结果是：" + addResult);
         return addResult;
     }
 }
```

> 静态代理确实实现了解耦，但是由于代码都写死了，完全不具备任何的灵活性。就拿日志功能来
>
> 说，将来其他地方也需要附加日志，那还得再声明更多个静态代理类，那就产生了大量重复的代
>
> 码，日志功能还是分散的，没有统一管理。
>
> 提出进一步的需求：将日志功能集中到一个代理类中，将来有任何日志需求，都通过这一个代理
>
> 类来实现。这就需要使用动态代理技术了。

### **3.2.3、动态代理**

生产代理对象的工厂类：

```java
 public class ProxyFactory {
     private Object target;
     public ProxyFactory(Object target) {
         this.target = target;
     }
     public Object getProxy(){
         /**
          * newProxyInstance()：创建一个代理实例
          * 其中有三个参数：
          * 1、classLoader：加载动态生成的代理类的类加载器
          * 2、interfaces：目标对象实现的所有接口的class对象所组成的数组
          * 3、invocationHandler：设置代理对象实现目标对象方法的过程，即代理类中如何重写接口中的抽象方法
          */
         ClassLoader classLoader = target.getClass().getClassLoader();
         Class<?>[] interfaces = target.getClass().getInterfaces();
         InvocationHandler invocationHandler = new InvocationHandler() {
             @Override
             public Object invoke(Object proxy, Method method, Object[] args)
                 throws Throwable {
                 /**
                  * proxy：代理对象
                  * method：代理对象需要实现的方法，即其中需要重写的方法
                  * args：method所对应方法的参数
                  */
                 Object result = null;
                 try {
                     System.out.println("[动态代理][日志] "+method.getName()+"，参数："+ Arrays.toString(args));
                      result = method.invoke(target, args);
                      System.out.println("[动态代理][日志] "+method.getName()+"，结 果："+ result);
                  } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("[动态代理][日志] "+method.getName()+"，异常："+e.getMessage());
                   } finally {
                       System.out.println("[动态代理][日志] "+method.getName()+"，方法执行完毕");
                   }
                   return result;
                }
             };
             return Proxy.newProxyInstance(classLoader, interfaces,invocationHandler);
       }
 }
```

### **3.2.4、测试**

```java
 @Test
 public void testDynamicProxy(){
     ProxyFactory factory = new ProxyFactory(new CalculatorLogImpl());
     Calculator proxy = (Calculator) factory.getProxy();
     proxy.div(1,0);
     //proxy.div(1,1);
 }
```

> 动态代理有两种实现方式：
>
> 1. jdk动态代理，要求目标对象必须实现接口，最终实现的代理类和目标类实现相同的接口，代理类在com.sun.proxy包下。类名为$Proxy+数字
> 2. cglib动态代理，没有实现接口的时候使用cglib代理，最终生成的代理类会继承目标类，并且和目标类在相同的包下

## **3.3、AOP概念及相关术语**

### **3.3.1、概述**

AOP（Aspect Oriented Programming）是一种设计思想，是软件设计领域中的**面向切面编程**，它是面向对象编程的一种补充和完善，它以**通过预编译方式和运行期动态代理方式实现在不修改源代码的情况下给程序动态统一添加额外功能的一种技术**。

### **3.3.2、相关术语**

### **①横切关注点**

从每个方法中抽取出来的**同一类非核心业务**。在同一个项目中，我们可以使用多个横切关注点对相关方法进行多个不同方面的增强。

这个概念不是语法层面天然存在的，而是根据附加功能的逻辑上的需要：有十个附加功能，就有十个横切关注点。

**非核心业务代码在目标对象中叫做横切关注点，把他抽取出来放到切面类中，叫做通知方法**。

### **②通知**

每一个横切关注点上要做的事情都需要写一个方法来实现，这样的方法就叫通知方法。

- 前置通知：在被代理的目标方法**前**执行
- 返回通知：在被代理的目标方法**成功结束**后执行（**寿终正寝**）
- 异常通知：在被代理的目标方法**异常结束**后执行（**死于非命**）
- 后置通知：在被代理的目标方法**最终结束**后执行（**盖棺定论**）
- 环绕通知：使用try...catch...finally结构围绕**整个**被代理的目标方法，包括上面四种通知对应的所有位置

### **③切面**

切面就是来**封装横切关注点**的。一个横切关注点就是一个通知方法。封装横切关注点的类就叫做切面。

封装通知方法的类。

### **④目标**

被代理的目标对象。就是功能增强的对象，也就是要抽取非核心业务代码的对象。

### **⑤代理**

向目标对象应用通知之后创建的代理对象。

### **⑥连接点**

抽取横切关注点的位置。 这也是一个纯逻辑概念，不是语法定义的。

把方法排成一排，每一个横切位置看成x轴方向，把方法从上到下执行的顺序看成y轴，x轴和y轴的交叉点就是连接点。

### **⑦切入点**

定位连接点的方式。

每个类的方法中都包含多个连接点，所以连接点是类中客观存在的事物（从逻辑上来说）。

如果把连接点看作数据库中的记录，那么切入点就是查询记录的 SQL 语句。

Spring 的 AOP 技术可以**通过切入点定位到特定的连接点**。

切点通过 org.springframework.aop.Pointcut 接口进行描述，它使用类和方法作为连接点的查询条件。

### **3.3.3、作用**

- 简化代码：把方法中固定位置的重复的代码**抽取**出来，让被抽取的方法更专注于自己的核心功能，提高内聚性。
- 代码增强：把特定的功能封装到切面类中，看哪里有需要，就往上套，被**套用**了切面逻辑的方法就被切面给增强了。

## **3.4、基于注解的AOP**

### **3.4.1、技术说明**

- 动态代理（InvocationHandler）：JDK原生的实现方式，需要被代理的目标类必须实现接口。因为这个技术要求**代理对象和目标对象实现同样的接口**（兄弟两个拜把子模式）。
- cglib：通过**继承被代理的目标类**（认干爹模式）实现代理，所以不需要目标类实现接口。
- AspectJ：本质上是静态代理，**将代理逻辑“织入”被代理的目标类编译得到的字节码文件**，所以最终效果是动态的。weaver就是织入器。Spring只是借用了AspectJ中的注解。

### **3.4.2、准备工作**

### **①添加依赖**

在IOC所需依赖基础上再加入下面依赖即可：

```xml
 <!-- spring-aspects会帮我们传递过来aspectjweaver -->
 <dependency>
     <groupId>org.springframework</groupId>
     <artifactId>spring-aspects</artifactId>
     <version>5.3.1</version>
 </dependency>
```

### **②准备被代理的目标资源**

接口：

```java
 public interface Calculator {
     int add(int i, int j);
     int sub(int i, int j);
     int mul(int i, int j);
     int div(int i, int j);
 }
```

实现类：

```java
 @Component
 public class CalculatorPureImpl implements Calculator {
     @Override
     public int add(int i, int j) {
         int result = i + j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
     @Override
     public int sub(int i, int j) {
         int result = i - j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
     @Override
     public int mul(int i, int j) {
         int result = i * j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
     @Override
     public int div(int i, int j) {
         int result = i / j;
         System.out.println("方法内部 result = " + result);
         return result;
     }
 }
```

### **3.4.3、创建切面类并配置**

在切面中需要通过指定的**注解将方法标识为通知方法**:

- @Before：标识前置通知的注解，在目标方法执行之前执行
- 切入点表达式：设置在标识通知的注解的value属性中@Before("execution(* com.rzf.spring.aop.annotation.CalculatorImpl.*(..))")

获取连接点的信息:

- 在通知方法的参数位置，设置joinPoint类型的参数，就可以获取连接点所对应方法的信息

公共的切入点表达式:

- 重用切入点表达式：声明一个重用的切入点表达式，在使用的时候，直接写方法名即可
- @Pointcut("execution(* com.rzf.spring.aop.annotation.CalculatorImpl.*(..))")

```java
 // @Aspect表示这个类是一个切面类
 @Aspect
 // @Component注解保证这个切面类能够放入IOC容器
 @Component
 public class LogAspect {
     @Before("execution(public int com.atguigu.aop.annotation.CalculatorImpl.*(..))")
 public void beforeMethod(JoinPoint joinPoint){
   String methodName = joinPoint.getSignature().getName();
   String args = Arrays.toString(joinPoint.getArgs());
   System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
   }
     @After("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
   public void afterMethod(JoinPoint joinPoint){
     String methodName = joinPoint.getSignature().getName();
     System.out.println("Logger-->后置通知，方法名："+methodName);
   }
     @AfterReturning(value = "execution(*com.atguigu.aop.annotation.CalculatorImpl.*(..))", returning = "result")
   public void afterReturningMethod(JoinPoint joinPoint, Object result){
     String methodName = joinPoint.getSignature().getName();
     System.out.println("Logger-->返回通知，方法名："+methodName+"，结果："+result);
   }
     @AfterThrowing(value = "execution(*com.atguigu.aop.annotation.CalculatorImpl.*(..))", throwing = "ex")
   public void afterThrowingMethod(JoinPoint joinPoint, Throwable ex){
     String methodName = joinPoint.getSignature().getName();
     System.out.println("Logger-->异常通知，方法名："+methodName+"，异常："+ex);
   }
     @Around("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
   public Object aroundMethod(ProceedingJoinPoint joinPoint){
         String methodName = joinPoint.getSignature().getName();
     String args = Arrays.toString(joinPoint.getArgs());
     Object result = null;
         try {
             System.out.println("环绕通知-->目标对象方法执行之前");
             //目标对象（连接点）方法的执行
             result = joinPoint.proceed();
             System.out.println("环绕通知-->目标对象方法返回值之后");
     } catch (Throwable throwable) {
             throwable.printStackTrace();
             System.out.println("环绕通知-->目标对象方法出现异常时");
     } finally {
       System.out.println("环绕通知-->目标对象方法执行完毕");
     }
     return result;
   }
 }
```

在Spring的配置文件中配置：

```xml
    <!--
         基于注解的AOP的实现：
         1、将目标对象和切面交给IOC容器管理（注解+扫描）
         2、开启AspectJ的自动代理，为目标对象自动生成代理
         3、将切面类通过注解@Aspect标识
   -->
   <context:component-scan base-package="com.atguigu.aop.annotation">
 </context:component-scan>
   <aop:aspectj-autoproxy />
```

### **3.4.4、各种通知**

- 前置通知：使用@Before注解标识，在被代理的目标方法**前**执行
- 返回通知：使用@AfterReturning注解标识，在被代理的目标方法**成功结束**后执行（**寿终正寝**）
- 异常通知：使用@AfterThrowing注解标识，在被代理的目标方法**异常结束**后执行（**死于非命**）
- 后置通知：使用@After注解标识，在被代理的目标方法**最终结束**后执行（**盖棺定论**）
- 环绕通知：使用@Around注解标识，使用try...catch...finally结构围绕**整个**被代理的目标方法，包括上面四种通知对应的所有位置

> 各种通知的执行顺序：
>
> - Spring版本5.3.x以前：
    >   - 前置通知
>   - 目标操作
>   - 后置通知
>   - 返回通知或异常通知
> - Spring版本5.3.x以后：
    >   - 前置通知
>   - 目标操作
>   - 返回通知或异常通知
>   - 后置通知

### **3.4.5、切入点表达式语法**

### **①作用**

### **②语法细节**

- 用*号代替“权限修饰符”和“返回值”部分表示“权限修饰符”和“返回值”不限

- 在包名的部分，一个“.

  ”号只能代表包的层次结构中的一层，表示这一层是任意的。

    - *例如：*.Hello匹配com.Hello，不匹配com.atguigu.Hello

- 在包名的部分，使用“*..”表示包名任意、包的层次深度任意*

- *在类名的部分，类名部分整体用**号代替，表示类名任意

- 在类名的部分，可以使用

  号代替类名的一部分

    - *例如：*Service匹配所有名称以Service结尾的类或接口

- 在方法名部分，可以使用*号表示方法名任意*

- 在方法名部分，可以使用

  号代替方法名的一部分

    - 例如：*Operation匹配所有方法名以Operation结尾的方法

- 在方法参数列表部分，使用(..)表示参数列表任意

- 在方法参数列表部分，使用(int,..)表示参数列表以一个int类型的参数开头

- 在方法参数列表部分，基本数据类型和对应的包装类型是不一样的

    - 切入点表达式中使用 int 和实际方法中 Integer 是不匹配的

- 在方法返回值部分，如果想要明确指定一个返回值类型，那么必须同时写明权限修饰符

    - 例如：execution(public int *..\*Service.\*(.., int)) 正确*
    - *例如：execution(* int *..*Service.*(.., int)) 错误

### **3.4.6、重用切入点表达式**

### **①声明**

```java
 @Pointcut("execution(* com.atguigu.aop.annotation.*.*(..))")
 public void pointCut(){}
```

### **②在同一个切面中使用**

```java
 @Before("pointCut()")
 public void beforeMethod(JoinPoint joinPoint){
     String methodName = joinPoint.getSignature().getName();
     String args = Arrays.toString(joinPoint.getArgs());
     System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
 }
```

### **③在不同切面中使用**

```java
 @Before("com.atguigu.aop.CommonPointCut.pointCut()")
 public void beforeMethod(JoinPoint joinPoint){
     String methodName = joinPoint.getSignature().getName();
     String args = Arrays.toString(joinPoint.getArgs());
     System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
 }
```

### **3.4.7、获取通知的相关信息**

### **①获取连接点信息**

获取连接点信息可以在通知方法的参数位置设置JoinPoint类型的形参

```java
 @Before("execution(public int com.atguigu.aop.annotation.CalculatorImpl.*(..))")
 public void beforeMethod(JoinPoint joinPoint){
     //获取连接点的签名信息
     String methodName = joinPoint.getSignature().getName();
     //获取目标方法到的实参信息
     String args = Arrays.toString(joinPoint.getArgs());
     System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
 }
```

### **②获取目标方法的返回值**

@AfterReturning中的属性returning，用来将通知方法的某个形参，接收目标方法的返回值

```java
 @AfterReturning(value = "execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))", returning = "result")
     public void afterReturningMethod(JoinPoint joinPoint, Object result){
     String methodName = joinPoint.getSignature().getName();
     System.out.println("Logger-->返回通知，方法名："+methodName+"，结果："+result);
 }
```

### **③获取目标方法的异常**

@AfterThrowing中的属性throwing，用来将通知方法的某个形参，接收目标方法的异常

```java
 @AfterThrowing(value = "execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))", throwing = "ex")
     public void afterThrowingMethod(JoinPoint joinPoint, Throwable ex){
     String methodName = joinPoint.getSignature().getName();
     System.out.println("Logger-->异常通知，方法名："+methodName+"，异常："+ex);
 }
```

在切面中需要通过指定的注解将方法标识为通知方法

- @Before：标识前置通知的注解，在目标方法执行之前执行
- 切入点表达式：设置在标识通知的注解的value属性中@Before("execution(* com.rzf.spring.aop.annotation.CalculatorImpl.*(..))")
- @after:后置通知：在目标对象方法的finally子句中执行
- @AfterReturning：返回通知，在目标对象方法返回值之后执行，也可以获取连接点的信息
- @AfterThrowing:异常通知，在目标对象方法的catch子句中执行,一般打印日志信息

```java
 @Around("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
 public Object aroundMethod(ProceedingJoinPoint joinPoint){
     String methodName = joinPoint.getSignature().getName();
     String args = Arrays.toString(joinPoint.getArgs());
     Object result = null;
     try {
         System.out.println("环绕通知-->目标对象方法执行之前");
         //目标方法的执行，目标方法的返回值一定要返回给外界调用者
         result = joinPoint.proceed();
         System.out.println("环绕通知-->目标对象方法返回值之后");
     } catch (Throwable throwable) {
         throwable.printStackTrace();
         System.out.println("环绕通知-->目标对象方法出现异常时");
     } finally {
         System.out.println("环绕通知-->目标对象方法执行完毕");
     }
     return result;
 }
 
     @Around("pointCut()")
     public void aroundAdviceMethod(ProceedingJoinPoint joinPoint)  {
 
 //        表示目标对象方法的执行
         try {
             System.out.println("环绕通知：前置通知位置");
             这个对象的方法的返回值必须是目标对象的返回值
             环绕通知的方法一定要和目标对象方法的返回值一致
             Object res = joinPoint.proceed();
             System.out.println("环绕通知：返回通知位置");
         } catch (Throwable throwable) {
             throwable.printStackTrace();
             System.out.println("环绕通知：异常通知位置");
         }finally {
             System.out.println("环绕通知：后置通知位置");
         }
     }
 
```

### **3.4.8、环绕通知**

```java
 @Around("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
 public Object aroundMethod(ProceedingJoinPoint joinPoint){
     String methodName = joinPoint.getSignature().getName();
     String args = Arrays.toString(joinPoint.getArgs());
     Object result = null;
     try {
         System.out.println("前置通知");
         //目标方法的执行，目标方法的返回值一定要返回给外界调用者
         result = joinPoint.proceed();
         System.out.println("返回通知");
     } catch (Throwable throwable) {
         throwable.printStackTrace();
         System.out.println("环绕通知-->目标对象方法出现异常时");
     } finally {
         System.out.println("后置通知");
     }
     return result;
 }
```

### **3.4.9、切面的优先级**

相同目标方法上同时存在多个切面时，切面的优先级控制切面的**内外嵌套**顺序。

- 优先级高的切面：外面
- 优先级低的切面：里面

使用@Order注解可以控制切面的优先级：

- @Order(较小的数)：优先级高
- @Order(较大的数)：优先级低

## **3.5，基于XML的AOP（了解）**

### **3.5.1、准备工作**

参考基于注解的AOP环境

### **3.5.2、实现**

```xml
 <context:component-scan base-package="com.atguigu.aop.xml"></context:component•scan>
 <aop:config>
     <!--配置切面类-->
     <aop:aspect ref="loggerAspect">
         <aop:pointcut id="pointCut" expression="execution(*com.atguigu.aop.xml.CalculatorImpl.*(..))"/>
         <aop:before method="beforeMethod" pointcut-ref="pointCut"></aop:before>
         <aop:after method="afterMethod" pointcut-ref="pointCut"></aop:after>
         <aop:after-returning method="afterReturningMethod" returning="result"pointcut-ref="pointCut"></aop:after-returning>
         <aop:after-throwing method="afterThrowingMethod" throwing="ex" pointcut-ref="pointCut"></aop:after-throwing>
         <aop:around method="aroundMethod" pointcut-ref="pointCut"></aop:around>
     </aop:aspect>
     <aop:aspect ref="validateAspect" order="1">
         <aop:before method="validateBeforeMethod" pointcut-ref="pointCut">
         </aop:before>
     </aop:aspect>
 </aop:config>
```