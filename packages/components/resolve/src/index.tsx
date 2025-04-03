import { waiting } from '@vunk/shared/promise'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkResolve',
  emits,
  props,
  async setup (props, { emit, slots }) {
    if (props.waiting) {
      await waiting(props.waiting)
    }

    const value = await props.executor?.()

    emit('resolve', value)

    if (value === undefined) {
      return slots.default
    }

    return () => (
      <>
        <vk:element value={value} />
        { slots.default?.() }
      </>
    )
  },
})
