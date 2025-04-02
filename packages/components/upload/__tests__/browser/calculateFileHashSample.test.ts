import { describe, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Button from './button.vue'

describe('button.vue', () => {
  it('calculateFileHashSampleWeb', async () => {
    render(Button)
  })
})
