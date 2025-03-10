import { defineComponent } from 'vue'

export const ArrayFragment = defineComponent({
  name: 'ArrayFragment',
  setup (props, { slots }) {
    return () => slots.default?.()
  },
})
