import type { JSONElementNode } from './types'
import { markRaw } from '@vue/runtime-core'
import { JSONNodeTypes } from './const'

/**
 * @type { RendererOptions['createComment'] }
 */
export function createComment (text: string) {
  const node: JSONElementNode = markRaw({
    type: JSONNodeTypes.COMMENT,
    tag: '',
    children: [],
    props: {},
    parentNode: null,
    value: text,
  })
  return node
}
