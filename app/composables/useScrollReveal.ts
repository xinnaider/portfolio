export function useScrollReveal() {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const staggerIndex = el.dataset.stagger
            const delay = staggerIndex ? parseInt(staggerIndex) * 100 : 0

            setTimeout(() => {
              el.classList.add('visible')
            }, delay)

            observer.value?.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.value?.observe(el)
    })
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  function observeNew(container?: HTMLElement) {
    const root = container || document
    root.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
      observer.value?.observe(el)
    })
  }

  return { observeNew }
}
