---
title: ArrayList.remove(1) 删的是哪个 1
shortTitle: ArrayList 删除元素
aliases: ['remove(int)', 'remove(Object)', '删除元素']
date: 2026-10-30
lastUpdated: 2026-10-30
tags: ['Java', 'ArrayList', '集合']
category: learning
description: 同样传一个 1，可能是按下标删除，也可能是按值删除。把两个重载放在一起试一下。
aside: true
outline: deep
---

有个列表 `[1, 2, 1]`，要删掉数字 1，直接写 `remove(1)` 会怎样？删掉的是中间那个 2。

## 两个方法，长得一样

```java
E remove(int index)
boolean remove(Object value)
```

参数是基本类型 `int` 时，优先匹配按下标删除的重载。列表存的是 `Integer`，也不会让编译器自动把这里的 `1` 理解成“值为 1 的元素”。

完整例子可以保存成 `RemoveDemo.java`，用 Java 17 或更新版本运行：

```java
import java.util.ArrayList;
import java.util.List;

public class RemoveDemo {
    public static void main(String[] args) {
        var byIndex = new ArrayList<>(List.of(1, 2, 1));
        var byValue = new ArrayList<>(List.of(1, 2, 1));

        byIndex.remove(1);
        byValue.remove(Integer.valueOf(1));

        System.out.println(byIndex); // [1, 1]
        System.out.println(byValue); // [2, 1]
    }
}
```

`remove(Object)` 只删除第一个相等的元素。如果要删掉所有值为 1 的元素，可以写 `list.removeIf(value -> value == 1)`；前提是列表里不含 `null`，否则这里的拆箱会抛异常。允许 `null` 时用 `Integer.valueOf(1).equals(value)` 更稳妥。

## 回溯代码里为什么传 size - 1

原来的[回溯笔记](/blog/posts/interview/代码随想录/回溯算法-组合)里有这一句：

```java
path.remove(path.size() - 1);
```

`size() - 1` 是最后一个位置。刚刚向路径末尾加了什么，现在就撤销末尾这一项。即使路径里出现重复的数，这个操作也能撤销本层加入的那个位置。

如果改成按值删除，可能先删到前面相同的数；如果路径为空，按下标删除则会直接越界。看这行代码时，把“删除末尾位置”读出来，比只看一个 `remove` 更清楚。

集合本身还有一层限制。`List.of(...)` 得到的列表不能修改，所以例子先包成了 `ArrayList`。重载选对了，也不表示每种 `List` 都支持删除。

更多集合差异放在[集合笔记](/blog/posts/learning/javaSE/容器)里。官方签名见 [ArrayList API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html)。
