import type { File } from '@prisma/client'

export interface FileDTO extends File {
  url: string
}
