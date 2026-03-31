export function useScrollReveal() {
  const observer = ref<IntersectionObserver | null>(null)

  const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale'

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

    document.querySelectorAll(SELECTOR).forEach((el) => {
      observer.value?.observe(el)
    })
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  function observeNew(container?: HTMLElement) {
    const root = container || document
    root.querySelectorAll(SELECTOR).forEach((el) => {
      if (!el.classList.contains('visible')) {
        observer.value?.observe(el)
      }
    })
  }

  return { observeNew }
}
