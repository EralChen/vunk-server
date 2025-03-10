import type { App } from 'vue'
import SkResponse from './src/index.vue'

export * as __SkResponse from './src/types'

SkResponse.install = (app: App): void => {
  app.component(SkResponse.name || 'SkResponse', SkResponse)
}
export {
  SkResponse,
}
export default SkResponse
