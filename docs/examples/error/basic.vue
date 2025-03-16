<script lang="ts" setup>
// import { VkError } from '@vunk-server/components/error'
import { restFetch } from '@vunk-server/shared/fetch'
import { ref } from 'vue'

const data = ref()

restFetch.request({
  method: 'GET',
  url: '/error',
}).then((res) => {
  data.value = res
})
</script>

<template>
  <pre overflow-hidden>{{ data }}</pre>
</template>
