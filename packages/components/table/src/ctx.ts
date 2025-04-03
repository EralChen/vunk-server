export const props = {
  pagination: {
    type: Object,
    default: () => ({}),
  },
  pageSize: {
    type: [Number, String],
    required: false,
  },
  currentPage: {
    type: [Number, String],
    required: false,
  },
  start: {
    type: [Number, String],
    required: false,
  },
}

export const emits = {
  'update:pagination': null,
}
