export default defineNuxtConfig({
  compatibilityDate: '2026-09-30',
  srcDir: 'src/',

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],

  ui: {
    colorMode: false,
    fonts: false,
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Kambista',
      meta: [
        {
          name: 'description',
          content: 'Cambia tus divisas de forma simple, segura y transparente.',
        },
      ],
    },
  },

  devServer: {
    port: 3001,
  },

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/v1',
    },
  },

  typescript: {
    strict: true,
  },
})
