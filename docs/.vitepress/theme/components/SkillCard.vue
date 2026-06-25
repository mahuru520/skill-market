<script setup>
import { computed } from "vue";

const props = defineProps({
  skill: { type: Object, required: true },
});

const RUNTIME_LABELS = {
  external_api: "外网 API",
  gateway_migrated_api: "网关迁移 API",
  local: "本地运行",
};
const RUNTIME_BADGE = {
  external_api: "badge--runtime-api",
  gateway_migrated_api: "badge--runtime-migrated",
  local: "badge--runtime-local",
};
const CATEGORY_NAMES = {
  document: "文档",
  image_video: "图像视频",
  mail_communication: "邮件通信",
  initialization: "初始化",
  system_config: "系统配置",
  code_debug: "代码与调试",
};

const runtimeLabel = computed(() => RUNTIME_LABELS[props.skill.runtime_type] || props.skill.runtime_type);
const runtimeBadge = computed(() => RUNTIME_BADGE[props.skill.runtime_type] || "");
const categoryLabel = computed(() => CATEGORY_NAMES[props.skill.category] || props.skill.category);
const ownerBadge = computed(() => (props.skill.owner?.type === "migrated" ? "badge--migrated" : "badge--official"));
const ownerLabel = computed(() => (props.skill.owner?.type === "migrated" ? "迁移" : "官方"));

const detailLink = computed(() => `/skills/${props.skill.name}`);
</script>

<template>
  <a class="skill-card" :href="detailLink">
    <div class="skill-card__header">
      <span class="skill-card__icon">{{ skill.icon }}</span>
      <span class="skill-card__name">{{ skill.display_name }}</span>
    </div>
    <div class="skill-card__desc">{{ skill.description }}</div>
    <div class="skill-card__badges">
      <span class="badge" :class="runtimeBadge">{{ runtimeLabel }}</span>
      <span class="badge" :class="ownerBadge">{{ ownerLabel }}</span>
      <span class="badge">{{ categoryLabel }}</span>
      <span v-if="skill.hot" class="badge badge--hot">🔥 热门</span>
    </div>
  </a>
</template>
