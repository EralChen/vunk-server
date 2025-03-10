import { defineComponent, Fragment } from '@vunk-server/jsx-runtime'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup () {
    const test = () => (
      <Fragment array>
        <test> Hello World1 </test>
        <test> Hello World2 </test>
      </Fragment>
    )

    return () => (
      <>
        <code>{ 200 }</code>
        <data>
          { test() }
        </data>
        <message>
          操作成功
        </message>
      </>
    )
  },
})
