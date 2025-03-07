import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => (
      <id>
        {props.id}
      </id>
    )
  },
})
