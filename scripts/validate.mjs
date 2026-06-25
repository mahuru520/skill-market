// 校验脚本：用 JSON Schema 校验 manifest.json + 每个 skill.json，并检查目录一致性
// 对应 SPEC 第 5 章 validate.mjs 与 PDR F15（自动化校验 CI）
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SCHEMA_DIR = join(__dirname, "schema");
const SKILLS_DIR = join(ROOT, "skills");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const manifestSchema = JSON.parse(readFileSync(join(SCHEMA_DIR, "manifest.schema.json"), "utf8"));
const skillSchema = JSON.parse(readFileSync(join(SCHEMA_DIR, "skill.schema.json"), "utf8"));
const validateManifest = ajv.compile(manifestSchema);
const validateSkill = ajv.compile(skillSchema);

let errors = 0;
const fail = (msg) => { console.error("  ✗ " + msg); errors++; };
const ok = (msg) => console.log("  ✓ " + msg);

function loadJSON(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

console.log("=== 校验 manifest.json ===");
let manifest;
try {
  manifest = loadJSON(join(ROOT, "manifest.json"));
} catch (e) {
  fail(`manifest.json 读取失败: ${e.message}`);
  process.exit(1);
}
if (!validateManifest(manifest)) {
  fail("manifest.json schema 不合法:");
  console.error("    " + ajv.errorsText(validateManifest.errors));
  errors++;
} else {
  ok(`manifest.json schema 合法（${manifest.skills.length} 个技能引用）`);
}

console.log("\n=== 校验 skills/ 目录 ===");
const dirEntries = readdirSync(SKILLS_DIR).filter((d) =>
  statSync(join(SKILLS_DIR, d)).isDirectory()
);
const skillDirs = dirEntries.filter((d) => !d.startsWith("."));
ok(`skills/ 目录下 ${skillDirs.length} 个技能包目录`);

console.log("\n=== 校验每个 skill.json ===");
const skillByName = new Map();
for (const dir of skillDirs) {
  const skillPath = join(SKILLS_DIR, dir, "skill.json");
  let skill;
  try {
    skill = loadJSON(skillPath);
  } catch (e) {
    fail(`${dir}/skill.json 读取失败: ${e.message}`);
    continue;
  }
  if (!validateSkill(skill)) {
    fail(`${dir}/skill.json schema 不合法:`);
    console.error("    " + ajv.errorsText(validateSkill.errors));
    errors++;
    continue;
  }
  if (skill.name !== dir) {
    fail(`${dir}/skill.json name="${skill.name}" 与目录名 "${dir}" 不一致`);
    errors++;
  }
  if (skillByName.has(skill.name)) {
    fail(`重复技能名: ${skill.name}（出现在 ${skillByName.get(skill.name)} 和 ${dir}）`);
    errors++;
  }
  skillByName.set(skill.name, dir);
  ok(`${dir}/skill.json 合法`);
}

console.log("\n=== 校验 manifest 引用与目录一致性 ===");
const manifestNames = new Set(manifest.skills.map((s) => s.name));
const dirNameSet = new Set(skillDirs);
for (const s of manifest.skills) {
  if (!dirNameSet.has(s.name)) {
    fail(`manifest 引用 "${s.name}" 但 skills/ 下无此目录`);
    errors++;
  } else {
    const skill = loadJSON(join(SKILLS_DIR, s.name, "skill.json"));
    if (skill.version !== s.version) {
      fail(`版本漂移: manifest 标 ${s.name}=${s.version}，skill.json=${skill.version}`);
      errors++;
    }
  }
}
for (const dir of skillDirs) {
  if (!manifestNames.has(dir)) {
    fail(`skills/${dir}/ 存在但 manifest 未引用`);
    errors++;
  }
}
if (manifest.skills.length === skillDirs.length && errors === 0) {
  ok(`manifest 引用与目录一致（${manifest.skills.length} = ${skillDirs.length}）`);
}

console.log("\n=== 校验 API 类技能必填字段 ===");
for (const dir of skillDirs) {
  const skill = loadJSON(join(SKILLS_DIR, dir, "skill.json"));
  if (skill.runtime_type !== "local" && !skill.api) {
    fail(`${dir}: runtime_type="${skill.runtime_type}" 但缺少 api 字段`);
    errors++;
  }
  if (skill.runtime_type === "gateway_migrated_api" && !skill.migration) {
    fail(`${dir}: gateway_migrated_api 但缺少 migration 字段`);
    errors++;
  }
  if (skill.runtime_type !== "local" && (!skill.env_vars || skill.env_vars.length === 0)) {
    fail(`${dir}: API 类技能但未声明 env_vars`);
    errors++;
  }
}

console.log("\n=== 校验完成 ===");
if (errors > 0) {
  console.error(`\n✗ 校验失败，共 ${errors} 个错误`);
  process.exit(1);
} else {
  console.log(`\n✓ 全部通过：${skillDirs.length} 个技能，manifest 一致，schema 合法`);
}
