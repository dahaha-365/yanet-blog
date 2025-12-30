import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import { defineClientConfig } from '@vuepress/client'

import './styles/index.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('RepoCard', RepoCard)
  },
})
