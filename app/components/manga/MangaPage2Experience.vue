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
    <div class="manga-exp-grid" style="flex:1; display:grid; grid-template-columns:2fr 1fr 1fr; overflow:hidden;">

      <!-- Job 0: current, larger panel -->
      <div
        v-if="experiences[0]"
        class="mp"
        style="border-top:none; border-bottom:none; border-left:none; border-right:3px solid #000; padding:clamp(20px,3vw,40px); display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-ht" style="bottom:0; right:0; width:55%; height:55%; opacity:0.5;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-20px; right:-10px; font-size:clamp(120px,22vw,260px);" aria-hidden="true">現</div>

        <div class="manga-meta" style="margin-bottom:12px; font-size:clamp(11px,1.3vw,15px);">{{ $t('manga.missionLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(28px,5.5vw,64px); margin-bottom:10px;">{{ rt(experiences[0].company) }}</div>
        <div style="font-size:clamp(13px,1.8vw,20px); color:#555; font-family:'Courier New',monospace; margin-bottom:20px;">{{ rt(experiences[0].period) }}</div>
        <div style="font-size:clamp(14px,2vw,22px); color:#222; line-height:1.8; font-family:'Courier New',monospace; position:relative; z-index:1; margin-bottom:14px;">
          <strong>{{ rt(experiences[0].role) }}</strong>
        </div>
        <div style="font-size:clamp(12px,1.6vw,17px); color:#555; font-family:'Courier New',monospace; line-height:1.7; position:relative; z-index:1; margin-bottom:14px;">
          <span v-for="(tag, i) in experiences[0].tags.slice(0,5)" :key="i">{{ rt(tag) }}<span v-if="i < 4"> · </span></span>
        </div>
        <div style="font-size:clamp(12px,1.5vw,17px); color:#333; font-family:'Courier New',monospace; line-height:1.7; position:relative; z-index:1;">
          {{ rt(experiences[0].description) }}
        </div>
        <div
          v-if="experiences[0].items[0]"
          style="margin-top:auto; border-left:4px solid #000; padding-left:12px; font-size:clamp(12px,1.5vw,17px); font-style:italic; color:#444; position:relative; z-index:1; padding-bottom:10px;"
        >
          "{{ rt(experiences[0].items[0]) }}"
        </div>
      </div>

      <!-- Job 1 -->
      <div
        v-if="experiences[1]"
        class="mp mp--gray manga-exp-side"
        style="border-top:none; border-bottom:none; border-left:none; border-right:3px solid #000; padding:clamp(18px,2.5vw,32px); display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-meta" style="margin-bottom:12px; font-size:clamp(11px,1.3vw,15px);">{{ $t('manga.previousLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(20px,3.8vw,44px); margin-bottom:10px; line-height:1.1;">{{ rt(experiences[1].company) }}</div>
        <div style="font-size:clamp(13px,1.7vw,18px); color:#555; font-family:'Courier New',monospace; margin-bottom:16px;">{{ rt(experiences[1].period) }}</div>
        <div style="font-size:clamp(13px,1.8vw,20px); color:#333; line-height:1.8; font-family:'Courier New',monospace;">
          <strong>{{ rt(experiences[1].role) }}</strong><br>
          <span v-for="(tag, i) in experiences[1].tags.slice(0,4)" :key="i">{{ rt(tag) }}<span v-if="i < 3"> · </span></span>
        </div>
        <div class="manga-thought" style="margin-top:auto; font-size:clamp(11px,1.3vw,14px); position:relative; z-index:1;">
          "{{ rt(experiences[1].description).slice(0, 90) }}..."
        </div>
      </div>

      <!-- Job 2 -->
      <div
        v-if="experiences[2]"
        class="mp manga-exp-side"
        style="border-top:none; border-bottom:none; border-left:none; border-right:none; padding:clamp(18px,2.5vw,32px); display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-kanji" style="bottom:-15px; right:-8px; font-size:clamp(90px,16vw,180px);" aria-hidden="true">始</div>

        <div class="manga-meta" style="margin-bottom:12px; font-size:clamp(11px,1.3vw,15px);">{{ $t('manga.originLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(20px,3.8vw,44px); margin-bottom:10px; line-height:1.1;">{{ rt(experiences[2].company) }}</div>
        <div style="font-size:clamp(13px,1.7vw,18px); color:#555; font-family:'Courier New',monospace; margin-bottom:16px;">{{ rt(experiences[2].period) }}</div>
        <div style="font-size:clamp(13px,1.8vw,20px); color:#333; line-height:1.8; font-family:'Courier New',monospace; position:relative; z-index:1;">
          <strong>{{ rt(experiences[2].role) }}</strong><br>
          <span v-for="(tag, i) in experiences[2].tags.slice(0,4)" :key="i">{{ rt(tag) }}<span v-if="i < 3"> · </span></span>
        </div>
        <div class="manga-thought" style="margin-top:auto; font-size:clamp(11px,1.3vw,14px); position:relative; z-index:1;">
          "{{ rt(experiences[2].description).slice(0, 90) }}..."
        </div>
      </div>
    </div>

    <!-- SFX divider -->
    <div style="border-top:3px solid #000; padding:10px 24px; display:flex; justify-content:space-between; align-items:center; background:#fff; flex-shrink:0;">
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:clamp(28px,4vw,52px); opacity:0.2; transform:rotate(-2deg);" aria-hidden="true">ズーン</div>
      <div class="manga-meta" style="letter-spacing:4px; font-size:clamp(11px,1.3vw,14px);">▼ {{ $t('manga.nextChapterHint') }}</div>
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:clamp(28px,4vw,52px); opacity:0.2; transform:rotate(2deg);" aria-hidden="true">バン</div>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 2 —</div>
  </div>
</template>
