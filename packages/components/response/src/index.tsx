import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkResponse',
  props,
  emits,
  setup (props, { slots }) {
    return () => (
      <>
        <code v-json={props.code}></code>
        <data v-json={props.data}>
          { slots.default?.() }
        </data>
        <message>
          { props.message }
        </message>
      </>
    )
  },
})
