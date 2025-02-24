---
# 这是文章的标题
title: 无重复字符的最长子串
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
<!-- TOC -->

- [无重复字符的最长子串](#无重复字符的最长子串)
  - [滑动窗口代码框架](#滑动窗口代码框架)
    - [滑动窗口代码框架](#滑动窗口代码框架-1)
  - [解题思路](#解题思路)
  - [代码实现](#代码实现)
    - [go实现](#go实现)
    - [go语言中for循环类型](#go语言中for循环类型)
      - [迭代循环](#迭代循环)
      - [条件循环](#条件循环)
    - [go语言中map结构](#go语言中map结构)
  - [go语言中栈和队列](#go语言中栈和队列)
      - [队列](#队列)
      - [栈实现](#栈实现)
    - [java实现](#java实现)

<!-- /TOC -->

# 无重复字符的最长子串

[无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

## 滑动窗口代码框架

> https://leetcode.cn/problems/max-consecutive-ones-iii/solution/fen-xiang-hua-dong-chuang-kou-mo-ban-mia-f76z/

**代码框架**

~~~java
def findSubArray(nums):
    N = len(nums) # 数组/字符串长度
    left, right = 0, 0 # 双指针，表示当前遍历的区间[left, right]，闭区间
    sums = 0 # 用于统计 子数组/子区间 是否有效，根据题目可能会改成求和/计数
    res = 0 # 保存最大的满足题目要求的 子数组/子串 长度
    while right < N: # 当右边的指针没有搜索到 数组/字符串 的结尾
        sums += nums[right] # 增加当前右边指针的数字/字符的求和/计数
        while 区间[left, right]不符合题意: # 此时需要一直移动左指针，直至找到一个符合题意的区间
            sums -= nums[left] # 移动左指针前需要从counter中减少left位置字符的求和/计数
            left += 1 # 真正的移动左指针，注意不能跟上面一行代码写反
        # 到 while 结束时，我们找到了一个符合题意要求的 子数组/子串
        res = max(res, right - left + 1) # 需要更新结果
        right += 1 # 移动右指针，去探索新的区间
    return res
~~~

### 滑动窗口代码框架

```java
  /* 滑动窗口算法框架 */
    public static void slidingWindow(String s, String t) {
//        定义窗口
        HashMap<Character, Integer> window = new HashMap<>();
//        定义目标字符串
        HashMap<Character, Integer> need = new HashMap<>();
        char[] source = s.toCharArray();
        char[] chars= t.toCharArray();
//        添加字符串到目标map
        for (char c : chars) {
            if(need.containsKey(c)){
                need.put(c,need.getOrDefault(c,0)+1);
            }else {
                need.put(c,1);
            }

        }
//定义左右窗口指针
        int left = 0, right = 0;
//        定义窗口中有效字符变量
        int valid = 0;
        while (right < s.length()) {
            // c 是将移入窗口的字符
            char c = source[right];
            // 右移窗口
            right++;
            // 进行窗口内数据的一系列更新
        ...

            /*** debug 输出的位置 ***/
            System.out.println("left ="+left+"  right ="+right);
            /********************/

            // 判断左侧窗口是否要收缩
            while (window needs shrink) {
                // d 是将移出窗口的字符
                char d = source[left];
                // 左移窗口
                left++;
                // 进行窗口内数据的一系列更新
            ...
            }
        }
    }
```

这个算法技巧的时间复杂度是 O(N)，⽐字符串暴⼒算法要⾼效得多。

其中两处...表示的更新窗口数据的地方，到时候你直接往里面填就行了。

## 解题思路

使用滑动

窗口，使用一个HashMap维护每一个字符的下表，然后移动滑动窗口：

1. 如果当前元素没有在窗口当中，那么就将当前元素添加到Map中，value记录元素在数组中的位置。
2. 当map中含有元素，那么就更新窗口的左侧边界。
3. 每次循环计算最长不重复子数组即可

## 代码实现

### go实现

在go中，使用队列模拟窗口，队列使用数组数据结构，数组头是队列头，数组尾是队列末尾，每次新入元素插入到数组末尾，出队元素从数组头获取；

借助map结构，可以高效判断当前窗口中是否包含某一个元素;

算法步骤：

1. 将字符串转换成字符数组，遍历字符数组
2. 如果当前元素在map中出现，就从窗口头开始出队列元素，map中对应的元素也要出队列
3. 直到窗口中不含当前遍历元素为止
4. 如果当前元素不在队列中，将当前元素入队列，并且长度+1
5. 遍历过程中比较队列最大长度和历史长度，取大者即可；

**代码实现**

```go
/*
*
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
*/
func lengthOfLongestSubstring(s string) int {

	/*将字符串转换成字符数组*/
	str := []byte(s)

	/*使用数组当作队列*/
	var queue []byte
	/*使用map判断当前元素是否在队列中*/
	m := make(map[byte]bool, 0)

	/*记录长度*/
	var res, tmplen int
	/*遍历字符数组*/
	for _, val := range str {
		/*条件循环*/
		for m[val] {
			/*说明当前队列中已经存在val元素*/
			ch := queue[0]
			queue = queue[1:]
			//	删除map中的元素
			delete(m, ch)
			/*更新队列临时长度*/
			tmplen = len(queue)
		}

		/*长度+1 并且将元素入队列*/
		tmplen++
		/*记录遍历过程中最大长度*/
		res = max(res,tmplen)
		/*如果队列中不存在当前遍历元素，就将元素添加到队列中*/
		queue = append(queue, val)
		m[val] = true
	}
	return res
}

```

### go语言中for循环类型

#### 迭代循环

迭代循环和java语言中的for循环一样，声明变量然后循环变量执行循环；

```go
 for n := 1; n < N; n++ {
        fmt.Println("n=", n)
    }
}
```

#### 条件循环

条件循环和java中的while 一样，使用条件作为循环判断

```go
for n < N{
	fmt.Println("n=", n)
	n += 1
}

比如在本题中，判断map中是否包含某一个值 使用的是条件循环
for m[val] {
			/*说明当前队列中已经存在val元素*/
			ch := queue[0]
			queue = queue[1:]
			//	删除map中的元素
			delete(m, ch)
			/*更新队列临时长度*/
			tmplen = len(queue)
}
```

### go语言中map结构

```text
//map创建 创建一个map结构，长度是0
m := make(map[byte]bool, 0)

//判断map中是否包含某一个元素
条件循环
for m[val] {}
if条件判断
if v,ok := m[val];ok{}

//删除map中的某一个元素
delete(map, key)

//遍历map
	/*遍历map*/
for key, val := range map1 {
	fmt.Printf("key:%s, value:%s\n", key, val)
}

/*通过key遍历map*/
for key := range map1 {
	fmt.Printf("key:%s, value:%s\n", key, map1[key])
}
```

## go语言中栈和队列

go语言中没有标准的数据结构实现，因此一般使用切片模拟数据结构实现，下面简单介绍下栈和队列的实现；

#### 队列

```go
//使用数组模拟队列
var queue []byte
//元素出队列
ch := queue[0]
queue = queue[1:]
//元素入队列
queue = append(queue, val)
//求队列长度
len(queue)
```

#### 栈实现

```go
//使用数组模拟队列
var stack []byte
//元素出栈
ch := queue[len(stack) - 1]
queue = queue[1:]
//元素入栈
stack = append(stack, val)
//求队列长度
len(stack)
```



### java实现

~~~java
    public int lengthOfLongestSubstring_A(String s){

         if (s.length()==0) return 0;
        HashMap<Character, Integer> map = new HashMap<Character, Integer>();
        int max = 0;
        int left = 0;
        for(int i = 0; i < s.length(); i ++){
            if(map.containsKey(s.charAt(i))){
                left = Math.max(left,map.get(s.charAt(i)) + 1);
            }
            map.put(s.charAt(i),i);
            max = Math.max(max,i-left+1);
        }
        return max;
        
    }
~~~

时间复杂度：o(n)

