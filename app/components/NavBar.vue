<script setup lang="ts">
const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contato', href: '#contato' }
]

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
      <a href="#" class="font-display font-extrabold text-xl text-white tracking-tight" aria-label="jfernando.dev — Voltar ao topo">
        jfernando<span class="text-accent">.dev</span>
      </a>

      <!-- Desktop -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-text-muted hover:text-accent transition-colors duration-200 py-2 px-1"
        >
          {{ link.label }}
        </a>
        <button
          class="text-sm text-accent border border-accent/40 rounded-lg px-4 py-1.5 hover:bg-accent/10 transition-colors duration-200"
          :disabled="isGenerating"
          @click="download"
        >
          {{ isGenerating ? 'Gerando...' : 'Currículo' }}
        </button>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        aria-label="Abrir menu"
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

    <!-- Mobile menu -->
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
            {{ isGenerating ? 'Gerando...' : 'Currículo' }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>
