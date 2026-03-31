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
const { isManga } = useTheme()
</script>

<template>
  <section id="sobre" :class="isManga ? 'bg-surface-black' : 'bg-surface-white'" class="relative py-16 sm:py-24 lg:py-36 overflow-hidden">
    <div :class="isManga ? 'text-white/[0.02]' : 'text-black/[0.02]'" class="absolute right-[-30px] top-[20%] font-display font-extrabold text-[50px] sm:text-[100px] lg:text-[160px] tracking-tighter whitespace-nowrap select-none pointer-events-none">
      {{ $t('about.backgroundText') }}
    </div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center gap-4 mb-4">
        <div :class="isManga ? 'bg-white' : 'bg-accent'" class="reveal w-12 h-[1px]" />
        <p :class="isManga ? 'text-white/60' : 'text-accent'" class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]">{{ $t('about.label') }}</p>
      </div>

      <h2 :class="isManga ? 'text-white' : 'text-black'" class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 sm:mb-12">
        {{ $t('about.title') }}
      </h2>

      <div :class="isManga ? 'lg:grid-cols-[2fr_1fr] gap-1 p-1 bg-black' : ''" class="grid lg:grid-cols-2 gap-8 sm:gap-16">
        <div>
          <p :class="isManga ? 'text-white/70' : 'text-black/70'" class="reveal text-sm sm:text-lg leading-relaxed" data-stagger="1">
            {{ $t('about.bio1') }}
          </p>
          <p :class="isManga ? 'text-white/70' : 'text-black/70'" class="reveal text-sm sm:text-lg leading-relaxed mt-6" data-stagger="2">
            {{ $t('about.bio2') }}
          </p>
          <p :class="isManga ? 'text-white/70' : 'text-black/70'" class="reveal text-sm sm:text-lg leading-relaxed mt-6" data-stagger="3">
            {{ $t('about.bio3') }}
          </p>
        </div>

        <div>
          <div
            ref="countersRef"
            class="grid grid-cols-3 gap-4 sm:gap-8"
          >
            <div :class="isManga ? 'border-white' : 'border-accent'" class="reveal border-l-2 pl-3 sm:pl-6" data-stagger="1">
              <span :class="isManga ? 'text-white' : 'text-black'" class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl">+{{ yearsCounter.count.value }}</span>
              <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[3px] mt-1 sm:mt-2">{{ $t('about.yearsLabel') }}</p>
            </div>
            <div :class="isManga ? 'border-white/20' : 'border-black/10'" class="reveal border-l-2 pl-3 sm:pl-6" data-stagger="2">
              <span :class="isManga ? 'text-white' : 'text-black'" class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl">{{ companiesCounter.count.value }}</span>
              <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[3px] mt-1 sm:mt-2">{{ $t('about.companiesLabel') }}</p>
            </div>
            <div :class="isManga ? 'border-white/20' : 'border-black/10'" class="reveal border-l-2 pl-3 sm:pl-6" data-stagger="3">
              <span :class="isManga ? 'text-white' : 'text-black'" class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl">{{ languagesCounter.count.value }}+</span>
              <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[3px] mt-1 sm:mt-2">{{ $t('about.languagesLabel') }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-12 sm:mt-20">
        <div
          v-for="(item, index) in highlights"
          :key="index"
          :class="isManga ? 'bg-[#1a1a1a] border-2 border-[#333] hover:border-white/40' : 'bg-white border border-border-light rounded-xl hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5'"
          class="reveal-scale group p-4 sm:p-6 transition-all duration-300"
          :data-stagger="index + 1"
        >
          <div :class="isManga ? 'bg-white/[0.05] group-hover:bg-white/10' : 'rounded-lg bg-surface-light group-hover:bg-accent/10'" class="w-10 h-10 flex items-center justify-center mb-4 transition-colors duration-300">
            <svg v-if="index === 0" :class="isManga ? 'text-white' : 'text-accent'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            <svg v-else-if="index === 1" :class="isManga ? 'text-white' : 'text-accent'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <svg v-else-if="index === 2" :class="isManga ? 'text-white' : 'text-accent'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            <svg v-else-if="index === 3" :class="isManga ? 'text-white' : 'text-accent'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            <svg v-else :class="isManga ? 'text-white' : 'text-accent'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <h3 :class="isManga ? 'text-white' : 'text-black'" class="font-display font-bold text-sm sm:text-base mb-2">{{ rt(item.title) }}</h3>
          <p :class="isManga ? 'text-white/60' : 'text-text-muted'" class="text-xs sm:text-sm leading-relaxed">{{ rt(item.desc) }}</p>
        </div>
      </div>
    </div>

    <template v-if="isManga">
      <MangaHalftone position="bottom-right" variant="dark" size="md" />
      <MangaKanji text="力" position="top-right" size="md" />
    </template>
  </section>
</template>
