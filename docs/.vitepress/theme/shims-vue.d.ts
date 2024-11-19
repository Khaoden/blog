import { ComputedRef } from 'vue';
import { DefaultTheme } from 'vitepress'
import type { Post } from '../types/blog'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 添加 Vue 类型声明
declare module 'vue' {
  interface App {
    component(name: string, component: any): any
  }
} 

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
      $computed: ComputedRef<any>;
  }
}