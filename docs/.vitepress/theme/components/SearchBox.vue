<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const text = ref(props.modelValue);
let timer = null;

watch(text, (val) => {
  clearTimeout(timer);
  // 300ms 防抖（对应 PDR F3）
  timer = setTimeout(() => emit("update:modelValue", val), 300);
});

watch(
  () => props.modelValue,
  (val) => {
    if (val !== text.value) text.value = val;
  }
);
</script>

<template>
  <div class="search-box">
    <input
      v-model="text"
      type="text"
      placeholder="搜索技能：输入「发票 / 合同 / 视频」等关键词"
      aria-label="搜索技能"
    />
  </div>
</template>
