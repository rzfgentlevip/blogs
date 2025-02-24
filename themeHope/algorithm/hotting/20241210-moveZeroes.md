---
# 这是文章的标题
title: 移动零
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

# 移动零

[移动另](https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)

## 题目分析

给定一个数组，里面包含若干个0，要求将非零数字移动到所有0数字前面，但是有一个前提，相对位置不变;

**思路一**

1. 遍历数组，使用双指针，两个指针初始化指向同一个位置；
2. 如果右侧指针值不为零，就交换左右指针的值，否则右指针继续向右移动，直到到数组的末尾为止；

为什么可以将右指针值左移?

因为当右侧指针值不为空后，将其左移，相当于原先部位0 的位置空出来一个0位置；

**思路二**

使用map结构统计数组中0元素的个数，然后遍历数组，将非零元素顺序放到辅助数组中即可；

## go实现

```go
/*
*
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
遍历数组，使用双指针，两个指针初始化指向同一个位置；
如果右侧指针值不为零，就交换左右指针的值，否则右指针继续向右移动，直到到数组的末尾为止；
*/
func moveZeroes(nums []int) {

	var left, right int

	for right < len(nums) {
		if nums[right] != 0 {
			var tmp = nums[left]
			nums[left] = nums[right]
			nums[right] = tmp
			left++
			right++
		} else {
			right++
		}
	}
}
```

