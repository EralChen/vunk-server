import type { PropType } from 'vue'
import type { LoadEvent, Pagination, RowsExecutor, TotalExecutor } from './types'
import { noop } from '@vunk/shared/function'

export const props = {
  /**
   * @description 单页数据量
   */
  pageSize: {
    type: [Number, String],
    required: false,
  },
  /**
   * @description 当前页码
   */
  currentPage: {
    type: [Number, String],
    required: false,
  },

  /**
   * @description
   *  currentPage 与 start 二选一
   *  起始数据索引
   *  该属性优先级高于 currentPage
   */
  start: {
    type: [Number, String],
    required: false,
  },

  /**
   * @description 整合后的分页对象, 父组件通过 onUpdate:pagination 事件获取
   */
  pagination: {
    type: Object as PropType<Pagination>,
  },

  /**
   * @description 获取 rows 的函数
   */
  rowsExecutor: {
    type: Function as PropType<RowsExecutor>,
    default: noop,
  },

  /**
   * @description 获取 total 的函数。只有在分页情况才会调用。否则返回 rows.length
   */
  totalExecutor: {
    type: Function as PropType<TotalExecutor>,
    default: noop,
  },

}

export const emits = {
  'load': (e: LoadEvent) => e,
  'update:pagination': null,
}
