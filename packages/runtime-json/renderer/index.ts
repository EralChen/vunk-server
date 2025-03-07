import {
  type CreateAppFunction,
  createRenderer,
  type RootRenderFunction,
  type VNode,
} from '@vue/runtime-core'
import { extend } from '@vue/shared'
import { nodeOps } from '../nodeOps'
import { patchProp } from '../patchProp'

export const renderer = createRenderer(
  extend({ patchProp }, nodeOps),
)

export const render = renderer.render

export const createApp = renderer.createApp
