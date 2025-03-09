import type { JSONElementNode } from './types'
import { markRaw } from '@vue/runtime-core'
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
    value: text,
  })
  return node
}
