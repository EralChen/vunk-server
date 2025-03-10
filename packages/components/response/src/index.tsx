import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'SkResponse',
  props,
  emits,
  setup (props, { slots }) {
    return () => (
      <>
        <code v-json={props.code}></code>
        <data>
          { slots.default?.() }
        </data>
        <message>
          { props.message }
        </message>
      </>
    )
  },
})
