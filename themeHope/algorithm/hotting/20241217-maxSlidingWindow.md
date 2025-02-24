---
# 这是文章的标题
title: 滑动窗口最大值
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


# 滑动窗口最大值

[滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

## 思路分析

1. 维护一个最大优先队列
2. 当队列中的元素不足k个，就入队元素
3. 当队列中的元素个数为k时，将队列最大值出队，然后从队尾出队列一个元素
4. 循环遍历数组，直到末尾;

### 优先队列

使用优先队列维护窗口内的最大值排列。

~~~java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {

        return maxSlidingWindow_A(nums,k);
    }

    public int[] maxSlidingWindow_A(int nums[],int k){

        int sz = nums.length;
        ArrayList<Integer> list = new ArrayList();

        PriorityQueue<Integer> maxQyeye = new PriorityQueue(k,new Comparator<Integer>(){

            public int compare(Integer o1,Integer o2){
                return o2-o1;
            }
        });

        int left = 0;
        int right = 0 ;

        while(right < sz){

            // 维护窗口中的最大值
            if(maxQyeye.size() <= k){
                maxQyeye.add(nums[right]);
            }

            // 当元素个数为k的时候，开始缩小窗口
            if(maxQyeye.size() == k){
                // 添加窗口内最大的元素
                list.add(maxQyeye.peek());
                int temp = nums[left];
                maxQyeye.remove(temp);
                left++;
            }
            right++;
        }

        int res[] = new int[list.size()];
        for(int i=0;i<list.size();i++){
            res[i]= list.get(i);
        }
        return res;
    }
}
~~~

