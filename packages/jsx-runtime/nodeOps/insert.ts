import type { RendererOptions } from '@vue/runtime-core'
import type { JSONElementNode } from './types'
import { isObject, isPlainObject } from '@vunk/shared/object'
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

  // <parent> <node>1</node> </parent>
  if (node.type === JSONNodeTypes.FIELD) {
    // 首次插入
    if (parent.value == null) {
      parent.value = {}
    }
    const currentValue = parent.value[node.tag]
    if (currentValue === null || currentValue === undefined) {
      parent.value[node.tag] = node.value
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

  // <parent> <vk:raw value="1"></vk:raw> </parent>
  if (node.type === JSONNodeTypes.RAW) {
    // 首次插入
    if (parent.value == null) {
      parent.value = node.value
      return
    }

    if (isPlainObject(parent.value)) {
      if (isObject(node.value)) {
        Object.assign(parent.value, node.value)
      }
      else {
        Object.assign(parent.value, {
          undifined: node.value,
        })
      }
      return
    }

    if (Array.isArray(parent.value)) {
      const i = parent.children
        .filter(child => child.value)
        .indexOf(node)

      if (i > -1) {
        parent.value.splice(i, 0, node.value)
      }
    }
  }
}
