<script setup lang="ts">
import SiteIcon from './SiteIcon.vue'
import MotionReveal from './MotionReveal.vue'
import AlgorithmLab from './AlgorithmLab.vue'
const decisions = [
  {
    number: '01',
    icon: 'book',
    title: '内容有自己的位置',
    text: '文章从 Markdown 出发。分类、摘要与站内搜索，把零散的记录组织成能顺着阅读的路径。',
    detail: '分类归档 / 阅读路线 / 多关键词搜索'
  },
  {
    number: '02',
    icon: 'sun',
    title: '读起来，先舒服一点',
    text: '浅色与深色两种阅读环境，配合目录、代码复制和阅读进度，让长文章也容易停下和继续。',
    detail: '响应式布局 / 本地字体 / 长文导航'
  },
  {
    number: '03',
    icon: 'sparkle',
    title: '交互也能解释问题',
    text: '用动画呈现算法的边界变化。可以播放，也可以逐步推进；减少动态效果时，仍能完整操作。',
    detail: '算法演示 / 键盘操作 / 动态偏好'
  }
]
</script>
<template>
  <div class="projects-page page-width">
    <header class="page-intro">
      <span class="eyebrow">PROJECTS</span>
      <h1>边学边做<span class="heading-dot">.</span></h1>
      <p>把抽象的理解，变成能打开、能阅读、能操作的东西。</p>
    </header>
    <MotionReveal as="article" id="blog-project" class="project-showcase">
      <div class="project-preview" aria-hidden="true">
        <div class="preview-toolbar">
          <span></span><span></span><span></span><i>khaoden / personal space</i>
        </div>
        <div class="preview-canvas">
          <div class="preview-orbit"></div>
          <div class="preview-note">
            <SiteIcon name="asterisk" :size="22" /><small>HELLO, WORLD.</small
            ><strong>Khaoden<span>.</span></strong>
            <p>把所学，写成自己的语言。</p>
            <div></div>
            <span>CODE / LEARN / WRITE</span>
          </div>
          <span class="preview-satellite"><SiteIcon name="code" :size="22" /></span>
        </div>
        <div class="preview-cards"><i></i><i></i><i></i></div>
      </div>
      <div class="project-overview">
        <span class="project-status"><i></i> 持续迭代中</span
        ><span class="eyebrow">PROJECT 01 / PERSONAL WEBSITE</span>
        <h2>这本公开的笔记本</h2>
        <p>
          一个自己使用，也向外打开的数字空间。把
          Java、算法与工具笔记放在一起，让记录有结构，让探索有入口。
        </p>
        <div class="article-tags">
          <span>Vue</span><span>TypeScript</span><span>VitePress</span>
        </div>
        <div class="project-actions">
          <a href="/" class="primary-button">打开博客 <SiteIcon name="arrow" :size="16" /></a
          ><a
            href="https://github.com/Khaoden/blog"
            target="_blank"
            rel="noopener noreferrer"
            class="text-link"
            ><SiteIcon name="github" :size="17" /> 看看源码 <SiteIcon name="diagonal" :size="15"
          /></a>
        </div>
      </div>
    </MotionReveal>
    <MotionReveal as="section" class="project-decisions" aria-labelledby="decisions-heading"
      ><div class="section-heading">
        <div>
          <span class="eyebrow">SMALL DETAILS, REAL DIFFERENCES</span>
          <h2 id="decisions-heading">现在能用到的功能</h2>
        </div>
      </div>
      <div class="decision-grid">
        <section v-for="item in decisions" :key="item.number" class="decision-card">
          <div>
            <span>{{ item.number }}</span
            ><SiteIcon :name="item.icon" :size="23" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <small>{{ item.detail }}</small>
        </section>
      </div></MotionReveal
    >
    <MotionReveal
      as="section"
      id="playground"
      class="project-playground"
      aria-labelledby="playground-heading"
      ><div class="section-heading">
        <div>
          <span class="eyebrow">PROJECT 02 / INTERACTIVE NOTE</span>
          <h2 id="playground-heading">二分查找的小实验</h2>
        </div>
        <a href="/blog/posts/interview/代码随想录/数组算法" class="text-link"
          >对应的笔记 <SiteIcon name="diagonal" :size="16"
        /></a>
      </div>
      <p class="playground-description">
        每一次比较，都让候选范围缩小。试试查找 13，再试试并不存在的 42，观察两个过程如何结束。
      </p>
      <AlgorithmLab />
      <div class="playground-takeaways">
        <span><SiteIcon name="check" :size="15" /> 有序数组是前提</span
        ><span><SiteIcon name="check" :size="15" /> 闭区间 [left, right]</span
        ><span><SiteIcon name="check" :size="15" /> 边界交错时终止</span>
      </div></MotionReveal
    >
    <MotionReveal as="section" class="project-underhood"
      ><div>
        <span class="eyebrow">UNDER THE HOOD</span>
        <h2>从一份文字，到一个页面。</h2>
        <p>
          内容和展示各自演进。文章留在 Markdown
          中，主题负责把它们连接起来；每一次修改，都可以在源码里找到来处。
        </p>
        <a
          href="https://github.com/Khaoden/blog/tree/main/docs"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link"
          >浏览内容目录 <SiteIcon name="diagonal" :size="16"
        /></a>
      </div>
      <ol>
        <li><span>01</span><strong>写下内容</strong><small>Markdown / 元信息</small></li>
        <li><span>02</span><strong>组织与连接</strong><small>内容索引 / Vue 主题</small></li>
        <li><span>03</span><strong>构建与发布</strong><small>VitePress / Vercel</small></li>
      </ol></MotionReveal
    >
    <p class="project-footnote">
      更多探索，可以在
      <a href="https://github.com/Khaoden" target="_blank" rel="noopener noreferrer">GitHub</a>
      上找到。
    </p>
  </div>
</template>
