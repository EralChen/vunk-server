import { restFetch } from '@vunk-server/shared'

export function rResponse () {
  return restFetch.request({
    method: 'GET',
    url: '/response',
  })
}
