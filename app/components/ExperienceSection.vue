<script setup lang="ts">
const { tm } = useI18n()
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
</script>

<template>
  <section id="experiencia" class="relative bg-surface-dark py-16 sm:py-24 lg:py-36 overflow-hidden">
    <div
      class="absolute left-[-20px] font-display font-extrabold text-[50px] sm:text-[100px] lg:text-[160px] text-white/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(50% + ${scrollY * -0.08}px)`, transform: 'translateY(-50%)' }"
    >
      {{ $t('experience.backgroundText') }}
    </div>

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

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px] bg-accent" />
        <p class="reveal text-accent text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]">{{ $t('experience.label') }}</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-10 sm:mb-16">
        {{ $t('experience.title') }}
      </h2>

      <div class="relative">
        <div class="absolute left-0 lg:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

        <div class="space-y-8 sm:space-y-12 lg:space-y-16">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.company"
            class="relative pl-6 sm:pl-8 lg:pl-20"
          >
            <div class="absolute left-0 lg:left-8 top-2 -translate-x-1/2 z-10">
              <div class="reveal-scale w-4 h-4 rounded-full bg-accent" :data-stagger="index" style="animation: pulse-glow 3s ease-in-out infinite" />
            </div>

            <div
              class="reveal inline-block px-3 py-1 rounded-full text-xs font-semibold text-accent border border-accent/30 mb-4"
              :data-stagger="index"
            >
              {{ exp.period }}
            </div>

            <div
              class="reveal bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 sm:p-6 md:p-8 hover:border-accent/20 transition-all duration-300"
              :data-stagger="index"
            >
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="font-display font-bold text-lg sm:text-xl md:text-2xl text-white">{{ exp.company }}</h3>
                <span class="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full border border-accent/40 text-accent bg-accent/10">
                  {{ exp.badge }}
                </span>
              </div>
              <p class="text-accent text-xs sm:text-sm mt-1 font-semibold">{{ exp.role }}</p>
              <p class="text-white/60 text-xs sm:text-[13px] mt-2 leading-relaxed">{{ exp.description }}</p>

              <ul class="space-y-3 mt-5 mb-6">
                <li
                  v-for="item in exp.items"
                  :key="item"
                  class="text-white/80 text-xs sm:text-[15px] leading-relaxed pl-5 relative before:content-['▹'] before:absolute before:left-0 before:top-[2px] before:text-accent"
                >
                  {{ item }}
                </li>
              </ul>

              <div v-if="exp.promotion" class="flex items-center gap-2 sm:gap-3 my-4 sm:my-5 py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-accent/[0.06] border border-accent/15">
                <span class="text-white/60 text-xs font-semibold uppercase tracking-wider">{{ exp.promotion.from }}</span>
                <div class="flex items-center gap-1.5 flex-1">
                  <div class="h-[1px] flex-1 bg-accent/30" />
                  <span class="text-accent text-[11px] font-semibold whitespace-nowrap">{{ exp.promotion.date }}</span>
                  <div class="h-[1px] flex-1 bg-accent/30" />
                </div>
                <span class="text-accent text-xs font-semibold uppercase tracking-wider">{{ exp.promotion.to }}</span>
              </div>

              <div class="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                <span
                  v-for="tag in exp.tags"
                  :key="tag"
                  class="px-3 py-1 text-xs rounded-full border border-white/15 text-white/60 hover:border-accent/40 hover:text-accent transition-colors duration-200"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
