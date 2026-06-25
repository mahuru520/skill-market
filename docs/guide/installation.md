# 安装说明

技能仅在 OpenClaw 上运行，遵循 OpenClaw 自有加载机制。

## 方式一：openclaw CLI

```bash
openclaw skill install {name}
```

## 方式二：双平台脚本（raw URL）

### Unix（macOS / Linux）

```bash
curl -sL https://example.com/install/{name}.sh | sh
```

### Windows（PowerShell）

```powershell
irm https://example.com/install/{name}.ps1 | iex
```

## 方式三：目录放置

将 `skills/{name}/` 复制到 OpenClaw 技能目录，并注册到清单。

## 加载后

技能通过 `description` 字段写明的「做什么 + 何时触发」被自然语言意图激活。
