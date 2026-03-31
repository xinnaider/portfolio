<script setup lang="ts">
const { tm, rt } = useI18n()

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
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.2') }}</span>
      <span>{{ $t('manga.pageLabel') }} 2</span>
    </div>

    <!-- Opening narration -->
    <div class="manga-narration" aria-hidden="true">{{ $t('manga.narration.experience') }}</div>

    <!-- Experience grid: 2fr · 1fr · 1fr, fills remaining height -->
    <div style="flex:1; display:grid; grid-template-columns:2fr 1fr 1fr; overflow:hidden;">

      <!-- Job 0: current, larger panel -->
      <div
        v-if="experiences[0]"
        class="mp"
        style="border-top:none; border-bottom:none; border-left:none; border-right:3px solid #000; padding:14px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-ht" style="bottom:0; right:0; width:50%; height:50%; opacity:0.5;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-15px; right:-5px; font-size:clamp(60px,12vw,100px);" aria-hidden="true">現</div>

        <div class="manga-meta" style="margin-bottom:6px;">{{ $t('manga.missionLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(16px,3vw,22px); margin-bottom:4px;">{{ rt(experiences[0].company) }}</div>
        <div style="font-size:9px; color:#555; font-family:'Courier New',monospace;">{{ rt(experiences[0].period) }}</div>
        <div style="margin-top:10px; font-size:9px; color:#333; line-height:1.7; font-family:'Courier New',monospace; position:relative; z-index:1;">
          {{ rt(experiences[0].role) }}<br>
          <span v-for="(tag, i) in experiences[0].tags.slice(0,4)" :key="i">{{ rt(tag) }}<span v-if="i < 3"> · </span></span>
        </div>
        <div
          v-if="experiences[0].items[0]"
          style="margin-top:10px; border-left:3px solid #000; padding-left:6px; font-size:9px; font-style:italic; color:#444; position:relative; z-index:1;"
        >
          "{{ rt(experiences[0].items[0]) }}"
        </div>
      </div>

      <!-- Job 1 -->
      <div
        v-if="experiences[1]"
        class="mp mp--gray"
        style="border-top:none; border-bottom:none; border-left:none; border-right:3px solid #000; padding:12px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-meta" style="margin-bottom:4px;">{{ $t('manga.previousLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(13px,2.5vw,18px); margin-bottom:4px; line-height:1.1;">{{ rt(experiences[1].company) }}</div>
        <div style="font-size:9px; color:#555; font-family:'Courier New',monospace;">{{ rt(experiences[1].period) }}</div>
        <div style="margin-top:10px; font-size:9px; color:#444; line-height:1.7; font-family:'Courier New',monospace;">
          {{ rt(experiences[1].role) }}<br>
          <span v-for="(tag, i) in experiences[1].tags.slice(0,3)" :key="i">{{ rt(tag) }}<span v-if="i < 2"> · </span></span>
        </div>
        <div class="manga-thought" style="margin-top:auto; font-size:8px;">
          "{{ rt(experiences[1].description).slice(0, 60) }}..."
        </div>
      </div>

      <!-- Job 2 -->
      <div
        v-if="experiences[2]"
        class="mp"
        style="border-top:none; border-bottom:none; border-left:none; border-right:none; padding:12px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-kanji" style="bottom:-10px; right:-5px; font-size:clamp(40px,8vw,70px);" aria-hidden="true">始</div>

        <div class="manga-meta" style="margin-bottom:4px;">{{ $t('manga.originLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(13px,2.5vw,18px); margin-bottom:4px; line-height:1.1;">{{ rt(experiences[2].company) }}</div>
        <div style="font-size:9px; color:#555; font-family:'Courier New',monospace;">{{ rt(experiences[2].period) }}</div>
        <div style="margin-top:10px; font-size:9px; color:#444; line-height:1.7; font-family:'Courier New',monospace; position:relative; z-index:1;">
          {{ rt(experiences[2].role) }}<br>
          <span v-for="(tag, i) in experiences[2].tags.slice(0,3)" :key="i">{{ rt(tag) }}<span v-if="i < 2"> · </span></span>
        </div>
      </div>
    </div>

    <!-- SFX divider -->
    <div style="border-top:3px solid #000; padding:6px 14px; display:flex; justify-content:space-between; align-items:center; background:#fff; flex-shrink:0;">
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:24px; opacity:0.2; transform:rotate(-2deg);" aria-hidden="true">ズーン</div>
      <div class="manga-meta" style="letter-spacing:4px;">▼ {{ $t('manga.nextChapterHint') }}</div>
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:24px; opacity:0.2; transform:rotate(2deg);" aria-hidden="true">バン</div>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 2 —</div>
  </div>
</template>
