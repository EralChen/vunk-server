import { App } from 'vue'
import VkResolve from './src/index'
export * as __VkResolve from './src/types'

VkResolve.install = (app: App): void => {
  app.component(VkResolve.name || 'VkResolve', VkResolve)
}
export {
  VkResolve,
}
export default VkResolve
