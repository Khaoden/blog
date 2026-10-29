<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { Post } from '../../types/blog'
import Home from '../components/Home.vue'
import Blog from '../components/Blog.vue'
import Friends from '../components/Friends.vue'
import About from '../components/About.vue'
import Projects from '../components/Projects.vue'
import SearchDialog from '../components/SearchDialog.vue'
import SiteIcon from '../components/SiteIcon.vue'
import { categoryOf, dateLabel, titleOf } from '../utils/presentation'
import { motionPreference } from '../utils/motion'

const { page, frontmatter, theme, isDark } = useData()
const route = useRoute()
const menuOpen = ref(false)
const search = ref<InstanceType<typeof SearchDialog>>()
const progress = ref(0)
const showArticleTop = ref(false)
const activeHeading = ref('')
const motionPaused = ref(false)
const systemReducedMotion = ref(false)
const motionDisabled = computed(() => motionPaused.value || systemReducedMotion.value)
provide(motionPreference, motionDisabled)
let themeTransitionActive = false
const year = new Date().getFullYear()
const posts = computed(() => (theme.value.posts || []) as Post[])
const kind = computed(() => {
  const path = page.value.relativePath || ''
  if (page.value.isNotFound) return '404'
  if (path.startsWith('blog/posts/')) return 'article'
  if (['index.md', 'home.md'].includes(path)) return 'home'
  if (['blog.md', 'blog/index.md'].includes(path)) return 'blog'
  if (path === 'friend.md') return 'friends'
  if (path === 'about.md') return 'about'
  if (path === 'projects.md') return 'projects'
  return 'page'
})
const currentPost = computed(() =>
  posts.value.find((post) => post.url === '/' + page.value.relativePath?.replace(/\.md$/, ''))
)
const currentIndex = computed(() =>
  currentPost.value ? posts.value.indexOf(currentPost.value) : -1
)
const older = computed(() =>
  currentIndex.value >= 0 ? posts.value[currentIndex.value + 1] : undefined
)
const newer = computed(() =>
  currentIndex.value > 0 ? posts.value[currentIndex.value - 1] : undefined
)
const nav = [
  { label: '首页', english: 'Home', icon: 'home', href: '/', kind: 'home' },
  { label: '文章', english: 'Writing', icon: 'book', href: '/blog', kind: 'blog' },
  { label: '项目', english: 'Projects', icon: 'code', href: '/projects', kind: 'projects' },
  { label: '友链', english: 'Friends', icon: 'link', href: '/friend', kind: 'friends' },
  { label: '关于', english: 'About', icon: 'smile', href: '/about', kind: 'about' }
]
let observer: IntersectionObserver | undefined
let scrollFrame = 0
let motionQuery: MediaQueryList | undefined

function syncMotionPreference() {
  systemReducedMotion.value = motionQuery?.matches || false
}
function toggleMotion() {
  if (systemReducedMotion.value) return
  motionPaused.value = !motionPaused.value
  try {
    localStorage.setItem('khaoden-motion-paused', String(motionPaused.value))
  } catch {
    // The control still works when browser storage is unavailable.
  }
}

async function toggleTheme(event: MouseEvent) {
  if (themeTransitionActive) return
  const transitionDocument = document as Document & {
    startViewTransition?: (update: () => Promise<void>) => { finished: Promise<void> }
  }
  if (motionDisabled.value || !transitionDocument.startViewTransition) {
    isDark.value = !isDark.value
    return
  }
  const button = event.currentTarget as HTMLElement
  const box = button.getBoundingClientRect()
  const x = box.left + box.width / 2
  const y = box.top + box.height / 2
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  document.documentElement.style.setProperty('--theme-x', x + 'px')
  document.documentElement.style.setProperty('--theme-y', y + 'px')
  document.documentElement.style.setProperty('--theme-radius', radius + 'px')
  document.documentElement.classList.add('theme-transition')
  themeTransitionActive = true
  try {
    const transition = transitionDocument.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    })
    await transition.finished
  } finally {
    document.documentElement.classList.remove('theme-transition')
    themeTransitionActive = false
  }
}

function top() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  })
}
function updateProgress() {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(() => {
    const height = document.documentElement.scrollHeight - window.innerHeight
    progress.value = height > 0 ? Math.min(100, Math.round((window.scrollY / height) * 100)) : 0
    showArticleTop.value = window.scrollY > 480
    scrollFrame = 0
  })
}
async function observeHeadings() {
  observer?.disconnect()
  activeHeading.value = ''
  await nextTick()
  if (kind.value !== 'article') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) activeHeading.value = entry.target.id
    },
    { rootMargin: '-80px 0px -65% 0px' }
  )
  document
    .querySelectorAll('.article-body h2[id], .article-body h3[id]')
    .forEach((el) => observer?.observe(el))
}
function keyboard(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    search.value?.open()
  }
  if (event.key === 'Escape') menuOpen.value = false
}
watch(
  () => route.path,
  () => {
    menuOpen.value = false
    if (typeof window !== 'undefined') {
      updateProgress()
      observeHeadings()
    }
  }
)
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMotionPreference()
  motionQuery.addEventListener('change', syncMotionPreference)
  try {
    motionPaused.value = localStorage.getItem('khaoden-motion-paused') === 'true'
  } catch {
    motionPaused.value = false
  }
  document.addEventListener('keydown', keyboard)
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
  observeHeadings()
})
onUnmounted(() => {
  motionQuery?.removeEventListener('change', syncMotionPreference)
  document.removeEventListener('keydown', keyboard)
  window.removeEventListener('scroll', updateProgress)
  observer?.disconnect()
  cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <div class="journal" :class="{ 'motion-paused': motionDisabled, 'page-home': kind === 'home' }">
    <a href="#main-content" class="skip-link">跳转到正文</a>
    <header class="site-header">
      <div class="header-inner">
        <a href="/" class="site-brand" aria-label="Khaoden 首页"
          ><span class="brand-mark"><SiteIcon name="asterisk" :size="26" /></span
          ><span class="brand-name">Khaoden</span></a
        >
        <nav class="desktop-nav" aria-label="主导航">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            :class="{ active: kind === item.kind || (item.kind === 'blog' && kind === 'article') }"
            :aria-current="
              kind === item.kind || (item.kind === 'blog' && kind === 'article')
                ? 'page'
                : undefined
            "
            ><span>{{ item.label }}</span></a
          >
        </nav>
        <div class="header-actions">
          <button
            type="button"
            class="search-trigger"
            aria-label="搜索文章，快捷键 Ctrl 或 Command K"
            @click="search?.open()"
          >
            <SiteIcon name="search" :size="18" /><span>搜索</span><kbd>⌘ K</kbd>
          </button>
          <button
            type="button"
            class="icon-button motion-toggle"
            :aria-label="
              systemReducedMotion ? '系统已减少动态效果' : motionPaused ? '播放动画' : '暂停动画'
            "
            :aria-pressed="motionDisabled"
            :disabled="systemReducedMotion"
            @click="toggleMotion"
          >
            <SiteIcon :name="motionDisabled ? 'play' : 'pause'" :size="17" />
          </button>
          <ClientOnly>
            <button
              type="button"
              class="icon-button theme-trigger"
              :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
              @click="toggleTheme"
            >
              <SiteIcon :name="isDark ? 'sun' : 'moon'" :size="19" /><span>{{
                isDark ? '浅色模式' : '深色模式'
              }}</span>
            </button>
            <template #fallback>
              <span class="icon-button theme-trigger" aria-hidden="true"
                ><SiteIcon name="moon" :size="19" /><span>切换主题</span></span
              >
            </template>
          </ClientOnly>
          <a
            href="https://github.com/Khaoden"
            class="sidebar-github"
            target="_blank"
            rel="noopener noreferrer"
            ><SiteIcon name="github" :size="18" /><span>GitHub</span
            ><SiteIcon name="diagonal" :size="14"
          /></a>
          <button
            type="button"
            class="icon-button mobile-menu-button"
            :aria-expanded="menuOpen"
            aria-controls="mobile-navigation"
            :aria-label="menuOpen ? '关闭导航' : '打开导航'"
            @click="menuOpen = !menuOpen"
          >
            <SiteIcon :name="menuOpen ? 'close' : 'menu'" />
          </button>
        </div>
      </div>
      <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="手机导航">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          :aria-current="
            kind === item.kind || (item.kind === 'blog' && kind === 'article') ? 'page' : undefined
          "
          @click="menuOpen = false"
          >{{ item.label }}<SiteIcon name="diagonal" :size="17"
        /></a>
        <button
          class="mobile-motion-toggle"
          type="button"
          :disabled="systemReducedMotion"
          :aria-pressed="motionDisabled"
          @click="toggleMotion"
        >
          <SiteIcon :name="motionDisabled ? 'play' : 'pause'" :size="17" />{{
            systemReducedMotion ? '系统已减少动态效果' : motionPaused ? '播放动画' : '暂停动画'
          }}
        </button>
      </nav>
      <div
        v-if="kind === 'article'"
        class="reading-progress"
        role="progressbar"
        aria-label="文章阅读进度"
        :aria-valuenow="progress"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :style="{ width: progress + '%' }"
      ></div>
    </header>

    <div class="site-content">
      <main id="main-content" :key="page.relativePath" class="page-scene" tabindex="-1">
        <Home v-if="kind === 'home'" :motion-paused="motionDisabled" />
        <Blog v-else-if="kind === 'blog'" />
        <Friends v-else-if="kind === 'friends'" />
        <About v-else-if="kind === 'about'" />
        <Projects v-else-if="kind === 'projects'" />
        <div v-else-if="kind === 'article'" class="article-shell">
          <a href="/blog" class="back-link"><SiteIcon name="left" :size="17" /> 返回所有文章</a>
          <div class="article-layout">
            <article class="reading-article">
              <header class="article-header">
                <span class="eyebrow">{{
                  currentPost ? categoryOf(currentPost) : '学习笔记'
                }}</span>
                <h1>
                  {{ frontmatter.title || page.title || (currentPost && titleOf(currentPost)) }}
                </h1>
                <p
                  v-if="frontmatter.description && frontmatter.description !== frontmatter.title"
                  class="article-description"
                >
                  {{ frontmatter.description }}
                </p>
                <div class="article-byline">
                  <img src="/images/avatar.jpg" alt="" width="30" height="30" /><span>Khaoden</span
                  ><span class="meta-divider">·</span
                  ><time :datetime="frontmatter.date || undefined">{{
                    dateLabel(frontmatter.date)
                  }}</time
                  ><span class="meta-divider">·</span
                  ><span
                    >{{
                      currentPost?.frontmatter.readingTime || frontmatter.readingTime || 1
                    }}
                    分钟阅读</span
                  >
                  <span v-if="frontmatter.lastUpdated" class="article-updated"
                    >更新于 {{ dateLabel(frontmatter.lastUpdated) }}</span
                  >
                </div>
                <div v-if="frontmatter.tags?.length" class="article-tags">
                  <span v-for="tag in frontmatter.tags" :key="tag"># {{ tag }}</span>
                </div>
              </header>
              <details v-if="page.headers?.length" class="mobile-article-toc">
                <summary>本页目录 <SiteIcon name="menu" :size="16" /></summary>
                <nav aria-label="手机文章目录">
                  <template v-for="heading in page.headers" :key="heading.slug"
                    ><a :href="'#' + heading.slug">{{ heading.title }}</a
                    ><a
                      v-for="child in heading.children"
                      :key="child.slug"
                      :href="'#' + child.slug"
                      class="toc-child"
                      >{{ child.title }}</a
                    ></template
                  >
                </nav>
              </details>
              <div class="article-body">
                <div v-if="currentPost?.hasContent === false" class="article-placeholder">
                  <SiteIcon name="book" :size="28" />
                  <p>这篇笔记还没有正文。</p>
                  <a href="/blog" class="text-link"
                    >先读读其他文字 <SiteIcon name="arrow" :size="17"
                  /></a>
                </div>
                <Content class="vp-doc" />
              </div>
              <div class="article-end">
                <SiteIcon name="leaf" :size="20" /><span
                  >写下来，是为了更好地理解。感谢你的阅读。</span
                >
              </div>
              <nav class="article-pagination" aria-label="相邻文章">
                <a v-if="older" :href="older.url"
                  ><span>上一篇</span><strong>{{ titleOf(older) }}</strong
                  ><SiteIcon name="left" :size="17" /></a
                ><a v-if="newer" :href="newer.url" class="next-article"
                  ><span>下一篇</span><strong>{{ titleOf(newer) }}</strong
                  ><SiteIcon name="arrow" :size="17"
                /></a>
              </nav>
            </article>
            <aside class="article-toc">
              <p class="sidebar-label">本页目录</p>
              <nav v-if="page.headers?.length" aria-label="文章目录">
                <template v-for="heading in page.headers" :key="heading.slug"
                  ><a
                    :href="'#' + heading.slug"
                    :class="{ active: activeHeading === heading.slug }"
                    >{{ heading.title }}</a
                  ><a
                    v-for="child in heading.children"
                    :key="child.slug"
                    :href="'#' + child.slug"
                    class="toc-child"
                    :class="{ active: activeHeading === child.slug }"
                    >{{ child.title }}</a
                  ></template
                >
              </nav>
              <p v-else class="toc-empty">这一页，慢慢读就好。</p>
              <button type="button" class="back-to-top" @click="top">
                <SiteIcon name="up" :size="15" /> 回到顶部
              </button>
            </aside>
          </div>
        </div>
        <div v-else-if="kind === '404'" class="not-found">
          <span class="eyebrow">404 / LOST IN THE NOTES</span>
          <h1>这一页，还没有写下。</h1>
          <p>换个方向，也许会遇见新的灵感。</p>
          <a href="/" class="primary-button">回到首页 <SiteIcon name="arrow" :size="18" /></a>
        </div>
        <div v-else class="plain-page"><Content class="vp-doc" /></div>
      </main>

      <footer class="site-footer">
        <div class="footer-main">
          <div>
            <a href="/" class="footer-brand">Khaoden<span>.</span></a>
            <p>所学有所记，所思有所迹。</p>
          </div>
          <div class="footer-links">
            <a href="/blog">所有文章</a><a href="/friend">友情链接</a
            ><a href="https://github.com/Khaoden" target="_blank" rel="noopener noreferrer"
              >GitHub <SiteIcon name="diagonal" :size="13"
            /></a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© {{ year }} Khaoden</span
          ><button type="button" @click="top">回到顶部 <SiteIcon name="up" :size="14" /></button>
        </div>
      </footer>
    </div>
    <button
      v-if="kind === 'article' && showArticleTop"
      class="article-mobile-top"
      type="button"
      aria-label="回到文章顶部"
      @click="top"
    >
      <SiteIcon name="up" :size="19" /><span>{{ progress }}%</span>
    </button>
    <SearchDialog ref="search" />
  </div>
</template>
