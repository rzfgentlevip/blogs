---
# 这是文章的标题
title: 最长连续序列
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


# 最长连续序列

[最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked)

## 思路

题目已知给定一个无序的数组，让我们找到连续的最长序列，有一点要注意，题目已经限制在o(n)复杂度，因此我们就不能使用排序做；

核心思路：可以遍历nums中的数字，对每一个num+1。判断是否在数组中，如果存在就继续+1判断，直到num+1不在数组中为止，在计算过程中统计最长序列长度；

为了做到o(n)复杂度，有一点需要优化，使用set或者map集合将数组元素放到集合里面，尽可能降低查找一个元素的复杂度，因此使用map或者set；

### go实现

```go
func longestConsecutive(nums []int) int {

	var ans int
	/*首先将nums转换为map*/
	m := map[int]bool{}

	/*将nums数组转换成map*/
	for _, val := range nums {
		m[val] = true
	}

	/*循环遍历nums数组，看num是否在map中存在*/
	for _, num := range nums {
		/*这里是剪枝操作，如果比num小的数字在数组里面，num-1 组成的序列一定比num长，因此在这里剪枝操作*/
		if ok := m[num-1]; ok {
			fmt.Println(ok)
			continue
		}
		/*对num+1*/
		y := num + 1
		for m[y] {
			y++
		}
		ans = max(ans, y-num)
	}
	return ans
}

```

