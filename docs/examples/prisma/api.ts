import { restFetch } from '@vunk-server/shared'

export function rUser () {
  return restFetch.request({
    method: 'GET',
    url: '/prisma_try',
  })
}

export function cuUser (data: {}) {
  return restFetch.request({
    method: 'POST',
    url: '/prisma_try',
  })
}

export function dUser () {
  return restFetch.request({
    method: 'DELETE',
    url: '/prisma_try',
  })
}
