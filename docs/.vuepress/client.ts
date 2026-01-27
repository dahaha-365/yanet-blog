import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import { defineClientConfig } from '@vuepress/client'
import { h } from 'vue'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import { Layout } from 'vuepress-theme-plume/client'
import Clarity from "@microsoft/clarity";

import './styles/index.scss'

Clarity.init('v6qyparhlu');

export default defineClientConfig({
  enhance({ app }) {
    app.component('RepoCard', RepoCard)
  },
  layouts: {
    Layout: h(Layout, null, {
      // 将 PageContextMenu 添加到 doc-title-after 插槽，即文章标题的右侧
      'doc-title-after': () => h(PageContextMenu),
    }),
  },
})
