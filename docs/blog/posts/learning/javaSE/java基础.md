---
title: Java 基础：从类型到异常
aliases: ['Java基础', 'Java基础语法', 'basics']
shortTitle: Java 基础
date: 2024-03-20
lastUpdated: 2026-10-29
tags: ['Java', 'JavaSE', '基础']
category: learning
description: 理清基本类型、引用、字符串比较与异常处理，用一个可以运行的小例子串起 Java 基础。
aside: true
outline: deep
---

学习 Java 时，先把三个问题说清楚：变量里放的是什么，方法拿到的是什么，程序出错时如何把信息交出去。语法细节会很多，但这三个问题会一直出现在后面的集合、框架和业务代码里。

本文示例使用 Java 17，核心语法也适用于后续版本。

## 变量与类型：先区分值和引用

Java 有八种基本类型：`byte`、`short`、`int`、`long`、`float`、`double`、`char` 和 `boolean`。基本类型变量保存对应的值，引用类型变量保存对对象的引用。

```java
int a = 10;
int b = a;
b = 20; // 不会改变 a

int[] first = {1, 2, 3};
int[] second = first;
second[0] = 9; // first[0] 也变成 9
```

这两个数组变量指向同一个数组。需要独立数组时，可以用 `first.clone()` 或 `Arrays.copyOf(first, first.length)`；如果元素本身也是对象，复制数组并不会继续复制这些对象。

`final` 限制的是变量重新赋值。`final List<String> names` 不能再指向另一份列表，但原列表是否允许增加元素，取决于列表本身的实现。

## 方法参数：Java 始终按值传递

方法得到的是实参值的副本。对引用类型来说，复制的是引用值，因此可以通过它修改同一个对象，却不能让调用方的变量改为引用另一个对象。

```java
static void update(int[] values) {
    values[0] = 42;           // 修改共同引用的数组
    values = new int[] {99}; // 只改变方法内部的变量
}
```

调用 `update(data)` 后，`data[0]` 是 `42`，而不是 `99`。把它理解成“引用也作为一个值被复制”，比“对象按引用传递”更准确。

## 字符串比较：内容相同不等于引用相同

`==` 比较基本类型的值，或引用是否指向同一个对象；字符串的内容比较用 `equals`。

```java
String input = new String("Java");
System.out.println(input == "Java");      // false
System.out.println("Java".equals(input)); // true，也允许 input 为 null
```

`String` 不可变。`replace`、`substring` 等操作返回新的结果，不会修改原字符串。循环拼接大量内容时，可以使用 `StringBuilder`。

如果既要允许两边为 `null`，又要比较内容，可以使用 `Objects.equals(left, right)`。

## 数字计算：注意除法、拆箱与精度

| 表达式 | 结果或行为 | 原因 |
| --- | --- | --- |
| `5 / 2` | `2` | 两个整数相除，结果仍是整数 |
| `5 / 2.0` | `2.5` | 运算包含浮点数 |
| `Integer n = null; int x = n;` | 抛出 `NullPointerException` | 自动拆箱需要一个实际对象 |
| `0.1 + 0.2` | 不一定精确等于 `0.3` | 二进制浮点数不能精确表示所有十进制小数 |

金额等需要十进制精确运算的场景，可以使用 `BigDecimal`。优先用字符串构造，例如 `new BigDecimal("0.1")`；`BigDecimal.valueOf(0.1)` 也比直接 `new BigDecimal(0.1)` 更符合通常的十进制预期。除法还要明确保留位数与舍入方式。

## 异常：把失败变成清晰的边界

检查型异常通常需要捕获或在方法签名中声明；`RuntimeException` 及其子类不要求这样做。是否捕获，应取决于当前层能否做出有意义的恢复，而不只是为了让报错消失。

解析用户输入可以在输入边界处理格式错误，底层文件读取失败则应保留原始原因。使用文件、流等需要关闭的资源时，优先考虑 `try-with-resources`。

不要写一个空的 `catch`。如果要转换异常，可以传入原始异常作为 `cause`，让调用方仍能追踪错误来源。

## 一个可以运行的输入例子

保存为 `BasicsDemo.java`，执行 `java BasicsDemo.java 21`。也可以分别输入 `-1`、`abc`，或不传参数，观察不同的错误路径。

```java
public class BasicsDemo {
    static int parseAge(String input) {
        int age = Integer.parseInt(input);
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("年龄应在 0 到 150 之间");
        }
        return age;
    }

    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("用法：java BasicsDemo.java <年龄>");
            return;
        }
        try {
            int age = parseAge(args[0]);
            System.out.println("下一岁：" + (age + 1));
        } catch (NumberFormatException e) {
            System.out.println("请输入整数");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

`NumberFormatException` 是 `IllegalArgumentException` 的子类，因此应先捕获更具体的异常。调换顺序会产生编译错误。

## 用三个问题检查理解

1. `final int[] values` 中的元素能修改吗？为什么？
2. 为什么 `update` 可以修改数组元素，却不能替换调用方的数组？
3. 输入格式错误时，应在每个底层方法里打印日志，还是由明确的边界统一处理？

下一步可以阅读 [面向对象](/blog/posts/learning/javaSE/面向对象)，看看如何把这些规则组织成有职责的对象。

参考：[Java 语言规范：类型与值](https://docs.oracle.com/javase/specs/jls/se17/html/jls-4.html)、[Objects API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Objects.html)、[BigDecimal API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/math/BigDecimal.html)。
