<script setup lang="ts">
const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contato', href: '#contato' }
]

const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-surface-black/90 backdrop-blur-sm border-b border-border-dark' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
      <a href="#" class="font-display font-extrabold text-xl text-white tracking-tight">
        FERNANDO<span class="text-accent">.</span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-text-muted hover:text-accent transition-colors duration-200"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex md:hidden items-center gap-5">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-xs text-text-muted hover:text-accent transition-colors duration-200 whitespace-nowrap"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
