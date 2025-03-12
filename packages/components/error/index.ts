import type { App } from 'vue'
import VkError from './src/index'

export * as __VkError from './src/types'

VkError.install = (app: App): void => {
  app.component(VkError.name || 'VkError', VkError)
}
export {
  VkError,
}
export default VkError
