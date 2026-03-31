<script setup lang="ts">
const { t, locale } = useI18n()
const { isManga, initTheme } = useTheme()
const switchLocalePath = useSwitchLocalePath()

const navKeys = ['about', 'experience', 'tech', 'contact'] as const

const links = computed(() => navKeys.map(key => ({
  label: t(`nav.${key}`),
  href: `#${key === 'about' ? 'sobre' : key === 'experience' ? 'experiencia' : key === 'contact' ? 'contato' : key}`
})))

const { download, isGenerating } = useDownloadCv()
const isScrolled = ref(false)
const isMenuOpen = ref(false)
let ticking = false

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 50
      ticking = false
    })
    ticking = true
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  initTheme()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-surface-black/90 backdrop-blur-sm border-b border-border-dark' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
      <a href="#" class="font-display font-extrabold text-xl text-white tracking-tight" :aria-label="$t('nav.backToTop')">
        <template v-if="isManga">
          <span class="border-2 border-white px-2 py-0.5">JF</span>
          <span class="text-xs text-white/40 ml-2">ポートフォリオ</span>
        </template>
        <template v-else>
          jfernando<span class="text-accent">.dev</span>
        </template>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-text-muted transition-colors duration-200 py-2 px-1"
          :class="isManga ? 'hover:text-white uppercase tracking-widest text-xs' : 'hover:text-accent'"
        >
          {{ link.label }}
        </a>
        <button
          class="text-sm border px-4 py-1.5 transition-colors duration-200"
          :class="isManga
            ? 'text-white border-white/40 hover:bg-white/10 rounded-none'
            : 'text-accent border-accent/40 rounded-lg hover:bg-accent/10'"
          :disabled="isGenerating"
          @click="download"
        >
          {{ isGenerating ? $t('nav.generating') : $t('nav.resume') }}
        </button>

        <div class="flex items-center gap-1 text-sm">
          <NuxtLink
            :to="switchLocalePath('pt-BR')"
            class="px-2 py-1 rounded transition-colors duration-200"
            :class="locale === 'pt-BR'
              ? (isManga ? 'text-white font-semibold border border-white px-2' : 'text-accent font-semibold')
              : 'text-text-muted hover:text-white'"
          >
            PT
          </NuxtLink>
          <span class="text-white/20">|</span>
          <NuxtLink
            :to="switchLocalePath('en')"
            class="px-2 py-1 rounded transition-colors duration-200"
            :class="locale === 'en'
              ? (isManga ? 'text-white font-semibold border border-white px-2' : 'text-accent font-semibold')
              : 'text-text-muted hover:text-white'"
          >
            EN
          </NuxtLink>
        </div>
      </div>

      <button
        class="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        :aria-label="$t('nav.openMenu')"
        @click="toggleMenu"
      >
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="isMenuOpen ? 'opacity-0' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-show="isMenuOpen"
        class="md:hidden bg-surface-black/95 backdrop-blur-md border-b border-border-dark"
      >
        <div class="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="text-base text-text-muted hover:text-accent transition-colors duration-200 py-2"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
          <button
            class="text-base text-accent border border-accent/40 rounded-lg px-4 py-2 hover:bg-accent/10 transition-colors duration-200 text-left"
            :disabled="isGenerating"
            @click="download(); closeMenu()"
          >
            {{ isGenerating ? $t('nav.generating') : $t('nav.resume') }}
          </button>

          <div class="flex items-center gap-2 pt-2 border-t border-white/10">
            <NuxtLink
              :to="switchLocalePath('pt-BR')"
              class="px-3 py-1.5 rounded text-sm transition-colors duration-200"
              :class="locale === 'pt-BR' ? 'text-accent font-semibold' : 'text-text-muted hover:text-white'"
              @click="closeMenu"
            >
              PT
            </NuxtLink>
            <span class="text-white/20">|</span>
            <NuxtLink
              :to="switchLocalePath('en')"
              class="px-3 py-1.5 rounded text-sm transition-colors duration-200"
              :class="locale === 'en' ? 'text-accent font-semibold' : 'text-text-muted hover:text-white'"
              @click="closeMenu"
            >
              EN
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
