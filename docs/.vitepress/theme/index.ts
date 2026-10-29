import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout/Layout.vue'
import '../style/custom.css'
import '../style/layout.css'
import '../style/home.css'
import '../style/explore.css'

export default {
  extends: DefaultTheme,
  Layout
} satisfies Theme
