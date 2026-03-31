<script setup lang="ts">
const { scrollY } = useScrollProgress()

const categories = [
  {
    label: 'Linguagens',
    icon: '⟨/⟩',
    items: ['Java', 'PHP', 'JavaScript', 'Python', 'Node.js', 'C# (.NET)']
  },
  {
    label: 'Frameworks',
    icon: '◇',
    items: ['Spring Boot', 'Laravel', 'Nest.js', 'Vue.js', 'Next.js', 'Electron']
  },
  {
    label: 'Arquitetura',
    icon: '⬡',
    items: ['Microservices', 'REST APIs', 'RabbitMQ', 'API Gateway', 'Eureka']
  },
  {
    label: 'Infra & Outros',
    icon: '⚙',
    items: ['Docker', 'DevOps', 'Web Scraping', 'SNMP', 'LwM2M']
  }
]
</script>

<template>
  <section id="tech" class="relative bg-surface-light py-24 lg:py-36 overflow-hidden">
    <!-- Background texture -->
    <div
      class="absolute left-[-20px] font-display font-extrabold text-[100px] lg:text-[160px] text-black/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(30% + ${scrollY * -0.04}px)` }"
    >
      STACK
    </div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px] bg-accent" />
        <p class="reveal text-accent text-sm font-semibold uppercase tracking-[4px]">Ferramentas</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight mb-6">
        TECNOLOGIAS
      </h2>

      <p class="reveal text-text-muted text-lg max-w-xl mb-16" data-stagger="1">
        Tecnologias que utilizo no dia a dia para construir soluções robustas e escaláveis.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(category, catIndex) in categories"
          :key="category.label"
          class="reveal-scale group"
          :data-stagger="catIndex + 1"
        >
          <div class="p-6 bg-white rounded-xl border border-border-light hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full">
            <!-- Category icon -->
            <div class="w-10 h-10 rounded-lg bg-surface-light flex items-center justify-center text-accent font-mono text-sm mb-4 group-hover:bg-accent/10 transition-colors duration-300">
              {{ category.icon }}
            </div>

            <h3 class="font-display font-bold text-base text-black mb-5">
              {{ category.label }}
            </h3>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in category.items"
                :key="item"
                class="px-3 py-1.5 bg-surface-light rounded-lg text-xs text-black/60 font-medium hover:bg-accent/10 hover:text-accent transition-colors duration-200 cursor-default"
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
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">JAVA</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">SPRING BOOT</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">VUE.JS</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">DOCKER</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">RABBITMQ</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">.NET</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">LARAVEL</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">NEXT.JS</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">PYTHON</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">NEST.JS</span>
          <span class="text-accent/20">•</span>
          <span class="text-black/10 font-display font-extrabold text-2xl tracking-tight">MICROSERVICES</span>
          <span class="text-accent/20">•</span>
        </span>
      </div>
    </div>
  </section>
</template>
