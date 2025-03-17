import { restFetch } from '@vunk-server/shared'

export function rResponse () {
  return restFetch.request({
    method: 'POST',
    url: '/response',
    data: {
      name: 'vunk-server',
    },
    params: {
      id: '123',
    },
  })
}
