---
theme: aurora-glass
themeName: 极光玻璃
tags:
  - Mac
  - Apple
title: 出售 Mac 电脑前重装系统的最快方法
copyright:
  creation: original
  author:
    name: YaNet
createTime: 2026/02/22 15:41:21
permalink: /blog/1vn9x5d4/
---

# 出售 Mac 电脑前重装系统的最快方法

最近打算把一台 2015 mid Macbook Pro 换成钱，根据官方的说明《[出售、赠送、折抵或回收 Mac 前该怎么做](https://support.apple.com/zh-cn/102773)》在恢复模式抹掉硬盘后，使用网络恢复模式非常慢，而且经常出现 `1005F` 错误。折腾了快两天还没重装好干净的系统。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260222145756862.png)

后来发现了一个开源软件 [Mist](https://github.com/ninxsoft/Mist)，可以一键生成各个版本的 Mac 安装 U 盘。使用 U 盘安装全新的系统。

<RepoCard repo="ninxsoft/Mist" provider="github" />

## 安装

在 Mac 系统里最高效的方法肯定是用 brew 安装了，在命令行输入 `brew install --cask mist` 就可以。

## 使用方法

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260222151605205.png)

Mist 的使用方法也是简单得很傻瓜的。插入 U 盘，打开软件，切换到 `Installers` 页签，选择对应的系统版本，点击磁盘的图标。选择需要制作成安装 U 盘的磁盘。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260222151846025.png)

选择以后就会自动下载系统镜像并进行制作，像我要换钱那台老古董，最多能安装 `12.7.6` 版本了也是没有问题的，因为 Mist 支持制作从需要做的就是去冲一杯咖啡☕️。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260222152152516.png)

下载速度还是相当快的。一般在咖啡还烫嘴的时候就已经制作好了，等界面全部显示绿色勾勾✅的时候就可以拔出 U 盘了。在需要重装的电脑上插入 U 盘，按住 `Option` 键启动，选择从安装 U 盘启动就可以重新安装系统了。
