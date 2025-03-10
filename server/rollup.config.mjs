import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  external: [
    'consola',
    'koa',
    '@vue/shared',
    '@vue/runtime-core',
    '@vue/reactivity',
  ],
  plugins: [
    esbuild({
      tsconfig: 'tsconfig.json',
    }),
  ],

})
