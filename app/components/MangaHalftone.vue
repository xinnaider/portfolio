<script setup lang="ts">
defineProps<{
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}>()

const { isManga } = useTheme()
</script>

<template>
  <div
    v-if="isManga"
    class="manga-halftone"
    :class="[
      variant === 'light' ? 'manga-halftone-light' : 'manga-halftone-dark',
      {
        'bottom-0 right-0': position === 'bottom-right' || !position,
        'bottom-0 left-0': position === 'bottom-left',
        'top-0 right-0': position === 'top-right',
        'top-0 left-0': position === 'top-left',
      },
      {
        'w-[60px] h-[40px]': size === 'sm',
        'w-[100px] h-[60px]': size === 'md' || !size,
        'w-[150px] h-[100px]': size === 'lg',
      }
    ]"
    :style="{ opacity: variant === 'light' ? 0.08 : 0.06 }"
  />
</template>
