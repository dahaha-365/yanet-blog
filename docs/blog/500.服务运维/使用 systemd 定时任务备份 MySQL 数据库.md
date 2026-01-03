---
tags:
  - MySQL
  - Linux
title: 使用 systemd 定时任务备份 MySQL 数据库
copyright:
  creation: original
  author:
    name: YaNet
createTime: 2026/01/03 03:10:42
permalink: /blog/tp5e16g5/
---

众所周不知，Linux 系统里的 systemd 服务除了可以用来管理系统服务以外，还可以实现定任务，功能还比 crontab 更加强大。

<RepoCard repo="dahaha-365/mysqldump-systemd" provider="github" />

**MySQLDump-Systemd** 就是一个使用 systemd timer 和 mysqldump 实现数据库定时备份的工具，可以在备份后自动向管理员发送邮件通知，不信的可以看看我的邮箱截图，就问你靠不靠谱😎。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260103111727276.png)

备份程序自身的管理交给 systemd，运行情况一目了然。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260103113006587.png)

除了邮件通知以外，这个脚本还支持自定义分库备份、自定义基于时间或数量的保留策略、压缩备份、刷新日志、自定义 mysqldump 参数等功能，应付平时搞外快的小项目还是很不错的。