<template>
  <div class="manga-layout">
    <MangaPage1Hero />
    <MangaPage2Experience />
    <MangaPage3AboutTech />
    <MangaPage4EducationContact />
  </div>
</template>

<style scoped>
.manga-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background: #000;
}
</style>
