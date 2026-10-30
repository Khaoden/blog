---
title: JavaScript闭包详解
shortTitle: JavaScript 闭包
aliases: ['JavaScript 闭包', 'closure', 'javascript-closure']
date: 2024-03-20
lastUpdated: 2026-10-30
tags: ['JavaScript', '闭包']
category: learning
description: 外层函数已经返回，计数为什么还留着？用两个计数器和循环里的回调看闭包。
aside: true
outline: deep
---

`makeCounter()` 已经执行完，返回的函数却还能继续修改 `n`。闭包要解释的就是这个现象。

## 先跑一下这个计数器

```js
function makeCounter() {
  let n = 0
  return function next() {
    n += 1
    return n
  }
}

const a = makeCounter()
const b = makeCounter()
console.log(a()) // 1
console.log(a()) // 2
console.log(b()) // 1
```

`a` 和 `b` 来自两次调用，各自保存了对那次调用中词法环境的访问。`a` 的 `n` 变成 2，不会顺便把 `b` 的 `n` 也改掉。

这里保留的是对变量绑定的访问。把它理解成“返回时把变量的值拍了张照片”，后面遇到回调读到新值就会想不通。

## 循环里为什么打印出三个 3

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// 3、3、3
```

三个回调读的是同一个 `i`。等同步循环结束，`i` 已经是 3，定时器回调才有机会执行。延迟写成 0，也不表示回调会插队到当前同步代码前面。

换成 `let`：

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// 0、1、2
```

这个 `for` 循环为每次迭代建立独立的词法绑定，各个回调因此读到不同的 `i`。闭包仍然存在，变的是它们访问的绑定。

## 能藏住变量，也可能一直留着对象

计数器没有暴露直接修改 `n` 的入口，很适合说明闭包如何把状态和操作放在一起。事件监听器也常常这样用。

如果一个长期存在的监听器引用了很大的对象，这个对象可能一直不能被回收。组件销毁时移除监听、结束不再需要的定时器，是在清理这些长期引用。

闭包本身不等于内存泄漏。是否能够回收，要看还有没有可达的引用；也不是执行一次 `removeEventListener`，所有相关对象就一定立即释放。

顺手试一个改动：把 `n` 放到 `makeCounter` 外面，再运行最开始的例子。两个计数器就会共享它了。这比背“内部函数访问外部变量”更容易记住作用域的区别。

参考：[MDN：闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures)。
