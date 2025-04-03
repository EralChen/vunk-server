import type { NormalObject, Pagination } from '@vunk/shared'
import type { TableData } from '@vunk-server/shared'
import type { FileDTO } from './types'
import { request } from '@vunk-server/shared'

export async function rFile (query: NormalObject, pagination?: Pagination) {
  return request<TableData<FileDTO>>({
    method: 'GET',
    url: '/file',
    params: {
      ...query,
      ...pagination,
    },
  }).then(res => res.data)
}
