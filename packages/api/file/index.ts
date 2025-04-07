import type { Pagination } from '@vunk/shared'
import { restFetch } from '@vunk-server/shared'

export function rFile (query: {
  id?: string
}, pagination?: Pagination) {
  return restFetch.request({
    method: 'GET',
    url: '/file',
    params: {
      ...query,
      ...pagination,
    },
  })
}
