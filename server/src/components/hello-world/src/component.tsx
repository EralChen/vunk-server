import { VkResponse } from '@vunk-server/components/response'
import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  async setup () {
    const data = 'Hello World'
    const json = {
      a: 1,
      b: 2,
    }

    throw new Error('test error')

    return () => (
      <VkResponse>
        <test>
          { data }
        </test>
        <item v-json={json}>111</item>
      </VkResponse>
    )
  },
})
