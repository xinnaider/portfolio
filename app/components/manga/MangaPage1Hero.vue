<script setup lang="ts">
const { t } = useI18n()
const { download, isGenerating } = useDownloadCv()
</script>

<template>
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.1') }}</span>
      <span>{{ $t('manga.pageLabel') }} 1</span>
    </div>

    <!-- Hero splash panel: fills remaining height -->
    <div class="mp" style="flex:1; border:none; border-top:3px solid #000; display:flex; overflow:hidden;">
      <!-- Speed lines radial from center-right -->
      <div class="manga-speed-radial" aria-hidden="true" />

      <!-- Halftone bottom-left -->
      <div class="manga-ht" style="bottom:0; left:0; width:50%; height:65%;" aria-hidden="true" />

      <!-- Kanji 開 huge background -->
      <div
        class="manga-kanji"
        style="bottom:-60px; right:-30px; font-size:clamp(240px, 44vw, 520px);"
        aria-hidden="true"
      >開</div>

      <!-- Status badge — top right -->
      <div class="manga-hero-badge" style="position:absolute; top:28px; right:28px; width:clamp(180px,26vw,300px); z-index:2;">
        <div style="background:#000; color:#fff; padding:8px 14px; font-size:clamp(11px,1.5vw,17px); font-family:'Courier New',monospace; letter-spacing:2px; text-align:center; margin-bottom:10px; border:3px solid #000;">
          FULL STACK DEV
        </div>
        <div style="border:3px solid #000; padding:12px 14px; font-size:clamp(13px,1.6vw,19px); line-height:2.4; background:#fff; font-family:'Courier New',monospace;">
          Java · Spring Boot<br>
          Vue.js · Nuxt 4<br>
          Laravel · MySQL<br>
          Docker · AWS
        </div>
      </div>

      <!-- Name — large, top-left -->
      <div class="manga-hero-name" style="position:absolute; top:28px; left:32px; z-index:2;">
        <div class="manga-meta" style="margin-bottom:14px; font-size:clamp(11px,1.4vw,16px);">— {{ $t('meta.title') }} —</div>
        <div
          class="manga-title"
          style="font-size:clamp(72px, 14vw, 180px); line-height:0.82; letter-spacing:-4px;"
        >J.<br>FER<br>NAN<br>DO</div>
        <div style="font-size:clamp(16px,2.2vw,28px); font-weight:600; color:#555; margin-top:18px; font-family:'Courier New',monospace; letter-spacing:1px;">
          {{ $t('hero.subtitle') }}
        </div>
      </div>

      <!-- Onomatopeia ドン！ bottom-left -->
      <div
        class="manga-sfx manga-sfx-hide-mobile"
        style="position:absolute; bottom:90px; left:32px; font-size:clamp(64px,12vw,140px); transform:rotate(-4deg); opacity:0.9;"
        aria-hidden="true"
      >ドン！</div>

      <!-- Speech bubble bottom-right -->
      <div
        class="manga-bubble manga-hero-bubble"
        style="position:absolute; bottom:40px; right:28px; max-width:clamp(180px,32vw,300px); font-size:clamp(13px,1.8vw,20px); z-index:2;"
      >
        {{ $t('manga.bubble.hero') }}
      </div>

      <!-- CV download button — bottom-left -->
      <button
        class="manga-hero-cta"
        style="position:absolute; bottom:28px; left:32px; border:2px solid #000; background:#fff; padding:8px 18px; font-size:clamp(12px,1.5vw,17px); font-family:'Courier New',monospace; letter-spacing:2px; cursor:pointer; z-index:2;"
        :disabled="isGenerating"
        @click="download"
      >
        {{ isGenerating ? $t('hero.generating') : $t('hero.downloadCv') }} ↓
      </button>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 1 —</div>
  </div>
</template>
