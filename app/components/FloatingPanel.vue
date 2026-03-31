<script setup lang="ts">
const { isManga, toggleTheme } = useTheme()

const isVisible = ref(false)
const isBouncing = ref(false)

onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 2000)

  const bounce = () => {
    isBouncing.value = true
    setTimeout(() => { isBouncing.value = false }, 700)
  }
  bounce()
  setInterval(bounce, 3500)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <!-- Outer group: everything moves together -->
    <div
      v-show="isVisible"
      class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      :class="isBouncing ? 'fp-group--bounce' : 'fp-group--float'"
      style="pointer-events: none;"
    >
      <!-- Speech bubble 1 — top -->
      <div class="fp-bubble fp-bubble--top" :class="isManga ? 'fp-bubble--violet' : ''">
        <span v-if="isManga">紫に戻る？</span>
        <span v-else>変えてみて！</span>
      </div>

      <!-- Speech bubble 2 — thought -->
      <div class="fp-bubble fp-bubble--thought" :class="isManga ? 'fp-bubble--violet' : ''">
        <span v-if="isManga">押せ！！</span>
        <span v-else>マンガへ！！</span>
      </div>

      <!-- Main button -->
      <button
        :aria-label="isManga ? 'Switch to violet theme' : 'Switch to manga theme'"
        class="fp-btn"
        :class="isManga ? 'fp-btn--manga' : 'fp-btn--violet'"
        style="pointer-events: auto;"
        @click="toggleTheme"
      >
        <span class="fp-impact" aria-hidden="true" />

        <span v-if="isManga" class="fp-label">
          <span class="fp-icon">✦</span>
          <span class="fp-text">VIOLET</span>
        </span>
        <span v-else class="fp-label">
          <span class="fp-icon">墨</span>
          <span class="fp-text">MANGA</span>
        </span>

        <span class="fp-pulse" :class="isManga ? 'fp-pulse--violet' : 'fp-pulse--white'" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
/* ── Group animations (bubbles + button move as one) ── */
.fp-group--float {
  animation: fp-float 3s ease-in-out infinite;
}

.fp-group--bounce {
  animation: fp-bounce 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
}

@keyframes fp-float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-8px) rotate(1deg); }
}

@keyframes fp-bounce {
  0%   { transform: translateY(0) rotate(-1deg) scale(1); }
  20%  { transform: translateY(-18px) rotate(3deg) scale(1.08); }
  40%  { transform: translateY(-8px) rotate(-2deg) scale(0.96); }
  60%  { transform: translateY(-14px) rotate(2deg) scale(1.04); }
  80%  { transform: translateY(-4px) rotate(-1deg) scale(0.98); }
  100% { transform: translateY(0) rotate(-1deg) scale(1); }
}

/* ── Bubbles ─────────────────────────────────────────── */
.fp-bubble {
  font-family: serif;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  line-height: 1.4;
  position: relative;
  white-space: nowrap;
  box-shadow: 2px 2px 0 #000;
}

.fp-bubble--top::after {
  content: '';
  position: absolute;
  bottom: -8px;
  right: 16px;
  border: 4px solid transparent;
  border-top-color: #000;
}
.fp-bubble--top::before {
  content: '';
  position: absolute;
  bottom: -6px;
  right: 17px;
  border: 3px solid transparent;
  border-top-color: #fff;
  z-index: 1;
}

.fp-bubble--thought {
  border-style: dashed;
  box-shadow: none;
}
.fp-bubble--thought::after {
  content: '•••';
  position: absolute;
  bottom: -16px;
  right: 12px;
  font-size: 8px;
  color: #000;
  letter-spacing: 1px;
}

/* Violet theme bubbles (shown when current theme is manga) */
.fp-bubble--violet {
  background: #1a1020;
  color: #c4b5fd;
  border-color: #7c3aed;
  box-shadow: 2px 2px 0 #7c3aed;
}

.fp-bubble--violet.fp-bubble--top::after {
  border-top-color: #7c3aed;
}
.fp-bubble--violet.fp-bubble--top::before {
  border-top-color: #1a1020;
}
.fp-bubble--violet.fp-bubble--thought::after {
  color: #7c3aed;
}

/* ── Main button ─────────────────────────────────────── */
.fp-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border: 3px solid;
  cursor: pointer;
  overflow: visible;
}

.fp-btn--violet {
  background: #0a0a0a;
  border-color: #fff;
  box-shadow: 4px 4px 0 #fff, 0 0 24px rgba(139,92,246,0.25);
  color: #fff;
}

.fp-btn--manga {
  background: #fff;
  border-color: #7c3aed;
  box-shadow: 4px 4px 0 #7c3aed, 0 0 24px rgba(139,92,246,0.3);
  color: #7c3aed;
}

.fp-btn--violet:hover {
  box-shadow: 6px 6px 0 #8b5cf6, 0 0 32px rgba(139,92,246,0.4);
  border-color: #8b5cf6;
}
.fp-btn--manga:hover {
  box-shadow: 6px 6px 0 #000, 0 0 32px rgba(0,0,0,0.3);
  border-color: #000;
}

/* ── Label ───────────────────────────────────────────── */
.fp-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  position: relative;
  z-index: 1;
}

.fp-icon {
  font-size: 22px;
  font-family: serif;
  line-height: 1;
}

.fp-text {
  font-size: 9px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  font-weight: 900;
}

/* ── Impact lines ────────────────────────────────────── */
.fp-impact {
  position: absolute;
  inset: -12px;
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    transparent 0deg 10deg,
    rgba(255,255,255,0.06) 10deg 12deg
  );
  pointer-events: none;
  animation: fp-impact-spin 8s linear infinite;
}

.fp-btn--manga .fp-impact {
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    transparent 0deg 10deg,
    rgba(124,58,237,0.1) 10deg 12deg
  );
}

@keyframes fp-impact-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Pulse dot ───────────────────────────────────────── */
.fp-pulse {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: fp-pulse-ring 2s ease-in-out infinite;
}

.fp-pulse--white  { background: #fff; }
.fp-pulse--violet { background: #8b5cf6; }

@keyframes fp-pulse-ring {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.6); opacity: 0.5; }
}
</style>
