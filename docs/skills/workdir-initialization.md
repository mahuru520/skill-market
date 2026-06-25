---
title: 工作目录初始化
skill: workdir-initialization
---

<SkillDetail :skill="skillData" />

<script setup>
const skillData = {"id":"official/workdir-initialization","name":"workdir-initialization","display_name":"工作目录初始化","description":"初始化用户与系统工作目录。当需要初始化工作目录、配置系统工作区时触发。","version":"1.0.0","icon":"📁","category":"initialization","runtime_type":"local","owner":{"name":"official","type":"official","verified":true,"avatar":"🏢","url":""},"readme":"# 初始目录区分与初始化\n\n## 使用场景\n\n- 区分用户目录与系统工作目录职责\n- 统一后续文件读取与配置维护入口\n\n## 执行步骤\n\n1. 检查用户目录 `/data/file/` 当前目录结构\n2. 更新 `/root/.openclaw/workspace/TOOLS.md`，写明目录约定\n3. 验证用户文件操作优先使用 `/data/file/`，配置与技能维护使用 `/root/.openclaw/workspace/`\n\n## 验收标准\n\n- 配置文档明确两个目录及用途\n- 用户文件检索与读取优先落在 `/data/file/`\n- OpenClaw 配置与技能路径明确为 `/root/.openclaw/workspace/`\n\n## 详细手册\n\n- `../../docs/技能用户手册/初始化目录流程手册.md`","files":["skill.json","SKILL.md"],"env_vars":[],"dependencies":[],"platform":{"host":"openclaw","min_version":"1.0","capabilities":["local-execution"]},"changelog":[{"version":"1.0.0","date":"2026-01-01","changes":["初始版本"],"type":"MINOR"}],"created_at":"2026-01-01T00:00:00Z","updated_at":"2026-01-01T00:00:00Z"};
</script>
