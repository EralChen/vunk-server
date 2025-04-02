import path from 'node:path'
import { it } from 'vitest'
import { calculateFileHashSample } from '../src/utils'

const filePath = path.resolve(__dirname, './test.pdf')

it('calculateFileHashSample', async () => {
  // 示例
  calculateFileHashSample(filePath).then((hash) => {
    // eslint-disable-next-line no-console
    console.log('File Hash:', hash)
  })
})
