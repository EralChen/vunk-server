import type { SetDataEvent } from '@vunk/core'

export const props = {
  data: {
    type: Object,
    default: () => ({}),
  },
  path: {
    type: String,
    default: '',
  },
}

export const emits = {
  setData: (e: SetDataEvent) => e,
}
