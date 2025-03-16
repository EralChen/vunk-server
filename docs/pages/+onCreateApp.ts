import type { OnCreateAppSync } from 'vike-vue/types'

import { VkClientOnly } from '@vunk/core/components/client-only'
import ElmentPlus, { ID_INJECTION_KEY } from 'element-plus'
import '../api/init'

import 'uno.css'
import '#/src/styles'

export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext
  app.use(ElmentPlus)
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })
  app.component('ClientOnly', VkClientOnly)
}
