<script setup lang="ts">
const { t } = useI18n()

const yearsCounter = useCounter(5, 1800)
const projectsCounter = useCounter(20, 1800)

const countersRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          yearsCounter.animate()
          projectsCounter.animate()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  if (countersRef.value) observer.observe(countersRef.value)
})

const techStack = {
  backend: ['Java', 'Spring Boot', 'Laravel', 'PHP'],
  frontend: ['Vue.js', 'Nuxt 4', 'TypeScript'],
  infra: ['Docker', 'AWS', 'MySQL', 'Postgres'],
}
</script>

<template>
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.3') }}</span>
      <span>{{ $t('manga.pageLabel') }} 3</span>
    </div>

    <!-- Opening narration -->
    <div class="manga-narration" aria-hidden="true">{{ $t('manga.narration.aboutTech') }}</div>

    <!-- About row: 2fr left (bio) · 1fr right (counters) -->
    <div style="display:grid; grid-template-columns:2fr 1fr; border-bottom:3px solid #000; flex-shrink:0; height:45%;">
      <!-- About left: bio + speech bubble -->
      <div
        class="mp"
        style="border:none; border-right:3px solid #000; padding:14px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-speed-radial" style="opacity:0.2;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-20px; right:-10px; font-size:clamp(60px,10vw,110px);" aria-hidden="true">自</div>

        <div class="manga-narration" style="margin-bottom:10px; position:relative; z-index:1;">{{ $t('manga.profileLabel') }}</div>
        <p style="font-size:clamp(9px,1.2vw,11px); line-height:1.7; color:#000; position:relative; z-index:1; max-width:480px;">
          {{ $t('about.bio1') }}
        </p>
        <div
          class="manga-bubble"
          style="margin-top:auto; max-width:clamp(160px,30vw,260px); position:relative; z-index:1;"
        >
          {{ $t('manga.bubble.about') }}
        </div>
      </div>

      <!-- Counters right: dark panel -->
      <div
        ref="countersRef"
        class="mp mp--dark"
        style="border:none; padding:14px; display:flex; flex-direction:column; justify-content:center; gap:16px; overflow:hidden;"
      >
        <div class="manga-ht manga-ht--dark" style="inset:0; opacity:0.3;" aria-hidden="true" />
        <div style="text-align:center; position:relative; z-index:1;">
          <div style="font-size:clamp(28px,5vw,40px); font-weight:900; color:#fff; line-height:1;">+{{ yearsCounter.count.value }}</div>
          <div class="manga-meta" style="color:#888; margin-top:4px;">{{ $t('manga.yearsExp') }}</div>
        </div>
        <div style="border-top:1px solid #333; padding-top:16px; text-align:center; position:relative; z-index:1;">
          <div style="font-size:clamp(28px,5vw,40px); font-weight:900; color:#fff; line-height:1;">+{{ projectsCounter.count.value }}</div>
          <div class="manga-meta" style="color:#888; margin-top:4px;">{{ $t('manga.projects') }}</div>
        </div>
      </div>
    </div>

    <!-- Chapter divider -->
    <div class="manga-chapter-bar">— {{ $t('manga.arsenalLabel') }} —</div>

    <!-- Tech badges: fills rest -->
    <div
      class="mp"
      style="flex:1; border:none; border-top:3px solid #000; padding:14px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
    >
      <div class="manga-kanji" style="bottom:-20px; right:-10px; font-size:clamp(60px,10vw,120px);" aria-hidden="true">技</div>

      <div style="display:grid; grid-template-columns:auto 1fr; gap:12px; align-items:start; position:relative; z-index:1;">
        <div
          style="writing-mode:vertical-rl; font-size:9px; color:#888; letter-spacing:3px; font-family:'Courier New',monospace; border-right:2px solid #000; padding-right:6px; text-transform:uppercase;"
        >STACK</div>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div>
            <div class="manga-meta" style="margin-bottom:5px;">{{ $t('manga.backendLabel') }}</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              <span class="manga-badge-solid">{{ techStack.backend[0] }}</span>
              <span v-for="tech in techStack.backend.slice(1)" :key="tech" class="manga-badge-outline">{{ tech }}</span>
            </div>
          </div>
          <div>
            <div class="manga-meta" style="margin-bottom:5px;">{{ $t('manga.frontendLabel') }}</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              <span class="manga-badge-solid">{{ techStack.frontend[0] }}</span>
              <span v-for="tech in techStack.frontend.slice(1)" :key="tech" class="manga-badge-outline">{{ tech }}</span>
            </div>
          </div>
          <div>
            <div class="manga-meta" style="margin-bottom:5px;">{{ $t('manga.infraLabel') }}</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              <span v-for="tech in techStack.infra" :key="tech" class="manga-badge-outline">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 3 —</div>
  </div>
</template>
