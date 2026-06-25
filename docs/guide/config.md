# 配置指南

9 个 API 类技能通过外网网关 `https://ai.ospreyai.cn` 鉴权，token 走环境变量，不硬编码在仓库中。

## 环境变量

复制 `.env.example` 为 `.env` 并填入真实 token（`.env` 已被 `.gitignore` 排除）：

```bash
cp .env.example .env
```

| 变量 | 用途 | 适用技能 | 鉴权方式 |
|---|---|---|---|
| `GW` | 网关地址 | 全部 API 类技能 | 固定 `https://ai.ospreyai.cn` |
| `API_KEY` | 网关 new-api key | ComfyUI / list-models / vision-ocr / whisper / mail | 网关 `Authorization: Bearer sk-xxx` |
| `DIFY_TOKEN` | Dify 后端 token | contract-review / invoice-ocr | 网关 + 后端 `X-Authorization: Bearer app-xxx` |
| `RAGFLOW_TOKEN` | RAGFlow 后端 token | ragflow-knowledge-qa | 网关 + 后端 `X-Authorization: Bearer ragflow-xxx` |

## 鉴权头规范

### ComfyUI（仅需网关）

```
Authorization: Bearer $API_KEY
```

### Dify / RAGFlow（双 token）

```
Authorization: $API_KEY
X-Authorization: Bearer $DIFY_TOKEN      # 或 $RAGFLOW_TOKEN
```

## 限流

网关限流 **10 次/分/IP**（突发 5），技能内须实现 429 退避。长耗时任务（视频 1–2 分钟、合同审核 timeout 1800s）须有超时与重试。
