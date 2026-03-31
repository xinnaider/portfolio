export enum Theme {
  VIOLET = 'violet',
  MANGA = 'manga',
}

const theme = ref<Theme>(Theme.VIOLET)

export function useTheme() {
  const isManga = computed(() => theme.value === Theme.MANGA)

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', newTheme === Theme.VIOLET ? '' : newTheme)
      localStorage.setItem('portfolio-theme', newTheme)
    }
  }

  function toggleTheme() {
    const { triggerTransition } = useThemeTransition()
    triggerTransition(() => {
      setTheme(theme.value === Theme.VIOLET ? Theme.MANGA : Theme.VIOLET)
    })
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('portfolio-theme') as Theme | null
      if (saved === Theme.MANGA) {
        setTheme(Theme.MANGA)
      }
    }
  }

  return { theme: readonly(theme), isManga, setTheme, toggleTheme, initTheme }
}
