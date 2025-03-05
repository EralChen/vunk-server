<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },

  },
  setup (props) {
    return () => (
      <div>
        <h1>Home</h1>
        <p>
          id:
          {props.id}
        </p>
        <p>
          type:
          {props.type}
        </p>
      </div>
    )
  },

})
</script>
