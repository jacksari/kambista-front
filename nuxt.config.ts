export default defineNuxtConfig({
  compatibilityDate: '2026-09-30',
  srcDir: 'src/',

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

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

