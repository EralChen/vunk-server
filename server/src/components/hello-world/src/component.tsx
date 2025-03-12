import { VkResponse } from '@vunk-server/components/response'
import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  async setup () {
    const data = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Hello World')
      }, 100)
    })

    return () => (
      <VkResponse>
        <test>
          { data }
        </test>
        <test> Hello World2 </test>
      </VkResponse>
    )
  },
})
