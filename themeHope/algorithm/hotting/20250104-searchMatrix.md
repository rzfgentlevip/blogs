---
# 这是文章的标题
title: 搜索二维矩阵 II
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


## 搜索二维矩阵 II

[240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

## 思路分析

> 最简单使用暴力法解决，遍历二维数组找到目标值，但是时间复杂度是o(M*N),题目已经告知横向纵向都是有序的，因此我们可以使用二叉排序树思路解决；

如下图所示，我们将矩阵逆时针旋转 45° ，并将其转化为图形式，发现其类似于 二叉搜索树 ，即对于每个元素，其左分支元素更小、右分支元素更大。因此，通过从 “根节点” 开始搜索，遇到比 target 大的元素就向左，反之向右，即可找到目标值 target 。

![](https://vscodepic.oss-cn-beijing.aliyuncs.com/blog/image-20250104125225853.png)

将矩阵转换为二叉排序树，就可以根据二叉排序树特性进行快速搜索；

“根节点” 对应的是矩阵的 “左下角” 和 “右上角” 元素，本文称之为 标志数 ，以 matrix 中的 左下角元素 为标志数 flag ，则有:

    若 flag > target ，则 target 一定在 flag 所在 行的上方 ，即 flag 所在行可被消去。
    若 flag < target ，则 target 一定在 flag 所在 列的右方 ，即 flag 所在列可被消去。

## 算法流程

- 从矩阵 matrix 左下角元素（索引设为 (i, j) ）开始遍历，并与目标值对比：
  - 当 matrix[i][j] > target 时，执行 i-- ，即消去第 i 行元素。
  - 当 matrix[i][j] < target 时，执行 j++ ，即消去第 j 列元素。
  - 当 matrix[i][j] = target 时，返回 true ，代表找到目标值。
  - 若行索引或列索引越界，则代表矩阵中无目标值，返回 false 。

每轮 i 或 j 移动后，相当于生成了“消去一行（列）的新矩阵”， 索引(i,j) 指向新矩阵的左下角元素（标志数），因此可重复使用以上性质消去行（列）。

## 实现

### go实现

```java
func main() {

	matrix := [][]int{{1, 4, 7, 11, 15}, {2, 5, 8, 12, 19}, {3, 6, 9, 16, 22}, {10, 13, 14, 17, 24}, {18, 21, 23, 26, 30}}
	b := searchMatrix(matrix, 5)

	fmt.Println(b)
}

func searchMatrix(matrix [][]int, target int) bool {
	if matrix == nil || len(matrix) == 0 {
		return false
	}

	left := 0
	right := len(matrix[0]) - 1

	for left < len(matrix) && right >= 0 {

		if matrix[left][right] > target {
			right--
		} else if matrix[left][right] < target {
			left++
		} else if matrix[left][right] == target {
			return true
		}
	}
	return false
}
```

### java实现

```java
public static boolean searchMatrix(int[][] matrix, int target) {

        if(matrix == null || matrix.length == 0){
            return false;
        }

        int i=0;
        int j=matrix[0].length-1;
        while (i < matrix.length && j >=0 ){
            if(matrix[i][j] == target){
                return true;
            }else if(matrix[i][j] > target){
                j--;
            }else if(matrix[i][j] < target){
                i++;
            }
        }
        return false;
    }
```

