import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css', '~/assets/css/manga-theme.css', '~/assets/css/panel-shatter.css', '~/assets/css/ink-splash.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: [
      { code: 'pt-BR', language: 'pt-BR', name: 'Português', file: 'pt-BR.json' },
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pt-BR',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: '../app/locales/',
    detectBrowserLanguage: false,
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'"
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap',
          media: 'print',
          onload: "this.media='all'"
        }
      ],
      script: [
        {
          innerHTML: "(function(){try{var t=new URLSearchParams(location.search).get('theme');if(t==='manga')document.documentElement.setAttribute('data-theme','manga')}catch(e){}})()",
          type: 'text/javascript',
        },
        {
          src: 'https://cloud.umami.is/script.js',
          defer: true,
          'data-website-id': 'a6f2c5dd-0d42-49e7-8ef3-4e35c3a9dd7f'
        }
      ]
    }
  }
})
