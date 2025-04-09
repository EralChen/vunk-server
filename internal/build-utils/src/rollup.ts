import type { InputOption, InputPluginOption, OutputOptions, RollupOutput } from 'rollup'
import { libExternal } from '@lib-env/build-constants'
import { rollupFiles as baseRollupFiles } from '@vunk/shared/build/rollup'
import { fixPath } from './alias'

export async function rollupFiles (settings: {
  input: InputOption
  external: (string | RegExp)[]
  outputDir: string
  plugins?: InputPluginOption
  outputOptions?: OutputOptions

  outputExtname?: string
}): Promise<RollupOutput> {
  const outputExtname = settings.outputExtname ?? '.mjs'

  const external = settings.external ?? []

  return baseRollupFiles({
    input: settings.input,
    external: [
      ...libExternal,
      ...external,
    ],
    outputDir: settings.outputDir,
    plugins: settings.plugins,
    outputExtname,

    outputOptions: {
      exports: 'named',
      paths: fixPath,
      chunkFileNames: `[name]${outputExtname}`,
      ...settings.outputOptions,
    },

  })
}
