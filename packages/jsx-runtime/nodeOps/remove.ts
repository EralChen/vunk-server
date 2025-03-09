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

    if (Array.isArray(parent.value)) {
      const jsonIndex = parent.value.indexOf(node.value)
      if (jsonIndex > -1) {
        parent.value.splice(jsonIndex, 1)
      }
    }

    else if (isPlainObject(parent.value)) {
      delete parent.value[node.tag]
    }
    else {
      parent.value = null
    }

    node.parentNode = null
  }
}
