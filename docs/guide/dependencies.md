# 依赖矩阵

16 个本地运行类技能所需的运行时与工具。所有技能仅在 OpenClaw 上运行。

> 完整依赖数据由构建脚本生成，访问 `GET /api/dependencies.json` 获取。

## 运行时

- `python >= 3.10`
- `node >= 18`

## 工具

- `pandoc >= 2.0`（md-to-pdf）
- `wkhtmltopdf >= 0.12`（md-to-pdf）
- `libreoffice >= 7.0`（minimax-* 系列）

## 跨平台

技能运行环境跨 Windows / macOS / Linux。本地运行类技能须验证 Windows 兼容，具体安装命令见各技能 `references/`。
