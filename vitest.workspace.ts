import vue from '@vitejs/plugin-vue'
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: 'unit',
      include: [
        '**/__tests__/unit/*.{test,spec}.{js,ts,tsx,jsx}',
        '**/__tests__/**/*.unit.{test,spec}.{js,ts,tsx,jsx}',
      ],
      environment: 'node',
    },
  },
  {
    plugins: [vue()],
    test: {
      name: 'browser',
      browser: {
        provider: 'playwright',
        enabled: true,
        instances: [
          { browser: 'chromium' },
        ],
      },
      include: [
        '**/__tests__/browser/*.{test,spec}.{js,ts,tsx,jsx}',
        '**/__tests__/**/*.browser.{test,spec}.{js,ts,tsx,jsx}',
      ],
    },

  },
])
