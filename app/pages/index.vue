<script setup lang="ts">
import { Theme } from '~/composables/useTheme'
import VioletLayout from '~/components/layouts/VioletLayout.vue'
import MangaLayout from '~/components/layouts/MangaLayout.vue'

const { t } = useI18n()

useHead({
  title: 'José Fernando — Full Stack Developer',
  meta: [
    { name: 'description', content: () => t('meta.description') }
  ]
})

const { observeNew } = useScrollReveal()

const { progress } = useScrollProgress()
const { theme } = useTheme()

const currentLayout = computed(() =>
  theme.value === Theme.MANGA ? MangaLayout : VioletLayout
)

// Re-observe .reveal elements after layout swap so new DOM nodes are picked up
watch(theme, async () => {
  await nextTick()
  observeNew()
})
</script>

<template>
  <div>
    <a href="#sobre" class="skip-to-content">{{ $t('skip') }}</a>

    <div
      class="scroll-progress"
      :style="{ width: `${progress * 100}%` }"
    />

    <NavBar />
    <component :is="currentLayout" :key="theme" />
    <FloatingPanel />
    <PanelShatter />
    <InkSplash />
  </div>
</template>
