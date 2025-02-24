---
# 这是文章的标题
title: 线上进程内存动态查看
# 你可以自定义封面图片
#cover: /assets/images/cover2.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-11-22
# 一个页面可以有多个分类
category:
  - JAVA
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



# 使用jvisualVM分析内存快照

## 实例代码

```java
import java.util.ArrayList;
import java.util.Random;

/**
 * className: TestOom
 * description:
 * author: MrR
 * date: 2024/11/27 12:29
 * version: 1.0
 */
public class TestOom {

    private static ArrayList<User> userLists = new ArrayList<>();

    public static void main(String[] args) throws InterruptedException {

        String []sexList = new String[]{"男","女"};

        for(int i=0;i<500;i++){
            String name = "user_"+String.valueOf(i);
            int age = i;
            String info = "info_"+String.valueOf(i);
            String sex = sexList[new Random().nextBoolean()?1:0];

            User user = new User(name, age, info, sex);
            userLists.add(user);
        }

        Thread.currentThread().join();
    }


}

class User {

    private String name;

    private int age;

    private String info;

    private String sex;

    public User(String name, int age, String info, String sex) {
        this.name = name;
        this.age = age;
        this.info = info;
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
```

## 使用jmap命令做内存快照

```text
jmap -dump:live,format=b,file=UserProgram.hpref <pid>

jmap -dump:live,format=b,file=UserProgram.hpref 7357
```
## 使用jvisualVM打开堆转存文件

> .hprof文件小于1M似乎打不开；

**堆快照概要**

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/20241127131012.png)

