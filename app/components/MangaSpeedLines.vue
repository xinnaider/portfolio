<script setup lang="ts">
defineProps<{
  count?: number
  direction?: 'right' | 'center'
}>()

const { isManga } = useTheme()

const lines = computed(() => {
  const count = 6
  return Array.from({ length: count }, (_, i) => ({
    width: `${80 + Math.random() * 120}px`,
    height: `${1 + Math.random() * 1.5}px`,
    top: `${20 + (i * 60 / count) + Math.random() * 10}%`,
    rotation: -5 - Math.random() * 15,
    opacity: 0.03 + Math.random() * 0.05,
  }))
})
</script>

<template>
  <div v-if="isManga" class="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="manga-speed-line text-white"
      :style="{
        width: line.width,
        height: line.height,
        top: line.top,
        right: direction === 'center' ? '50%' : '-20px',
        transform: `rotate(${line.rotation}deg)`,
        opacity: line.opacity,
      }"
    />
  </div>
</template>
