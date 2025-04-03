import mri from 'mri'
import { loadEnv } from 'vite'
import { serverRoot } from '../path.config'

interface MriData {
  mode: string
}

export function loadEnvMeta () {
  const argv = process.argv.slice(2)
  const mriData = mri<MriData>(argv)
  const isProduction = process.env.NODE_ENV === 'production'
  const mode = mriData.mode || (
    isProduction ? 'production' : 'development'
  )
  const env = loadEnv(mode, serverRoot, '') as unknown as ImportMetaEnv

  return {
    env,
    mode,
    isProduction,
  }
}
