import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import Layout from './Layout/Layout.vue'
import Landing from './Layout/Landing.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Blog from './components/Blog.vue'
import About from './components/About.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('Landing', Landing)
    app.component('Home', Home)
    app.component('Welcome', Welcome)
    app.component('Blog', Blog)
    app.component('About', About)
  }
} satisfies Theme 