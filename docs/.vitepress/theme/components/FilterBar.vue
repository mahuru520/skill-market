<script setup>
const props = defineProps({
  // 当前筛选状态：{ owner, runtime_type, category }，值为 "" 表示不限
  filters: { type: Object, required: true },
});

const emit = defineEmits(["update:filters"]);

const RUNTIME_OPTIONS = [
  { value: "", label: "全部" },
  { value: "external_api", label: "外网 API" },
  { value: "gateway_migrated_api", label: "网关迁移" },
  { value: "local", label: "本地运行" },
];
const OWNER_OPTIONS = [
  { value: "", label: "全部" },
  { value: "official", label: "官方" },
  { value: "migrated", label: "迁移" },
];
const CATEGORY_OPTIONS = [
  { value: "", label: "全部" },
  { value: "document", label: "文档" },
  { value: "image_video", label: "图像视频" },
  { value: "mail_communication", label: "邮件通信" },
  { value: "initialization", label: "初始化" },
  { value: "system_config", label: "系统配置" },
  { value: "code_debug", label: "代码与调试" },
];

function select(group, value) {
  const next = { ...props.filters, [group]: value };
  emit("update:filters", next);
}

function isActive(group, value) {
  return props.filters[group] === value;
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-bar__group">
      <span class="filter-bar__label">运行方式：</span>
      <div class="filter-bar__options">
        <button
          v-for="opt in RUNTIME_OPTIONS"
          :key="opt.value"
          class="filter-btn"
          :class="{ 'filter-btn--active': isActive('runtime_type', opt.value) }"
          @click="select('runtime_type', opt.value)"
        >{{ opt.label }}</button>
      </div>
    </div>
    <div class="filter-bar__group">
      <span class="filter-bar__label">所有者：</span>
      <div class="filter-bar__options">
        <button
          v-for="opt in OWNER_OPTIONS"
          :key="opt.value"
          class="filter-btn"
          :class="{ 'filter-btn--active': isActive('owner', opt.value) }"
          @click="select('owner', opt.value)"
        >{{ opt.label }}</button>
      </div>
    </div>
    <div class="filter-bar__group">
      <span class="filter-bar__label">场景：</span>
      <div class="filter-bar__options">
        <button
          v-for="opt in CATEGORY_OPTIONS"
          :key="opt.value"
          class="filter-btn"
          :class="{ 'filter-btn--active': isActive('category', opt.value) }"
          @click="select('category', opt.value)"
        >{{ opt.label }}</button>
      </div>
    </div>
  </div>
</template>
