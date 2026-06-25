# OspreyClaw Skill Market

面向 OspreyClaw 用户的精选技能市场：以 **Git 仓库 + 静态目录站** 形式集中托管 25 个技能，支持分类浏览、检索与按 OspreyClaw 机制加载。

- 仓库：https://gitlab.ospreyai.cn/huangxin/skill-market
- 技能仅在 OspreyClaw 上运行；加载走 `openclaw skill install {name}`、目录放置或清单注册。

## 它是什么

一份可运行的技能目录仓库。维护者把每个技能包放进 `skills/{name}/`，构建脚本聚合生成静态 JSON 资源与 VitePress 站点；用户在站点上检索技能、复制安装命令，再按 OspreyClaw 自有机制加载到本地。

**无后端**：所有数据是只读静态 JSON，前端直接 fetch 消费。

## 技能概览

共 25 个技能，按运行方式分三类：

| 运行方式 | 数量 | 说明 | 代表技能 |
|---|---|---|---|
| 网关迁移 `gateway_migrated_api` | 5 | 原内网 API 改走外网网关 `https://ai.ospreyai.cn` | comfyui-image-generation、contract-review |
| 外网 API `external_api` | 4 | 直接调用外网第三方 API | list-models、mail、vision-ocr、whisper-transcribe |
| 本地执行 `local` | 16 | OspreyClaw 本地能力，无外部调用 | md-to-pdf、pptx-generator、user-initialization |

完整清单见 [manifest.json](manifest.json)；分类、环境变量、依赖等结构化信息见构建产物 `docs/public/api/`。

## 快速开始

```bash
# 需 Node.js ≥ 18
npm install          # 安装依赖（VitePress / ajv / gray-matter）
npm run validate     # 校验 manifest + 25 个 skill.json（schema + 目录一致性）
npm run build        # 生成静态 API（docs/public/api/*.json）+ 25 个详情页 + 站点
npm run dev          # 本地预览 http://localhost:5173
npm run preview      # 预览构建产物
```

## 目录结构

```
skill-market/
├── manifest.json              # 市场清单（引用全部 25 个技能）
├── skills/{name}/             # 技能包：SKILL.md + skill.json + references/ + scripts/
├── scripts/                   # 构建脚本
│   ├── build.mjs              #   聚合生成静态 API + 详情页
│   ├── validate.mjs           #   schema 校验 + 目录一致性检查
│   └── schema/                #   skill / manifest JSON Schema
├── docs/                      # VitePress 源 + 前端组件
│   ├── .vitepress/            #   站点配置 + 主题 + 组件
│   ├── guide/                 #   配置 / 依赖矩阵 / 安装说明
│   └── skills/                #   生成的详情页（build 产物）
├── install/                   # 双平台安装脚本（install.sh / install.ps1）
└── .github/workflows/         # CI 流水线（校验 + 构建 + 部署）
```

## 配置 API 类技能

9 个 API 类技能（5 网关迁移 + 4 外网 API）通过外网网关 `https://ai.ospreyai.cn` 鉴权，token 走环境变量，**禁止硬编码进仓库**。

```bash
cp .env.example .env   # 复制占位文件，填入真实 token（.env 已被 .gitignore 排除）
```

| 变量 | 用途 | 鉴权方式 | 适用技能 |
|---|---|---|---|
| `GW` | 网关地址 | 固定 `https://ai.ospreyai.cn` | 全部 API 类 |
| `API_KEY` | 网关 Bearer Token | `Authorization: Bearer sk-xxx` | ComfyUI / 通用 |
| `DIFY_TOKEN` | Dify 后端 Token | `X-Authorization: Bearer app-xxx` | contract-review、invoice-ocr |
| `RAGFLOW_TOKEN` | RAGFlow 后端 Token | `X-Authorization: Bearer ragflow-xxx` | ragflow-knowledge-qa |

网关限流：10 次/分/IP（突发 5）。详见 [配置指南](docs/guide/config.md)。

## 在 OspreyClaw 中加载技能

技能不在此仓库内运行，需先安装到 OspreyClaw 技能目录：

```bash
# 方式一：通用安装脚本（创建技能目录）
curl -sL <raw-url>/install/install.sh | sh -s comfyui-image-generation   # Unix
irm <raw-url>/install/install.ps1 | iex; Install-Skill comfyui-image-generation  # Windows

# 方式二：OspreyClaw 自有加载机制
openclaw skill install comfyui-image-generation
```

默认安装到 `~/.openclaw/skills/{name}`（可用 `OPENCLAW_SKILL_DIR` 覆盖）。详见 [安装说明](docs/guide/installation.md)。

## 技术栈

- **VitePress** — 静态站点生成
- **Node.js + TypeScript(.mjs)** — 构建脚本
- **ajv + ajv-formats** — JSON Schema 校验
- **gray-matter** — 读取 SKILL.md frontmatter
- **Vue 3 组件** — 卡片墙 / 搜索（300ms 防抖）/ 多维筛选 / 详情页

静态产物可部署到任意静态托管（GitLab Pages / GitHub Pages / 对象存储）。仓库已附 GitHub Actions 流水线（`.github/workflows/`）做校验与构建；如需 GitLab Pages，按 `.gitlab-ci.yml` 形式自行配置。

## 开发说明

新增 / 修改技能后，提交前本地验证：

```bash
npm run validate     # 必须通过：schema + manifest 与 skills/ 目录一致 + 版本同步
npm run build        # 必须通过：生成产物无报错
```

校验规则：manifest 引用的技能必须存在于 `skills/`；`runtime_type` 为非 `local` 的技能必须含 `api` 字段；`gateway_migrated_api` 必须含 `migration`；API 类必须有 `env_vars`。

> 产品需求（PDR）、技术规范（SPEC）与技能整理（SKILLS整理.md）为内部文档，已通过 `.gitignore` 排除，未纳入仓库。

## 许可证

见 [LICENSE](LICENSE)。
