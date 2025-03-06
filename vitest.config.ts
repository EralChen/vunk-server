import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: ['packages/*'],
    include: ['**/__tests__/*.{test,spec}.{js,ts}'],
  },
})
