import type busboy from 'busboy'
import type { Buffer } from 'node:buffer'

export interface FileInfo extends busboy.FileInfo {
  data: Buffer
  size: number
  path: string
}
