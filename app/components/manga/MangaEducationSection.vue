<script setup lang="ts">
const { tm, rt } = useI18n()

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
  <!-- MANGA EDUCATION: Light panel with bordered sub-panels -->
  <section id="formacao" class="relative bg-white overflow-hidden border-t-2 border-[#333]">
    <MangaHalftone position="bottom-right" variant="light" size="md" />

    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="border-b-2 border-black px-6 py-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="reveal w-12 h-[2px] bg-black" />
          <p class="reveal text-black/50 text-xs font-semibold uppercase tracking-[4px]">{{ $t('education.label') }}</p>
        </div>
        <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-black tracking-tight">
          {{ $t('education.title') }}
        </h2>
      </div>

      <!-- Education entries as bordered sub-panels -->
      <div class="p-6 sm:p-10">
        <div class="space-y-0">
          <div
            v-for="(entry, index) in entries"
            :key="index"
            class="reveal border-2 border-black p-5 sm:p-8 lg:p-10 -mt-[2px] first:mt-0 transition-colors duration-200 hover:bg-[#f5f5f5]"
            :data-stagger="index + 1"
          >
            <div class="flex items-start gap-4 sm:gap-6">
              <!-- Badge in manga tag style -->
              <div
                class="hidden sm:flex w-14 h-14 items-center justify-center flex-shrink-0"
                :class="index === 0 ? 'bg-black' : 'border-2 border-black'"
              >
                <span
                  class="font-display font-bold text-lg"
                  :class="index === 0 ? 'text-white' : 'text-black'"
                >
                  {{ rt(entry.abbr) }}
                </span>
              </div>
              <div>
                <p class="font-display font-bold text-base sm:text-xl md:text-2xl text-black">
                  {{ rt(entry.title) }}
                </p>
                <p
                  class="text-xs sm:text-sm font-semibold mt-1"
                  :class="index === 0 ? 'text-black/80' : 'text-black/60'"
                >
                  {{ rt(entry.institution) }}
                </p>
                <p class="text-black/50 text-[10px] sm:text-xs uppercase tracking-[3px] mt-1">
                  {{ rt(entry.status) }}
                </p>
                <p v-if="entry.description" class="text-black/70 text-xs sm:text-[15px] mt-3 sm:mt-4 leading-relaxed">
                  {{ rt(entry.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
