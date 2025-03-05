import type { ApiReturnType } from '@vunk/core'
import { request } from '@vunk-server/shared/fetch/ssr'

export type Data = ApiReturnType<typeof data>

export async function data () {
  return request<{
    name: string
  }>({
    method: 'GET',
    url: '/test',
  })
}
