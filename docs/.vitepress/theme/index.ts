import DefaultTheme from "vitepress/theme";
import "./index.css";

import SkillCard from "./components/SkillCard.vue";
import SkillCardWall from "./components/SkillCardWall.vue";
import SearchBox from "./components/SearchBox.vue";
import FilterBar from "./components/FilterBar.vue";
import SkillDetail from "./components/SkillDetail.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("SkillCard", SkillCard);
    app.component("SkillCardWall", SkillCardWall);
    app.component("SearchBox", SearchBox);
    app.component("FilterBar", FilterBar);
    app.component("SkillDetail", SkillDetail);
  },
};
