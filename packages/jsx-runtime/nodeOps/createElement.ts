import type { createVNode, ElementNamespace, RendererOptions, VNodeProps } from '@vue/runtime-core'
import type { JSONElementNode, JSONNodeProps } from './types'
import { markRaw } from '@vue/runtime-core'
import { JSONNodeTypes } from './const'

/**
 * @type { RendererOptions['createElement'] }
 */
export function createElement (
  tag: string,
  namespace?: ElementNamespace,
  isCustomizedBuiltIn?: string,
  props?: JSONNodeProps,
): JSONElementNode {
  const node: JSONElementNode = markRaw({
    type: JSONNodeTypes.ELEMENT,
    tag,
    children: [],
    props: props ?? {},
    parentNode: null,
    value: null,
    isArrayFragment: props?.__v_isArrayFragment,

  })

  return node
}
