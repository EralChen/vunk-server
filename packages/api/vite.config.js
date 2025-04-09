import path, { resolve } from 'node:path'
import { distTypesDir } from '@lib-env/path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const baseDirname = __dirname.split(path.sep).pop()

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      formats: ['es'],
    },
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.types.json',
      exclude: ['gulpfile.ts'],
      declarationOnly: true,
      outDir: resolve(distTypesDir, baseDirname),
    }),
  ],
})
