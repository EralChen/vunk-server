import type { JSONElementNode } from './types'
import { markRaw, RendererOptions } from '@vue/runtime-core'
import { JSONNodeTypes } from './const'

/**
 * @type { RendererOptions['createElement'] }
 */
export function createElement (tag: string): JSONElementNode {
  const node: JSONElementNode = markRaw({
    type: JSONNodeTypes.ELEMENT,
    tag,
    children: [],
    props: {},
    parentNode: null,
    json: null,
  })

  return node
}
