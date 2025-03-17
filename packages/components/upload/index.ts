import type { App } from 'vue'
import VkUpload from './src/index'

export * as __VkUpload from './src/types'

VkUpload.install = (app: App): void => {
  app.component(VkUpload.name || 'VkUpload', VkUpload)
}
export {
  VkUpload,
}
export default VkUpload
