---
# 这是文章的标题
title: 字母异位词分组
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-12-9
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

# 字母异位词分组

[字母异位词分组](https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked)

## 思路分析

首先看题目案例：`strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`

输出的结果是：`[["bat"],["nat","tan"],["ate","eat","tea"]]`

首先需要理解字母异位，比如ate字符串是由a t e三个字符组成，这三个字符可以看作是一个集合{a,t,e},集合中的元素根据顺序不同可以组成不同的单词，比如ate,eat,eta,这些单词唯一的不同就是单词排列顺序，因此都可以看作ate这个字符串的异位词；

所以题目很明显就是让我们找到那些字母集合相同的单词；比如ate eat tea 的单词集合是{a,t,e}，nat tan的单词集合是{n,a,t}

## 思路一

我们可以观察到，所有异位词除了单词顺序不同，其他都是一样的，因此我们可以对每一个单词进行重新排序，然后比较两个单词内容是否相同，如果相同，就归为一类，因此可以使用map结构，key存储排好序的字符串，value可以存储所有字母组成相同的一维词；

### go实现

```go
func groupAnagrams(strs []string) [][]string {

	/*创建一个map val是字符串数组类型*/
	m := map[string][]string{}

	/*遍历字符串数组*/
	for _, s := range strs {
		/*对字符串排序首先需要转换为byte[]*/
		t := []byte(s)
		/*对字符数组进行排序*/
		slices.Sort(t)
		/*排序的字符数组转成字符串*/
		sortDs := string(t)
		/*对value的字符串数组进行append*/
		m[sortDs] = append(m[sortDs], s)
	}

	fmt.Println(m)
	/*预分配空间
	make(Type, len, cap)
	Type：数据类型，必要参数，Type 的值只能是 slice、 map、 channel 这三种数据类型。
	len：数据类型实际占用的内存空间长度，map、 channel 是可选参数，slice 是必要参数。
	cap：为数据类型提前预留的内存空间长度，可选参数。所谓的提前预留是当前为数据类型申请内存空间的时候，
	提前申请好额外的内存空间，这样可以避免二次分配内存带来的开销，大大提高程序的性能。
	*/
	ans := make([][]string, 0, len(m))

	/*组装成数组*/
	for _, v := range m {
		ans = append(ans, v)

	}
	fmt.Println(ans)

	return ans
}

```

时间复杂度：O(nmlogm)，其中 n 为 strs 的长度，m 为 strs[i] 的长度。每个字符串排序需要 O(mlogm) 的时间。我们有 n 个字符串，所以总的时间复杂度为 O(nmlogm)。
空间复杂度：O(nm)。

