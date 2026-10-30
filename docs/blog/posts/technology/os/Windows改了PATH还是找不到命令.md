---
title: Windows 改了 PATH，终端还是找不到命令
shortTitle: 改了 PATH 仍找不到命令
aliases: ['cursor不是内部或外部命令', '找不到cursor', '环境变量']
date: 2026-10-30
lastUpdated: 2026-10-30
tags: ['Windows', 'Cursor', 'PATH', 'PowerShell']
category: technology
description: 先看命令实际从哪里找到，再查当前终端的 PATH。常见问题是旧进程还拿着旧环境变量。
aside: true
outline: deep
---

接着原来的[终端启动 Cursor 笔记](/blog/posts/technology/os/Windows终端命令快捷进入cursor)补几个排查步骤。已经改过环境变量时，先别继续往 PATH 里重复加路径。

## 先问终端：你找到了哪个文件

在 PowerShell 里执行：

```powershell
Get-Command cursor -All
where.exe cursor
```

第一条会检查 PowerShell 能解析到的命令，包括函数、别名和外部程序；第二条适合看当前目录、PATH 等位置下匹配的可执行文件。如果有多个结果，先看真正调用的是哪一份，避免旧安装目录抢在前面。

这里用的是 `where.exe`。直接写 `where`，在 PowerShell 里通常会命中 `Where-Object` 的别名，含义就变了。

## PATH 里应该放目录

用户安装版 Cursor 常见的命令包装器在下面的位置，但实际路径取决于安装方式：

```powershell
$cursorBin = Join-Path $env:LOCALAPPDATA 'Programs\cursor\resources\app\bin'
Test-Path (Join-Path $cursorBin 'cursor.cmd')
```

返回 `False` 就先找实际安装位置，不要原样照填。PATH 加的是包含 `cursor.cmd` 的目录，不是把整个 `cursor.cmd` 文件名填进去。

只想验证路径是否正确，可以临时加到当前会话：

```powershell
$env:Path = "$cursorBin;$env:Path"
Get-Command cursor -All
```

这只改变当前进程的环境，关掉这个终端就没有了。确认有效后，再通过 Windows 的用户环境变量设置持久保存。

## 新开了标签页，也可能还是旧环境

一个进程启动子进程时，子进程通常继承它当时的环境。已经打开的 Windows Terminal、IDE 或其他终端宿主，不一定自动换成修改后的那一份 PATH。

所以排查顺序是：保存环境变量 → 退出旧终端宿主 → 从开始菜单重新打开 → 再运行 `Get-Command cursor -All`。IDE 集成终端仍不对时，连 IDE 也一起重启。

可以把当前进程实际拿到的值拆开看：

```powershell
$env:Path -split ';'
[Environment]::GetEnvironmentVariable('Path', 'User') -split ';'
```

前者是当前进程的环境；后者读取用户级配置。当前 PATH 通常还包含机器级目录等内容，不要求两份逐行相等，但可以据此判断新加的用户目录有没有进入当前进程。

能找到命令之后，`cursor .` 中的点表示当前目录。如果打开的项目不对，先运行 `Get-Location`；这时要查的是工作目录，已经不是 PATH 问题了。

参考：[PowerShell 的环境变量](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_environment_variables)、[Get-Command](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/get-command)。
