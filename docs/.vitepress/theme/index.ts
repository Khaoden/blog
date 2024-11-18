import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout/Layout.vue'
import Landing from './Layout/Landing.vue'
import Home from './components/Home.vue'
import { MotionPlugin } from '@vueuse/motion'
import './custom.css'
import 'animate.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(MotionPlugin)
    app.component('Landing', Landing)
    app.component('Home', Home)
  }
} as Theme