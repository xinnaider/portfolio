<script setup lang="ts">
const { tm, rt } = useI18n()
const { scrollY } = useScrollProgress()

interface Promotion {
  from: string
  to: string
  date: string
}

interface Experience {
  company: string
  description: string
  role: string
  badge: string
  period: string
  tags: string[]
  promotion?: Promotion
  items: string[]
}

const experiences = computed(() => tm('experience.jobs') as Experience[])
const { isManga } = useTheme()
</script>

<template>
  <section id="experiencia" class="relative bg-surface-dark py-16 sm:py-24 lg:py-36 overflow-hidden">
    <div
      class="absolute left-[-20px] font-display font-extrabold text-[50px] sm:text-[100px] lg:text-[160px] text-white/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(50% + ${scrollY * -0.08}px)`, transform: 'translateY(-50%)' }"
    >
      {{ $t('experience.backgroundText') }}
    </div>

    <template v-if="!isManga">
      <div
        class="hidden lg:block absolute top-[10%] right-[5%] w-32 h-32 border border-accent/[0.06] rounded-full"
        :style="{ transform: `translateY(${scrollY * -0.05}px)` }"
        style="animation: float-1 10s ease-in-out infinite"
      />
      <div
        class="hidden lg:block absolute bottom-[15%] left-[3%] w-2 h-2 rounded-full bg-accent/20"
        :style="{ transform: `translateY(${scrollY * 0.03}px)` }"
        style="animation: pulse-glow 3s ease-in-out infinite"
      />
    </template>
    <template v-if="isManga">
      <MangaHalftone position="bottom-right" variant="dark" size="md" />
    </template>

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <div class="flex items-center gap-4 mb-4">
        <div :class="isManga ? 'bg-white' : 'bg-accent'" class="reveal w-12 h-[1px]" />
        <p :class="isManga ? 'text-white/60' : 'text-accent'" class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]">{{ $t('experience.label') }}</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-10 sm:mb-16">
        {{ $t('experience.title') }}
      </h2>

      <div class="relative">
        <div :class="isManga ? 'bg-white w-[3px]' : 'bg-gradient-to-b from-accent/50 via-accent/20 to-transparent'" class="absolute left-0 lg:left-8 top-0 bottom-0 w-[1px]" />

        <div class="space-y-8 sm:space-y-12 lg:space-y-16">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.company"
            class="relative pl-6 sm:pl-8 lg:pl-20"
          >
            <div class="absolute left-0 lg:left-8 top-2 -translate-x-1/2 z-10">
              <div :class="isManga ? 'bg-white' : 'bg-accent'" :style="isManga ? {} : { animation: 'pulse-glow 3s ease-in-out infinite' }" class="reveal-scale w-4 h-4 rounded-full" :data-stagger="index" />
            </div>

            <div
              :class="isManga ? 'text-white border-white/30 rounded-none' : 'text-accent border-accent/30 rounded-full'"
              class="reveal inline-block px-3 py-1 text-xs font-semibold border mb-4"
              :data-stagger="index"
            >
              {{ rt(exp.period) }}
            </div>

            <div
              :class="isManga ? 'bg-[#1a1a1a] border-[#333] hover:border-white/40 rounded-none' : 'bg-white/[0.04] border-white/[0.08] rounded-xl hover:border-accent/20'"
              class="reveal border p-4 sm:p-6 md:p-8 transition-all duration-300"
              :data-stagger="index"
            >
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="font-display font-bold text-lg sm:text-xl md:text-2xl text-white">{{ rt(exp.company) }}</h3>
                <span :class="isManga ? 'border-white/40 text-white bg-white/10 rounded-none' : 'border-accent/40 text-accent bg-accent/10 rounded-full'" class="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider border">
                  {{ rt(exp.badge) }}
                </span>
              </div>
              <p :class="isManga ? 'text-white/80' : 'text-accent'" class="text-xs sm:text-sm mt-1 font-semibold">{{ rt(exp.role) }}</p>
              <p class="text-white/60 text-xs sm:text-[13px] mt-2 leading-relaxed">{{ rt(exp.description) }}</p>

              <ul class="space-y-3 mt-5 mb-6">
                <li
                  v-for="(item, itemIndex) in exp.items"
                  :key="itemIndex"
                  :class="isManga ? 'before:content-[\'▸\'] before:text-white' : 'before:content-[\'▹\'] before:text-accent'"
                  class="text-white/80 text-xs sm:text-[15px] leading-relaxed pl-5 relative before:absolute before:left-0 before:top-[2px]"
                >
                  {{ rt(item) }}
                </li>
              </ul>

              <div v-if="exp.promotion" :class="isManga ? 'bg-white/[0.04] border-white/15 rounded-none' : 'bg-accent/[0.06] border-accent/15 rounded-lg'" class="flex items-center gap-2 sm:gap-3 my-4 sm:my-5 py-2 sm:py-3 px-3 sm:px-4 border">
                <span class="text-white/60 text-xs font-semibold uppercase tracking-wider">{{ rt(exp.promotion.from) }}</span>
                <div class="flex items-center gap-1.5 flex-1">
                  <div :class="isManga ? 'bg-white/30' : 'bg-accent/30'" class="h-[1px] flex-1" />
                  <span :class="isManga ? 'text-white' : 'text-accent'" class="text-[11px] font-semibold whitespace-nowrap">{{ rt(exp.promotion.date) }}</span>
                  <div :class="isManga ? 'bg-white/30' : 'bg-accent/30'" class="h-[1px] flex-1" />
                </div>
                <span :class="isManga ? 'text-white' : 'text-accent'" class="text-xs font-semibold uppercase tracking-wider">{{ rt(exp.promotion.to) }}</span>
              </div>

              <div class="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                <span
                  v-for="(tag, tagIndex) in exp.tags"
                  :key="tagIndex"
                  :class="isManga ? 'border-white/15 hover:border-white/40 hover:text-white rounded-none' : 'border-white/15 hover:border-accent/40 hover:text-accent rounded-full'"
                  class="px-3 py-1 text-xs border text-white/60 transition-colors duration-200"
                >
                  {{ rt(tag) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
