import { getPartialNumber } from '@vunk/shared/number'
import { computed, defineComponent } from 'vue'
import { props } from './ctx'

export default defineComponent({
  name: 'VkTable',
  props,
  setup (props, { slots }) {
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

    return () => (
      <>
        <pagination v-raw={pagination.value}></pagination>
        {
          slots.default?.({
            pagination: pagination.value,
          })
        }

      </>
    )
  },
})
