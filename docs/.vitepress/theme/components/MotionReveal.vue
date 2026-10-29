<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMotionPreference } from '../utils/motion'

withDefaults(defineProps<{ as?: string; delay?: number }>(), { as: 'div', delay: 0 })
const element = ref<HTMLElement>()
const visible = ref(true)
const disabled = useMotionPreference()
let observer: IntersectionObserver | undefined

function reveal() {
  visible.value = true
  observer?.disconnect()
}

onMounted(() => {
  if (disabled.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!element.value || element.value.getBoundingClientRect().top < window.innerHeight * 0.94)
    return
  visible.value = false
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal()
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.06 }
  )
  observer.observe(element.value)
})
watch(disabled, (value) => {
  if (value) reveal()
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <component
    :is="as"
    ref="element"
    class="motion-reveal"
    :class="{ 'reveal-pending': !visible }"
    :style="{ '--reveal-delay': delay + 'ms' }"
  >
    <slot />
  </component>
</template>
