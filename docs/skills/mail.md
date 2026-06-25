---
title: 邮件收发
skill: mail
---

<SkillDetail :skill="skillData" />

<script setup>
const skillData = {"id":"official/mail","name":"mail","display_name":"邮件收发","description":"通过 SMTP/IMAP 收发邮件。当用户请求发邮件、查邮箱、配置邮箱时触发。","version":"1.0.0","icon":"✉️","category":"mail_communication","runtime_type":"external_api","owner":{"name":"official","type":"official","verified":true,"avatar":"🏢","url":""},"readme":"# mail - 邮件收发\n\n通过问答引导配置邮箱，支持收发邮件。\n\n## 配置邮箱\n\n说「配置邮箱」或「添加邮箱」，我会引导你完成：\n1. 选择邮箱类型（阿里云 / 腾讯）\n2. 提供邮箱地址\n3. 提供授权码\n\n## 收发邮件\n\n- 「发邮件给 xxx」— 发送邮件\n- 「查一下邮箱」— 接收邮件\n- 「查看当前配置」— 查看已配置的邮箱\n\n## 支持的邮箱\n\n| 类型 | SMTP | IMAP |\n|------|------|------|\n| 阿里企业邮箱 | smtp.qiye.aliyun.com:465 | imap.qiye.aliyun.com:993 |\n| 腾讯企业邮箱 | smtp.exmail.qq.com:465 | imap.exmail.qq.com:993 |\n\n---\n\n**授权码获取：**\n- 阿里：邮箱后台 → 设置 → 账号与安全 → 授权码\n- 腾讯：邮箱后台 → 登录绑定 → 开启 IMAP/SMTP","files":["mail.py","mail_setup.py","skill.json","SKILL.md"],"env_vars":[{"key":"MAIL_USER","description":"邮箱地址","required":true,"source":"用户配置","example":"user@example.com"},{"key":"MAIL_PASS","description":"邮箱授权码","required":true,"source":"邮箱服务商授权码","example":"授权码占位"}],"api":{"base_url":"smtp/imap 邮件服务器","auth_type":"gateway","endpoints":[{"method":"SMTP","path":"smtp.qiye.aliyun.com:465 / smtp.exmail.qq.com:465","desc":"发送邮件"},{"method":"IMAP","path":"imap.qiye.aliyun.com:993 / imap.exmail.qq.com:993","desc":"接收邮件"}],"rate_limit":"邮箱服务商限制","timeout_sec":30},"platform":{"host":"openclaw","min_version":"1.0","capabilities":["skill-install"]},"changelog":[{"version":"1.0.0","date":"2026-01-01","changes":["初始版本"],"type":"MINOR"}],"created_at":"2026-01-01T00:00:00Z","updated_at":"2026-01-01T00:00:00Z"};
</script>
