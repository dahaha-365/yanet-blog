import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { getPlumeConfig } from './plume.config'
import { ThemeOptions } from 'vuepress-theme-plume'
import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";

const plumeConfig = await getPlumeConfig()

export default defineUserConfig({
  // 必须设置默认语言
  lang: 'zh-CN',
  title: 'YaNet',
  description: 'Yet another Internet.',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]],
  theme: plumeTheme(plumeConfig as ThemeOptions),
  bundler: viteBundler({
    viteOptions: {
      plugins: []
    }
  }),
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-WYQRCV8PZC',
    })
  ]
})
