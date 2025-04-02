import type busboy from 'busboy'

export interface FileInfo extends busboy.FileInfo {
  size: number
  path: string
  hash: string
}
