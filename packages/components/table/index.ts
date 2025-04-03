import type { App } from 'vue'
import VkTable from './src/index'

export * as __VkTable from './src/types'

VkTable.install = (app: App): void => {
  app.component(VkTable.name || 'VkTable', VkTable)
}
export {
  VkTable,
}
export default VkTable
