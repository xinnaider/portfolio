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
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.4') }}</span>
      <span>{{ $t('manga.pageLabel') }} 4</span>
    </div>

    <!-- Opening narration -->
    <div class="manga-narration" aria-hidden="true">{{ $t('manga.narration.educationContact') }}</div>

    <!-- Main content: Education 3fr | Contact 2fr -->
    <div class="manga-edu-grid" style="flex:1; display:grid; grid-template-columns:3fr 2fr; border-bottom:3px solid #000; overflow:hidden;">

      <!-- Education panel: white -->
      <div
        class="mp"
        style="border:none; border-right:3px solid #000; padding:clamp(20px,3vw,40px); display:flex; flex-direction:column; overflow:hidden;"
      >
        <div class="manga-ht" style="bottom:0; right:0; width:50%; height:50%; opacity:0.3;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-20px; right:-10px; font-size:clamp(100px,18vw,200px);" aria-hidden="true">学</div>

        <div class="manga-meta" style="margin-bottom:20px; font-size:clamp(13px,1.6vw,18px);">{{ $t('manga.formationLabel') }}</div>

        <div
          v-for="(entry, index) in entries"
          :key="index"
          style="margin-bottom:22px; position:relative; z-index:1;"
          :style="{ borderLeft: index === 0 ? '5px solid #000' : index === 1 ? '3px solid #888' : '2px dashed #bbb', paddingLeft: '16px' }"
        >
          <div
            style="font-size:clamp(18px,3.2vw,36px); font-weight:900; font-family:serif; line-height:1.2; margin-bottom:6px;"
            :style="{ color: index === 0 ? '#000' : index === 1 ? '#333' : '#666' }"
          >
            {{ rt(entry.title) }}
          </div>
          <div style="font-size:clamp(13px,1.6vw,18px); font-family:'Courier New',monospace;" :style="{ color: index === 0 ? '#555' : '#999' }">
            {{ rt(entry.institution) }} · {{ rt(entry.status) }}
          </div>
          <div
            v-if="entry.description && index === 0"
            style="font-size:clamp(12px,1.5vw,17px); color:#555; margin-top:6px; line-height:1.6; font-style:italic;"
          >
            {{ rt(entry.description).slice(0, 100) }}...
          </div>
        </div>
      </div>

      <!-- Contact panel: dark -->
      <div
        class="mp mp--dark"
        style="border:none; padding:clamp(20px,3vw,40px); display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;"
      >
        <div class="manga-ht manga-ht--dark" style="bottom:0; right:0; width:60%; height:60%; opacity:0.4;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-10px; right:-5px; font-size:clamp(80px,14vw,140px);" aria-hidden="true">連</div>

        <div style="position:relative; z-index:1;">
          <div class="manga-meta" style="color:#888; margin-bottom:20px; font-size:clamp(13px,1.6vw,18px);">{{ $t('manga.contactLabel') }}</div>

          <div style="display:flex; flex-direction:column; gap:18px;">
            <a
              href="https://github.com/jfernandodev"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('contact.githubAria')"
              style="font-size:clamp(14px,2.2vw,24px); font-weight:bold; color:#fff; display:flex; align-items:center; gap:10px; text-decoration:none;"
            >
              <span style="border:1px solid #555; padding:3px 9px; font-size:clamp(11px,1.3vw,15px); color:#888; font-family:'Courier New',monospace;">GH</span>
              github.com/jfernandodev
            </a>
            <a
              href="https://linkedin.com/in/jfernandodev"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('contact.linkedinAria')"
              style="font-size:clamp(14px,2.2vw,24px); font-weight:bold; color:#fff; display:flex; align-items:center; gap:10px; text-decoration:none;"
            >
              <span style="border:1px solid #555; padding:3px 9px; font-size:clamp(11px,1.3vw,15px); color:#888; font-family:'Courier New',monospace;">LI</span>
              linkedin.com/in/jfernandodev
            </a>
          </div>
        </div>

        <!-- CTA button -->
        <div style="position:relative; z-index:1; margin-top:24px;">
          <a
            href="https://linkedin.com/in/jfernandodev"
            target="_blank"
            rel="noopener noreferrer"
            style="display:block; border:3px solid #fff; text-align:center; padding:clamp(10px,2vw,18px); font-size:clamp(14px,2vw,22px); font-weight:900; color:#fff; letter-spacing:2px; text-decoration:none; font-family:'Courier New',monospace; position:relative;"
          >
            {{ $t('manga.sendMessage') }} →
            <span style="position:absolute; inset:-5px; border:1px solid #333; pointer-events:none;" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>

    <!-- Closing narration -->
    <div
      style="padding:12px 20px; background:#fff; display:flex; align-items:center; justify-content:space-between; border-top:3px solid #000; flex-shrink:0;"
    >
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:clamp(36px,4vw,56px); opacity:0.1; transform:rotate(-3deg);" aria-hidden="true">終</div>
      <div class="manga-narration" style="flex:1; margin:0 16px; text-align:center;">{{ $t('manga.closing') }}</div>
      <div style="font-size:clamp(11px,1.3vw,15px); color:#bbb; font-family:'Courier New',monospace; white-space:nowrap;">© {{ currentYear }}</div>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 4 —</div>
  </div>
</template>
