import { LIB_ALIAS, LIB_NAME } from './name'

export const libExternal = [
  'vue',
  /^@vue/,
  'koa',
  new RegExp(`^${LIB_NAME}`),
  new RegExp(`^${LIB_ALIAS}`),
]

export const filePathIgnore = [
  'gulpfile.ts',
  'package.json',
  'vite.config.{ts,js}',
  'node_modules',
  '**/README.md',
  '**/__tests__/**.ts',
]
