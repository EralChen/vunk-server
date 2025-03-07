import type { JSONElementNode } from './types'
import { markRaw, RendererOptions } from '@vue/runtime-core'
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
    json: text,
    text,
  })
  return node
}
