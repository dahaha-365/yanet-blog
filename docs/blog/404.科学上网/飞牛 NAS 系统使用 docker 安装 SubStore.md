---
tags:
  - 飞牛
  - Docker
  - NAS
title: 飞牛 NAS 系统使用 docker 安装 SubStore
copyright:
  creation: original
  author:
    name: YaNet
createTime: 2026/01/06 22:09:35
permalink: /blog/z5uqykwa/
---

### Docker 部署 SubStore

上篇文章说了 [Mihomo 覆写脚本在 SubStore 的用法](/blog/2ivre320/)。可是怎么才能拥有一个私人的 SubStore 呢？

其实也不是特别难，随便找个能运行 docker 的设备，例如我用虚拟机安装的飞牛OS，在一个空文件夹里新建一个`docker-compose.yaml`输入下面的内容。

```yaml
name: "Sub Store"
services:
    sub-store:
        image: "xream/sub-store:latest"
        container_name: "sub-store"
        restart: always
        network_mode: bridge
        ports:
            - "23456:23456"
        environment:
          - SUB_STORE_BACKEND_API_PORT=23456
          - SUB_STORE_BACKEND_API_HOST=0.0.0.0
          - SUB_STORE_BACKEND_MERGE=true
          - SUB_STORE_FRONTEND_BACKEND_PATH=/PrivateSubStore
          - SUB_STORE_BACKEND_UPLOAD_CRON=30 23 * * *
          - SUB_STORE_MMDB_COUNTRY_URL=https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb
          - SUB_STORE_MMDB_COUNTRY_PATH=/opt/app/data/Country.mmdb
          - SUB_STORE_MMDB_ASN_URL=https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb
          - SUB_STORE_MMDB_ASN_PATH=/opt/app/data/ASN.mmdb
          - SUB_STORE_MMDB_CRON=0 6 * * *
```

然后按下图的步骤建立一个容器。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260106223313785.png)

容器启动后访问飞牛的 IP 加上 23456 端口就可以打开属于自己的 SubStore 了！下一步是让 SubStore 可以在公网访问，这样我们才能做到一份订阅走天下。

# 高性价比的内网穿透

说到内网穿透，最出名的就是大名鼎鼎的花生壳了。不过在这里要介绍的是一个远程组网新秀——**[节点小宝](https://www.iepose.com/)**。在飞牛应用中心内也可以找到小宝的飞牛端。

节点小宝只要注册就能获得一个 2Mbps 带宽，5GB 流量每月的内网穿透通道，比花生壳免费版好一点点。但是只要少喝几杯咖啡，开会员就能升级到 12Mbps 带宽，200GB 流量每月。98 的服务完全对得起 92 的价格。

做好内网穿透以后，我们就可以在手机、办公室、女朋友手机都用上一样的丝滑配置了。