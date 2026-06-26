<script setup>
import { ref, computed, onMounted } from "vue";
import SkillCard from "./SkillCard.vue";
import SearchBox from "./SearchBox.vue";
import FilterBar from "./FilterBar.vue";

const skills = ref([]);
const loading = ref(true);
const error = ref("");

const query = ref("");
const filters = ref({ owner: "", runtime_type: "", category: "" });

onMounted(async () => {
  try {
    // fetch 静态 JSON 资源（对应 SPEC 第 4 章 GET /api/skills.json）
    // import.meta.env.BASE_URL 适配 GitHub Pages 子路径部署（base: "/skill-market/"）
    const res = await fetch(`${import.meta.env.BASE_URL}api/skills.json`);
    skills.value = await res.json();
  } catch (e) {
    error.value = "加载技能列表失败：" + e.message + "（请先运行 npm run build）";
  } finally {
    loading.value = false;
  }
});

// 前端全文匹配 + 多维叠加筛选（对应 PDR F3 搜索 + F6 筛选）
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return skills.value.filter((s) => {
    if (filters.value.owner && s.owner?.type !== filters.value.owner) return false;
    if (filters.value.runtime_type && s.runtime_type !== filters.value.runtime_type) return false;
    if (filters.value.category && s.category !== filters.value.category) return false;
    if (q) {
      const haystack = [s.name, s.display_name, s.description, s.description_en || ""]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
});
</script>

<template>
  <div>
    <SearchBox v-model="query" />
    <FilterBar v-model:filters="filters" />

    <div v-if="loading" class="no-result">加载中…</div>
    <div v-else-if="error" class="no-result">{{ error }}</div>
    <template v-else>
      <div class="result-count">共 {{ filtered.length }} 个技能</div>
      <div v-if="filtered.length === 0" class="no-result">
        没有匹配的技能，试试其他关键词或清除筛选条件。
      </div>
      <div v-else class="skill-wall">
        <SkillCard v-for="s in filtered" :key="s.name" :skill="s" />
      </div>
    </template>
  </div>
</template>
