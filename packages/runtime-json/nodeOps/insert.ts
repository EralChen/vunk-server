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
  if (parent.json === null) {
    parent.json = {}
  }

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

  // 处理 json
  if (node.type === JSONNodeTypes.ELEMENT) {
    const tag = node.tag
    const parentJson = parent.json as Record<string, any>
    const value = node.json?.[node.tag]
    // 如果已存在同名属性
    if (tag in parentJson) {
      // 如果已经是数组，直接追加
      if (Array.isArray(parentJson[tag])) {
        parentJson[tag].push(value)
      }
      // 不是数组，转换为数组
      else {
        const existing = parentJson[tag]
        const value = node.json?.[node.tag]
        parentJson[tag] = [existing, value]
      }
    }
    // 首次出现，作为普通值
    else {
      Object.assign(parentJson, node.json)
    }
  }
  // TEXT 节点的处理
  else if (node.type === JSONNodeTypes.TEXT && node.text) {
    if (parent.children.length === 1) {
      parent.json = node.text
    }
  }

  node.parentNode = parent
}
