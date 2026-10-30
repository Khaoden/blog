<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 })
const paths: Record<string, string[]> = {
  asterisk: ['M12 2v20M2 12h20M5 5l14 14M5 19 19 5'],
  pause: ['M8 5v14M16 5v14'],
  play: ['m8 5 11 7-11 7V5Z'],
  terminal: ['M3 4h18v16H3Z', 'm7 8 4 4-4 4m7 0h3'],
  coffee: [
    'M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z',
    'M17 9h2a3 3 0 0 1 0 6h-2M7 4V2m4 2V2m4 2V2'
  ],
  layers: ['m12 3 10 6-10 6L2 9l10-6Z', 'm2 13 10 6 10-6m-20 4 10 6 10-6'],
  home: ['m3 10 9-7 9 7v10H3Z', 'M9 20v-7h6v7'],
  smile: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0', 'M8 14s1 3 4 3 4-3 4-3', 'M8 8h.01M16 8h.01'],
  arrow: ['M5 12h14', 'm13 6 6 6-6 6'],
  diagonal: ['M7 17 17 7', 'M7 7h10v10'],
  left: ['M19 12H5', 'm11 6-6 6 6 6'],
  up: ['M12 19V5', 'm6 11 6-6 6 6'],
  down: ['m6 9 6 6 6-6'],
  search: ['m21 21-4.4-4.4', 'M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0'],
  sun: [
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
    'M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'
  ],
  moon: ['M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z'],
  menu: ['M4 6h16M4 12h16M4 18h16'],
  close: ['m6 6 12 12M6 18 18 6'],
  book: ['M12 5v15', 'M12 5C8 2 3 3 3 3v15s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z'],
  code: ['m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18'],
  leaf: ['M20 3C9 2 3 7 5 14s15 6 15-11Z', 'M4 21 15 10'],
  folder: ['M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7H3Z', 'M3 7V4h6l2 3'],
  clock: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0', 'M12 7v5l3 2'],
  link: [
    'm10 13 4-4',
    'm8 16-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0',
    'm16 8 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'
  ],
  copy: ['M9 9h12v12H9Z', 'M15 5V3H3v12h2'],
  check: ['m5 12 4 4L19 6'],
  github: [
    'M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-1.7-.5-2.3 3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6A5 5 0 0 0 19.2 2S18 1.6 15 3.4a13 13 0 0 0-7 0C5 1.6 3.8 2 3.8 2a5 5 0 0 0-.1 3.4A5.2 5.2 0 0 0 2.3 9c0 5.2 3.2 6.4 6.2 6.7C8 16.3 8 17 8 18v4'
  ],
  sparkle: ['m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z']
}
</script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(path, index) in paths[name] || paths.book" :key="index" :d="path" />
  </svg>
</template>
