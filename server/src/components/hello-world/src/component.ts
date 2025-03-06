import { defineComponent } from '@vunk-server/core'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },

  },
  setup (props, ctx) {
    console.log('Hello World!')
    return () => ({
      id: props.id,
    })
  },
})
