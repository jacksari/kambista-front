import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          name: 'nuxt',
          environment: 'nuxt',
          include: ['tests/nuxt/**/*.spec.ts'],
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom',
            },
          },
          clearMocks: true,
          restoreMocks: true,
        },
      }),
    ],
  },
})
