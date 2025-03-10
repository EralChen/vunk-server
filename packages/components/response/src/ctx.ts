import type { PropType } from 'vue'

export const props = {
  code: {
    type: Number,
    default: 200,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  message: {
    type: String,
    default: '操作成功',
  },
}

export const emits = {
}
