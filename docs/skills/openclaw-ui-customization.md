---
title: 控制台 UI 定制
skill: openclaw-ui-customization
---

<SkillDetail :skill="skillData" />

<script setup>
const skillData = {"id":"official/openclaw-ui-customization","name":"openclaw-ui-customization","display_name":"控制台 UI 定制","description":"定制 OpenClaw 控制台 UI 品牌元素。当用户请求替换 Logo、favicon、修改控制台标题、重建前端产物时触发。","version":"1.0.0","icon":"🎨","category":"system_config","runtime_type":"local","owner":{"name":"official","type":"official","verified":true,"avatar":"🏢","url":""},"readme":"# OpenClaw UI 定制\n\n## 使用场景\n\n- 替换 favicon 与品牌 Logo\n- 修改控制台页面标题与左上角品牌文案\n- 进行企业化定制部署\n\n## 执行步骤\n\n1. 准备 logo 资源并转换为 SVG\n2. 替换 `/app/ui/public/favicon.svg` 与产物目录中的 favicon\n3. 修改 UI 源码中的品牌标题和页面 `<title>`\n4. 在 UI 目录执行构建并验证展示效果\n\n## 验收标准\n\n- 浏览器标签页图标更新\n- 页面品牌标题更新\n- 刷新后仍保持定制结果（构建产物已更新）\n\n## 详细手册\n\n- `../../docs/技能用户手册/OpenClaw定制UI手册.md`","files":["skill.json","SKILL.md"],"env_vars":[],"dependencies":[{"name":"node","min_version":"18","type":"runtime"}],"platform":{"host":"openclaw","min_version":"1.0","capabilities":["ui-customization"]},"changelog":[{"version":"1.0.0","date":"2026-01-01","changes":["初始版本"],"type":"MINOR"}],"created_at":"2026-01-01T00:00:00Z","updated_at":"2026-01-01T00:00:00Z"};
</script>
