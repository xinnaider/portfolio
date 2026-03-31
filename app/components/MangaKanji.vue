<script setup lang="ts">
defineProps<{
  text: string
  position?: 'top-right' | 'top-left' | 'bottom-right'
  vertical?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const { isManga } = useTheme()
</script>

<template>
  <div
    v-if="isManga"
    class="absolute pointer-events-none select-none font-bold text-white leading-none"
    :class="[
      {
        'top-5 right-8': position === 'top-right' || !position,
        'top-5 left-8': position === 'top-left',
        'bottom-5 right-8': position === 'bottom-right',
      },
      {
        'text-[28px]': size === 'sm',
        'text-[48px]': size === 'md' || !size,
        'text-[80px]': size === 'lg',
      }
    ]"
    :style="{
      opacity: 0.03,
      writingMode: vertical ? 'vertical-rl' : undefined,
    }"
  >
    {{ text }}
  </div>
</template>
