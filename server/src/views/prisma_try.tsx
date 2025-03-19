import { defineComponent } from '@vunk-server/jsx-runtime'
import { useKoa } from '@vunk-server/koa'
import { usePrisma } from '../composables/usePrisma'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup () {
    const { context } = useKoa()
    const prisma = usePrisma()

    return () => null
  },
})
