<script setup lang="ts">
const { theme, toggleTheme, isManga } = useTheme()
</script>

<template>
  <button
    role="switch"
    :aria-checked="isManga"
    :aria-label="isManga ? 'Switch to violet theme' : 'Switch to manga theme'"
    class="relative flex items-center w-14 h-7 rounded-full border transition-colors duration-300 cursor-pointer"
    :class="isManga
      ? 'bg-white/10 border-white/30'
      : 'bg-accent/10 border-accent/30'"
    @click="toggleTheme"
  >
    <span
      class="absolute w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-bold"
      :class="isManga
        ? 'translate-x-8 bg-white text-black'
        : 'translate-x-1 bg-accent text-white'"
    >
      {{ isManga ? '墨' : '✦' }}
    </span>
  </button>
</template>
