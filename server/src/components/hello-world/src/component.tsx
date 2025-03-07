import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const test = () => (
      <test>
        Hello World
      </test>
    )

    return () => (
      <id>
        <name>hhh</name>
        {test()}
      </id>
    )
  },
})
