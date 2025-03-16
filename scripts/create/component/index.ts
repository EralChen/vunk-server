import fsp from 'node:fs/promises'
import path from 'node:path'
import { pkgsComponentsDir } from '@lib-env/path'

import { gulpTask } from '@vunk/shared/function'
import { parallel, series } from 'gulp'
import mri from 'mri'
import { camelize, capitalize } from 'vue'
import { createCtxStr, createIndexStr, createTsxStr, createTypesStr } from './temp'

interface MriData {
  name: string // aaa-bbb
}

const argv = process.argv.slice(2)
const mriData = mri<MriData>(argv)
const componentPath = path.resolve(pkgsComponentsDir, mriData.name)
const srcPath = path.resolve(componentPath, './src')

// aaa-bbb => AaaBbb
const capName = capitalize(camelize(mriData.name))

export default series(
  async () => fsp.mkdir(srcPath, {
    recursive: true,
  }),
  parallel(
    gulpTask('createIndex', async () => {
      return fsp.appendFile(
        path.resolve(componentPath, './index.ts'),
        createIndexStr(capName),
      )
    }),
    gulpTask('createTypesFile', async () => {
      return fsp.appendFile(
        path.resolve(srcPath, './types.ts'),
        createTypesStr(),
      )
    }),
    gulpTask('createTsxFile', async () => {
      return fsp.appendFile(
        path.resolve(srcPath, './index.tsx'),
        createTsxStr(capName),
      )
    }),
    gulpTask('createCtxFile', async () => {
      return fsp.appendFile(
        path.resolve(srcPath, './ctx.ts'),
        createCtxStr(),
      )
    }),

  ),
)
