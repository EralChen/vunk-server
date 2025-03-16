<script lang="ts" setup>
import { ref } from 'vue'
import { rResponse } from './api'

const data = ref()

rResponse().then((res) => {
  data.value = res.data
})
</script>

<template>
  <pre>{{ data }}</pre>
</template>
