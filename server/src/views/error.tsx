import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  name: 'TestError',
  setup () {
    throw new Error('This is an error!')
    return () => null
  },
})
