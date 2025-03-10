import { defineComponent, Fragment } from '@vunk-server/jsx-runtime'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup () {
    const data = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Hello World')
      }, 100)
    })

    const test = () => (
      <Fragment array>
        <test>
          { data }
        </test>
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
