import { VkResponse } from '@vunk-server/components/response'
import { computed, defineComponent } from '@vunk-server/jsx-runtime'
import consola from 'consola'
import { usePrisma } from '../composables/usePrisma'

export default defineComponent({
  props: {
    currentPage: null,
    pageSize: null,
  },
  async setup (props) {
    const prisma = usePrisma()

    const skip = computed(() => {
      if (
        props.currentPage !== undefined
        && props.pageSize !== undefined
      ) {
        return (props.currentPage - 1) * props.pageSize
      }
    })

    // 打印计算时间
    const start = Date.now()
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip: skip.value,
        take: +props.pageSize,
        orderBy: {
          id: 'desc',
        },
      }),
      prisma.user.count(),
    ])
    const end = Date.now()
    consola.log('计算时间', end - start, 'ms')

    return () => (
      <VkResponse code={200} message="获取成功">
        <rows v-raw={users} />
        <total v-raw={total} />
      </VkResponse>
    )
  },
})
