import { restFetch } from '@vunk-server/shared'

export function testUpload () {
  return restFetch.request({
    method: 'POST',
    url: '/upload',
    contentType: 'multipart/form-data',
    data: {
      name: 'vunk-server',
    },
    params: {
      id: '123',
    },
  })
}
