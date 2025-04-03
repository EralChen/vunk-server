import type { AnyFunc } from '@vunk/shared'
import type { PropType } from 'vue'
import { noop } from '@vunk/shared/function'

export const props = {
  executor: {
    type: Function,
    default: noop,
  },

  waiting: {
    type: Function as PropType<AnyFunc>,
    required: false,
  },

}

export const emits = {
  resolve: null,
}
