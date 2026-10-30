---
title: PowerShell 里的 where、curl 和引号
shortTitle: PowerShell 命令与别名
aliases: ['where.exe', 'curl.exe', '调用运算符', 'Windows Terminal']
date: 2026-10-30
lastUpdated: 2026-10-30
tags: ['Windows', 'PowerShell', '终端']
category: technology
description: 从命令解析和 PowerShell 版本查起，分清别名、外部程序，以及为什么带空格的路径需要调用运算符。
aside: true
outline: deep
---

网上复制来一条命令，放进 PowerShell 却变了意思，先用 `Get-Command` 看看执行的到底是谁。

```powershell
Get-Command where -All
Get-Command curl -All
```

## where 不一定在找文件

PowerShell 中的 `where` 通常是 `Where-Object` 的别名，用来筛选管道对象：

```powershell
Get-Process | Where-Object { $_.ProcessName -like '*code*' }
```

想调用 Windows 的命令查找工具时，用 `where.exe` 写清楚，例如 `where.exe cursor`。这两种用途都正常，只是同一个名字容易让人带错预期。

## curl 的含义和版本有关

Windows PowerShell 5.1 默认提供名为 `curl` 的 `Invoke-WebRequest` 别名；PowerShell 7 不再默认提供这个别名。不过个人配置仍然可能定义同名函数或别名，所以实际结果以 `Get-Command` 为准。

需要使用原生 curl、并且系统已安装它时，可以明确写：

```powershell
curl.exe -I https://example.com
```

看到网上的 `curl -H ...` 一类参数不被接受，先检查命令解析结果，再检查参数。不要只凭终端窗口的外观判断它是哪种 shell。

## 引号包起来之后，它先是一个字符串

带空格的可执行路径需要引号。PowerShell 要执行这个字符串指定的程序，还需要调用运算符 `&`。用常见的用户安装路径举例：

```powershell
$cursor = Join-Path $env:LOCALAPPDATA 'Programs\cursor\Cursor.exe'
if (Test-Path $cursor) {
    & $cursor .
}
```

`$cursor` 里保存路径，`&` 发起调用，后面的 `.` 才是传给程序的参数。如果安装目录不同，先改路径；不用把路径和所有参数拼成一大段字符串。

## && 报错时，先看 PowerShell 版本

```powershell
$PSVersionTable.PSVersion
```

`&&`、`||` 这种管道链运算符从 PowerShell 7 开始支持。Windows PowerShell 5.1 不支持这套语法。Windows Terminal 是终端宿主，在它里面开了一个 5.1 会话，语法仍然是 5.1。

例如检查 Git 外部命令是否成功，可以在 5.1 中分开写：

```powershell
git diff --check
if ($LASTEXITCODE -eq 0) {
    git status --short
}
```

`$LASTEXITCODE` 对应最近一次原生程序的退出码。PowerShell 自己的命令还要按它的成功状态和错误处理机制判断，不能把所有命令都当成原生程序处理。

相关：[PATH 排查](/blog/posts/technology/os/Windows改了PATH还是找不到命令)。参考：[命令优先级](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_command_precedence)、[调用运算符](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_operators)。
