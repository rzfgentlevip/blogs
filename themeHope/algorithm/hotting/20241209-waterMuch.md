---
# 这是文章的标题
title: 盛最多水的容器
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

# 盛最多水的容器

[盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

## 题目分析

给定一个数组，数组中的值代表桶高，找到数组中的两个值，使其和x轴围起来的部分可以盛最多的水；

分析题目中，题目没有明确告知数组中数组的大小顺序，这是其一，其二，数组中的值代表桶高，根据短木桶原则，因此桶高只能取小者；

## 使用双指针法

![1647671366325](https://tprzfbucket.oss-cn-beijing.aliyuncs.com/hadoop/202203/19/142927-780736.png)

目标是求区间面积的最大值，所以，需要在两端分别设计一个指针向中间移动，移动一次求出一个面积。

- 每次遍历，都判断面积是否是最大的，取最大即可。
- 但是在双指针向中间移动过程中，需要判断一下，哪一个指针元素对应的元素值小，先移动哪一个指针，因为我们要求所有可求的区间面积的最大值。

### go实现

```go
func maxArea_A(height []int) int {

	left := 0
	right := len(height) - 1
	var res int
	for left < right {
		i := height[left]
		j := height[right]
		maxArea := (right - left) * min(i, j)
		res = max(res, maxArea)
		if i < j {
			left++
		} else {
			right--
		}

	}
	return res
}

/*返回最大值和最小值函数*/
func min(a int, b int) int {
	if a > b {
		return b
	}
	return a
}
func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

```

### java实现

~~~java
class Solution {
    public int maxArea(int[] height) {

        return maxArea_A(height);
    }

//使用双指针
    public int maxArea_A(int []height){

        int sz = height.length;
        if(sz ==0){
            return 0;
        }
        int left = 0;
        int right = sz-1;
        int maxArea = 0;
        while(left < right){
            int area = (right-left)*Math.min(height[left],height[right]);           
            maxArea = Math.max(maxArea,area);
            // 下面类似于二分查找
            if(height[left] < height[right]){
                left++;
            }else{
                right--;
            }
            
        }

        return maxArea;
    }
}
~~~

时间复杂度：o(n)

