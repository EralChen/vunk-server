import { SkResponse } from '@vunk-server/components/response'
import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  async setup () {
    const data = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Hello World')
      }, 100)
    })
    const json = {
      a: 1,
      b: 2,
    }

    return () => (
      <SkResponse>
        <test>
          { data }
        </test>
        <test> Hello World2 </test>

        <item v-json={json}>111</item>
      </SkResponse>
    )
  },
})
