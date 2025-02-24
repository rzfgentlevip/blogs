---
# 这是文章的标题
title: 缺失的第一个整数
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 5
# 设置作者
author: bugcode
# 设置写作时间
date: 2024-12-25
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

# 缺失的第一个整数

[缺失的第一个整数](https://leetcode.cn/problems/first-missing-positive/?envType=study-plan-v2&envId=top-100-liked)

## 思路分析

题目限制：时间复杂度为 `O(n)` 并且只使用常数级别额外空间的解决方案。

题目限制时间复杂度是o(n)级别内找到缺失的第一个整数，意味着不能使用排序的方法；

核心是判断从1开始，哪一个数字没有出现在数组中，因此可以将数组中的元素放到set集合中，然后使用累加变量逐步累加，判断是否在set集合中出现，如果出现就累加1，直到不出现为止；

## 代码实现

### java实现

```java
public class FirstMissingPositive {

    public static void main(String[] args) {

        int []arr ={3,4,-1,1};
        int i = firstMissingPositive(arr);
        System.out.println(i);

    }


    /**
     * 输入：nums = [1,2,0]
     * 输出：3
     * 解释：范围 [1,2] 中的数字都在数组中。
     * @author yourname
     * @date 20:00 2024/12/26
     * @param nums
     * @return int
     **/
    public static int firstMissingPositive(int[] nums) {

        if(nums == null || nums.length == 0){
            return 0;
        }
        HashSet<Integer> sets = new HashSet<>();
        for(int num:nums){
            sets.add(num);
        }
        int addNum=1;
        while (sets.contains(addNum)){
            addNum++;
        }
        return addNum;
    }
}
```

### go实现

```java
func firstMissingPositive(nums []int) int {

	if nums == nil || len(nums) == 0 {
		return 0
	}
	/*创建map当作set使用*/
	mapTmp := make(map[int]bool)

	/*遍历数组，返回index,val 如果不需要index，就是用_代替*/
	for _, num := range nums {
		mapTmp[num] = true
	}

	for addSum := 1; ; {
		if _, ok := mapTmp[addSum]; ok {
			addSum++
		} else {
			return addSum
		}
	}
	return 0
}
```

