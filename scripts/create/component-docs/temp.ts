import { LIB_PRE } from '@lib-env/build-constants'
import { capitalize } from 'vue'

export function createMd (t: string, l: string) {
  return `--- 
title: ${t}
lang: zh-CN
---

# ${t}

${t}


## Basic

:::demo 
${l}/basic
:::

## ${t} 其他
`
}

export function createVue (mriData: {
  t: string
  l: string
}) {
  return `<script lang="ts" setup>
import { ${capitalize(LIB_PRE)}${mriData.t} } from '@vunk-server/components/${mriData.l}'
</script>
<template>
  <div></div>
</template>`
}
