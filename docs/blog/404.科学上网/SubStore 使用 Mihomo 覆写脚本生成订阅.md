---
tags:
  - SubStore
  - Mihomo
  - Clash
title: SubStore 使用 Mihomo 覆写脚本生成订阅
copyright:
  creation: original
  author:
    name: YaNet
createTime: 2025/12/29 01:37:05
permalink: /blog/2ivre320/
---

[Mihomo 覆写脚本](https://github.com/dahaha-365/YaNet/tree/main/Mihomo)不知不觉公开一年多了，最初是因为机场的策略分组不好用才去研究的，没想到这个小脚本也能获取几百个⭐️。

Mihomo 覆写脚本能实现精细化的代理策略，告别机场订阅乱七八糟的分组。下图是 Clash Party 使用后的效果。通过 SubStore 直接生成覆写后的订阅文件，**不需要在软件上再运行覆写脚本**。

![Clash Party 使用效果](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20251230011327927.png)

喜欢的可以到项目 Github 上点个星星。

<RepoCard repo="dahaha-365/YaNet" provider="github" />

## 更新了什么

1. 重构了执行过程，现在切换订阅速度快了一些
2. 作用客户端脚本使用起来不方便，顺便改造了一下，现在==支持导入 SubStore，直接从 SubStore 生成订阅链接了=={.important}🎉！
3. 在 SubStore 使用的时候能通过连接参数，实现更加个性化的定制。

## 在 SubStore 怎么用

### 在文件管理页签中添加一个 Mihomo 配置

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20251230224802582.png)

在脚本操作中添加脚本链接，为了下载速度更快，可以使用镜像地址

`https://hk.gh-proxy.org/https://raw.githubusercontent.com/dahaha-365/YaNet/refs/heads/main/Mihomo/global_script.js`

也可以使用 Github 的原始链接：

`https://github.com/dahaha-365/YaNet/raw/refs/heads/main/Mihomo/global_script.js`

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20251230225256422.png)

在 SubStore 里使用可以设置参数，使脚本更加个性化，具体的参数可以参考下表

### 参数表

:::: field-group

::: field name="enable" type="boolean" optional="true" default="true"
总开关
:::

::: field name="mode" type="string" optional="true" default="default"
模式，可以设置为`securest | secure | default | fast | fastest`，影响 dns 分流，越靠近 securest 越倾向于使用国外的 doh，越靠近 fastest 越倾向于使用国内 ip dns，如果不担心 dns 泄漏的话，推荐设置为 `fast`，可以获得优秀的响应速度。这个参数优先级比`defaultDNS`、`directDNS`、`chinaDNS`、`foreignDNS`低。
:::

::: field name="ruleSet" type="string" optional="true" default="all"
代理组（分流规则），可以设置为`apple | microsoft | github | google | openai | spotify | youtube | bahamut | netflix | tiktok | disney | pixiv | hbo | mediaHMT | biliintl | tvb | hulu | primevideo | telegram | line | whatsapp | games | japan | ads`，代理组之间用**半角分号**相隔
:::

::: field name="regionSet" type="string" optional="true" default="all"
代理组（地区分组），可以设置为`HK | US | JP | KR | SG | CN | TW | GB | DE | MY | TK | CA | AU`，代理组之间用**半角分号**相隔
:::

::: field name="excludeHighPercentage" type="boolean" optional="true" default="true"
是否过滤高倍率节点，设置为`true`的话，倍率高于`globalRatioLimit`的节点将会被忽略
:::

::: field name="globalRatioLimit" type="number" optional="true" default="2"
过滤高倍率节点的阈值
:::

::: field name="skipIps" type="string" optional="true" default="10.0.0.0/8;100.64.0.0/10;169.254.0.0/16;172.16.0.0/12;192.168.0.0/16;198.18.0.0/15;FC00::/7;FE80::/10;::1/128"
应用在`sniffer['skip-src-address']`、`sniffer['skip-dst-address']`、`tun['route-exclude-address']`，在 Clash Party 里，`tun['route-exclude-address']`会被软件设置覆盖
:::

::: field name="defaultDNS" type="string" optional="true" default="119.29.29.29;223.5.5.5"
用作 Mihomo 配置的`default-nameserver`，必须为IP，以半角分号分隔
:::

::: field name="directDNS" type="string" optional="true" default="119.29.29.29;223.5.5.5"
用作 Mihomo 配置的`direct-nameserver`，以半角分号分隔
:::

::: field name="chinaDNS" type="string" optional="true" default="https://doh.pub/dns-query;https://dns.alidns.com/dns-query"
用作 Mihomo 配置的`nameserver`、`proxy-server-nameserver`，和`nameserver-policy`的中国站点策略，以半角分号分隔
:::

::: field name="foreignDNS" type="string" optional="true" default="https://dns.google/dns-query;https://dns.adguard-dns.com/dns-query"
用作 Mihomo 配置`nameserver-policy`的 gfw 站点策略，以半角分号分隔
:::

::: field name="mode" type="string" optional="true" default="default"
可取值为`securest | secure | default | fast | fastest`，影响脚本生成的 DNS 地址，在国内的响应速度排序大概是`securest < secure < default < fast < fastest`，安全性排序和速度排序相反。最终采用的 DNS 会被上面几项设置的值覆盖
:::

::::

### 生成订阅链接

最后按照下图的操作生成一个分享链接，就可以导入科学上网软件进行订阅了。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20251231022346676.png)

### 常见问题

#### 使用 tun 模式后，某些内网 ip 段无法访问

这是因为 tun 模式下，所有流量都会被路由到 VPN 隧道，导致内网流量无法访问。解决方法是在 `skipIps` 参数中添加内网 ip 段。例如 `192.168.0.0/16` 是内网 IP，在引入覆写脚本时可以这样设置参数：

:::: field-group

::: field name="skipIps" type="string" optional="true" default="default"
`10.0.0.0/8;100.64.0.0/10;169.254.0.0/16;172.16.0.0/12;192.168.0.0/16;`**192.169.0.0/16;**`198.18.0.0/16;FC00::/7;FE80::/10;::1/128`
:::

::::

`10.0.0.0/8;100.64.0.0/10;169.254.0.0/16;172.16.0.0/12;192.168.0.0/16;198.18.0.0/16;FC00::/7;FE80::/10;::1/128` 是本覆写脚本默认的 `skipIps` 参数值，在覆写这个值时建议在这个默认值的基础上添加个性化参数。原因是默认值包含了一些常用的内网 IP 段，添加个性化参数可以避免一些不必要的问题。原因可以参照：[保留IP地址](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80)。

#### FlClash 和 Bettbox 报错

由于这两个客户端默认状态会改写 geox 配置，需要在`资源`中修改 geo 文件的配置。

| 资源名称    | URL                                                                            |
|---------|--------------------------------------------------------------------------------|
| GeoIp   | https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat         |
| GeoSite | https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat       |
| MMDB    | https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb      |
| ASN     | https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb |

