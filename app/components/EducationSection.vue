<script setup lang="ts">
const { tm, rt } = useI18n()
const { scrollY } = useScrollProgress()
const { isManga } = useTheme()

interface EducationEntry {
  title: string
  abbr: string
  institution: string
  status: string
  description?: string
}

const entries = computed(() => tm('education.entries') as EducationEntry[])
</script>

<template>
  <section id="formacao" class="relative py-16 sm:py-24 lg:py-36 overflow-hidden" :class="isManga ? 'bg-white' : 'bg-surface-black'">
    <div
      class="absolute right-[-20px] font-display font-extrabold text-[40px] sm:text-[80px] lg:text-[140px] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :class="isManga ? 'text-black/[0.02]' : 'text-white/[0.02]'"
      :style="{ top: `calc(40% + ${scrollY * -0.03}px)` }"
    >
      {{ $t('education.backgroundText') }}
    </div>

    <div
      v-if="!isManga"
      class="hidden lg:block absolute top-[20%] right-[10%] w-20 h-20 border border-accent/[0.06] rotate-45"
      :style="{ transform: `translateY(${scrollY * -0.04}px) rotate(45deg)` }"
      style="animation: float-2 8s ease-in-out infinite"
    />

    <MangaHalftone v-if="isManga" position="bottom-right" variant="light" size="md" />

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px]" :class="isManga ? 'bg-black' : 'bg-accent'" />
        <p class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]" :class="isManga ? 'text-black/60' : 'text-accent'">{{ $t('education.label') }}</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 sm:mb-12" :class="isManga ? 'text-black' : 'text-white'">
        {{ $t('education.title') }}
      </h2>

      <div class="space-y-6 max-w-2xl">
        <div
          v-for="(entry, index) in entries"
          :key="index"
          class="reveal p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-300"
          :class="isManga ? 'bg-[#f5f5f5] border-2 border-black hover:border-black/60 rounded-none' : 'bg-white/[0.04] border border-white/[0.08] rounded-xl hover:border-accent/20'"
          :data-stagger="index + 1"
        >
          <div class="flex items-start gap-3 sm:gap-6">
            <div
              class="hidden sm:flex w-14 h-14 items-center justify-center flex-shrink-0"
              :class="isManga ? (index === 0 ? 'bg-black' : 'border-2 border-black') : (index === 0 ? 'bg-accent/10 rounded-xl' : 'bg-white/[0.05] rounded-xl')"
            >
              <span
                class="font-display font-bold text-lg"
                :class="isManga ? (index === 0 ? 'text-white' : 'text-black') : (index === 0 ? 'text-accent' : 'text-white/60')"
              >
                {{ rt(entry.abbr) }}
              </span>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <p class="font-display font-bold text-base sm:text-xl md:text-2xl" :class="isManga ? 'text-black' : 'text-white'">
                  {{ rt(entry.title) }}
                </p>
              </div>
              <p
                class="text-xs sm:text-sm font-semibold mt-1"
                :class="isManga ? (index === 0 ? 'text-black/80' : 'text-black/60') : (index === 0 ? 'text-accent' : 'text-white/60')"
              >
                {{ rt(entry.institution) }}
              </p>
              <p class="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest mt-1" :class="isManga ? 'text-black/60' : 'text-white/60'">
                {{ rt(entry.status) }}
              </p>
              <p v-if="entry.description" class="text-xs sm:text-[15px] mt-3 sm:mt-4 leading-relaxed" :class="isManga ? 'text-black/80' : 'text-white/80'">
                {{ rt(entry.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
