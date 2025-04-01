import { noop } from '@vunk/shared/function'

export const props = {
  executor: {
    type: Function,
    default: noop,
  },
}

export const emits = {
  resolve: null,
}
