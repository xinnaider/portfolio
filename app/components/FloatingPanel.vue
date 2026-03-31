<script setup lang="ts">
const { isManga, toggleTheme } = useTheme()

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 3000)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <button
      v-show="isVisible"
      :aria-label="isManga ? 'Switch to violet theme' : 'Switch to manga theme'"
      class="fixed bottom-6 right-6 z-40 cursor-pointer border-2 px-3 py-2 transition-colors duration-300"
      :class="isManga
        ? 'bg-gradient-to-br from-[#1a1020] to-[#0a0a0a] border-[#7c3aed] hover:border-white shadow-[0_4px_20px_rgba(139,92,246,0.2)]'
        : 'bg-[#0a0a0a] border-white hover:border-[#8b5cf6] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'"
      style="animation: manga-float 3s ease-in-out infinite"
      @click="toggleTheme"
    >
      <span
        v-if="isManga"
        class="text-[#8b5cf6] text-lg"
        style="display: inline-block; transform: rotate(-3deg)"
      >✦</span>
      <span
        v-else
        class="font-bold text-white text-sm"
        style="font-family: 'Arial Black', sans-serif; display: inline-block; transform: rotate(-3deg)"
      >バン!</span>

      <!-- Pulse dot -->
      <span
        class="absolute -top-1 -right-1 w-2 h-2 rounded-full"
        :class="isManga ? 'bg-[#8b5cf6]' : 'bg-white'"
        style="animation: manga-pulse 2s ease-in-out infinite"
      />
    </button>
  </Transition>
</template>
