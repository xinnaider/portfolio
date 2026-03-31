<script setup lang="ts">
const { tm, rt } = useI18n()

const yearsCounter = useCounter(4, 2000)
const companiesCounter = useCounter(3, 2000)
const languagesCounter = useCounter(6, 2000)

const countersRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          yearsCounter.animate()
          companiesCounter.animate()
          languagesCounter.animate()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (countersRef.value) {
    observer.observe(countersRef.value)
  }
})

const highlights = computed(() => tm('about.highlights') as Array<{ title: string, desc: string }>)
</script>

<template>
  <!-- MANGA ABOUT: Asymmetric panel grid with gutters -->
  <section id="sobre" class="relative bg-black py-0 overflow-hidden">
    <MangaKanji text="力" position="top-right" size="md" />

    <div class="max-w-6xl mx-auto">
      <!-- Section header inside a thin top panel -->
      <div class="border-b-2 border-[#333] px-6 py-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="reveal w-12 h-[2px] bg-white" />
          <p class="reveal text-white/50 text-xs font-semibold uppercase tracking-[4px]">{{ $t('about.label') }}</p>
        </div>
        <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
          {{ $t('about.title') }}
        </h2>
      </div>

      <!-- Asymmetric panel grid: 2fr light / 1fr dark -->
      <div class="grid lg:grid-cols-[2fr_1fr]">
        <!-- Light panel (bio + highlights) -->
        <div class="bg-white border-r-0 lg:border-r-2 border-[#000] p-6 sm:p-10 lg:p-12">
          <MangaHalftone position="top-left" variant="light" size="sm" />
          <p class="reveal text-black/80 text-sm sm:text-lg leading-relaxed" data-stagger="1">
            {{ $t('about.bio1') }}
          </p>
          <p class="reveal text-black/80 text-sm sm:text-lg leading-relaxed mt-6" data-stagger="2">
            {{ $t('about.bio2') }}
          </p>
          <p class="reveal text-black/80 text-sm sm:text-lg leading-relaxed mt-6" data-stagger="3">
            {{ $t('about.bio3') }}
          </p>

          <!-- Highlights as sub-panels in 2-column grid -->
          <div class="grid sm:grid-cols-2 gap-[2px] bg-black mt-10">
            <div
              v-for="(item, index) in highlights"
              :key="index"
              class="reveal-scale bg-[#f5f5f5] p-4 sm:p-5"
              :data-stagger="index + 1"
            >
              <div class="w-8 h-8 bg-black flex items-center justify-center mb-3">
                <svg v-if="index === 0" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <svg v-else-if="index === 1" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <svg v-else-if="index === 2" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                <svg v-else-if="index === 3" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                <svg v-else class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 class="font-display font-bold text-sm text-black mb-1">{{ rt(item.title) }}</h3>
              <p class="text-black/60 text-xs leading-relaxed">{{ rt(item.desc) }}</p>
            </div>
          </div>
        </div>

        <!-- Dark panel (counters) -->
        <div class="bg-[#0a0a0a] p-6 sm:p-10 lg:p-12 border-t-2 lg:border-t-0 border-[#333]">
          <MangaKanji text="力" position="bottom-right" size="sm" />

          <div ref="countersRef" class="flex flex-row lg:flex-col gap-8 lg:gap-12">
            <div class="reveal border-l-2 border-white pl-4 sm:pl-6" data-stagger="1">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white">+{{ yearsCounter.count.value }}</span>
              <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mt-2">{{ $t('about.yearsLabel') }}</p>
            </div>
            <div class="reveal border-l-2 border-white/20 pl-4 sm:pl-6" data-stagger="2">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white">{{ companiesCounter.count.value }}</span>
              <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mt-2">{{ $t('about.companiesLabel') }}</p>
            </div>
            <div class="reveal border-l-2 border-white/20 pl-4 sm:pl-6" data-stagger="3">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white">{{ languagesCounter.count.value }}+</span>
              <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mt-2">{{ $t('about.languagesLabel') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
