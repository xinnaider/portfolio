
interface Fragment {
  id: number
  clipPath: string
  tx: number
  ty: number
  rot: number
  sc: number
  delay: number
}

interface InkBlob {
  id: number
  cx: number
  cy: number
  delay: number
}

const INK_COVER_MS = 400
const INK_RETRACT_MS = 400

const isTransitioning = ref(false)
const isInkSplashing = ref(false)

function generateFragments(): Fragment[] {
  const isMobile = window.innerWidth < 640
  const count = isMobile ? 4 : 8
  const cols = isMobile ? 2 : 4
  const rows = count / cols

  const fragments: Fragment[] = []
  let id = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x1 = (col / cols) * 100
      const y1 = (row / rows) * 100
      const x2 = ((col + 1) / cols) * 100
      const y2 = ((row + 1) / rows) * 100

      const jitter = 2
      const cx1 = Math.max(0, x1 - Math.random() * jitter)
      const cy1 = Math.max(0, y1 - Math.random() * jitter)
      const cx2 = Math.min(100, x2 + Math.random() * jitter)
      const cy2 = Math.min(100, y2 + Math.random() * jitter)

      fragments.push({
        id: id++,
        clipPath: `polygon(${cx1}% ${cy1}%, ${cx2}% ${cy1}%, ${cx2}% ${cy2}%, ${cx1}% ${cy2}%)`,
        tx: (Math.random() - 0.5) * 300,
        ty: (Math.random() - 0.5) * 300,
        rot: (Math.random() - 0.5) * 30,
        sc: 0.6 + Math.random() * 0.3,
        delay: id * (isMobile ? 40 : 50),
      })
    }
  }

  return fragments
}

function generateInkBlobs(): InkBlob[] {
  const count = window.innerWidth < 640 ? 5 : 8
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: 10 + Math.random() * 80,
    cy: 10 + Math.random() * 80,
    delay: i * 40,
  }))
}

export function useThemeTransition() {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  async function triggerInkSplash(onSwapTheme: () => void): Promise<void> {
    isInkSplashing.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, INK_COVER_MS))
      onSwapTheme()
      await new Promise(resolve => setTimeout(resolve, INK_RETRACT_MS))
    }
    finally {
      isInkSplashing.value = false
    }
  }

  async function triggerTransition(onSwapTheme: () => void): Promise<void> {
    if (isTransitioning.value || isInkSplashing.value) return

    if (prefersReducedMotion.value) {
      onSwapTheme()
      await new Promise(resolve => setTimeout(resolve, 300))
      return
    }

    await triggerInkSplash(onSwapTheme)
  }

  return {
    isTransitioning: readonly(isTransitioning),
    isInkSplashing: readonly(isInkSplashing),
    generateFragments,
    generateInkBlobs,
    triggerTransition,
    prefersReducedMotion,
  }
}
