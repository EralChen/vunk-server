<script lang="ts" setup>
import type { NormalObject } from '@vunk/shared'
import { restFetch } from '@vunk-server/shared/fetch'
import { ref } from 'vue'

const data = ref<NormalObject>({})
restFetch.request({
  method: 'GET',
  url: '/table',
  params: {
    currentPage: 1,
    pageSize: 2,
  },
}).then((res) => {
  data.value = res
})
</script>

<template>
  <pre>
    {{ data }}
  </pre>
</template>
