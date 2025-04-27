import { VkResponse } from '@vunk-server/components/response'
import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  name: 'TestError',
  setup () {
    // 随机抛错
    const random = Math.random()
    if (random > 0.5) {
      throw new Error('This is an error!')
    }

    return () => (
      <VkResponse>
        <name>cx</name>
      </VkResponse>
    )
  },
})
