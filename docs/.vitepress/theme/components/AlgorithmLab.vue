<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId, watch } from 'vue'
import SiteIcon from './SiteIcon.vue'
import { binarySearchSteps } from '../utils/binarySearch'
import { useMotionPreference } from '../utils/motion'

const values = [1, 3, 5, 8, 13, 21, 34]
const target = ref(13)
const cursor = ref(-1)
const playing = ref(false)
const element = ref<HTMLElement>()
const fieldId = useId()
const motionDisabled = useMotionPreference()
const steps = computed(() => binarySearchSteps(values, target.value))
const current = computed(() => steps.value[cursor.value])
const finished = computed(() => current.value?.done || false)
const message = computed(
  () => current.value?.message || '有序数组，每次排除一半。选择目标，看看边界怎样移动。'
)
let timer: ReturnType<typeof setTimeout> | undefined
let observer: IntersectionObserver | undefined
let autoplayed = false

function stop() {
  clearTimeout(timer)
  playing.value = false
}
function advance() {
  if (cursor.value < steps.value.length - 1) cursor.value += 1
  if (finished.value) stop()
}
function schedule() {
  if (!playing.value) return
  timer = setTimeout(() => {
    advance()
    schedule()
  }, 1600)
}
function play() {
  autoplayed = true
  if (playing.value) return stop()
  if (motionDisabled.value) return advance()
  if (finished.value) cursor.value = -1
  playing.value = true
  if (cursor.value < 0) advance()
  schedule()
}
function step() {
  autoplayed = true
  stop()
  advance()
}
function reset() {
  autoplayed = true
  stop()
  cursor.value = -1
}
function visibility() {
  if (document.hidden) stop()
}
function marker(index: number) {
  if (!current.value || current.value.mid < 0) return ''
  return [
    current.value.left === index ? 'L' : '',
    current.value.mid === index ? 'M' : '',
    current.value.right === index ? 'R' : ''
  ]
    .filter(Boolean)
    .join('·')
}
watch(target, reset)
watch(motionDisabled, (value) => {
  if (value) stop()
})
onMounted(() => {
  document.addEventListener('visibilitychange', visibility)
  observer = new IntersectionObserver(
    (entries) => {
      const inView = entries.some((entry) => entry.isIntersecting)
      if (!inView) stop()
      else if (!autoplayed && !motionDisabled.value && !document.hidden) play()
    },
    { threshold: 0.4 }
  )
  if (element.value) observer.observe(element.value)
})
onUnmounted(() => {
  stop()
  observer?.disconnect()
  document.removeEventListener('visibilitychange', visibility)
})
</script>

<template>
  <div ref="element" class="algorithm-lab" :class="{ 'lab-playing': playing }">
    <div class="lab-toolbar">
      <span><i aria-hidden="true"></i> BINARY SEARCH / 01</span>
      <label :for="fieldId"
        >查找
        <select :id="fieldId" v-model="target" aria-label="二分查找目标">
          <option v-for="value in [1, 5, 13, 34, 42]" :key="value" :value="value">
            {{ value }}
          </option>
        </select>
      </label>
    </div>
    <div class="lab-visual" role="list" aria-label="有序数组及查找位置">
      <div
        v-for="(value, index) in values"
        :key="value"
        class="lab-column"
        role="listitem"
        :aria-label="
          '下标 ' + index + '，值 ' + value + (current?.mid === index ? '，当前中点' : '')
        "
      >
        <span class="lab-marker" aria-hidden="true">{{ marker(index) }}</span>
        <div
          class="lab-cell"
          :class="{
            'is-mid': current?.mid === index,
            'is-found': current?.found && current.mid === index,
            'is-discarded': current && (index < current.left || index > current.right)
          }"
        >
          {{ value }}
        </div>
        <small aria-hidden="true">{{ index }}</small>
      </div>
    </div>
    <div class="lab-status" role="status" aria-live="polite" aria-atomic="true">
      <span class="lab-step">{{ cursor < 0 ? 'READY' : 'STEP 0' + (cursor + 1) }}</span>
      <p>{{ message }}</p>
    </div>
    <div class="lab-controls">
      <button type="button" class="lab-play" :disabled="motionDisabled && finished" @click="play">
        <SiteIcon :name="playing ? 'pause' : 'play'" :size="15" />
        {{ motionDisabled ? '逐步查看' : playing ? '暂停' : finished ? '重新演示' : '播放演示' }}
      </button>
      <button type="button" :disabled="finished" @click="step">
        下一步 <SiteIcon name="arrow" :size="15" />
      </button>
      <button type="button" class="lab-reset" @click="reset">重置</button>
      <span class="lab-complexity">O(log n)</span>
    </div>
    <p class="lab-legend">L 左边界 · M 中点 · R 右边界<span>灰色表示已排除的元素</span></p>
  </div>
</template>
