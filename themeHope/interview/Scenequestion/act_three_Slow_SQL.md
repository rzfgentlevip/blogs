---
# 这是文章的标题
title: 提问：如何定位慢sql?
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: bugcode
# 设置写作时间
date: 2020-01-01
# 一个页面可以有多个分类
category:
  - 面试
# 一个页面可以有多个标签
tag:
  - 面试
  - 场景
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 分布式
# 你可以自定义版权信息
copyright: bugcode
---

# 三、提问：如何定位慢sql?

慢查询定位总结

1、介绍一下当时产生问题的场景（我们当时的一个接口测试的时候非常的慢，压测的结果大概5秒钟/做数据计算查询数据很慢导致任计算任务执行超时）

2、我们系统中当时采用了运维工具（ Skywalking /ps数据库自带监控系统查看sql执行时间），可以监测出哪个接口，最终因为是sql的问题

3、在mysql/postgresql中开启了慢日志查询，我们设置的值就是2秒，一旦sql执行超过2秒就会记录到日志中（调试阶段）

4、上线前的压力测试，观察相关的指标 tps / qps / rt / io / cpu

> sql问题排查思路：
>
> 如果已知是sql问题，直接找dba查询日志，查看执行计划或者sql执行日志，如果sql没有到数据库执行，那么需要找网络组进行抓包处理，看某个一时间段网络情况，如果网络也没有问题，那么就只能查看代码或者配置导致连接泄露。

发现:

1. 系统监控:基于 arthars 运维工具、promethues 、skywalking  mysql
2. 慢日志: 会影响一部分系统性能

慢 SQL 处理 由宏观到微观

1. 检查 系统相关性能 top / mpstat / pidstat / vmstat 检查 CPU / IO 占比，由进程到线程
2. 检查 MySQL 性能情况，show processlist 查看相关进程 | 基于 MySQL Workbench 进行分析
3. 检查 SQL 语句索引执行情况，explain 关注 type key extra rows 等关键字
4. 检查是否由于 SQL 编写不当造成的不走索引，例如 使用函数、not in、%like%、or 等
5. 其他情况: 深分页、数据字段查询过多、Join 连表不当、业务大事物问题、死锁、索引建立过多
6. 对于热点数据进行前置，降低 MySQL 的压力 redis、mongodb、memory
7. 更改 MySQL 配置 ， 处理线程设置一般是 cpu * 核心数 的 2 倍，日志大小 bin-log
8. 升级机器性能 or 加机器
9. 分表策略，分库策略
10. 数据归档