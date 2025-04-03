import type { __VkTable } from '@vunk-server/components/table'
import type { Ref } from '@vunk-server/jsx-runtime'
import { usePrisma } from '@/composables/usePrisma'
import VkResolve from '@vunk-server/components/resolve'
import { VkTable } from '@vunk-server/components/table'
import { defineComponent, ref } from '@vunk-server/jsx-runtime'

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

    return () => (
      <>
        <VkTable
          pageSize={props.pageSize}
          currentPage={props.currentPage}
          onUpdate:pagination={v => pagination.value = v}
        >
        </VkTable>
        <rows>
          <VkResolve
            executor={renderRows}
          >
          </VkResolve>
        </rows>
      </>

    )
  },
})
