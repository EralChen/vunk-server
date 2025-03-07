import type { JSONElementNode } from './types'
import { createComment } from './createComment'
import { createElement } from './createElement'
import { createText } from './createText'
import { insert } from './insert'
import { remove } from './remove'
import { setElementText } from './setElementText'
import { setText } from './setText'

export * from './const'
export * from './types'

function parentNode (node: JSONElementNode): JSONElementNode | null {
  return node.parentNode
}

function nextSibling (node: JSONElementNode): JSONElementNode | null {
  if (node.parentNode) {
    const index = node.parentNode.children.indexOf(node)
    return node.parentNode.children[index + 1] || null
  }
  return null
}

function querySelector (): JSONElementNode | null {
  return null
}

export const nodeOps = {
  insert,
  remove,
  createElement,
  createText,
  setText,
  setElementText,
  parentNode,
  nextSibling,
  querySelector,
  createComment,
}
