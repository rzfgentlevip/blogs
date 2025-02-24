---
# 这是文章的标题
title: 链表相交
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


# 链表相交

[ 链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists/description/?envType=study-plan-v2&envId=top-100-liked)

## 思路一

a为相交前的节点数，c为相交点到链表结尾的节点数。

- 若相交，链表A： a+c, 链表B : b+c
- a+c+b+c = b+c+a+c 。则会在公共处c起点相遇。
- 若不相交，a+b = b+a 。因此相遇处是NULL

## 代码实现

### java实现

~~~ java
public ListNode getIntersectionNode_A(ListNode headA, ListNode headB){
        ListNode curA = headA;
        ListNode curB = headB;
        // 要么相遇即节点相等，要么都为空即无缘无分，最终都能跳出感情的死循环。
        while(curA != curB){
            // 两人以相同的速度（一次一步）沿着各自的路径走，当走完各自的路时，再“跳”至对方的路上。（起点平齐速度相同，终点即为相遇点）
            curA = (curA == null? headB:curA.next);
            curB = (curB == null? headA:curB.next);
        }
        return curA;
    }
~~~

时间复杂度是o(m+n)，m,n分别是两个链表的长度。

### go实现

```go
func main() {

	node1 := ListNode{1, nil}
	node2 := ListNode{2, nil}
	node3 := ListNode{3, nil}
	node4 := ListNode{4, nil}
	node5 := ListNode{5, nil}
	node1.Next = &node2
	node2.Next = &node3
	node3.Next = &node4
	node4.Next = &node5

	node6 := ListNode{6, nil}
	node7 := ListNode{7, nil}
	node8 := ListNode{8, nil}
	node6.Next = &node7
	node7.Next = &node8
	node8.Next = &node3
	node := getIntersectionNode(&node1, &node6)

	fmt.Println(node)

}
func getIntersectionNode(headA, headB *ListNode) *ListNode {

	if headB == nil || headA == nil {
		return nil
	}
	/*定义当前节点*/
	curA := headA
	curB := headB
	for curA != curB {
		if curA != nil {
			curA = curA.Next
		} else {
			curA = headB
		}

		if curB != nil {
			curB = curB.Next
		} else {
			curB = headA
		}
	}
	return curA
}

/*定义链表节点*/
type ListNode struct {
	val  int
	Next *ListNode
}

```

## **思路二**

首先求出两条链表各自的长度，然后求出两条链表的差值n。

让长的链表先走n步，然后两条链表开始同步走，如果遇到值相同的节点，就是相交的节点。

### 代码实现

~~~ java
// 思路二
     public ListNode getIntersectionNode_B(ListNode headA, ListNode headB) {

        //  先求链表A的长度
        ListNode l1=headA;
        int lA=0;
        int lB=0;
        while(l1 != null){
            lA++;
            l1=l1.next;
        }
        ListNode l2=headB;
        while(l2 != null){
            lB++;
            l2=l2.next;
        }
        // 求两条链表的插值
        int diff=lA > lB ? lA-lB:lB-lA;
        if(lA > lB){
            l1=headA;
            for(int i=0;i< diff;i++){
                l1 =l1.next;
            }

        }else{
            l2=headB;
            for(int j=0;j< diff;j++){
                l2=l2.next;
            }
        }

        // 让两个链表同步移动

        while(l1 != null){
            if(l1.val == l2.val){
                return l1;
            }
            l1 = l1.next;
            l2 = l2.next;

        }

        return null;

     }
~~~

- 时间复杂度：o(n+m)