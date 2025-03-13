import { VkResponse } from '@vunk-server/components/response'
import { computed, defineComponent } from '@vunk-server/jsx-runtime'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkError',
  props,
  emits,
  setup (props) {
    const message = computed(() => {
      if (props.error instanceof Error) {
        return props.error.message
      }
      if (typeof props.error === 'string') {
        return props.error
      }
      if (typeof props.error === 'object') {
        return JSON.stringify(props.error)
      }
      return '操作失败'
    })

    return () => (
      <VkResponse
        code={props.code}
        message={message.value}
        data={{}}
      >
      </VkResponse>
    )
  },
})
