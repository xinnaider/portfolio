<script setup lang="ts">
const { scrollY } = useScrollProgress()

const categories = [
  {
    label: 'Linguagens',
    items: ['Java', 'PHP', 'JavaScript', 'Python', 'Node.js', 'C# (.NET)']
  },
  {
    label: 'Frameworks',
    items: ['Spring Boot', 'Laravel', 'Nest.js', 'Vue.js', 'Next.js', 'Electron']
  },
  {
    label: 'Arquitetura',
    items: ['Microservices', 'REST APIs', 'RabbitMQ', 'API Gateway', 'Eureka']
  },
  {
    label: 'Infra & Outros',
    items: ['Docker', 'DevOps', 'Web Scraping', 'SNMP', 'LwM2M']
  }
]
</script>

<template>
  <section id="tech" class="relative bg-surface-light py-24 lg:py-36 overflow-hidden">
    <!-- Background texture -->
    <div
      class="absolute left-[-20px] font-display font-extrabold text-[50px] sm:text-[100px] lg:text-[160px] text-black/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(30% + ${scrollY * -0.04}px)` }"
    >
      STACK
    </div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px] bg-accent" />
        <p class="reveal text-accent text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]">Ferramentas</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black tracking-tight mb-6">
        TECNOLOGIAS
      </h2>

      <p class="reveal text-text-muted text-sm sm:text-lg max-w-xl mb-10 sm:mb-16" data-stagger="1">
        Tecnologias que utilizo no dia a dia para construir soluções robustas e escaláveis.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div
          v-for="(category, catIndex) in categories"
          :key="category.label"
          class="reveal-scale group"
          :data-stagger="catIndex + 1"
        >
          <div class="p-6 bg-white rounded-xl border border-border-light hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full">
            <!-- Category icon -->
            <div class="w-10 h-10 rounded-lg bg-surface-light flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors duration-300">
              <!-- Linguagens -->
              <svg v-if="catIndex === 0" class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <!-- Frameworks -->
              <svg v-else-if="catIndex === 1" class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <!-- Arquitetura -->
              <svg v-else-if="catIndex === 2" class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              <!-- Infra -->
              <svg v-else class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            </div>

            <h3 class="font-display font-bold text-base text-black mb-5">
              {{ category.label }}
            </h3>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in category.items"
                :key="item"
                class="px-3 py-1.5 bg-surface-light rounded-lg text-xs text-black/70 font-medium"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Marquee ticker -->
    <div class="mt-20 overflow-hidden border-t border-b border-border-light py-4">
      <div class="flex whitespace-nowrap" style="animation: marquee 30s linear infinite">
        <span v-for="n in 2" :key="n" class="flex gap-8 mr-8">
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">JAVA</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">SPRING BOOT</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">VUE.JS</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">DOCKER</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">RABBITMQ</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">.NET</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">LARAVEL</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">NEXT.JS</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">PYTHON</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">NEST.JS</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">MICROSERVICES</span>
          <span class="text-accent/20">•</span>
        </span>
      </div>
    </div>
  </section>
</template>
