import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout/Layout.vue'
import Landing from './Layout/Landing.vue'
import Blog from './components/Blog.vue'
import Home from './components/Home.vue'
import Friends from './components/Friends.vue'
import Projects from './components/Projects.vue'
import { MotionPlugin } from '@vueuse/motion'
import '../style/custom.css'
import 'animate.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(MotionPlugin)
    app.component('Landing', Landing)
    app.component('Home', Home)
    app.component('Blog', Blog)
    app.component('Friends', Friends)
    app.component('Projects', Projects)
  }
} as Theme