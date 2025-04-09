import type { __VkTable } from '@vunk-server/components/table'
import type { Ref } from '@vunk-server/jsx-runtime'
import { usePrisma } from '@/composables/usePrisma'
import { VkTable } from '@vunk-server/components/table'
import { defineComponent, ref } from '@vunk-server/jsx-runtime'
import formItems from './formItems'

export default defineComponent({
  props: {
    pageSize: null,
    currentPage: null,
  },
  async setup (props) {
    const prisma = usePrisma()
    const pagination = ref() as Ref<__VkTable.Pagination>

    const renderRows = async () => {
      const rows = await prisma.file.findMany({
        skip: pagination.value.start,
        take: pagination.value.pageSize,
        orderBy: {
          id: 'desc',
        },
      })
      return rows
    }

    const renderTotal = async () => {
      const total = await prisma.file.count({
        where: {

        },
      })
      return total
    }

    return () => (
      <VkTable
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onUpdate:pagination={v => pagination.value = v}
        rowsExecutor={renderRows}
        totalExecutor={renderTotal}
      >
        <formItems v-raw={formItems}></formItems>
      </VkTable>
    )
  },
})
