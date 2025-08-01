import { VkResponse } from '@vunk-server/components/response'
import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  setup () {
    return () => (
      <VkResponse>
        <title>hello world!</title>
      </VkResponse>
    )
  },
})
