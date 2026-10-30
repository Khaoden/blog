---
title: 回溯时，为什么要复制 path
shortTitle: 回溯里的 path 和撤销
aliases: ['res.add(path)', 'path.remove', '回溯撤销']
date: 2026-10-30
lastUpdated: 2026-10-30
tags: ['Java', '回溯', '组合']
category: interview
description: 用 n=4、k=2 走一遍路径的加入和撤销，再看为什么收集结果时要 new ArrayList。
aside: true
outline: deep
---

[原来的组合笔记](/blog/posts/interview/代码随想录/回溯算法-组合)有两行很值得单独拿出来看：

```java
res.add(new ArrayList<>(path));
path.remove(path.size() - 1);
```

一行保存结果，一行恢复现场。它们处理的是同一个可变列表，想清楚这一点，回溯就没那么绕了。

## 先只走 [1, 2] 这一条路

从 1 到 4 选两个数，路径变化可以写成：

```text
[]
加入 1       → [1]
  加入 2     → [1, 2]  满两个，保存一份
  撤销 2     → [1]
  加入 3     → [1, 3]  满两个，再保存一份
  撤销 3     → [1]
  加入 4     → [1, 4]  保存
  撤销 4     → [1]
撤销 1       → []
加入 2       → [2]
  接着找 3、4……
```

撤销 2 之后，1 还在。因为当前只是从“选 2”这条分支返回，下一条分支仍然要复用前面已经选好的 1。

## 直接 add(path) 会留下什么

```java
var path = new java.util.ArrayList<Integer>();
var result = new java.util.ArrayList<java.util.List<Integer>>();
path.add(1);
path.add(2);
result.add(path);
path.clear();
System.out.println(result); // [[]]
```

结果里存的是同一个列表的引用。后来把 `path` 清空，结果看到的也就成了空列表。`new ArrayList<>(path)` 在收集这一刻复制元素，后续修改路径不会跟着修改已保存的列表。

这里的元素是 `Integer`，浅拷贝已经够用。如果元素换成可变对象，还要继续考虑对象内部的状态。

## 一份可以重复调用的写法

```java
import java.util.ArrayList;
import java.util.List;

public class CombineDemo {
    static List<List<Integer>> combine(int n, int k) {
        if (n < 0 || k < 0 || k > n) {
            throw new IllegalArgumentException("要求 0 <= k <= n");
        }
        List<List<Integer>> result = new ArrayList<>();
        collect(n, k, 1, new ArrayList<>(), result);
        return result;
    }

    static void collect(int n, int k, int start,
                        List<Integer> path, List<List<Integer>> result) {
        if (path.size() == k) {
            result.add(new ArrayList<>(path));
            return;
        }
        int last = n - (k - path.size()) + 1;
        for (int value = start; value <= last; value++) {
            path.add(value);
            collect(n, k, value + 1, path, result);
            path.remove(path.size() - 1);
        }
    }

    public static void main(String[] args) {
        System.out.println(combine(4, 2));
        System.out.println(combine(4, 2).size()); // 再调用，仍然是 6
    }
}
```

输出的六组是 `[1, 2]`、`[1, 3]`、`[1, 4]`、`[2, 3]`、`[2, 4]`、`[3, 4]`。

`last` 是剪枝后的上界：后面的数至少要够填完剩余位置。先不剪枝，用 `value <= n` 也能得到正确结果，只是会多走一些凑不满的分支。

这个版本把 `result` 放在每次调用内部。如果把它放成成员变量，却在下一次调用前忘了清空，第二次得到的结果就可能混入第一次的数据。调试时也要分清：是递归分支没撤销，还是两次独立调用共享了旧结果。
