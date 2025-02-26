---
# 这是文章的标题
title: 设计模式使用思考
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
# 设计模式使用思考

## 设计模式使用归纳

| 设计模式       | 类型       | 目的                                                         | 使用经验                                                     | 框架源码使用案例                                         |      |
| -------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- | ---- |
| [模板模式]()   | 行为型     | 流程全部标准化,需要微调请覆盖,核心定义业务流程，达到逻辑复用的目的 | 多用来定义业务过程，抽象类中定义业务流程，子类实现具体差异化功能 | JdbcTemplate、HttpServlet                                |      |
| 策略模式       | 行为模式   | 定义一族算法策略，客户端可以灵活决定使用哪一个算法           | 消除if-else判断                                              | Comparator、<br/>InstantiationStrategy                   |      |
| 观察者模式     | 行为模式   | 定义了一种注册通知机制，解耦观察者和被观察者，当观察者关注的内容发生变化，系统会主动通知每一个观察者 | 基于监听模式的消费消费                                       | ContextLoaderListener                                    |      |
| 责任链模式     | 行为模式   | 定义一个链式处理规则，解耦处理逻辑                           | 对不同的业务状态定义不同的处理策略，解耦状态之间的逻辑       | FilterChain、Pipeline                                    |      |
| 状态模式       | 行为模式   | 当控制一个对象状态转换的条件表达式过于复杂时，把相关“判断逻辑”提取出来，放到一系列的状态类当中，这样可以把原来复杂的逻辑判断简单化。 | 状态驱动行为，行为决定状态，将状态和行为进行绑定             | Lifecycle                                                |      |
| 适配器模式     | 结构性模式 | 适配器模式(Adapter Pattern)将某个类的接口转换成客户端期望的另一个接口表示，主要目的是兼容性，让原本因接口不匹配不能一起工作的两个类可以协同工作 | 三种实现方式，类，对象，接口适配器，让原本不兼容的系统兼容   |                                                          |      |
| 代理模式       | 结构性模式 |                                                              |                                                              | ProxyFactoryBean、<br/>JdkDynamicAopProxy、CglibAopProxy |      |
| 装饰器模式     | 结构性模式 | 指在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式 | 核心是抽象装饰器持有抽象构件接口的引用，通过接口实现具体业务调用逻辑 | BufferedReader、InputStream                              |      |
| 外观模式       | 结构性模式 | 外观模式通过定义一个一致的接口，用以屏蔽内部子系统的细节，使得调用端只需跟这个接口发生调用，而无需关心这个子系统的内部细节 | 核心是在门面类中注入一个被委托对象的引用，在门面类中实现对子系统的调用 | JdbcUtils、RequestFacade                                 |      |
| 桥接模式       | 结构性模式 | 将抽象与实现分离，使它们可以独立变化。它是用组合关系代替继承关系来实现，从而降低了抽象和实现这两个可变维度的耦合度。 | 核心是抽象化角色持有接口对象的引用                           | DriverManager                                            |      |
| 建造者设计模式 | 创建型     |                                                              |                                                              | StringBuilder、 BeanDefinitionBuilder                    |      |
| 工厂模式       | 创建型     |                                                              |                                                              | LoggerFactory、Calender                                  |      |
| 单例模式       | 创建型     |                                                              |                                                              | BeanFactory、Runtime                                     |      |
| 原型模式       | 创建型     |                                                              |                                                              | ArrayList、PrototypeBean                                 |      |
|                |            |                                                              |                                                              |                                                          |      |
|                |            |                                                              |                                                              |                                                          |      |





## 行为型

### 责任链模式使用思考

责任链模式，通过解耦请求的接收者和处理者，大大降低了系统的灵活性，如果希望对业务链进行功能扩展，比如增加黑名单过滤等功能，可以通过继承或者实现抽象类，然后简单修改对象之间引用关系即可，大大降低了系统内组件的耦合程度；另外对于多if-else的判断业务，也可以通过责任链模式实现；

但是在使用时也需要注意，一个责任链不能设计的太长太臃肿，否则会降低系统的处理能力和性能；

> 使用核心，由链路依赖判断，上下游串行处理的业务场景

### 观察者

核心：广播通信问题，多个下游消费者订阅某一个主题，当主题发生变化时，使用广播模式通知下游所有订阅了此主题的消费者；

zookeeper系统的设计就使用了观察者模式，比如分布式锁的实现原理；Redis哨兵选举机制也是使用观察者模式；




参考博文：

> https://segmentfault.com/a/1190000040886097