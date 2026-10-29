const java = '/blog/posts/learning/javaSE/'
const spring = '/blog/posts/learning/Spring/'
const algorithms = '/blog/posts/interview/代码随想录/'

export const learningPaths = [
  {
    id: 'backend',
    name: 'Java → Spring',
    icon: 'layers',
    caption: '先理解对象，再理解容器',
    intro: '从类型与对象出发，经过集合，最后走进依赖注入和代理。每一篇都为下一步留一个问题。',
    steps: [
      { title: 'Java 基础', detail: '值与引用、字符串、异常边界', href: java + 'java基础' },
      { title: '面向对象', detail: '封装、接口、组合与依赖方向', href: java + '面向对象' },
      { title: '集合与容器', detail: '顺序、去重、复杂度与可变性', href: java + '容器' },
      { title: 'Spring IoC', detail: '对象组装、构造器注入、生命周期', href: spring + 'ioc' },
      { title: 'Spring AOP', detail: '切面、代理与内部调用的边界', href: spring + 'aop' }
    ]
  },
  {
    id: 'algorithms',
    name: '把算法想清楚',
    icon: 'code',
    caption: '从边界条件到搜索空间',
    intro: '用一条线串起数组、字符串、数据结构和回溯。先说清楚为什么，再落到代码里。',
    steps: [
      { title: '数组算法', detail: '二分查找、双指针与滑动窗口', href: algorithms + '数组算法' },
      { title: '字符串算法', detail: '反转、替换与双指针的应用', href: algorithms + '字符串算法' },
      { title: '栈和队列', detail: '模拟结构、表达式与滑动窗口', href: algorithms + '栈和队列' },
      { title: '回溯与组合', detail: '搜索树、终止条件与剪枝', href: algorithms + '回溯算法-组合' }
    ]
  },
  {
    id: 'practice',
    name: '动手做一点',
    icon: 'terminal',
    caption: '把理解变成可操作的东西',
    intro:
      '从一条终端命令，到一个能交互的演示，再到这个持续迭代的博客。实践也可以从很小的地方开始。',
    steps: [
      {
        title: '让终端更顺手',
        detail: '配置 Windows 环境变量与 IDE 启动命令',
        href: '/blog/posts/technology/os/Windows终端命令快捷进入cursor'
      },
      {
        title: '看见二分查找',
        detail: '手动推进每一步，观察区间怎样缩小',
        href: '/projects#playground'
      },
      {
        title: '拆开这个博客',
        detail: '从内容组织到阅读体验，看看实现思路',
        href: '/projects#blog-project'
      }
    ]
  }
]
