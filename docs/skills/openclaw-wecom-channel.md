---
title: 企业微信渠道接入
skill: openclaw-wecom-channel
---

<SkillDetail :skill="skillData" />

<script setup>
const skillData = {"id":"official/openclaw-wecom-channel","name":"openclaw-wecom-channel","display_name":"企业微信渠道接入","description":"将企业微信机器人接入 OpenClaw。当用户请求企业微信渠道接入、配置 Bot ID/Secret、验证连通时触发。","version":"1.0.0","icon":"🏢","category":"mail_communication","runtime_type":"local","owner":{"name":"official","type":"official","verified":true,"avatar":"🏢","url":""},"readme":"# OpenClaw 接入企业微信渠道\n\n## 使用场景\n\n- 在企业微信中启用 OpenClaw AI 对话\n- 通过企业微信智能机器人进行消息交互\n\n## 执行步骤\n\n1. 在企业微信创建 API 模式机器人并获取 `Bot ID/Secret`\n2. 安装企业微信频道插件（如 `npx -y @wecom/wecom-openclaw-cli install`）\n3. 按提示填写凭证完成绑定\n4. 验证机器人收发消息能力\n\n## 验收标准\n\n- 插件安装成功\n- 凭证配置通过\n- 企业微信端可正常与 OpenClaw 对话\n\n## 详细手册\n\n- `../../docs/技能用户手册/企业微信接入OpenClaw.md`","files":["skill.json","SKILL.md"],"env_vars":[{"key":"WECOM_BOT_ID","description":"企业微信机器人 Bot ID","required":true,"source":"企业微信管理后台","example":"wecom-xxx"},{"key":"WECOM_BOT_SECRET","description":"企业微信机器人 Secret","required":true,"source":"企业微信管理后台","example":"secret 占位"}],"dependencies":[],"platform":{"host":"openclaw","min_version":"1.0","capabilities":["channel-wecom"]},"changelog":[{"version":"1.0.0","date":"2026-01-01","changes":["初始版本"],"type":"MINOR"}],"created_at":"2026-01-01T00:00:00Z","updated_at":"2026-01-01T00:00:00Z"};
</script>
