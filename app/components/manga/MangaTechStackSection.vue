<script setup lang="ts">
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
  <!-- MANGA TECH: Title panel left / mini-panels grid right -->
  <section id="tech" class="relative overflow-hidden bg-black border-t-2 border-[#333]">
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-[1fr_2fr]">
        <!-- Title panel (left) -->
        <div class="relative bg-[#0a0a0a] border-b-2 lg:border-b-0 lg:border-r-2 border-[#333] p-6 sm:p-10 lg:p-12">
          <MangaKanji text="技術" position="bottom-right" vertical size="lg" />

          <div class="flex items-center gap-4 mb-4">
            <div class="reveal w-12 h-[2px] bg-white" />
            <p class="reveal text-white/50 text-xs font-semibold uppercase tracking-[4px]">{{ $t('tech.label') }}</p>
          </div>

          <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
            {{ $t('tech.title') }}
          </h2>

          <p class="reveal text-white/50 text-sm sm:text-lg max-w-xl leading-relaxed" data-stagger="1">
            {{ $t('tech.description') }}
          </p>
        </div>

        <!-- Mini-panels grid (right) - checkerboard dark/light -->
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
          <div
            v-for="(key, catIndex) in categoryKeys"
            :key="key"
            class="reveal-scale border-b-2 border-r-2 border-[#333] last:border-r-0 [&:nth-child(2n)]:border-r-0 p-5 sm:p-6"
            :class="catIndex % 2 === 0 ? 'bg-[#111]' : 'bg-white'"
            :data-stagger="catIndex + 1"
          >
            <div
              class="w-8 h-8 flex items-center justify-center mb-3"
              :class="catIndex % 2 === 0 ? 'bg-white/10' : 'bg-black/10'"
            >
              <svg v-if="catIndex === 0" class="w-4 h-4" :class="catIndex % 2 === 0 ? 'text-white' : 'text-black'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <svg v-else-if="catIndex === 1" class="w-4 h-4" :class="catIndex % 2 === 0 ? 'text-white' : 'text-black'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <svg v-else-if="catIndex === 2" class="w-4 h-4" :class="catIndex % 2 === 0 ? 'text-white' : 'text-black'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              <svg v-else-if="catIndex === 3" class="w-4 h-4" :class="catIndex % 2 === 0 ? 'text-white' : 'text-black'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
              <svg v-else class="w-4 h-4" :class="catIndex % 2 === 0 ? 'text-white' : 'text-black'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>

            <h3
              class="font-display font-bold text-sm sm:text-base mb-3 border-b pb-2"
              :class="catIndex % 2 === 0 ? 'text-white border-white/20' : 'text-black border-black/20'"
            >
              {{ $t(`tech.categories.${key}`) }}
            </h3>

            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="item in categoryItems[key]"
                :key="item"
                class="px-2.5 py-1 text-xs font-medium border"
                :class="catIndex % 2 === 0 ? 'border-white/10 text-white/70 bg-white/[0.04]' : 'border-black/10 text-black/70 bg-black/[0.04]'"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Marquee -->
    <div class="overflow-hidden border-t-2 border-[#333] py-3 sm:py-4">
      <div class="flex whitespace-nowrap" style="animation: marquee 30s linear infinite">
        <span v-for="n in 2" :key="n" class="flex gap-8 mr-8">
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">JAVA</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">SPRING BOOT</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">VUE.JS</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">DOCKER</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">RABBITMQ</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">.NET</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">LARAVEL</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">NEXT.JS</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">PYTHON</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">NEST.JS</span>
          <span class="text-white/20">&bull;</span>
          <span class="text-white/10 font-display font-extrabold text-lg sm:text-2xl tracking-tight">MICROSERVICES</span>
          <span class="text-white/20">&bull;</span>
        </span>
      </div>
    </div>
  </section>
</template>
