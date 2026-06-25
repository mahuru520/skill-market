// 构建脚本：读 manifest.json + skills/*/skill.json → 聚合生成 docs/public/api/*.json + docs/skills/{name}.md
// 对应 SPEC 第 4 章静态 API 资源 + 第 5 章详情页生成
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SKILLS_DIR = join(ROOT, "skills");
const API_DIR = join(ROOT, "docs", "public", "api");
const SKILLS_API_DIR = join(API_DIR, "skills");
const CATEGORIES_API_DIR = join(API_DIR, "categories");
const DOCS_SKILLS_DIR = join(ROOT, "docs", "skills");

// 分类中文映射
const CATEGORY_NAMES = {
  document: "文档",
  image_video: "图像视频",
  mail_communication: "邮件通信",
  initialization: "初始化",
  system_config: "系统配置",
  code_debug: "代码与调试",
};

// 运行方式中文映射
const RUNTIME_LABELS = {
  external_api: "外网 API",
  gateway_migrated_api: "网关迁移 API",
  local: "本地运行",
};

function loadJSON(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function writeJSON(path, data) {
  ensureDir(dirname(path));
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf8");
}

// 读取 SKILL.md 正文（frontmatter 之后），作为 readme 内联
// 用正则剥离 frontmatter，不依赖 YAML 解析 —— 避免 pre-existing SKILL.md 的 description
// 含裸冒号（如 "Use when: (1) ..."）导致 gray-matter 解析失败
function readSkillBody(skillName) {
  const skillMdPath = join(SKILLS_DIR, skillName, "SKILL.md");
  if (!existsSync(skillMdPath)) return "";
  const raw = readFileSync(skillMdPath, "utf8");
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length).trim() : raw.trim();
}

// SkillSummary：SkillRecord 的精简投影（卡片墙用）
function toSummary(skill) {
  return {
    id: skill.id,
    name: skill.name,
    display_name: skill.display_name,
    description: skill.description,
    description_en: skill.description_en,
    icon: skill.icon,
    category: skill.category,
    runtime_type: skill.runtime_type,
    version: skill.version,
    owner: { type: skill.owner.type, verified: skill.owner.verified },
    hot: skill.hot || false,
  };
}

console.log("=== 读取 manifest + skills ===");
const manifest = loadJSON(join(ROOT, "manifest.json"));

const skillDirs = readdirSync(SKILLS_DIR).filter((d) =>
  statSync(join(SKILLS_DIR, d)).isDirectory() && !d.startsWith(".")
);

const skills = [];
for (const dir of skillDirs) {
  const skill = loadJSON(join(SKILLS_DIR, dir, "skill.json"));
  // 自动填充 readme（SKILL.md 正文）与 files（包内文件清单）
  skill.readme = readSkillBody(dir);
  skill.files = readdirSync(join(SKILLS_DIR, dir), { recursive: true })
    .filter((f) => !statSync(join(SKILLS_DIR, dir, f)).isDirectory())
    .map((f) => f.replace(/\\/g, "/"));
  skills.push(skill);
}
skills.sort((a, b) => a.name.localeCompare(b.name));
console.log(`  读取 ${skills.length} 个技能`);

// 1. manifest.json（聚合版，含完整技能摘要）
console.log("=== 生成 /api/manifest.json ===");
const apiManifest = {
  name: manifest.name,
  owner: manifest.owner,
  version: manifest.version,
  updated_at: manifest.updated_at,
  skills: skills.map(toSummary),
};
writeJSON(join(API_DIR, "manifest.json"), apiManifest);

// 2. skills.json（全部摘要数组）
console.log("=== 生成 /api/skills.json ===");
writeJSON(join(API_DIR, "skills.json"), skills.map(toSummary));

// 3. skills/{name}.json（每个技能完整详情）
console.log("=== 生成 /api/skills/{name}.json × " + skills.length + " ===");
for (const skill of skills) {
  writeJSON(join(SKILLS_API_DIR, `${skill.name}.json`), skill);
}

// 4. skills/hot.json（热门技能）
console.log("=== 生成 /api/skills/hot.json ===");
const hotSkills = skills.filter((s) => s.hot).map(toSummary);
writeJSON(join(API_DIR, "skills", "hot.json"), hotSkills);

// 5. categories.json（分类索引）
console.log("=== 生成 /api/categories.json ===");
const categoryMap = new Map();
for (const skill of skills) {
  if (!categoryMap.has(skill.category)) categoryMap.set(skill.category, []);
  categoryMap.get(skill.category).push(skill);
}
const categories = [...categoryMap.keys()].map((slug) => ({
  slug,
  name: CATEGORY_NAMES[slug] || slug,
  count: categoryMap.get(slug).length,
}));
writeJSON(join(API_DIR, "categories.json"), categories);

// 6. categories/{slug}.json（分类下技能列表）
console.log("=== 生成 /api/categories/{slug}.json ===");
for (const [slug, list] of categoryMap) {
  writeJSON(join(CATEGORIES_API_DIR, `${slug}.json`), {
    slug,
    name: CATEGORY_NAMES[slug] || slug,
    count: list.length,
    skills: list.map(toSummary),
  });
}

// 7. changelog.json（全市场变更日志汇总）
console.log("=== 生成 /api/changelog.json ===");
const changelogEntries = [];
for (const skill of skills) {
  for (const entry of skill.changelog || []) {
    changelogEntries.push({ skill: skill.name, ...entry });
  }
}
writeJSON(join(API_DIR, "changelog.json"), {
  version: manifest.version,
  updated_at: manifest.updated_at,
  entries: changelogEntries,
});

// 8. dependencies.json（依赖矩阵汇总）
console.log("=== 生成 /api/dependencies.json ===");
const tools = new Set();
const runtimes = new Set();
const bySkill = [];
for (const skill of skills) {
  if (!skill.dependencies || skill.dependencies.length === 0) continue;
  const deps = skill.dependencies.map((d) => `${d.name}>=${d.min_version}`);
  for (const d of skill.dependencies) {
    if (d.type === "tool") tools.add(`${d.name}>=${d.min_version}`);
    else if (d.type === "runtime") runtimes.add(`${d.name}>=${d.min_version}`);
  }
  bySkill.push({ name: skill.name, deps });
}
writeJSON(join(API_DIR, "dependencies.json"), {
  tools: [...tools].sort(),
  runtimes: [...runtimes].sort(),
  by_skill: bySkill,
});

// 9. docs/skills/{name}.md 详情页（VitePress 路由）
console.log("=== 生成 docs/skills/{name}.md × " + skills.length + " ===");
ensureDir(DOCS_SKILLS_DIR);
for (const skill of skills) {
  const md = buildSkillDetailMd(skill);
  writeFileSync(join(DOCS_SKILLS_DIR, `${skill.name}.md`), md, "utf8");
}

function buildSkillDetailMd(skill) {
  const lines = [];
  lines.push("---");
  lines.push(`title: ${skill.display_name}`);
  lines.push(`skill: ${skill.name}`);
  lines.push("---");
  lines.push("");
  lines.push("<SkillDetail :skill=\"skillData\" />");
  lines.push("");
  lines.push("<script setup>");
  lines.push(`const skillData = ${JSON.stringify(skill)};`);
  lines.push("</script>");
  return lines.join("\n") + "\n";
}

console.log(`\n✓ 构建完成：生成 ${skills.length} 个技能 API + 详情页，${categories.length} 个分类`);
console.log(`  API 输出: ${API_DIR.replace(ROOT, ".")}`);
console.log(`  详情页输出: ${DOCS_SKILLS_DIR.replace(ROOT, ".")}`);
