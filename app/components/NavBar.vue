<script setup lang="ts">
const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contato', href: '#contato' }
]

const isScrolled = ref(false)
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

      <div class="flex items-center gap-6 md:gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-xs md:text-sm text-text-muted hover:text-accent transition-colors duration-200 py-2 px-1"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
