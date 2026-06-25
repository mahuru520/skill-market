---
title: QQ 渠道接入
skill: openclaw-qq-channel
---

<SkillDetail :skill="skillData" />

<script setup>
const skillData = {"id":"official/openclaw-qq-channel","name":"openclaw-qq-channel","display_name":"QQ 渠道接入","description":"将 QQ 机器人接入 OpenClaw。当用户请求 QQ 渠道接入、配置 AppID/AppSecret、验证消息收发时触发。","version":"1.0.0","icon":"🐧","category":"mail_communication","runtime_type":"local","owner":{"name":"official","type":"official","verified":true,"avatar":"🏢","url":""},"readme":"# OpenClaw 接入 QQ 渠道\n\n## 使用场景\n\n- 在 QQ 开放平台创建并接入机器人\n- 在 OpenClaw 中安装 QQBot 插件并配置凭证\n- 验证 QQ 端与 OpenClaw 双向通信\n\n## 执行步骤\n\n1. 在 QQ 开放平台创建 QQBot 并获取 `AppID/AppSecret`\n2. 安装插件：`openclaw plugins install @tencent-connect/openclaw-qqbot@latest`\n3. 添加渠道：`openclaw channels add --channel qqbot --token \"AppId:AppSecret\"`\n4. 重启网关：`openclaw gateway restart`\n5. 在 QQ 客户端中进行对话验证\n\n## 验收标准\n\n- 插件安装成功并已加载\n- 渠道配置成功、无鉴权错误\n- QQ 端可正常收发 AI 对话消息\n\n## 详细手册\n\n- `../../docs/技能用户手册/OpenClaw快速接入QQ指南.md`","files":["skill.json","SKILL.md"],"env_vars":[{"key":"QQ_APP_ID","description":"QQ 机器人 AppID","required":true,"source":"QQ 开放平台","example":"qq-xxx"},{"key":"QQ_APP_SECRET","description":"QQ 机器人 AppSecret","required":true,"source":"QQ 开放平台","example":"secret 占位"}],"dependencies":[],"platform":{"host":"openclaw","min_version":"1.0","capabilities":["channel-qq"]},"changelog":[{"version":"1.0.0","date":"2026-01-01","changes":["初始版本"],"type":"MINOR"}],"created_at":"2026-01-01T00:00:00Z","updated_at":"2026-01-01T00:00:00Z"};
</script>
