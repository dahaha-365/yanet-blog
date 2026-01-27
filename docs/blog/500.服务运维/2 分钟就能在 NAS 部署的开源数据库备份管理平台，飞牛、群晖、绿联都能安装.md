---
tags:
  - NAS
  - 数据库
title: NAS 就能部署的开源数据库备份管理平台，飞牛、群晖、绿联都能安装
copyright:
  creation: original
  author:
    name: YaNet
createTime: 2026/01/27 19:54:26
permalink: /blog/quz7w07d/
---

## 使用场景

你是不是也经历过这样的“深夜惊魂”？😱  
辛辛苦苦搭的小项目刚跑顺，数据库却突然崩了——没备份、手忙脚乱、冷汗直流……更别提还要手动写 cron 脚本、配 rsync、搞加密、再上传到云盘，一套操作下来头发都白了几根！🤯

别慌！今天就给你安利一个超贴心的“数据守护神”——**Databasus**！✨  
它专为像你我这样的小团队或独立开发者量身打造，不用敲一堆命令行，也不用担心漏掉关键步骤。只需两分钟，点点鼠标🖱️，就能自动给 PostgreSQL、MySQL、MariaDB 甚至 MongoDB 安排上加密备份，稳稳存到 S3、Google Drive 或 FTP 上～🔒☁️

而且它还会“盯”着你的数据库健康状态，一有异常立刻通过 Slack 或 Telegram 喊你：“老板，出事啦！”🚨 再配上清晰的审计日志，谁动了数据、啥时候备的份，全都一目了然～

部署？简单到飞起！Docker 一键拉起，自托管、高安全、只读权限 + AES-256 加密，隐私和安心全都有！💪

小项目，也要有大保障——Databasus，让你的数据睡个安稳觉 😴💾！

## 功能简介

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260127200218944.png)

**Databasus** 是一款专为 **PostgreSQL** 设计的开源、自托管数据库备份工具，同时也兼顾支持 **MySQL**、**MariaDB** 和 **MongoDB**。该平台提供直观的 **Web 界面**，允许用户在两分钟内快速配置自动化备份计划，并支持将数据加密存储至 **S3**、**Google Drive** 或 **FTP** 等多种云端及本地空间。除了核心的备份功能，它还集成了 **实时健康监测**、**多渠道通知**（如 Slack 和 Telegram）以及详尽的 **审计日志**，确保数据安全与系统透明。无论是独立开发者还是企业 **DevOps 团队**，都能通过其 **Docker** 化部署方案，轻松实现生产环境下的高可用备份管理。该工具强调**安全性**与**易用性**，通过 AES-256 加密和只读访问权限保护敏感信息，是传统命令行备份方式的高效替代方案。

目前 Databasus 在 Github 上已经超过 5000 Star，如果它对你真的有用，可以去送个星星。[Github链接](https://github.com/databasus/databasus)。

## 备份步骤

在 Databasus 中创建一个备份任务非常简单，通常只需要在 Web 界面中通过以下 **4 个主要步骤**即可完成：

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260124165024367.png)

1. **输入数据库信息**

 - 填写数据库的连接凭据，包括 **主机地址 (Host)、端口号 (Port)、数据库名称、用户名和密码**。
 - 选择对应的数据库版本（例如 PostgreSQL 12-18）并决定是否需要 **SSL 连接**。
 - 连接成功后页面会建议你创建一个只读用户用于备份，可以根据自己的要求采纳。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260124165425369.png)

2. **选择备份计划**

 - 你需要根据需求选择备份的频率，支持 **每小时、每天、每周、每月** 或自定义 **Cron 表达式**。
 - 你可以指定具体的运行时间（例如凌晨 4:00），对于大型数据库，建议选择**交通低谷期**以减少对性能的影响。
 - 你可以指定备份是否需要加密、备份储存周期、失败重试次数、备份文件大小限制等。
 - **注：** 系统默认会对备份进行**平衡级压缩**，这通常能节省 4 到 8 倍的存储空间，且对备份速度的影响较小（约慢 20%）。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260124165327012.png)

3. **选择备份存储目标**

 - 指定备份文件的存放位置。你可以选择**本地路径 (Local Path)、S3 存储桶、Google Drive、Dropbox、NAS 或 SFTP** 等。
 - 请确保所选存储空间有足够的容量来存放备份文件。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260124165834841.png)

4. **配置通知渠道**

 - 你可以设置在备份成功或失败时接收通知。
 - 支持的渠道包括 **Slack、Discord、Telegram、电子邮件或 Webhook**。

这里可以用国内比较常用的 QQ 邮箱进行通知。设置可以参考下图。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260127202705999.png)

**完成与验证：** 填写完上述信息后，点击 **“Save”**。Databasus 会立即**验证信息**的准确性，启动计划任务并执行首次备份任务，你可以在界面上实时查看任务状态。备份完成后，支持**一键恢复**功能。

## NAS 部署最佳实践

使用 docker 部署是最简单的，现在的 NAS 甚至是路由器都支持 docker，只需要用下面的 `docker-compose.yaml` 新建一个容器就可以了。

```yaml
services:
  databasus:
    container_name: databasus
    image: databasus/databasus:latest
    ports:
      - "4005:4005"
    volumes:
      - ./databasus-data:/databasus-data
    restart: unless-stopped
```

容器建立后，在浏览器输入 `NAS的IP地址:4005` 就可以打开 Databasus 了。