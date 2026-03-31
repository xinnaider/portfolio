<script setup lang="ts">
const { isInkSplashing, generateInkBlobs, prefersReducedMotion } = useThemeTransition()

const blobs = ref<ReturnType<typeof generateInkBlobs>>([])
const phase = ref<'idle' | 'growing' | 'shrinking'>('idle')

watch(isInkSplashing, (val) => {
  if (val) {
    blobs.value = generateInkBlobs()
    phase.value = 'growing'

    // Switch to shrinking after ink covers screen
    setTimeout(() => {
      phase.value = 'shrinking'
    }, 420)

    // Reset after full animation
    setTimeout(() => {
      phase.value = 'idle'
      blobs.value = []
    }, 840)
  }
})
</script>

<template>
  <div
    v-if="phase !== 'idle'"
    class="ink-splash-overlay"
    :class="{ 'reduced-motion': prefersReducedMotion }"
  >
    <svg class="ink-splash-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <circle
        v-for="blob in blobs"
        :key="blob.id"
        class="ink-blob"
        :class="phase === 'growing' ? 'growing' : phase === 'shrinking' ? 'shrinking' : ''"
        :cx="blob.cx"
        :cy="blob.cy"
        r="80"
        fill="#000"
        :style="{ '--ink-delay': `${blob.delay}ms` }"
      />
    </svg>
  </div>
</template>
