import type { JSONElementNode } from './types'
import { markRaw, RendererOptions } from '@vue/runtime-core'
import { JSONNodeTypes } from './const'

/**
 * @type { RendererOptions['createText'] }
 */
export function createText (text: string): JSONElementNode {
  const node: JSONElementNode = markRaw({
    type: JSONNodeTypes.TEXT,
    tag: '',
    children: [],
    props: {},
    parentNode: null,
    json: text,
    text,
  })
  return node
}
