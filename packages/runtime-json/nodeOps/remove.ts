import type { JSONElementNode } from './types'
import { RendererOptions } from '@vue/runtime-core'
import { isPlainObject } from '@vunk/shared/object'

/**
 * @type { RendererOptions<JSONElementNode>['remove'] }
 */
export function remove (
  node: JSONElementNode,
): void {
  const parent = node.parentNode

  if (parent) {
    const i = parent.children.indexOf(node)
    if (i > -1) {
      parent.children.splice(i, 1)
    }
    if (Array.isArray(parent.json)) {
      const jsonIndex = parent.json.indexOf(node.json)
      if (jsonIndex > -1) {
        parent.json.splice(jsonIndex, 1)
      }
    }
    else if (isPlainObject(parent.json)) {
      const tag = node.tag
      if (tag in parent.json) {
        delete parent.json[tag]
      }
    }
    else {
      parent.json = null
    }

    node.parentNode = null
  }
}
