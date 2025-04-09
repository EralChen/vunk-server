import type { CompilerOptions } from 'ts-morph'
import path from 'node:path'
import { distTypesDir, workRoot } from '@lib-env/path'
import { genDtsFiles } from '@vunk/shared/build/morph'
import { fixPath } from './alias'

export async function genTypes (opts = {} as {
  filesRoot: string
  source?: string
  outDir?: string
  projectEmit?: boolean
  compilerOptions?: CompilerOptions
}) { // 生成一个 .d.ts
  const outDir = path.resolve(distTypesDir, opts.outDir ?? '')
  const globSource = opts.source ?? '**/*'
  const globCwd = opts.filesRoot

  await genDtsFiles({
    root: workRoot,
    compilerOptions: {
      outDir,
      ...opts.compilerOptions,
    },
    globSource,
    globCwd,
    transform: fixPath,
    projectEmit: opts.projectEmit,
  })
}
