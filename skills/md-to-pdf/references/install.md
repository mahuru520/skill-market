# md-to-pdf 安装指南

## 在线安装（推荐）

```bash
# 安装 pandoc
apt-get update
apt-get install -y pandoc

# 安装 wkhtmltopdf
apt-get install -y wkhtmltopdf

# 安装中文字体
apt-get install -y fonts-wqy-zenhei
fc-cache -f
```

## 离线安装

使用 skill 自带的离线安装包：

```bash
cd /path/to/skills/md-to-pdf
bash scripts/install_offline.sh
```

安装包位置：`packages/` 目录下已包含：
- `packages/pandoc/pandoc-3.9-1-amd64.deb`
- `packages/wkhtmltopdf/wkhtmltox_0.12.6.1-2.bullseye_amd64.deb`
- `packages/wkhtmltopdf/libssl1.1_1.1.1f-1ubuntu2_amd64.deb`

## 依赖检查

```bash
bash scripts/check_env.sh
```

## 环境要求

- 操作系统：Debian 11/12 或兼容系统
- 权限：需要 root 或 sudo 安装系统包
