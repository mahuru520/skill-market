#!/usr/bin/env bash
# OpenClaw 技能市场通用安装脚本
# 用法：curl -sL <raw-url>/install/install.sh | sh -s <skill-name>
set -e

SKILL_NAME="${1:-}"
if [ -z "$SKILL_NAME" ]; then
  echo "用法: install.sh <skill-name>" >&2
  echo "示例: curl -sL <raw-url>/install/install.sh | sh -s comfyui-image-generation" >&2
  exit 1
fi

OPENCLAW_SKILL_DIR="${OPENCLAW_SKILL_DIR:-$HOME/.openclaw/skills}"
TARGET="$OPENCLAW_SKILL_DIR/$SKILL_NAME"

echo "==> 安装 $SKILL_NAME 到 $TARGET"
mkdir -p "$TARGET"

cat <<EOF

✓ 目录已创建：$TARGET

后续加载方式：
  1. openclaw skill install $SKILL_NAME
  2. 或将技能包文件复制到 $TARGET

技能仅在 OpenClaw 上运行，遵循 OpenClaw 自有加载机制。
若该技能为 API 类，请先配置环境变量（见配置指南）。
EOF
