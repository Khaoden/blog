import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue({
          script: {
            defineModel: true,
            propsDestructure: true
          }
        })
      }
    })
  ]
})