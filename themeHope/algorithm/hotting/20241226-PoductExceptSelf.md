---
# 这是文章的标题
title: 除自身以外数组的乘积
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


# 除自身以外数组的乘积

[除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked)

## 思路分析

```java
示例 1:

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
```

令结果集为数组res;

res[i] 等于除i下表元素本身外，小于i下表的元素乘积 * 大于i下标元素的乘积，因此可以定义两个数组pre[],post[],pre保存i左边元素的乘积，post保存i右边元素的乘积;因此可得res[i] = pre[i] * post[i];

## 代码实现

### java实现

```java
public class PoductExceptSelf {

    public static void main(String[] args) {

        int arr[]={1,2,3,4};

        int[] res = productExceptSelf(arr);
        System.out.println(Arrays.toString(res));

    }

    /**
     * 输入: nums = [1,2,3,4]
     * 输出: [24,12,8,6]
     * @author yourname
     * @date 18:51 2024/12/26
     * @param nums
     * @return int[]
     **/
    public static int[] productExceptSelf(int[] nums) {

        if(nums == null || nums.length == 0){
            return null;
        }
        int []pre = new int[nums.length];
        int []post = new int[nums.length];
        pre[0] = 1;
        post[nums.length-1] = 1;

        /*先求左边的值*/
        for (int i=1;i<nums.length;i++){
            pre[i] = pre[i-1]*nums[i-1];
        }
        /*求右边的值*/
        for(int j=nums.length-2;j>=0;j--){
            post[j] = post[j+1]*nums[j+1];
        }

        int res[] = new int[nums.length];
        for(int i=0;i<nums.length;i++){
            res[i] = pre[i]*post[i];
        }
        return res;
    }
}
```

