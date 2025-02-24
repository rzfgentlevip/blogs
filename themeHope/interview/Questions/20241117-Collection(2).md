---
# 这是文章的标题
title: Java集合手册(精简版)
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-11-16
# 一个页面可以有多个分类
category:
  - 面试
  - JAVA
# 一个页面可以有多个标签
tag:
  - 面试
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

<!-- TOC -->

- [Java集合手册(精简版)](#java集合手册精简版)
    - [常用的集合类有哪些](#常用的集合类有哪些)
    - [为什么集合类没有实现Cloneable和Serializable接口？](#为什么集合类没有实现cloneable和serializable接口)
    - [List，Set，Map三者的区别？](#listsetmap三者的区别)
    - [常用集合框架底层数据结构](#常用集合框架底层数据结构)
    - [哪些集合类是线程安全的？](#哪些集合类是线程安全的)
    - [迭代器 Iterator 是什么](#迭代器-iterator-是什么)
    - [Iterator和ListIterator的区别是什么？](#iterator和listiterator的区别是什么)
    - [Java集合的快速失败机制 “fail-fast”和安全失败机制“failsafe”是什么？](#java集合的快速失败机制-fail-fast和安全失败机制failsafe是什么)
    - [如何边遍历边移除 Collection 中的元素？](#如何边遍历边移除-collection-中的元素)
    - [Array 和 ArrayList 有何区别？](#array-和-arraylist-有何区别)
    - [comparable 和 comparator的区别？](#comparable-和-comparator的区别)
    - [快速失败(fail-fast)和安全失败(fail-safe)的区别是什么？](#快速失败fail-fast和安全失败fail-safe的区别是什么)
    - [Collection 和 Collections 有什么区别？](#collection-和-collections-有什么区别)
    - [List集合](#list集合)
      - [遍历一个 List 有哪些不同的方式？](#遍历一个-list-有哪些不同的方式)
      - [ArrayList的扩容机制](#arraylist的扩容机制)
      - [ArrayList 和 LinkedList 的区别是什么？](#arraylist-和-linkedlist-的区别是什么)
      - [ArrayList 和 Vector 的区别是什么？](#arraylist-和-vector-的区别是什么)
      - [简述 ArrayList、Vector、LinkedList 的存储性能和特性？](#简述-arraylistvectorlinkedlist-的存储性能和特性)
    - [Set集合](#set集合)
      - [说一下 HashSet 的实现原理](#说一下-hashset-的实现原理)
      - [HashSet如何检查重复？（HashSet是如何保证数据不可重复的？）](#hashset如何检查重复hashset是如何保证数据不可重复的)
      - [HashSet与HashMap的区别](#hashset与hashmap的区别)
    - [Map集合](#map集合)
      - [HashMap的工作原理](#hashmap的工作原理)
      - [HashMap在JDK1.7和JDK1.8中有哪些不同？HashMap的底层实现](#hashmap在jdk17和jdk18中有哪些不同hashmap的底层实现)
      - [HashMap 的长度为什么是2的幂次方](#hashmap-的长度为什么是2的幂次方)
      - [HashMap的put方法的具体流程？](#hashmap的put方法的具体流程)
      - [HashMap的扩容操作是怎么实现的？](#hashmap的扩容操作是怎么实现的)
      - [HashMap默认加载因子为什么选择0.75？](#hashmap默认加载因子为什么选择075)
      - [为什么要将链表中转红黑树的阈值设为8？为什么不一开始直接使用红黑树？](#为什么要将链表中转红黑树的阈值设为8为什么不一开始直接使用红黑树)
      - [HashMap是怎么解决哈希冲突的？](#hashmap是怎么解决哈希冲突的)
      - [HashMap为什么不直接使用hashCode()处理后的哈希值直接作为table的下标？](#hashmap为什么不直接使用hashcode处理后的哈希值直接作为table的下标)
      - [能否使用任何类作为 Map 的 key？](#能否使用任何类作为-map-的-key)
      - [为什么HashMap中String、Integer这样的包装类适合作为Key？](#为什么hashmap中stringinteger这样的包装类适合作为key)
      - [如果使用Object作为HashMap的Key，应该怎么办呢？](#如果使用object作为hashmap的key应该怎么办呢)
      - [HashMap 多线程导致死循环问题](#hashmap-多线程导致死循环问题)
      - [ConcurrentHashMap 底层具体实现知道吗？](#concurrenthashmap-底层具体实现知道吗)
      - [HashTable的底层实现知道吗？](#hashtable的底层实现知道吗)
      - [HashMap和Hashtable有什么区别？](#hashmap和hashtable有什么区别)
      - [HashMap、ConcurrentHashMap及Hashtable 的区别](#hashmapconcurrenthashmap及hashtable-的区别)
      - [集合的常用方法](#集合的常用方法)
      - [Collection常用方法](#collection常用方法)
      - [List特有方法](#list特有方法)
      - [LinkedList特有方法](#linkedlist特有方法)
      - [Map](#map)
      - [Stack](#stack)
      - [Queue](#queue)

<!-- /TOC -->

# Java集合手册(精简版)

### 常用的集合类有哪些

Map接口和Collection接口是所有集合框架的父接口。下图中的实线和虚线看着有些乱，其中接口与接口之间如果有联系为继承关系，类与类之间如果有联系为继承关系，类与接口之间则是类实现接口。重点掌握的抽象类有 HashMap ， LinkedList ， HashTable ， ArrayList ， HashSet ， Stack ，TreeSet ， TreeMap 。注意： Collection 接口不是 Map 的父接口。

![1631410295108](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/12/093136-823698.png)

![1631409999135](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/12/093102-794935.png)

**大图**

![](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202108/31/131640-548931.png)

### 为什么集合类没有实现Cloneable和Serializable接口？

克隆(cloning)或者是序列化(serialization)的语义和含义是跟具体的实现相关的。因此，应该 由集合类的具体实现来决定如何被克隆或者是序列化。

### List，Set，Map三者的区别？

List ：有序集合（有序指存入的顺序和取出的顺序相同，不是按照元素的某些特性排序），可存储重复元素，可存储多个 null 。

Set：无序集合（元素存入和取出顺序不一定相同），不可存储重复元素，只能存储一个。

Map：使用键值对的方式对元素进行存储，是无序的，且是唯一的。值不唯一。不同的键可以对应相同的值。

### 常用集合框架底层数据结构

- List：
    - ArrayList ：数组
    - LinkedList ：双线链表
- Set ：
    - HashSet ：底层基于 HashMap 实现， HashSet 存入读取元素的方式和 HashMap 中的 Key 是一致的。值存储在key位置，而value存储object对象。
    - TreeSet ：红黑树
- Map ：
    - HashMap ： JDK1.8之前 HashMap 由数组+链表组成的， JDK1.8之后有数组+链表/红黑树组成，当链表长度大于8时，链表转化为红黑树，当长度小于6时，从红黑树转化为链表。这样做的目的是能提高 HashMap 的性能，因为红黑树的查找元素的时间复杂度远小于链表。
    - HashTable ：数组+链表，线程安全，效率低。
    - TreeMap ：红黑树

![](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202108/31/131740-215003.png)

### 哪些集合类是线程安全的？

- Vector ：相当于有同步机制的 ArrayList
- Stack ：栈
- HashTable：使用synchronized保证线程安全。
- enumeration ：枚举

### 迭代器 Iterator 是什么

Iterator 是 Java 迭代器最简单的实现，它不是一个集合，它是一种用于访问集合的方法， Iterator接口提供遍历任何 Collection 的接口 。

Iterator接口提供了很多对集合元素进行迭代的方法。每一个集合类都包含了可以返回迭代 器实例的迭代方法。迭代器可以在迭代的过程中删除底层集合的元素,但是不可以直接调用集合的 remove(Object Obj)删除，可以通过迭代器的remove()方法删除。

### Iterator和ListIterator的区别是什么？

下面列出了他们的区别：

- Iterator可用来遍历Set和List集合，但是ListIterator只能用来遍历List。
- Iterator对集合只能是前向遍历，ListIterator既可以前向也可以后向。
- ListIterator实现了Iterator接口，并包含其他的功能，比如：增加元素，替换元素，获取前一个和后一个元素的索引，等等。

### Java集合的快速失败机制 “fail-fast”和安全失败机制“failsafe”是什么？

**快速失败**
Java的快速失败机制是Java集合框架中的一种错误检测机制，当多个线程同时对集合中的内容进行修改时可能就会抛出 ConcurrentModificationException 异常。其实不仅仅是在多线程状态下，在单线程中用增强 for 循环中一边遍历集合一边修改集合的元素也会抛出ConcurrentModificationException 异常。看下面代码

```java
public class Main{
  public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();
    for(Integer i : list){
      list.remove(i); //运行时抛出ConcurrentModificationException异常
    }
  }
}
```

正确的做法是用迭代器的 remove() 方法，便可正常运行。

```java
public class Main{
  public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();
    Iterator<Integer> it = list.iterator();
    while(it.hasNext()){
    	it.remove();
    }
  }
}
```

造成这种情况的原因是什么？细心的同学可能已经发现两次调用的 remove() 方法不同，一个带参数据，一个不带参数，这个后面再说，经过查看 ArrayList 源码，找到了抛出异常的代码

```java
final void checkForComodification() {
  if (modCount != expectedModCount)
  	throw new ConcurrentModificationException();
}
```

从上面代码中可以看到如果 modCount 和 expectedModCount 这两个变量不相等就会抛出
ConcurrentModificationException 异常。那这两个变量又是什么呢？继续看源码

```java
protected transient int modCount = 0; //在AbstractList中定义的变量

int expectedModCount = modCount;//在ArrayList中的内部类Itr中定义的变量
```

从上面代码可以看到， modCount 初始值为0，而 expectedModCount 初始值等于 modCount 。也就是说在遍历的时候直接调用集合的 remove() 方法会导致 modCount 不等于 expectedModCount进而抛出 ConcurrentModificationException 异常，而使用迭代器的 remove() 方法则不会出现这种问题。那么只能在看看 remove() 方法的源码找找原因了

```java
public E remove(int index) {
  rangeCheck(index);
  modCount++;
  E oldValue = elementData(index);
  int numMoved = size - index - 1;
  if (numMoved > 0)
    System.arraycopy(elementData, index+1, elementData, index,
    numMoved);
  elementData[--size] = null; // clear to let GC do its work
    return oldValue;
}
```

从上面代码中可以看到只有 modCount++ 了，而 expectedModCount 没有操作，当每一次迭代时，迭代器会比较 expectedModCount 和 modCount 的值是否相等，所以在调用 remove() 方法后，modCount 不等于 expectedModCount 了，这时就了报 ConcurrentModificationException 异常。但用迭代器中 remove() 的方法为什么不抛异常呢？原来迭代器调用的 remove() 方法和上面的 remove() 方法不是同一个！迭代器调用的 remove() 方法长这样：

```java
public void remove() {
  if (lastRet < 0)
    throw new IllegalStateException();
  checkForComodification();
  try {
    ArrayList.this.remove(lastRet);
    cursor = lastRet;
    lastRet = -1;
    expectedModCount = modCount; //这行代码保证了expectedModCount和modCount是相等的
  } catch (IndexOutOfBoundsException ex) {
  throw new ConcurrentModificationException();
  }
}
```

从上面代码可以看到 expectedModCount = modCount ，所以迭代器的 remove() 方法保证了expectedModCount 和 modCount 是相等的，进而保证了在增强 for 循环中修改集合内容不会报ConcurrentModificationException 异常。

上面介绍的只是单线程的情况，用迭代器调用 remove() 方法即可正常运行，但如果是多线程会怎么样呢？

答案是在多线程的情况下即使用了迭代器调用 remove() 方法，还是会报ConcurrentModificationException 异常。这又是为什么呢？还是要从 expectedModCount 和modCount 这两个变量入手分析，刚刚说了 modCount 在 AbstractList 类中定义，而expectedModCount 在 ArrayList 内部类中定义，所以 modCount 是个共享变量而expectedModCount 是属于线程各自的。简单说，线程1更新了 modCount 和属于自己的expectedModCount ，而在线程2看来只有 modCount 更新了， expectedModCount 并未更新，所以会抛出 ConcurrentModificationException 异常。

**安全失败**
采用安全失败机制的集合容器，在遍历时不是直接在集合内容上访问的，而是先复制原有集合内容，在拷贝的集合上进行遍历。所以在遍历过程中对原集合所作的修改并不能被迭代器检测到，所以不会抛出 ConcurrentModificationException 异常。缺点是迭代器遍历的是开始遍历那一刻拿到的集合拷贝，在遍历期间原集合发生了修改，迭代器是无法访问到修改后的内容。java.util.concurrent 包下的容器都是安全失败，可以在多线程下并发使用。

### 如何边遍历边移除 Collection 中的元素？

从上文“快速失败机制”可知在遍历集合时如果直接调用 remove() 方法会抛ConcurrentModificationException 异常，所以使用迭代器中调用 remove() 方法

### Array 和 ArrayList 有何区别？

- Array 可以包含基本类型和对象类型， ArrayList 只能包含对象类型。
- Array 大小是固定的， ArrayList 的大小是动态变化的。( ArrayList 的扩容是个常见面试题)
- 相比于 Array ， ArrayList 有着更多的内置方法，如 addAll() ， removeAll() 。
- 对于基本类型数据， ArrayList 使用自动装箱来减少编码工作量；而当处理固定大小的基本数据类型的时候，这种方式相对比较慢，这时候应该使用 Array 。

### comparable 和 comparator的区别？

- comparable 接口出自 java.lang 包，可以理解为一个内比较器，因为实现了 Comparable 接口的类可以和自己比较，要和其他实现了 Comparable 接口类比较，可以使用 compareTo(Objectobj) 方法。compareTo 方法的返回值是 int ，有三种情况：
    - 返回正整数（比较者大于被比较者）
    - 返回0（比较者等于被比较者）
    - 返回负整数（比较者小于被比较者）
- comparator 接口出自 java.util 包，它有一个 compare(Object obj1, Object obj2) 方法用来排序，返回值同样是 int ，有三种情况，和 compareTo 类似。

它们之间的区别：很多包装类都实现了 comparable 接口，像 Integer 、 String 等，所以直接调用Collections.sort() 直接可以使用。如果对类里面自带的自然排序不满意，而又不能修改其源代码的情况下，使用 Comparator 就比较合适。此外使用 Comparator 可以避免添加额外的代码与我们的目标类耦合，同时可以定义多种排序规则，这一点是 Comparable 接口没法做到的，从灵活性和扩展性讲Comparator更优，故在面对自定义排序的需求时，可以优先考虑使用 Comparator 接口

### 快速失败(fail-fast)和安全失败(fail-safe)的区别是什么？

Iterator的安全失败是基于对底层集合做拷贝，因此，它不受源集合上修改的影响。java.util 包下面的所有的集合类都是快速失败

的，而java.util.concurrent包下面的所有的类都是安全失败的。快速失败的迭代器会抛出ConcurrentModificationException异

常，而安全失败的 迭代器永远不会抛出这样的异常。

### Collection 和 Collections 有什么区别？

- Collection 是一个集合接口。它提供了对集合对象进行基本操作的通用接口方法。
- Collections 是一个包装类。它包含有各种有关集合操作的静态多态方法，例如常用的 sort()方法。此类不能实例化，就像一个工具类，服务于Java的 Collection 框架。

### List集合

#### 遍历一个 List 有哪些不同的方式？

先说一下常见的元素在内存中的存储方式，主要有两种：

1. 顺序存储（Random Access）：相邻的数据元素在内存中的位置也是相邻的，可以根据元素的位置（如 ArrayList 中的下表）读取元素。
2. 链式存储（Sequential Access）：每个数据元素包含它下一个元素的内存地址，在内存中不要求相邻。例如 LinkedList 。

**主要的遍历方式主要有三种：**

1. for 循环遍历：遍历者自己在集合外部维护一个计数器，依次读取每一个位置的元素。
2. Iterator 遍历：基于顺序存储集合的 Iterator 可以直接按位置访问数据。基于链式存储集合的Iterator ，需要保存当前遍历的位置，然后根据当前位置来向前或者向后移动指针。
3. foreach 遍历： foreach 内部也是采用了 Iterator 的方式实现，但使用时不需要显示地声明Iterator 。

那么对于以上三种遍历方式应该如何选取呢？

在Java集合框架中，提供了一个 RandomAccess 接口，该接口没有方法，只是一个标记。通常用来标记List 的实现是否支持 RandomAccess 。所以在遍历时，可以先判断是否支持 RandomAccess （ list instanceof RandomAccess ），如果支持可用 for 循环遍历，否则建议用 Iterator 或 foreach 遍历。

#### ArrayList的扩容机制

> 一般面试时需要记住， ArrayList 的初始容量为10，扩容时对是旧的容量值加上旧的容量数值进行右移一位（位运算，相当于除以2，位运算的效率更高），所以每次扩容都是旧的容量的1.5倍。

#### ArrayList 和 LinkedList 的区别是什么？

- 是否线程安全： ArrayList 和 LinkedList 都是不保证线程安全的
- 底层实现： ArrayList 的底层实现是数组， LinkedList 的底层是双向链表。
- 内存占用： ArrayList 会存在一定的空间浪费，因为每次扩容都是之前的1.5倍，而 LinkedList中的每个元素要存放直接后继和直接前驱以及数据，所以对于每个元素的存储都要比 ArrayList花费更多的空间。
- 应用场景： ArrayList 的底层数据结构是数组，所以在插入和删除元素时的时间复杂度都会收到位置的影响，平均时间复杂度为o(n)，在读取元素的时候可以根据下标直接查找到元素，不受位置的影响，平均时间复杂度为o(1)，所以 ArrayList 更加适用于多读，少增删的场景。 LinkedList的底层数据结构是双向表，所以插入和删除元素不受位置的影响，平均时间复杂度为o(1)，如果是在指定位置插入则是o(n)，因为在插入之前需要先找到该位置，读取元素的平均时间复杂度为o(n)。所以 LinkedList 更加适用于多增删，少读写的场景。

#### ArrayList 和 Vector 的区别是什么？

**相同点：**

1. 都实现了 List 接口
2. 底层数据结构都是数组

**不同点：**

1. 线程安全： Vector 使用了 Synchronized 来实现线程同步，所以是线程安全的，而ArrayList 是线程不安全的。
2. 性能：由于 Vector 使用了 Synchronized 进行加锁，所以性能不如 ArrayList 。
3. 扩容： ArrayList 和 Vector 都会根据需要动态的调整容量，但是 ArrayList 每次扩容为旧容量的1.5倍，而 Vector 每次扩容为旧容量的2倍

#### 简述 ArrayList、Vector、LinkedList 的存储性能和特性？

- ArrayList 底层数据结构为**数组**，对元素的读取速度快，而增删数据慢，线程不安全。
- LinkedList 底层为**双向链表**，对元素的增删数据快，读取慢，线程不安全。
- Vector 的底层数据结构为数组，用 Synchronized 来保证线程安全，性能较差，但线程安全。

### Set集合

#### 说一下 HashSet 的实现原理

- HashSet 的底层是 HashMap ，默认构造函数是构建一个初始容量为16，负载因子为0.75 的 HashMap
- HashSet 的值存放于 HashMap 的 key 上， HashMap 的 value 统一为 PRESENT 。

#### HashSet如何检查重复？（HashSet是如何保证数据不可重复的？）

这里面涉及到了 HasCode() 和 equals() 两个方法。
**equals()**
先看下 String 类中重写的 equals 方法

![1631491128950](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/075906-114279.png)

从源码中可以看到：

1. equals 方法首先比较的是内存地址，如果内存地址相同，直接返回 true ；如果内存地址不同，再比较对象的类型，类型不同直接返回 false ；类型相同，再比较值是否相同；值相同返回 true ，值不同返回 false 。总结一下， **equals 会比较内存地址、对象类型、以及值**，内存地址相同， equals 一定返回 true ；对象类型和值相同， equals 方法一定返回 true 。
2. 如果没有重写 equals 方法，那么 equals 和 == 的作用相同，比较的是对象的地址值。

**hashCode **

hashCode 方法返回对象的散列码，返回值是 int 类型的散列码。散列码的作用是确定该对象在哈希表中的索引位置。关于 hashCode 有一些约定：

1. 两个对象相等，也就是说是同一个对象，则 hashCode 一定相同。
2. 两个对象有相同的 hashCode 值，它们不一定相等。
3. hashCode() 方法默认是对堆上的对象产生独特值，如果没有重写 hashCode() 方法，则该类的两个对象的 hashCode 值肯定不同

介绍完equals()方法和hashCode()方法，继续说下HashSet是如何检查重复的。

HashSet 的特点是存储元素时无序且唯一，在向 HashSet 中添加对象时，首相会计算对象的 HashCode值来确定对象的存储位置，如果该位置没有其他对象，直接将该对象添加到该位置；如果该存储位置有存储其他对象（新添加的对象和该存储位置的对象的 HashCode 值相同），调用 equals 方法判断两个对象是否相同，如果相同，则添加对象失败，如果不相同，则会将该对象重新散列到其他位置。

#### HashSet与HashMap的区别

![1631491420584](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/080342-181525.png)

### Map集合

#### HashMap的工作原理

Java中的HashMap是以键值对(key-value)的形式存储元素的。HashMap需要一个hash 函数，它使用hashCode()和equals()方法来向集合/从集合添加和检索元素。当调用put() 方法的时候，HashMap会计算key的hash值，然后把键值对存储在集合中合适的索引上。 如果key已经存在了，value会被更新成新值。HashMap的一些重要的特性是它的容量 (capacity)，负载因子(load factor)和扩容极限(threshold resizing)。

#### HashMap在JDK1.7和JDK1.8中有哪些不同？HashMap的底层实现

JDK1.7的底层数据结构(数组+链表)

![1631491497543](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/080459-768545.png)

JDK1.8的底层数据结构(数组+链表或者红黑树)

![1631491538361](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/080540-805343.png)

JDK1.7的Hash函数 ：

```java
static final int hash(int h){
  h ^= (h >>> 20) ^ (h >>>12);
  return h^(h >>> 7) ^ (h >>> 4);
}
```

JDK1.8的Hash函数 :

```java
static final int hash(Onject key){
  int h;
  return (key == null) ? 0 : (h = key.hashCode())^(h >>> 16);
}
```

JDK1.8的函数经过了一次异或一次位运算一共两次扰动，而JDK1.7经过了四次位运算五次异或一共九次扰动。这里简单解释下JDK1.8的hash函数，面试经常问这个，两次扰动分别是key.hashCode() 与 key.hashCode() 右移16位进行异或。这样做的目的是，高16位不变，低16位与高16位进行异或操作，进而减少碰撞的发生，高低Bit都参与到Hash的计算。如何不进行扰动处理，因为hash值有32位，直接对数组的长度求余，起作用只是hash值的几个低位

HashMap在JDK1.7和JDK1.8中有哪些不同点：

![1631491811657](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/081013-143497.png)

#### HashMap 的长度为什么是2的幂次方

因为 HashMap 是通过 key 的hash值来确定存储的位置，但Hash值的范围是-2147483648到2147483647，不可能建立一个这么大的数组来覆盖所有hash值。所以在计算完hash值后会对数组的长度进行取余操作，如果数组的长度是2的幂次方， (length - 1)&hash 等同于 hash%length ，可以用(length - 1)&hash 这种位运算来代替%取余的操作进而提高性能。

> 根本原因是使用移位计算提高性能。

#### HashMap的put方法的具体流程？

![1631492060821](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/081422-123036.png)

#### HashMap的扩容操作是怎么实现的？

- 初始值为16，负载因子为0.75，阈值为负载因子*容量
- resize() 方法是在 hashmap 中的键值对大于阀值时或者初始化时，就调用 resize() 方法进行扩容。
- 每次扩容，容量都是之前的两倍 ，至于为什么扩容为原来容量的2倍，也就是保证HashMap总容量是2的幂次方，这样可以使用移位计算。
- 扩容时有个判断 e.hash & oldCap 是否为零，也就是相当于hash值对数组长度的取余操作，若等于0，则位置不变，若等于1，位置变为原位置加旧容量。

#### HashMap默认加载因子为什么选择0.75？

这个主要是考虑空间利用率和查询成本的一个折中。如果加载因子过高，空间利用率提高，但是会使得哈希冲突的概率增加；如果加载因子过低，会频繁扩容，哈希冲突概率降低，但是会使得空间利用率变低。具体为什么是0.75，不是0.74或0.76，这是一个基于数学分析（泊松分布）和行业规定一起得到的一个结论。

#### 为什么要将链表中转红黑树的阈值设为8？为什么不一开始直接使用红黑树？

可能有很多人会问，既然红黑树性能这么好，为什么不一开始直接使用红黑树，而是先用链表，链表长度大于8时，才转换为红红黑树

- 因为红黑树的节点所占的空间是普通链表节点的两倍，但查找的时间复杂度低，所以只有当节点特别多时，红黑树的优点才能体现出来。至于为什么是8，是通过数据分析统计出来的一个结果，链表长度到达8的概率是很低的，综合链表和红黑树的性能优缺点考虑将大于8的链表转化为红黑树。
- 链表转化为红黑树除了链表长度大于8，还要 HashMap 中的数组长度大于64。也就是如果HashMap 长度小于64，链表长度大于8是不会转化为红黑树的，而是直接扩容。

#### HashMap是怎么解决哈希冲突的？

哈希冲突： hashMap 在存储元素时会先计算 key 的hash值来确定存储位置，因为 key 的hash值计算最后有个对数组长度取余的操作，所以即使不同的 key 也可能计算出相同的hash值，这样就引起了hash冲突。 hashMap 的底层结构中的链表/红黑树就是用来解决这个问题的。

HashMap 中的哈希冲突解决方式可以主要从三方面考虑（以JDK1.8为背景）

- 拉链法

  HasMap 中的数据结构为数组+链表/红黑树，当不同的 key 计算出的hash值相同时，就用链表的形式将Node结点（冲突的 key 及 key 对应的 value ）挂在数组后面。

- hash函数

  key 的hash值经过两次扰动， key 的 hashCode 值与 key 的 hashCode 值的右移16位进行异或，然后对数组的长度取余（实际为了提高性能用的是位运算，但目的和取余一样），这样做可以让hashCode 取值出的高位也参与运算，进一步降低hash冲突的概率，使得数据分布更平均。

- 红黑树

  在拉链法中，如果hash冲突特别严重，则会导致数组上挂的链表长度过长，性能变差，因此在链表长度大于8时，将链表转化为红黑树，可以提高遍历链表的速度。

#### HashMap为什么不直接使用hashCode()处理后的哈希值直接作为table的下标？

hashCode() 处理后的哈希值范围太大，建立大的数组需要连续的内存空间，不可能在内存建立这么大的数组。

#### 能否使用任何类作为 Map 的 key？

可以，但要注意以下两点：

- 如果类重写了 equals() 方法，也应该重写 hashCode() 方法。
- 最好定义 key 类是不可变的，这样 key 对应的 hashCode() 值可以被缓存起来，性能更好，这也是为什么 String 特别适合作为 HashMap 的 key 。

#### 为什么HashMap中String、Integer这样的包装类适合作为Key？

- 这些包装类都是 final 修饰，是不可变性的， 保证了 key 的不可更改性，不会出现放入和获取时哈希值不同的情况。
- 它们内部已经重写过 hashcode() , equal() 等方法。

#### 如果使用Object作为HashMap的Key，应该怎么办呢？

- 重写 hashCode() 方法，因为需要计算hash值确定存储位置
- 重写 equals() 方法，因为需要保证 key 的唯一性。

#### HashMap 多线程导致死循环问题

由于JDK1.7的 hashMap 遇到hash冲突采用的是头插法，在多线程情况下会存在死循环问题，但JDK1.8已经改成了尾插法，不存在这个问题了。但需要注意的是JDK1.8中的 HashMap 仍然是不安全的，在多线程情况下使用仍然会出现线程安全问题。基本上面试时说到这里既可以了，具体流程用口述是很难说清的，

#### ConcurrentHashMap 底层具体实现知道吗？

**JDK1.7 **

在JDK1.7中， ConcurrentHashMap 采用 Segment 数组 + HashEntry 数组的方式进行实现。Segment 实现了 ReentrantLock ，所以 Segment 有锁的性质， HashEntry 用于存储键值对。一个 ConcurrentHashMap 包含着一个 Segment 数组，一个 Segment 包含着一个 HashEntry 数组，HashEntry 是一个链表结构，如果要获取 HashEntry 中的元素，要先获得 Segment 的锁。

![1631493037332](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083039-528273.png)

**JDK1.8 **

在JDK1.8中，不在是 Segment + HashEntry 的结构了，而是和 HashMap 类似的结构，Node数组+链表/红黑树，采用 CAS + synchronized 来保证线程安全。当链表长度大于8，链表转化为红黑树。在JDK1.8中 synchronized 只锁链表或红黑树的头节点，是一种相比于 segment 更为细粒度的锁，锁的竞争变小，所以效率更高。

![1631493095750](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083138-835049.png)

总结一下：

- JDK1.7底层是 ReentrantLock + Segment + HashEntry ，JDK1.8底层是 synchronized + CAS +链表/红黑树
- JDK1.7采用的是分段锁，同时锁住几个 HashEntry ，JDK1.8锁的是Node节点，只要没有发生哈希冲突，就不会产生锁的竞争。所以JDK1.8相比于JDK1.7提供了一种粒度更小的锁，减少了锁的竞争，提高了 ConcurrentHashMap 的并发能力。

#### HashTable的底层实现知道吗？

HashTable 的底层数据结构是**数组+链表**，链表主要是为了解决哈希冲突，并且整个数组都是synchronized 修饰的，所以 HashTable 是线程安全的，但

锁的粒度太大，锁的竞争非常激烈，效率很低 。

![1631493200168](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083321-643903.png)

#### HashMap和Hashtable有什么区别？

HashMap和Hashtable都实现了Map接口，因此很多特性非常相似。但是，他们有以下不同点：

- HashMap允许键和值是null，而Hashtable不允许键或者值是null。
- Hashtable是同步的，而HashMap不是。因此，HashMap更适合于单线程环境，而Hashtable 适合于多线程环境。
- HashMap提供了可供应用迭代的键的集合，因此，HashMap是快速失败的。另一方面， Hashtable提供了对键的列举(Enumeration)。
- 一般认为Hashtable是一个遗留的类。

#### HashMap、ConcurrentHashMap及Hashtable 的区别

![1631493250791](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083412-535740.png)

#### 集合的常用方法

#### Collection常用方法

![1631493324225](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083525-973284.png)

#### List特有方法

![1631493377330](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083619-113136.png)

#### LinkedList特有方法

![1631493427443](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083710-210706.png)

#### Map


![1631493483412](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083804-385164.png)

#### Stack

![1631493525625](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083847-441500.png)

#### Queue

![1631493567974](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202109/13/083929-636293.png)