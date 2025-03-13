import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import { LIB_ENTRY_FLIENAME, libExternal } from '@lib-env/build-constants'
import { fixPath, genTypes } from '@lib-env/build-utils'
import { distDir, distTypesDir, pkgsEntryDir } from '@lib-env/path'
import { rollupFiles } from '@vunk/shared/build/rollup'
import { gulpTask } from '@vunk/shared/function'
import { glob } from 'fast-glob'
import { parallel } from 'gulp'

export default parallel(

  gulpTask('bundleFullEntry', async () => {
    await rollupFiles({
      input: path.resolve(pkgsEntryDir, `./${LIB_ENTRY_FLIENAME}.ts`),
      outputFile: path.resolve(distDir, './index.esm.js'),
      external: [
        ...libExternal,
      ],
      outputOptions: {
        paths: fixPath,
      },
    })
    await rollupFiles({
      input: path.resolve(pkgsEntryDir, `./${LIB_ENTRY_FLIENAME}.ts`),
      outputFile: path.resolve(distDir, './index.cjs.js'),
      external: [
        ...libExternal,
      ],
      outputOptions: {
        paths: fixPath,
        format: 'cjs',
      },
    })
  }),

  gulpTask('genEntryTypes', async () => { // 生成入口 .d.ts
    const outDir = path.resolve(distTypesDir, './entry')
    await genTypes({
      filesRoot: pkgsEntryDir,
      outDir,
    })

    glob('**/*.d.ts', {
      cwd: outDir,
      absolute: true,
    }).then((files) => {
      files.forEach((file) => {
        const dest = path.resolve(distDir, path.basename(file))
        copyFile(file, dest)
      })
    })
  }),

)
