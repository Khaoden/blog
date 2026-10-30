---
title: 写了 .gitignore，文件怎么还在 Git 里
shortTitle: .gitignore 不忽略已跟踪文件
aliases: ['git rm --cached', '取消跟踪', '忽略文件']
date: 2026-10-30
lastUpdated: 2026-10-30
tags: ['Git', 'gitignore', '工具']
category: technology
description: .gitignore 不会自动取消已跟踪文件。先确认跟踪状态，再把文件从索引移除，本地文件可以留下。
aside: true
outline: deep
---

把 `.env.local` 写进 `.gitignore`，`git status` 仍然显示它有改动，这种情况先查它是不是已经被跟踪了。

```sh
git ls-files -- .env.local
```

有输出，就说明它在索引里。`.gitignore` 控制的是未跟踪文件的忽略规则，不会替你把已经跟踪的文件移出去。

## 看规则和看跟踪状态，是两件事

```sh
git check-ignore -v --no-index -- .env.local
```

`-v` 显示匹配的规则来自哪个文件、哪一行。`--no-index` 让已经被跟踪的文件也参与规则检查，便于确认“如果没有被跟踪，它会不会被忽略”。

看到忽略规则匹配成功，同时 `git ls-files` 还能查到文件，这两个结果并不冲突。

## 本地文件留下，只取消 Git 跟踪

确认不再需要把这份本地配置放进仓库后：

```sh
git rm --cached -- .env.local
git add .gitignore
git status --short
```

`--cached` 只从索引移除，本地文件还在。状态里可能出现 `D .env.local`，表示下一次提交会记录“仓库中删除这个文件”，不要仅凭这个 D 就以为磁盘上的文件也被删了。

提交前再核对暂存的变化：

```sh
git diff --cached --stat
git diff --cached -- .gitignore
```

这里按具体文件处理就够了。为了让一个文件停止跟踪，没有必要先把整个仓库 `git rm -r --cached .` 再重新添加。

## 历史提交还在

取消跟踪只影响后续提交，过去提交过的内容仍然能从历史里找到。如果文件里放过有效凭据，忽略规则不能把已公开的凭据变回秘密；需要先撤销或轮换它，再决定如何处理历史。

普通的本地配置则简单得多：仓库里留一份不带私密值的 `.env.example`，实际配置放在被忽略的 `.env.local` 中。

参考：[gitignore](https://git-scm.com/docs/gitignore)、[git-rm](https://git-scm.com/docs/git-rm)、[git-check-ignore](https://git-scm.com/docs/git-check-ignore)。
