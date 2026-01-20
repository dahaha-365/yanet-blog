---
tags:
  - AI
  - Cherry Studio
title: 把麦当劳 MCP 装进 Cherry Studio
copyright:
  creation: original
  author:
    name: YaNet
createTime: 2026/01/18 17:38:08
permalink: /blog/ix4zfjsu/
---

Cherry Studio 是一个一站式的 AI 工作站软件，可以先到官网（[https://www.cherry-ai.com/download](https://www.cherry-ai.com/download)）下载，地球上 90% 的桌面操作系统都可以用。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118223640776.png)

首先打开 Cherry Studio，按照上图的步骤导入下面这段 JSON。

```json
{
  "mcpServers": {
    "麦当劳mcp": {
      "type": "streamablehttp",
      "url": "https://mcp.mcd.cn/mcp-servers/mcd-mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_TOKEN"
      }
    }
  }
}
```

记得要把 `YOUR_MCP_TOKEN` 换成在麦当劳 MCP 平台上申请的 Token。导入成功会出现 `麦当劳mcp` 的服务。打开开关就可以了。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118224106800.png)

接下来需要会到首页，添加一个助手，选择默认助手就可以。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118224830336.png)

`模型设置` 里的默认模型选择 `CherryAI` 免费的 `QWEN3-8B` 就可以。`MCP服务器`需要手动指定刚才添加的`麦当劳mcp`。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118230237534.png)

`常用短语`建议添加一下，按照 mcp 的功能添加就可以，这样可以免除以后需要打字的痛苦。在这个简单的 mcp 里，标题和内容都可以一样。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118230445452.png)

最终的效果可以看视频。是不是感觉要用好 AI 也不是那么难？

@[youtube](BwuruFgTVJA)
