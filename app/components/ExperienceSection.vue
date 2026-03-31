<script setup lang="ts">
const { tm, rt } = useI18n()
const { scrollY } = useScrollProgress()
const { isManga } = useTheme()

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
  <!-- MANGA EXPERIENCE: Panel timeline with bordered sub-panels -->
  <section v-if="isManga" id="experiencia" class="relative bg-[#0a0a0a] overflow-hidden border-t-2 border-[#333]">
    <MangaHalftone position="bottom-right" variant="dark" size="md" />

    <div class="max-w-6xl mx-auto">
      <!-- Section header panel -->
      <div class="border-b-2 border-[#333] px-6 py-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="reveal w-12 h-[2px] bg-white" />
          <p class="reveal text-white/50 text-xs font-semibold uppercase tracking-[4px]">{{ $t('experience.label') }}</p>
        </div>
        <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
          {{ $t('experience.title') }}
        </h2>
      </div>

      <!-- Timeline as panel sequence -->
      <div class="relative">
        <!-- White vertical gutter line -->
        <div class="absolute left-[90px] lg:left-[120px] top-0 bottom-0 w-[3px] bg-white hidden sm:block" />

        <div>
          <div
            v-for="(exp, index) in experiences"
            :key="rt(exp.company)"
            class="relative border-b-2 border-[#333] last:border-b-0"
          >
            <div class="flex">
              <!-- Date column -->
              <div class="hidden sm:flex w-[90px] lg:w-[120px] flex-shrink-0 items-start justify-center pt-8 pr-4">
                <div class="reveal text-white/60 text-[11px] font-semibold uppercase tracking-wider text-right">
                  {{ rt(exp.period) }}
                </div>
              </div>

              <!-- Dot on the gutter line -->
              <div class="hidden sm:block absolute left-[90px] lg:left-[120px] top-10 -translate-x-1/2 z-10">
                <div class="w-4 h-4 bg-white" :class="index === 0 ? 'shadow-[0_0_10px_rgba(255,255,255,0.4)]' : ''" />
              </div>

              <!-- Content panel -->
              <div class="flex-1 sm:ml-6 p-6 sm:p-8">
                <!-- Mobile period -->
                <div class="sm:hidden mb-3 text-white/60 text-xs font-semibold uppercase tracking-wider">
                  {{ rt(exp.period) }}
                </div>

                <!-- Job card as bordered sub-panel -->
                <div
                  class="reveal border-2 p-5 sm:p-6 md:p-8 transition-colors duration-200"
                  :class="index === 0 ? 'border-white hover:border-white/80' : 'border-[#333] hover:border-white/40'"
                  :data-stagger="index"
                >
                  <div class="flex items-center gap-3 flex-wrap">
                    <h3 class="font-display font-bold text-lg sm:text-xl md:text-2xl text-white">{{ rt(exp.company) }}</h3>
                    <span class="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider border-2 border-white/40 text-white bg-white/10">
                      {{ rt(exp.badge) }}
                    </span>
                  </div>
                  <p class="text-white/70 text-xs sm:text-sm mt-1 font-semibold">{{ rt(exp.role) }}</p>
                  <p class="text-white/50 text-xs sm:text-[13px] mt-2 leading-relaxed">{{ rt(exp.description) }}</p>

                  <ul class="space-y-3 mt-5 mb-6">
                    <li
                      v-for="(item, itemIndex) in exp.items"
                      :key="itemIndex"
                      class="text-white/80 text-xs sm:text-[15px] leading-relaxed pl-5 relative before:absolute before:left-0 before:top-[2px] before:text-white"
                      style="--tw-content: '▸'"
                    >
                      <span class="before:content-[var(--tw-content)]" />
                      {{ rt(item) }}
                    </li>
                  </ul>

                  <div v-if="exp.promotion" class="flex items-center gap-2 sm:gap-3 my-4 sm:my-5 py-2 sm:py-3 px-3 sm:px-4 border-2 border-white/15 bg-white/[0.03]">
                    <span class="text-white/60 text-xs font-semibold uppercase tracking-wider">{{ rt(exp.promotion.from) }}</span>
                    <div class="flex items-center gap-1.5 flex-1">
                      <div class="h-[1px] flex-1 bg-white/30" />
                      <span class="text-white text-[11px] font-semibold whitespace-nowrap">{{ rt(exp.promotion.date) }}</span>
                      <div class="h-[1px] flex-1 bg-white/30" />
                    </div>
                    <span class="text-white text-xs font-semibold uppercase tracking-wider">{{ rt(exp.promotion.to) }}</span>
                  </div>

                  <div class="flex flex-wrap gap-2 pt-4 border-t-2 border-[#333]">
                    <span
                      v-for="(tag, tagIndex) in exp.tags"
                      :key="tagIndex"
                      class="px-3 py-1 text-xs border-2 border-white/15 text-white/60 hover:border-white/40 hover:text-white transition-colors duration-200"
                    >
                      {{ rt(tag) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- VIOLET EXPERIENCE (original) -->
  <section v-else id="experiencia" class="relative bg-surface-dark py-16 sm:py-24 lg:py-36 overflow-hidden">
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
            :key="rt(exp.company)"
            class="relative pl-6 sm:pl-8 lg:pl-20"
          >
            <div class="absolute left-0 lg:left-8 top-2 -translate-x-1/2 z-10">
              <div class="reveal-scale w-4 h-4 rounded-full bg-accent" :data-stagger="index" style="animation: pulse-glow 3s ease-in-out infinite" />
            </div>

            <div
              class="reveal inline-block px-3 py-1 rounded-full text-xs font-semibold text-accent border border-accent/30 mb-4"
              :data-stagger="index"
            >
              {{ rt(exp.period) }}
            </div>

            <div
              class="reveal bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 sm:p-6 md:p-8 hover:border-accent/20 transition-all duration-300"
              :data-stagger="index"
            >
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="font-display font-bold text-lg sm:text-xl md:text-2xl text-white">{{ rt(exp.company) }}</h3>
                <span class="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full border border-accent/40 text-accent bg-accent/10">
                  {{ rt(exp.badge) }}
                </span>
              </div>
              <p class="text-accent text-xs sm:text-sm mt-1 font-semibold">{{ rt(exp.role) }}</p>
              <p class="text-white/60 text-xs sm:text-[13px] mt-2 leading-relaxed">{{ rt(exp.description) }}</p>

              <ul class="space-y-3 mt-5 mb-6">
                <li
                  v-for="(item, itemIndex) in exp.items"
                  :key="itemIndex"
                  class="text-white/80 text-xs sm:text-[15px] leading-relaxed pl-5 relative before:content-['▹'] before:absolute before:left-0 before:top-[2px] before:text-accent"
                >
                  {{ rt(item) }}
                </li>
              </ul>

              <div v-if="exp.promotion" class="flex items-center gap-2 sm:gap-3 my-4 sm:my-5 py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-accent/[0.06] border border-accent/15">
                <span class="text-white/60 text-xs font-semibold uppercase tracking-wider">{{ rt(exp.promotion.from) }}</span>
                <div class="flex items-center gap-1.5 flex-1">
                  <div class="h-[1px] flex-1 bg-accent/30" />
                  <span class="text-accent text-[11px] font-semibold whitespace-nowrap">{{ rt(exp.promotion.date) }}</span>
                  <div class="h-[1px] flex-1 bg-accent/30" />
                </div>
                <span class="text-accent text-xs font-semibold uppercase tracking-wider">{{ rt(exp.promotion.to) }}</span>
              </div>

              <div class="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                <span
                  v-for="(tag, tagIndex) in exp.tags"
                  :key="tagIndex"
                  class="px-3 py-1 text-xs rounded-full border border-white/15 text-white/60 hover:border-accent/40 hover:text-accent transition-colors duration-200"
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
