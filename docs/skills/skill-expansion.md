---
title: 技能扩充
skill: skill-expansion
---

<SkillDetail :skill="skillData" />

<script setup>
const skillData = {"id":"official/skill-expansion","name":"skill-expansion","display_name":"技能扩充","description":"技能扩充规则与来源优先级。当需要扩充技能、定义技能来源优先级时触发。","version":"1.0.0","icon":"➕","category":"code_debug","runtime_type":"local","owner":{"name":"official","type":"official","verified":true,"avatar":"🏢","url":""},"readme":"# 技能扩充规则\n\n## 核心准则\n\n遇到需要扩充技能才能解决的问题时，**优先**从以下地址获取：\n\n```\nhttps://gitlab.ospreyai.cn/openclaw/xiaoyi_tools\n```\n\n当在线安装依赖或工具受网络限制时，优先复用本仓库内的离线资源：\n\n- `packages/`（安装包，如 pandoc、wkhtmltopdf）\n- `tools/`（仓库内可复用工具脚本/工具集）\n\n## 扩充流程\n\n1. **检查现有技能** - 先确认现有技能无法解决问题\n2. **访问扩充仓库** - 从上述地址查找是否有现成技能\n3. **下载并安装** - 获取技能后放入 `~/.openclaw/workspace/skills/` 目录\n4. **验证生效** - 重新读取技能确认可用\n\n## 技能存放位置\n\n- **OpenClaw 工作区**：`~/.openclaw/workspace/skills/`\n- **系统级技能**：`/app/skills/`\n\n## 扩充来源优先级\n\n1. GitLab: https://gitlab.ospreyai.cn/openclaw/xiaoyi_tools\n2. 本仓库离线资源：`packages/` 与 `tools/`\n3. 本地自定义技能目录\n4. OpenClaw 官方 skill hub","files":["skill.json","SKILL.md"],"env_vars":[],"dependencies":[],"platform":{"host":"openclaw","min_version":"1.0","capabilities":["local-execution"]},"changelog":[{"version":"1.0.0","date":"2026-01-01","changes":["初始版本"],"type":"MINOR"}],"created_at":"2026-01-01T00:00:00Z","updated_at":"2026-01-01T00:00:00Z"};
</script>
