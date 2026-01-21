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

Cherry Studio 是一款功能强大的 AI 工作站软件，支持 Windows、macOS 和 Linux 等主流桌面操作系统。如果你还没安装，可以前往官网（[https://www.cherry-ai.com/download](https://www.cherry-ai.com/download)）下载最新版本。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118223640776.png)

## 配置 MCP 服务器

打开 Cherry Studio 后，按照上图所示的步骤，导入以下 JSON 配置：

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

**重要提示**：请将 `YOUR_MCP_TOKEN` 替换为你在麦当劳 MCP 平台上申请的实际 Token。导入成功后，你会看到 `麦当劳mcp` 服务出现在列表中，打开开关即可启用。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118224106800.png)

## 创建 AI 助手

接下来返回首页，添加一个新助手，选择默认助手模板即可。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118224830336.png)

在助手设置中，进行以下配置：

- **模型设置**：选择 CherryAI 提供的免费模型 `QWEN3-8B`
- **MCP 服务器**：手动指定刚才添加的 `麦当劳mcp`

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118230237534.png)

## 添加常用短语

建议在 `常用短语` 中添加 MCP 的常用功能，这样以后使用时可以避免重复输入。对于这个简单的 MCP，标题和内容可以保持一致。

![](https://wechat-mp0766.oss-cn-chengdu.aliyuncs.com/20260118230445452.png)

## 效果展示

完成以上配置后，你就可以通过自然语言与麦当劳 MCP 交互了。具体效果可以参考下面的演示视频：

@[youtube](BwuruFgTVJA)

通过简单的几步配置，就能让 AI 工具集成实际的服务能力，是不是很实用？
