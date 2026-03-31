<template>
  <div class="manga-layout">
    <!-- Row 1: Hero — full width, 100vh -->
    <div class="manga-row">
      <MangaHeroSection />
    </div>

    <!-- Row 2: About (tall, 2fr) + Experience (top-right) + Tech (bottom-right) -->
    <div class="manga-row manga-row--asymmetric">
      <div class="manga-cell manga-cell--about">
        <MangaAboutSection />
      </div>
      <div class="manga-cell manga-cell--experience">
        <MangaExperienceSection />
      </div>
      <div class="manga-cell manga-cell--tech">
        <MangaTechStackSection />
      </div>
    </div>

    <!-- Row 3: Education + Contact (2 equal columns) -->
    <div class="manga-row manga-row--halves">
      <div class="manga-cell">
        <MangaEducationSection />
      </div>
      <div class="manga-cell">
        <MangaContactSection />
      </div>
    </div>
  </div>
</template>

<style scoped>
.manga-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.manga-row {
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
}

/* Row 2: About (2fr tall, spans 2 rows) | Experience (top 1fr) + Tech (bottom 1fr) */
.manga-row--asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  background: #000;
}

.manga-cell--about {
  grid-row: 1 / 3;
  overflow: hidden;
}

.manga-cell--experience {
  grid-row: 1 / 2;
  overflow: hidden;
}

.manga-cell--tech {
  grid-row: 2 / 3;
  overflow: hidden;
}

/* Row 3: 2 equal columns */
.manga-row--halves {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  background: #000;
}

.manga-cell {
  overflow: hidden;
}

/* Mobile: stacked, each section is its own snap point */
@media (max-width: 639px) {
  .manga-row {
    height: auto;
    scroll-snap-align: none;
  }

  .manga-row--asymmetric,
  .manga-row--halves {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: #000;
  }

  .manga-cell--about,
  .manga-cell--experience,
  .manga-cell--tech,
  .manga-cell {
    grid-row: unset;
    height: 100vh;
    scroll-snap-align: start;
    overflow: hidden;
  }

  .manga-row:first-child {
    height: 100vh;
    scroll-snap-align: start;
  }
}
</style>
