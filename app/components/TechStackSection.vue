<script setup lang="ts">
const { scrollY } = useScrollProgress()
const { isManga } = useTheme()

const categoryKeys = ['languages', 'frameworks', 'architecture', 'infra', 'ai'] as const

const categoryItems: Record<string, string[]> = {
  languages: ['Java', 'PHP', 'JavaScript', 'Python', 'Node.js', 'C# (.NET)'],
  frameworks: ['Spring Boot', 'Laravel', 'Nest.js', 'Vue.js', 'Next.js', 'Electron'],
  architecture: ['Microservices', 'REST APIs', 'RabbitMQ', 'API Gateway', 'Eureka'],
  infra: ['Docker', 'DevOps', 'Web Scraping', 'SNMP', 'LwM2M'],
  ai: ['Claude Code', 'Cursor AI', 'Multi-Agent Workflows', 'Prompt Engineering'],
}
</script>

<template>
  <section id="tech" class="relative py-16 sm:py-24 lg:py-36 overflow-hidden" :class="isManga ? 'bg-surface-dark' : 'bg-surface-light'">
    <MangaKanji v-if="isManga" text="技術" position="top-right" size="md" />

    <div
      class="absolute left-[-20px] font-display font-extrabold text-[50px] sm:text-[100px] lg:text-[160px] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :class="isManga ? 'text-white/[0.02]' : 'text-black/[0.02]'"
      :style="{ top: `calc(30% + ${scrollY * -0.04}px)` }"
    >
      STACK
    </div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px]" :class="isManga ? 'bg-white' : 'bg-accent'" />
        <p class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]" :class="isManga ? 'text-white/60' : 'text-accent'">{{ $t('tech.label') }}</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6" :class="isManga ? 'text-white' : 'text-black'">
        {{ $t('tech.title') }}
      </h2>

      <p class="reveal text-sm sm:text-lg max-w-xl mb-10 sm:mb-16" :class="isManga ? 'text-white/60' : 'text-text-muted'" data-stagger="1">
        {{ $t('tech.description') }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        <div
          v-for="(key, catIndex) in categoryKeys"
          :key="key"
          class="reveal-scale group"
          :data-stagger="catIndex + 1"
        >
          <div
            class="p-4 sm:p-6 border transition-all duration-300 h-full"
            :class="isManga ? (catIndex % 2 === 0 ? 'bg-surface-dark border-[#333] hover:border-white/40' : 'bg-white border-black text-black hover:border-black/60') : 'bg-white rounded-xl border-border-light hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5'"
          >
            <div
              class="w-10 h-10 flex items-center justify-center mb-4 transition-colors duration-300"
              :class="isManga ? (catIndex % 2 === 0 ? 'bg-white/[0.05] group-hover:bg-white/10' : 'bg-black/[0.05] group-hover:bg-black/10') : 'rounded-lg bg-surface-light group-hover:bg-accent/10'"
            >
              <svg v-if="catIndex === 0" class="w-5 h-5" :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-accent'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <svg v-else-if="catIndex === 1" class="w-5 h-5" :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-accent'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <svg v-else-if="catIndex === 2" class="w-5 h-5" :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-accent'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              <svg v-else-if="catIndex === 3" class="w-5 h-5" :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-accent'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
              <svg v-else class="w-5 h-5" :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-accent'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>

            <h3 class="font-display font-bold text-sm sm:text-base mb-3 sm:mb-5" :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-black'">
              {{ $t(`tech.categories.${key}`) }}
            </h3>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in categoryItems[key]"
                :key="item"
                class="px-3 py-1.5 text-xs font-medium"
                :class="isManga ? (catIndex % 2 === 0 ? 'bg-white/[0.06] text-white/70 border border-white/10' : 'bg-black/[0.06] text-black/70 border border-black/10') : 'bg-surface-light rounded-lg text-black/70'"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 sm:mt-20 overflow-hidden border-t border-b py-3 sm:py-4" :class="isManga ? 'border-[#333]' : 'border-border-light'">
      <div class="flex whitespace-nowrap" style="animation: marquee 30s linear infinite">
        <span v-for="n in 2" :key="n" class="flex gap-8 mr-8">
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">JAVA</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">SPRING BOOT</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">VUE.JS</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">DOCKER</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">RABBITMQ</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">.NET</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">LARAVEL</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">NEXT.JS</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">PYTHON</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">NEST.JS</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">MICROSERVICES</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
        </span>
      </div>
    </div>
  </section>
</template>
