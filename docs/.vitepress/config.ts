import { defineConfig } from "vitepress";

export default defineConfig({
  title: "OspreyClaw Skill Market",
  description: "面向 OspreyClaw 用户的精选技能市场",
  lang: "zh-CN",
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "配置指南", link: "/guide/config" },
      { text: "依赖矩阵", link: "/guide/dependencies" },
      { text: "安装说明", link: "/guide/installation" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "使用指南",
          items: [
            { text: "配置指南", link: "/guide/config" },
            { text: "依赖矩阵", link: "/guide/dependencies" },
            { text: "安装说明", link: "/guide/installation" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://gitlab.ospreyai.cn/huangxin/skill-market" }],

    footer: {
      message: "技能仅在 OspreyClaw 上运行 · 遵循 OspreyClaw 自有加载机制",
      copyright: "Copyright © 2026 OspreyClaw Skill Market",
    },

    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索技能", buttonAriaLabel: "搜索技能" },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清除",
          },
        },
      },
    },
  },
});
