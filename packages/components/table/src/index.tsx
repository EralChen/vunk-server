import { getPartialNumber } from '@vunk/shared/number'
import { computed, defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkTable',
  props,
  emits,
  async setup (props, { emit }) {
    const pagination = computed(() => {
      const pageSize = getPartialNumber(props.pageSize)
      let start = getPartialNumber(props.start)
      let currentPage = getPartialNumber(props.currentPage)
      if (typeof start === 'number') {
        // 保持 start 优先级高于 currentPage, 计算 currentPage
        pageSize
        && (currentPage = Math.floor(start / pageSize) + 1)
      }
      else { // 若没有 start, 计算出 start
        pageSize && currentPage
        && (start = (currentPage - 1) * pageSize)
      }

      return {
        start,
        pageSize,
        currentPage,
      }
    })

    emit('update:pagination', pagination.value)

    const rows = await props.rowsExecutor?.({ pagination: pagination.value })

    let total = rows?.length
    pagination.value.pageSize && (
      total = await props.totalExecutor?.({ pagination: pagination.value, rows })
    )

    emit('load', {
      pagination: pagination.value,
      rows: rows ?? [],
      total: total ?? -1,
    })

    return () => (
      <>
        <pagination v-raw={pagination.value}></pagination>
        <rows v-raw={rows}></rows>
        <total v-raw={total}></total>
      </>
    )
  },
})
