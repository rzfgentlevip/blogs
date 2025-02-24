---
# 这是文章的标题
title: 最大子数组和
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

# 最大子数组和

[53. 最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

## 解题思路

### 动态规划

1. 确定dp数组（dp table）以及下标的含义

**dp[i]：包括下标i之前的最大连续子序列和为dp[i]**。

2. 确定递推公式

dp[i]只有两个方向可以推出来：

- dp[i - 1] + nums[i]，即：nums[i]加入当前连续子序列和
- nums[i]，即：从头开始计算当前连续子序列和

一定是取最大的，所以dp[i] = max(dp[i - 1] + nums[i], nums[i]);

3. dp数组如何初始化

从递推公式可以看出来dp[i]是依赖于dp[i - 1]的状态，dp[0]就是递推公式的基础。

dp[0]应该是多少呢?

更具dp[i]的定义，很明显dp[0]因为为nums[0]即dp[0] = nums[0]。

4. 确定遍历顺序

递推公式中dp[i]依赖于dp[i - 1]的状态，需要从前向后遍历。

**注意最后的结果可不是dp[nums.size() - 1]！** 

在回顾一下dp[i]的定义：包括下标i之前的最大连续子序列和为dp[i]。

那么我们要找最大的连续子序列，就应该找每一个i为终点的连续最大子序列。

所以在递推公式的时候，可以直接选出最大的dp[i]。

### 贪心算法

贪心算法使用一个中间变量保存累加结果，如果累加后小于0，就重置累加值为0，累加过成中获取最大值；

以`nums = [-2,1,-3,4,-1,2,1,-5,4]`为例，使用sum记录中间累加结果，使用max保存最终最大值，其计算过程如下;

```java
第一次：-2,1,-3,4,-1,2,1,-5,4 sum=0 max = 0
第二次：-2,1,-3,4,-1,2,1,-5,4 sum=1 max = 1
-2,1,-3,4,-1,2,1,-5,4 sum=0 max = 1
-2,1,-3,4,-1,2,1,-5,4 sum=4 max = 4
-2,1,-3,4,-1,2,1,-5,4 sum=3 max = 4
-2,1,-3,4,-1,2,1,-5,4 sum=5 max = 5
-2,1,-3,4,-1,2,1,-5,4 sum=6 max = 6
-2,1,-3,4,-1,2,1,-5,4 sum=1 max = 6
-2,1,-3,4,-1,2,1,-5,4 sum=5 max = 6
```

最终结果max=6

## 代码实现

### java

~~~java
class Solution {
    public int maxSubArray(int[] nums) {

        return maxSubArray_A(nums);

    }

    public int maxSubArray_A(int[] nums) {

        int sz = nums.length;

        if(sz == 0){
            return 0;
        }
        int res = nums[0];
        int dp[] = new int[sz];
        dp[0]=nums[0];
        for(int i=1;i<sz;i++){
            dp[i]=Math.max(dp[i-1]+nums[i],nums[i]);
            if(dp[i]>res){
                res = dp[i];
            }
        }
        return res;

    }
}
~~~

### go实现

```java
func maxSubArray(nums []int) int {

	if nums == nil || len(nums) == 0 {
		return 0
	}
	/*声明动态规划数组,根据已知数组长度创建一个数组*/
	dp := make([]int, len(nums))
	/*初始化动态数组*/
	dp[0] = nums[0]
	sum := nums[0]

	for i := 1; i < len(nums); i++ {
		/*比较最大值*/
		dp[i] = max(dp[i-1]+nums[i], nums[i])
		sum = max(sum, dp[i])
	}
	return sum
}
```

