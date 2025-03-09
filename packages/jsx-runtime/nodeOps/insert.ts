import type { RendererOptions } from '@vue/runtime-core'
import type { JSONElementNode } from './types'
import { JSONNodeTypes } from './const'
import { remove } from './remove'

/**
 * @type { RendererOptions<JSONElementNode>['insert'] }
 */
export function insert (
  node: JSONElementNode,
  parent: JSONElementNode,
  ref?: JSONElementNode,
): void {
  let refIndex
  if (ref) {
    refIndex = parent.children.indexOf(ref)
    if (refIndex === -1) {
      console.error('ref: ', ref)
      console.error('parent: ', parent)
      throw new Error('ref is not a child of parent')
    }
  }
  remove(node)
  refIndex = ref ? parent.children.indexOf(ref) : -1

  if (refIndex === -1) {
    parent.children.push(node)
  }
  else {
    parent.children.splice(refIndex, 0, node)
  }

  insertNodeJson(node, parent)

  node.parentNode = parent
}

export function insertNodeJson (
  node: JSONElementNode,
  parent: JSONElementNode,
) {
  if (
    (
      node.type === JSONNodeTypes.TEXT
      && !node.value
    )
    || node.type === JSONNodeTypes.COMMENT
  ) {
    return
  }

  // 首次插入
  if (parent.value == null) { // <parent> <node>1</node> </parent>
    parent.value = {}
  }

  const currentValue = parent.value[node.tag]

  if (currentValue === null || currentValue === undefined) {
    parent.value[node.tag] = node.isArrayFragment
      ? [node.value]
      : node.value
    return
  }

  // 如果当前值不是数组，说明重复插入了相同的 tag，需要转换为数组
  if (!Array.isArray(currentValue)) {
    parent.value[node.tag] = [currentValue]
  }

  const i = parent.children
    .filter(child => child.value)
    .filter(child => child.tag === node.tag)
    .indexOf(node)

  if (i > -1) {
    parent.value[node.tag].splice(i, 0, node.value)
  }
}
