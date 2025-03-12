import type { App } from 'vue'
import VkResponse from './src/index'

export * as __VkResponse from './src/types'

VkResponse.install = (app: App): void => {
  app.component(VkResponse.name || 'VkResponse', VkResponse)
}
export {
  VkResponse,
}
export default VkResponse
