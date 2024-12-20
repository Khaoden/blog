---
layout: doc
title: 终端命令快速进入 IDE（Windows）
date: 2024-03-20
tags: ['os', 'windows']
category: 'technology'
description: 终端命令快速进入 IDE（Windows）
readingTime: 10
aside: true
outline: deep
---
# 终端命令快速进入 IDE（Windows）

当我们需要通过终端打开 IDE 时，通常会先从文件资源管理器找到指定路径，再在路径定位处输入 `cmd` 或 `PowerShell` 打开终端，随后输入对应命令启动 IDE，这种方式可以非常快捷地进入开发环境。

------

## 常用 IDE 命令示例

- **VS Code**

  ```shell
  code .
  ```

  - `code` 代表 `VSCode.exe` 文件。
  - `.` 表示当前路径。

- **JetBrains IDEA**

  ```shell
  idea64 .
  ```

  - `idea64` 类似 `code`，指代 `idea64.exe`。

------

> **问题引入**
> JetBrains 系列以及 VS Code 默认配置好了环境变量，可以直接在终端中输入命令打开。如果是其他工具（例如 Cursor 编译器），可能无法直接输入 `cursor .` 打开。

------

## **解决方案**

1. **配置环境变量**
   将 Cursor 的安装路径加入系统环境变量中。以 Cursor 为例：

   ```plaintext
   C:\Users\22123\AppData\Local\Programs\cursor\Cursor.exe
   ```

   配置完成后，就可以直接使用以下命令：

   ```shell
   cursor .
   ```

2. **通过注册表配置（不推荐）**
   修改注册表实现全局调用，但因操作复杂且存在风险，此处不详述。

------

> **进一步问题**
> 在 `cmd` 中启动 Cursor 时，会输出一大段字符，同时 `Ctrl+C` 关闭终端时，Cursor 也会随之关闭。然而，我们希望像 VS Code 或 IDEA 一样，即使终端关闭，程序仍然能够保持运行，并在需要时继续操作终端。

------

## **优化方案**

1. **使用 PowerShell 或 `start` 命令**
   PowerShell 和 Windows 提供了工具可启动分离型进程（与终端分离运行）：

   - PowerShell 示例：

     ```powershell
     code .
     ```

   - CMD 示例：（不分离）

     ```shell
     start "" "C:\Users\22123\AppData\Local\Programs\cursor\Cursor.exe" .
     ```

2. **配置类似 VS Code 的行为**

   - **了解进程知识**
     当程序运行时，操作系统会为其创建一个独立的**进程**。如果进程与终端绑定（如默认启动 Cursor），终端关闭时进程会被销毁。
     为了避免这种情况，可以配置 Cursor 的启动参数，或者使用启动工具让其支持后台运行。

------

## 补充：进程相关知识

1. **什么是进程？**
   进程是一个程序的运行实例，包括程序代码和运行时资源。在操作系统中，进程有两种主要形式：

   - **前台进程**：直接与用户交互，例如从终端启动的 Cursor。
   - **后台进程**：无界面或与终端无关联的程序，关闭终端后仍然运行。

2. **进程与终端的关系**

   - **绑定型进程**：默认情况下，进程与终端绑定，终端关闭会导致进程结束。
   - **分离型进程**：进程脱离终端运行，即使终端关闭，程序也不会退出。可以通过启动参数或 `start` 命令实现。

3. **后台运行的实现方式**

   - 使用启动参数（如 `--detach`）或工具（如 `start` 命令）。

   - 在 Linux 系统中，使用 

     ```
     &
     ```

      或 

     ```
     nohup
     ```

      实现后台运行，例如：

     ```shell
     ./cursor &
     ```

4. **进程生命周期**
   进程的生命周期通常包括：

   - **创建**：程序加载，资源分配。
   - **运行**：执行指令。
   - **阻塞**：等待资源。
   - **终止**：任务完成或被终止。

5. **如何管理进程？**

   - **任务管理器**：通过 `Ctrl+Shift+Esc` 打开，查看和终止进程。
   - 命令行工具：
     - Windows：`tasklist` 查看，`taskkill` 终止。
     - Linux：`ps` 查看，`kill` 终止。
