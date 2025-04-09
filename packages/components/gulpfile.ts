import path from 'node:path'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'
import { distDir, workRoot } from '@lib-env/path'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { gulpTask } from '@vunk/shared/function'
import { sync } from 'fast-glob'
import { parallel } from 'gulp'
import esbuild from 'rollup-plugin-esbuild'

const buildFile = '**/index.ts'
const baseDirname = __dirname.split(path.sep).pop() as string
const external = ['busboy']

const plugins = [
  nodeResolve({
    preferBuiltins: true,
  }),
  esbuild({
    target: 'esnext',
    tsconfig: path.resolve(workRoot, './tsconfig.json'),
    tsconfigRaw: {
      compilerOptions: {
        jsx: 'react-jsx',
        jsxImportSource: '@vunk/server',
      },
    },
  }),
  json(),
  commonjs(),
]

const filePaths = sync(buildFile, {
  cwd: path.resolve(__dirname, './'),
  onlyFiles: true,
  absolute: true,
  ignore: filePathIgnore,
})

export default parallel(
  gulpTask(`bundle ${baseDirname}`, async () => {
    await Promise.all([
      rollupFiles({
        input: filePaths,
        outputDir: path.resolve(distDir, baseDirname),
        external,
        plugins,
      }),
      rollupFiles({
        input: filePaths,
        outputDir: path.resolve(distDir, baseDirname),
        external,
        plugins,
        outputExtname: '.cjs',
        outputOptions: {
          format: 'cjs',
        },
      }),
    ])
  }),
  gulpTask(`gen ${baseDirname} types`, async () => {
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
    })
  }),
)
