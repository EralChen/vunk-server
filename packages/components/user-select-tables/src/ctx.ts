import type { PropType } from 'vue'
import type { Row } from './types'

export const props = {
  modelValue: {
    type: Array as PropType<Row[]>,
    default: () => ([]),
  },
  /**
   * @description 是否多选
   */
  multiple: {
    type: Boolean,
    default: true,
  },
}

export const emits = {
  'update:modelValue': null,
}
