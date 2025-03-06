import {
  type CreateAppFunction,
  createRenderer,
  type RootRenderFunction,
  type VNode,
} from '@vue/runtime-core'
import { extend } from '@vue/shared'
import { nodeOps, type TestElement } from './nodeOps'
import { patchProp } from './patchProp'
import { serializeInner } from './serialize'

const {
  render: baseRender,
  createApp: baseCreateApp,
} = createRenderer(
  extend({ patchProp }, nodeOps),
)

export const render = baseRender as RootRenderFunction<TestElement>
export const createApp = baseCreateApp as CreateAppFunction<TestElement>

// convenience for one-off render validations
export function renderToString (vnode: VNode): string {
  const root = nodeOps.createElement('div')
  render(vnode, root)
  return serializeInner(root)
}

export * from './nodeOps'
export * from './serialize'
export * from './triggerEvent'
export * from '@vue/runtime-core'
