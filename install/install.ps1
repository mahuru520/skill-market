# OpenClaw 技能市场通用安装脚本（Windows PowerShell）
# 用法：irm <raw-url>/install/install.ps1 | iex; Install-Skill <skill-name>
$ErrorActionPreference = "Stop"

function Install-Skill {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SkillName
    )

    $openclawSkillDir = if ($env:OPENCLAW_SKILL_DIR) { $env:OPENCLAW_SKILL_DIR } else { "$env:USERPROFILE\.openclaw\skills" }
    $target = Join-Path $openclawSkillDir $SkillName

    Write-Host "==> 安装 $SkillName 到 $target" -ForegroundColor Cyan
    New-Item -ItemType Directory -Force -Path $target | Out-Null

    Write-Host "`n✓ 目录已创建：$target`n" -ForegroundColor Green
    Write-Host "后续加载方式："
    Write-Host "  1. openclaw skill install $SkillName"
    Write-Host "  2. 或将技能包文件复制到 $target`n"
    Write-Host "技能仅在 OpenClaw 上运行，遵循 OpenClaw 自有加载机制。"
    Write-Host "若该技能为 API 类，请先配置环境变量（见配置指南）。"
}

# 若带参数直接调用
if ($args.Count -ge 1) {
    Install-Skill -SkillName $args[0]
}
