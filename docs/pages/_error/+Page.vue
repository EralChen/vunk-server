<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext'

const ctx = usePageContext()
let { is404, abortReason } = ctx
if (!abortReason) {
  abortReason = is404 ? 'Page not found.' : 'Something went wrong.'
}
</script>

<template>
  <div class="center">
    <p>{{ abortReason }}</p>
  </div>
</template>

<style>
.center {
  height: calc(100vh - 100px);
  display: flex;
  font-size: 1.3em;
  justify-content: center;
  align-items: center;
}
</style>
