import type {
  CreateAppFunction,
  RootRenderFunction,
} from '@vue/runtime-core'
import type { JSONElementNode } from '../'
import {
  createRenderer,
} from '@vue/runtime-core'
import { extend } from '@vue/shared'
import { nodeOps } from '../nodeOps'
import { patchProp } from '../patchProp'

export const renderer = createRenderer(
  extend({ patchProp }, nodeOps),
)

export const render = renderer.render as RootRenderFunction<JSONElementNode>

export const createApp = renderer.createApp as CreateAppFunction<JSONElementNode>

export * from '@vue/runtime-core'
