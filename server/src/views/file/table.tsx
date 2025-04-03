import { defineComponent } from '@vunk-server/jsx-runtime'

export default defineComponent({
  props: {
    currentPage: null,
    pageSize: null,
    start: null,
  },
  setup () {
    return () => (
      <>
        <rows></rows>
        <total></total>
      </>
    )
  },
})
