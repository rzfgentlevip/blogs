---
# 这是文章的标题
title: Java性能调优实战
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-12-04
# 一个页面可以有多个分类
category:
  - JAVA
# 一个页面可以有多个标签
tag:
  - 实战
  - 调优
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 分布式
# 你可以自定义版权信息
copyright: bugcode
---

# Java性能测试与优化

## JVM内存模型

![image-20240807104829161](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20240807104829161.png)



## java内存回收机制

![image-20240807104910515](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20240807104910515.png)

java内存回收流程：

![image-20240807105117771](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20240807105117771.png)

## jconsole 与 jvisualvm

Jdk 的两个工具 jconsole、jvisualvm（升级版的 jconsole）;通过命令行启动，可监控本地和远程应用，远程应用需要配置。

jvisualvm是jvm自带的内存监控工具，通常用来监控内存泄漏，跟踪垃圾回收，执行时内存分析，cpu分析，线程分析等。

线程的一些状态：

- 运行：正在运行的
- 休眠：sleep
- 等待：wait
- 驻留：线程池里面的空闲线程
- 监视：阻塞的线程，正在等待锁

实际项目中，如果运行的项目负载很高，我们需要看一些具体的指标来监控系统运行的健康状态，然后进行调优。

### JVM监控指标

**中间件常用的监控指标:Tomcat，Threadpool,JDBC**

![image-20240807110504172](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20240807110504172.png)

**1、堆内存使用情况**

包括年轻代（Young Generation）和老年代（Old Generation）的使用率、eden 区、survivor 区的状态等，直接关系到垃圾回收（GC）行为和频率，是分析内存泄漏和 GC 效率的关键指标。

**Heap Used**：当前堆中已使用的内存大小，反映应用程序实时占用的内存情况。

**Heap Committed**：JVM 已向操作系统申请可以使用的堆内存大小，这个值通常不会减少，除非进行一次完全的垃圾回收（Full GC）。

**Heap Max**：堆内存的最大可用容量，由 JVM 启动参数（如-Xmx）设定，超过此限制可能导致 OutOfMemoryError。

**2、线程信息**

活跃线程数、线程状态（如 Runnable、Blocked 等）、线程堆栈信息，有助于识别线程阻塞、死锁等问题。

**Thread Count**：当前线程总数，过高可能意味着资源竞争或死锁。

**Daemon Thread Count**：守护线程的数量，通常不直接影响 JVM 退出。

**Thread Peak**：应用程序运行期间达到的最大线程数。

**3、垃圾收集统计**

包括 GC 次数、GC 时间、各种 GC 算法的执行详情，是评估 GC 策略效果和调优的重要依据。

**GC Time：**垃圾回收所花费的时间，过高表明 GC 活动频繁，可能影响应用响应时间。

**GC Count：**自 JVM 启动以来执行的 GC 次数，可以用来分析 GC 频率。

**GC Pause Time：**每次 GC 暂停应用的时间，过长的暂停可能导致应用响应延迟。

**4、CPU 使用率**

反映 JVM 及所在主机的 CPU 负荷，过高可能意味着计算密集或线程竞争激烈。

**CPU Usage**：JVM 进程消耗的 CPU 百分比，过高的 CPU 使用率可能指示计算密集型操作或瓶颈。

**5、内存池**

JVM（Java 虚拟机）内存池是 Java 内存管理的一个核心概念，它将堆内存划分为不同的区域，以便更高效地管理对象的生命周期和内存分配。

**Young Generation**（Eden Space/Survivor Space）：年轻代内存空间分为 Eden 和 Survivor 两部分，反映短期对象的分配和回收情况。

**Old Generation**（Tenured Gen）：老年代的内存占用信息，负责保存长期存在的对象，而在此区域进行的垃圾回收活动往往具有更高的成本效益考量。

**Direct Memory Usage：**直接内存使用率，用于记录直接字节缓冲区的使用情况，该部分内存不在堆内，但同样受到操作系统内存限制。

**6、类加载信息**

类加载数量、卸载数量等，有助于监控类加载器的活动，诊断类定义冲突或内存泄漏问题。

**Loaded/Unloaded Class Count**：已加载和卸载的类数量，有助于识别类加载器的活动。

**7、编译统计**

如 JIT 编译的数量、耗时，对于理解代码执行效率和优化热点方法有重要作用。

**JIT Compilation**：即时编译的统计信息，如编译任务数和编译时间，反映代码从字节码转换为本地代码的效率。

> 当前正在运行的线程数不能超过设定的最大值。一般情况下系统性能较好的情况下，线程数最小值设置 50 和最大值设置 200 比较合适。
> 当前运行的 JDBC 连接数不能超过设定的最大值。一般情况下系统性能较好的情况下，JDBC 最小值设置 50 和最大值设置 200 比较合适。
> ＧＣ频率不能频繁，特别是 FULL GC 更不能频繁，一般情况下系统性能较好的情况下，JVM 最小堆大小和最大堆大小分别设置 1024M 比较合适。

### 数据库指标

常用的Mysql数据库主要监控指标包括：**慢查询SQL，吞吐量，缓存命中率，连接数等**。

![image-20240807110909927](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20240807110909927.png)

- SQL 耗时越小越好，一般情况下微秒级别，可以通过执行计划分析sql的执行过程然后对sql进行优化，建立索引。
- 命中率越高越好，一般情况下不能低于 95%。
- 锁等待次数越低越好，等待时间越短越好。

**压测主要观察指标**

| 压测内容                               | 压测线程数 | 吞吐量/s | 90%响应时间 | 99%响应时间 |
| -------------------------------------- | ---------- | -------- | ----------- | ----------- |
| Nginx                                  | 50         | 2335     | 11          | 944         |
| Getway                                 | 50         | 10367    | 8           | 31          |
| 简单查询服务                           | 50         | 11341    | 8           | 17          |
| 首页一级菜单渲染                       | 50         | 270      | 267         | 365         |
| 首页渲染(开缓存)                       | 50         | 290      | 251         | 365         |
| 首页渲染(开缓存，优化数据库，关闭日志) | 50         | 700      | 105         | 186         |
| 三级分类数据获取                       | 50         |          |             |             |
| 三级分类数据获取（优化业务）           | 50         | 111      | 571         |             |
| 三级分类（适用Redis缓存）              | 50         | 411      |             |             |
| 首页全量数据获取                       | 50         |          |             |             |
| Nginx+Gatway                           | 50         |          |             |             |
| Gatway+简单查询服务                    | 50         |          |             |             |
| 全链路                                 | 50         |          |             |             |
|                                        |            |          |             |             |

中间件越多，性能损失越大，大多都损失在网络交互了；

- 业务：添加分布式缓存
- Db（MySQL 优化）：优化数据库索引
- 模板的渲染速度（缓存）：开启缓存
- 静态资源

### JVM分析调优

> 工具使用教程请参考:https://codinglab.online/interview/Scenequestion/20241122-memoryAnalyze.html#%E6%A1%88%E4%BE%8B-1

jvm 调优，调的是稳定，并不能带给你性能的大幅提升。服务稳定的重要性就不用多说了，保证服务的稳定，gc 永远会是 Java 程序员需要考虑的不稳定因素之一。复杂和高并发下的服务，必须保证每次 gc 不会出现性能下降，各种性能指标不会出现波动，gc 回收规律而且干净，找到合适的 jvm 设置。Full gc 最会影响性能，根据代码问题，避免 full gc 频率。可以适当调大年轻代容量，让大对象可以在年轻代触发 yong gc，调整大对象在年轻代的回收频次，尽可能保证大对象在年轻代回收，减小老年代缩短回收时间。

常用工具：

| jstack | 查看 jvm 线程运行状态，是否有死锁现象等等信息                |
| ------ | ------------------------------------------------------------ |
| jinfo  | 可以输出并修改运行时的 java 进程的 opts。                    |
| jstat  | 一个极强的监视 VM 内存工具。可以用来监视 VM 内存内的各种堆和非堆的大小及其内存使用量。 |
| jmap   | 打印出某个 java 进程（使用 pid）内存内的所有'对象'的情况（如：产生那些对象，及其数量） |

#### jstat

jstat 工具特别强大，有众多的可选项，详细查看堆内各个部分的使用量，以及加载类的数量。使用时，需加上查看进程的进程 id，和所选参数。

```java
jstat -class pid:显示加载 class 的数量，及所占空间等信息

jstat -compiler pid:显示 VM 实时编译的数量等信息。
jstat -gc pid:可以显示 gc 的信息，查看 gc 的次数，及时间
jstat -gccapacity pid:堆内存统计，三代（young,old,perm）内存使用和占用大小
jstat -gcnew pid:新生代垃圾回收统计

jstat -gcnewcapacity pid:新生代内存统计
jstat -gcold pid:老年代垃圾回收统计

除了以上一个参数外，还可以同时加上 两个数字，如：jstat -printcompilation 3024 250 6 是每 250 毫秒打印一次，一共打印 6 次，还可以加上-h3 每三行显示一下标题。

jstat -gcutil pid 1000 100 : 1000ms 统计一次 gc 情况统计 100 次
```

在使用这些工具前，先用 JPS 命令获取当前的每个 JVM 进程号，然后选择要查看的 JVM。

#### jinfo

jinfo 是 JDK 自带的命令，可以用来查看正在运行的 java 应用程序的扩展参数，包括 JavaSystem 属性和 JVM 命令行参数；也可以动态的修改正在运行的 JVM 一些参数。当系统崩溃时，jinfo 可以从 core 文件里面知道崩溃的 Java 应用程序的配置信息

```java
jinfo pid：输出当前 jvm 进程的全部参数和系统属性
jinfo -flag name pid：可以查看指定的 jvm 参数的值；打印结果：-无此参数，+有
jinfo -flag [+|-]name pid：开启或者关闭对应名称的参数（无需重启虚拟机）
jinfo -flag name=value pid：修改指定参数的值
jinfo -flags pid：输出全部的参数
jinfo -sysprops pid：输出当前 jvm 进行的全部的系统属性
```

#### jmap

jmap 可以生成 heap dump 文件，也可以查看堆内对象分析内存信息等，如果不使用这个命令，还可以使用-XX:+HeapDumpOnOutOfMemoryError 参数来让虚拟机出现 OOM 的时候自动生成 dump 文件

```java
jmap -dump:live,format=b,file=dump.hprof pid
dump 堆到文件，format 指定输出格式，live 指明是活着的对象，file 指定文件名。

jmap -heap pid
打印 heap 的概要信息，GC 使用的算法，heap 的配置和使用情况，可以用此来判断内存目前的使用情况以及垃圾回收情况

jmap -finalizerinfo pid
打印等待回收的对象信息
    
jmap -histo:live pid 打印堆的对象统计，包括对象数、内存大小等。jmap -histo:live 这个命令执行，JVM 会先触发 gc，然后再统计信息
    
jmap -clstats pid
打印 Java 类加载器的智能统计信息，对于每个类加载器而言，对于每个类加载器而言，它的名称，活跃度，地址，父类加载器，它所加载的类的数量和大小都会被打印。此外，包含的字符串数量和大小也会被打印。
    
-F 强制模式。如果指定的 pid 没有响应，请使用 jmap -dump 或 jmap -histo 选项。此
模式下，不支持 live 子选项。
jmap -F -histo pid
```

#### jstack

jstack 是 jdk 自带的线程堆栈分析工具，使用该命令可以查看或导出 Java 应用程序中线程堆栈信息。

```java
jstack pid:输出当前 jvm 进程的全部参数和系统属性
```



> 调优参考文档：https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html#BGBCIEFC

## 压力测试

压力测试考察当前软硬件环境下系统所能承受的最大负荷并帮助找出系统瓶颈所在。压测都是为了系统在线上的处理能力和稳定性维持在一个标准范围内，做到心中有数。

使用压力测试，我们有希望找到很多种用其他测试方法更难发现的错误。有两种错误类型是:内存泄漏，并发与同步。有效的压力测试系统将应用以下这些关键条件:重复，并发，量级，随机变化。

### 监控指标

- 响应时间（Response Time: RT）：响应时间指用户从客户端发起一个请求开始，到客户端接收到从服务器端返回的响
  应结束，整个过程所耗费的时间。
- HPS（Hits Per Second） ：每秒点击次数，单位是次/秒。
- TPS（Transaction per Second）：系统每秒处理交易数，单位是笔/秒。
- QPS（Query per Second）：系统每秒处理查询次数，单位是次/秒。
    - 对于互联网业务中，如果某些业务有且仅有一个请求连接，那么 TPS=QPS=HPS，一般情况下用 TPS 来衡量整个业务流程，用 QPS 来衡量接口查询次数，用 HPS 来表示对服务器单击请求。
- 无论 TPS、QPS、HPS,此指标是衡量系统处理能力非常重要的指标，越大越好，根据经验，一般情况下：
    - 金融行业：1000TPS~50000TPS，不包括互联网化的活动
    - 保险行业：100TPS~100000TPS，不包括互联网化的活动
    - 制造行业：10TPS~5000TPS
    - 互联网电子商务：10000TPS~1000000TPS
    - 互联网中型网站：1000TPS~50000TPS
    - 互联网小型网站：500TPS~10000TPS
- 最大响应时间（Max Response Time） 指用户发出请求或者指令到系统做出反应（响应）的最大时间。
- 最少响应时间（Mininum ResponseTime） 指用户发出请求或者指令到系统做出反应（响应）的最少时间。
- 90%响应时间（90% Response Time） 是指所有用户的响应时间进行排序，第 90%的响应时间。
- 99%响应时间（99% Response Time） 是指所有用户的响应时间进行排序，第 99%的响
- 从外部看，性能测试主要关注如下三个指标
    - 吞吐量：每秒钟系统能够处理的请求数、任务数。
    - 响应时间：服务处理一个请求或一个任务的耗时。
    - 错误率：一批请求中结果出错的请求所占比例。

### JMeter

> 安装包：https://jmeter.apache.org/download_jmeter.cgi

**添加线程指标**

线程组参数详解：

- 线程数：虚拟用户数。一个虚拟用户占用一个进程或线程。设置多少虚拟用户数在这里也就是设置多少个线程数。
- Ramp-Up Period(in seconds)准备时长：设置的虚拟用户数需要多长时间全部启动。如果线程数为 10，准备时长为 2，那么需要 2 秒钟启动 10 个线程，也就是每秒钟启动 5 个线程。
- 循环次数：每个线程发送请求的次数。如果线程数为 10，循环次数为 100，那么每个线程发送 100 次请求。总请求数为 10*100=1000 。如果勾选了“永远”，那么所有线程会一直发送请求，一到选择停止运行脚本。
- Delay Thread creation until needed：直到需要时延迟线程的创建。
- 调度器：设置线程组启动的开始时间和结束时间(配置调度器时，需要勾选循环次数为永远)
- 持续时间（秒）：测试持续时间，会覆盖结束时间
- 启动延迟（秒）：测试延迟启动时间，会覆盖启动时间
- 启动时间：测试启动时间，启动延迟会覆盖它。当启动时间已过，手动只需测试时当前时间也会覆盖它。
- 结束时间：测试结束时间，持续时间会覆盖它。

**测试结果分析**

有错误率同开发确认，确定是否允许错误的发生或者错误率允许在多大的范围内；

- Throughput 吞吐量：每秒请求的数大于并发数，则可以慢慢的往上面增加；若在压测的机器性能很好的情况下，出现吞吐量小于并发数，说明并发数不能再增加了，可以慢慢的往下减，找到最佳的并发数；
- 压测结束，登陆相应的 web 服务器查看 CPU 等性能指标，进行数据的分析;
- 最大的 tps，不断的增加并发数，加到 tps 达到一定值开始出现下降，那么那个值就是最大的 tps。
- 最大的并发数：最大的并发数和最大的 tps 是不同的概率，一般不断增加并发数，达到一个值后，服务器出现请求超时，则可认为该值为最大的并发数。
- 压测过程出现性能瓶颈，若压力机任务管理器查看到的 cpu、网络和 cpu 都正常，未达到 90%以上，则可以说明服务器有问题，压力机没有问题。
- 影响性能考虑点包括：数据库、应用程序、中间件（tomact、Nginx）、网络和操作系统等方面
- 首先考虑自己的应用属于 CPU 密集型还是 IO 密集型