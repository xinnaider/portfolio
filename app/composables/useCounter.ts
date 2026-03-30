export function useCounter(target: number, duration = 2000) {
  const count = ref(0)
  const hasAnimated = ref(false)

  function animate() {
    if (hasAnimated.value) return
    hasAnimated.value = true

    const startTime = performance.now()

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      count.value = Math.round(eased * target)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  return { count, animate }
}
