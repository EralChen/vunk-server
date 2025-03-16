import { LIB_PRE } from '@lib-env/build-constants'
import { capitalize } from 'vue'

// vk => Vk
const pre = capitalize(LIB_PRE)

export function createIndexStr (capName) {
  return `import { App } from 'vue'
import ${pre}${capName} from './src/index.vue'
export * as __${pre}${capName} from './src/types'

${pre}${capName}.install = (app: App): void => {
  app.component(${pre}${capName}.name || '${pre}${capName}', ${pre}${capName})
}
export {
  ${pre}${capName},
}
export default ${pre}${capName}
`
}

export function createTypesStr () {
  return `
export {}
`
}

export function createVueStr (capName: string) {
  return `<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
export default defineComponent({
  name: '${pre}${capName}',
  emits,
  props,
  setup (props, { emit }) {
    return {}
  },
})
</script>
<template>
  <div>${capName}</div>
</template>
`
}

export function createTsxStr (capName: string) {
  return `import { defineComponent } from 'vue'
import { props, emits } from './ctx'
export default defineComponent({
  name: '${pre}${capName}',
  emits,
  props,
  setup (props, { emit }) {
    return () => <></>
  },
})
`
}

export function createCtxStr () {
  return `import { PropType } from 'vue'

export const props = {
  modelValue: {
    type: Object as PropType<unknown>,
    default: () => ({}),
  },
}

export const emits = {
}`
}
