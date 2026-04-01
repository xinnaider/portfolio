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
      const router = useRouter()
      if (newTheme === Theme.MANGA) {
        router.replace({ query: { theme: 'manga' } })
      } else {
        router.replace({ query: {} })
      }
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
      const route = useRoute()
      if (route.query.theme === Theme.MANGA) {
        theme.value = Theme.MANGA
        document.documentElement.setAttribute('data-theme', Theme.MANGA)
      }
    }
  }

  return { theme: readonly(theme), isManga, setTheme, toggleTheme, initTheme }
}
