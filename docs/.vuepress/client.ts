import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'
import Landing from './layouts/Landing.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import About from './components/About.vue'
// import Friends from './components/Friends.vue'
// import Blog from './components/Blog.vue'


export default defineClientConfig({
  layouts: {
    Layout,
    Landing
  },
  enhance({ app }) {
    app.component('Home', Home)
    app.component('Welcome', Welcome)
    app.component('About', About)
    // app.component('Friends', Friends)
    // app.component('Blog', Blog)
  }
}) 