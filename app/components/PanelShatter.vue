<script setup lang="ts">
const { isTransitioning, generateFragments, prefersReducedMotion } = useThemeTransition()

const fragments = ref<ReturnType<typeof generateFragments>>([])
const phase = ref<'idle' | 'shatter-out' | 'recompose-in'>('idle')

watch(isTransitioning, (val) => {
  if (val) {
    fragments.value = generateFragments()
    phase.value = 'shatter-out'

    const isMobile = window.innerWidth < 640
    const shatterDuration = 700

    setTimeout(() => {
      phase.value = 'recompose-in'
    }, shatterDuration)

    const totalDuration = isMobile ? 1000 : 1500
    setTimeout(() => {
      phase.value = 'idle'
      fragments.value = []
    }, totalDuration)
  }
})
</script>

<template>
  <div
    v-if="isTransitioning"
    class="panel-shatter-overlay"
    :class="{ 'reduced-motion': prefersReducedMotion }"
  >
    <div
      v-for="frag in fragments"
      :key="frag.id"
      class="panel-shatter-fragment"
      :class="phase === 'shatter-out' ? 'shatter-out' : phase === 'recompose-in' ? 'recompose-in' : ''"
      :style="{
        clipPath: frag.clipPath,
        inset: 0,
        '--tx': `${frag.tx}px`,
        '--ty': `${frag.ty}px`,
        '--rot': `${frag.rot}deg`,
        '--sc': frag.sc,
        '--delay': `${frag.delay}ms`,
        '--duration': '600ms',
        '--fragment-bg': phase === 'shatter-out' ? '#0a0a0a' : '#0a0a0a',
      }"
    />

    <!-- Speed line flash -->
    <div
      class="panel-shatter-flash"
      :class="{ active: phase === 'shatter-out' }"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="absolute bg-white"
        :style="{
          width: '200vw',
          height: `${1 + Math.random() * 2}px`,
          top: `${40 + i * 4}%`,
          left: '-50vw',
          transform: `rotate(${-5 + Math.random() * 10}deg)`,
          opacity: 0.3,
        }"
      />
    </div>
  </div>
</template>
