import { defineComponent } from '@vunk-server/jsx-runtime'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkResponse',
  props,
  emits,
  setup (props, { slots }) {
    return () => (
      <>
        <code v-raw={props.code}></code>
        <data v-raw={props.data}>
          { slots.default?.() }
        </data>
        <message>
          { props.message }
        </message>
      </>
    )
  },
})
