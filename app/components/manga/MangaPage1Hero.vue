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
      <div
        class="manga-ht"
        style="bottom:0; left:0; width:45%; height:60%;"
        aria-hidden="true"
      />

      <!-- Kanji 開 huge background -->
      <div
        class="manga-kanji"
        style="bottom:-40px; right:-20px; font-size:clamp(160px, 30vw, 260px);"
        aria-hidden="true"
      >開</div>

      <!-- Status badge — top right -->
      <div style="position:absolute; top:16px; right:16px; width:clamp(120px,20vw,160px); z-index:2;">
        <div style="background:#000; color:#fff; padding:5px 10px; font-size:9px; font-family:'Courier New',monospace; letter-spacing:2px; text-align:center; margin-bottom:6px; border:3px solid #000;">
          FULL STACK DEV
        </div>
        <div style="border:3px solid #000; padding:8px 10px; font-size:9px; line-height:2; background:#fff; font-family:'Courier New',monospace;">
          Java · Spring Boot<br>
          Vue.js · Nuxt 4<br>
          Laravel · MySQL<br>
          Docker · AWS
        </div>
      </div>

      <!-- Name — large, top-left -->
      <div style="position:absolute; top:16px; left:20px; z-index:2;">
        <div class="manga-meta" style="margin-bottom:8px;">— {{ $t('meta.title') }} —</div>
        <div
          class="manga-title"
          style="font-size:clamp(36px, 8vw, 64px); line-height:0.85; letter-spacing:-3px;"
        >J.<br>FER<br>NAN<br>DO</div>
        <div style="font-size:14px; font-weight:600; color:#555; margin-top:8px; font-family:'Courier New',monospace; letter-spacing:1px;">
          {{ $t('hero.subtitle') }}
        </div>
      </div>

      <!-- Onomatopeia ドン！ bottom-left -->
      <div
        class="manga-sfx manga-sfx-hide-mobile"
        style="position:absolute; bottom:60px; left:16px; font-size:clamp(32px,7vw,56px); transform:rotate(-4deg); opacity:0.85;"
        aria-hidden="true"
      >ドン！</div>

      <!-- Speech bubble bottom-right -->
      <div
        class="manga-bubble"
        style="position:absolute; bottom:28px; right:16px; max-width:clamp(140px,25vw,180px); z-index:2;"
      >
        {{ $t('manga.bubble.hero') }}
      </div>

      <!-- CV download button — bottom-left -->
      <button
        style="position:absolute; bottom:16px; left:16px; border:2px solid #000; background:#fff; padding:4px 10px; font-size:9px; font-family:'Courier New',monospace; letter-spacing:2px; cursor:pointer; z-index:2;"
        :disabled="isGenerating"
        @click="download"
      >
        {{ isGenerating ? $t('hero.generating') : $t('hero.downloadCv') }} ↓
      </button>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 1 —</div>
  </div>
</template>
