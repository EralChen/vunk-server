import type { User } from '@prisma/client'
import type { NormalObject, Pagination } from '@vunk/shared'
import { request } from '@vunk-server/shared'

export function rUser (
  query: NormalObject,
  pagination?: Pagination,
) {
  return request<{
    rows: User[]
    total: number
  }>({
    method: 'GET',
    url: '/prisma_try',
    params: {
      ...query,
      ...pagination,
    },
  }).then(res => res.data)
}

export async function cuUser (data: Partial<User>) {
  return request<User[]>({
    method: data.id ? 'PUT' : 'POST',
    url: '/prisma_try',
    data,
  }).then(res => res.data)
}

export function dUser (id: string) {
  return request({
    method: 'DELETE',
    url: '/prisma_try',
    params: { id },
  })
}
