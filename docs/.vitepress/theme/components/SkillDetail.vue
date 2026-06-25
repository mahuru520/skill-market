<script setup>
import { ref } from "vue";

const props = defineProps({
  skill: { type: Object, required: true },
});

const RUNTIME_LABELS = {
  external_api: "外网 API",
  gateway_migrated_api: "网关迁移 API",
  local: "本地运行",
};
const CATEGORY_NAMES = {
  document: "文档",
  image_video: "图像视频",
  mail_communication: "邮件通信",
  initialization: "初始化",
  system_config: "系统配置",
  code_debug: "代码与调试",
};

const copied = ref(false);

// 安装命令（对应 PDR F4）
const installCmd = `openclaw skill install ${props.skill.name}`;
async function copyCmd() {
  try {
    await navigator.clipboard.writeText(installCmd);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    copied.value = false;
  }
}

const runtimeLabel = RUNTIME_LABELS[props.skill.runtime_type] || props.skill.runtime_type;
const categoryLabel = CATEGORY_NAMES[props.skill.category] || props.skill.category;
const ownerLabel = props.skill.owner?.type === "migrated" ? "迁移自维护" : "官方";
const isApi = props.skill.runtime_type !== "local";
const isMigrated = !!props.skill.migration;
</script>

<template>
  <div class="skill-detail">
    <div class="skill-detail__header">
      <span class="skill-detail__icon">{{ skill.icon }}</span>
      <div>
        <div class="skill-detail__title">{{ skill.display_name }}</div>
        <div style="font-size: 13px; color: var(--vp-c-text-2)">
          {{ skill.name }} · v{{ skill.version }}
        </div>
      </div>
    </div>

    <div class="skill-detail__badges">
      <span class="badge badge--runtime-api" v-if="skill.runtime_type === 'external_api'">{{ runtimeLabel }}</span>
      <span class="badge badge--runtime-migrated" v-else-if="skill.runtime_type === 'gateway_migrated_api'">{{ runtimeLabel }}</span>
      <span class="badge badge--runtime-local" v-else>{{ runtimeLabel }}</span>
      <span class="badge">{{ categoryLabel }}</span>
      <span class="badge badge--official" v-if="skill.owner?.type === 'official'">官方</span>
      <span class="badge badge--migrated" v-else>迁移</span>
      <span class="badge badge--hot" v-if="skill.hot">🔥 热门</span>
      <span class="badge badge--migrated" v-if="isMigrated">已迁移外网网关</span>
      <span class="badge">仅在 OspreyClaw 运行</span>
    </div>

    <p style="font-size: 15px">{{ skill.description }}</p>
    <p v-if="skill.description_en" style="font-size: 13px; color: var(--vp-c-text-2)">
      {{ skill.description_en }}
    </p>

    <!-- 安装命令 -->
    <div class="skill-detail__section">
      <h3>安装 / 加载</h3>
      <div class="install-cmd">
        <code style="flex: 1">{{ installCmd }}</code>
        <button @click="copyCmd">{{ copied ? "已复制" : "复制" }}</button>
      </div>
      <p style="font-size: 13px; color: var(--vp-c-text-2)">
        或通过 raw URL：
        <code>curl -sL /install/{{ skill.name }}.sh | sh</code>（Unix）/
        <code>irm /install/{{ skill.name }}.ps1 | iex</code>（Windows）
      </p>
    </div>

    <!-- API 详情（仅 API 类技能） -->
    <div class="skill-detail__section" v-if="isApi && skill.api">
      <h3>API 详情</h3>
      <table class="skill-detail__table">
        <tbody>
          <tr><th>网关地址</th><td>{{ skill.api.base_url }}</td></tr>
          <tr><th>鉴权方式</th><td>{{ skill.api.auth_type === 'gateway' ? '仅网关 Authorization' : '网关 + 后端 X-Authorization 双 token' }}</td></tr>
          <tr><th>限流</th><td>{{ skill.api.rate_limit }}</td></tr>
          <tr><th>超时</th><td>{{ skill.api.timeout_sec }}s</td></tr>
        </tbody>
      </table>
      <table class="skill-detail__table" style="margin-top: 12px">
        <thead><tr><th>方法</th><th>路径</th><th>说明</th></tr></thead>
        <tbody>
          <tr v-for="(ep, i) in skill.api.endpoints" :key="i">
            <td>{{ ep.method }}</td><td><code>{{ ep.path }}</code></td><td>{{ ep.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 迁移信息（仅迁移技能） -->
    <div class="skill-detail__section" v-if="isMigrated">
      <h3>迁移说明</h3>
      <table class="skill-detail__table">
        <tbody>
          <tr><th>原地址</th><td>{{ skill.migration.migrated_from }}</td></tr>
          <tr><th>现地址</th><td>{{ skill.migration.migrated_to }}</td></tr>
          <tr><th>行为变化</th><td>{{ skill.migration.behavior_change }}</td></tr>
          <tr><th>状态</th><td>{{ skill.migration.status === 'verified' ? '已验证' : '待实测' }}</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 环境变量 -->
    <div class="skill-detail__section" v-if="skill.env_vars && skill.env_vars.length">
      <h3>所需环境变量</h3>
      <table class="skill-detail__table">
        <thead><tr><th>变量</th><th>必填</th><th>来源</th><th>示例</th></tr></thead>
        <tbody>
          <tr v-for="ev in skill.env_vars" :key="ev.key">
            <td><code>{{ ev.key }}</code></td>
            <td>{{ ev.required ? '是' : '否' }}</td>
            <td>{{ ev.source }}</td>
            <td><code>{{ ev.example }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 依赖（仅本地技能） -->
    <div class="skill-detail__section" v-if="skill.dependencies && skill.dependencies.length">
      <h3>运行环境依赖</h3>
      <table class="skill-detail__table">
        <thead><tr><th>依赖</th><th>最低版本</th><th>类型</th></tr></thead>
        <tbody>
          <tr v-for="dep in skill.dependencies" :key="dep.name">
            <td>{{ dep.name }}</td>
            <td>{{ dep.min_version }}</td>
            <td>{{ dep.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 变更日志 -->
    <div class="skill-detail__section" v-if="skill.changelog && skill.changelog.length">
      <h3>变更日志</h3>
      <div v-for="entry in skill.changelog" :key="entry.version" style="margin-bottom: 12px">
        <strong>v{{ entry.version }}</strong>
        <span style="font-size: 12px; color: var(--vp-c-text-2); margin-left: 8px">{{ entry.date }} · {{ entry.type }}</span>
        <ul style="margin: 4px 0 0">
          <li v-for="(c, i) in entry.changes" :key="i" style="font-size: 13px">{{ c }}</li>
        </ul>
      </div>
    </div>

    <!-- 平台声明 -->
    <div class="skill-detail__section">
      <h3>平台与文件</h3>
      <table class="skill-detail__table">
        <tbody>
          <tr><th>宿主平台</th><td>{{ skill.platform.host }}（{{ skill.platform.min_version ? 'v' + skill.platform.min_version + '+' : '任意版本' }}）</td></tr>
          <tr><th>包内文件</th><td>{{ skill.files?.length || 0 }} 个</td></tr>
          <tr><th>创建时间</th><td>{{ skill.created_at }}</td></tr>
          <tr><th>更新时间</th><td>{{ skill.updated_at }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
