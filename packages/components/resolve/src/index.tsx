import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkResolve',
  emits,
  props,
  async setup (props, { emit }) {
    const value = await props.executor?.()

    emit('resolve', value)

    return () => <vk:element value={value} />
  },
})
