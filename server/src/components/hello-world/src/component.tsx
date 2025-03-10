import { ArrayFragment, defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup () {
    const test = () => (
      <ArrayFragment>
        <test>
          Hello World
        </test>
      </ArrayFragment>
    )

    return () => (
      <id>
        <name>hhh</name>
        {test()}
      </id>
    )
  },
})
