---
# 这是文章的标题
title: K8S中如何确定apiVersion
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-12-7
# 一个页面可以有多个分类
category:
  - K8S
# 一个页面可以有多个标签
tag:
  - k8s
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

# K8S中如何确定apiVersion

## 介绍

K8s的apiVersion由**group**和**version**组成，不同的kind有对应的不同group，不同的group再根据不同的k8s版本有不同的version。因此在编写不同类型的yaml，如何选择apiVersion。

## 确认Kind

Kind资源类型的确认比较简单，需要什么资源就定义什么资源即可，常见的资源类型有deployment,namespace,service,pod等。

## 确认group

通过在当前使用的k8s服务器上，执行命令查看所有kind与group的关系，然后选择出自己需要的kind对应的group：

```yaml
kubectl api-resources -o wide
```

此命令会列出所有的资源，有一列是APIVERSION，其实就是我们要找到的内容，APIVERSION由两部分组成，group/version，/前面的表示group 后面的表示version，如果没有斜线，那就表示group为空，只有version选项。

![image-20240805151600724](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202408051516921.png)

也可以使用如下命令查询所有的appversion:

```yaml
kubectl api-versions
```

![image-20240805151653571](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/202408051516625.png)

k8s官方将apiversion分成了三个大类型，alpha、beta、stable。

- Alpha: 未经充分测试，可能存在bug，功能可能随时调整或删除。

- Beta: 经过充分测试，功能细节可能会在未来进行修改。

- Stable: 稳定版本，将会得到持续支持。

因此，根据最终自己需要的apiVersion，有限选择稳定版本的，其次是选择带有beta版本的。

