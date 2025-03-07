import type { JSONElementNode } from './types'
import { markRaw } from '@vue/reactivity'
import { JSONNodeTypes } from './const'

export * from './const'
export * from './types'

function createElement (tag: string): JSONElementNode {
  const node: JSONElementNode = markRaw({
    type: JSONNodeTypes.ELEMENT,
    tag,
    children: [],
    props: {},
    parentNode: null,
    value: tag === 'province' ? [] : {}, // province 标签初始化为数组
  })
  return node
}

function createText (text: string): JSONElementNode {
  return markRaw({
    type: JSONNodeTypes.TEXT,
    tag: '',
    children: [],
    props: {},
    parentNode: null,
    value: text,
    text,
  })
}

function setText (node: JSONElementNode, text: string): void {
  node.text = text
  if (node.parentNode) {
    // 文本节点的父节点更新其 value
    node.parentNode.value = text
  }
}

function insert (
  child: JSONElementNode,
  parent: JSONElementNode,
): void {
  remove(child) // 先移除旧的父节点引用

  child.parentNode = parent
  parent.children.push(child)

  if (child.type === JSONNodeTypes.TEXT) {
    // 文本节点直接更新父节点的值
    parent.value = child.text
  }
  else if (child.type === JSONNodeTypes.ELEMENT) {
    if (parent.tag === 'province') {
      // province 标签下的元素作为数组元素处理
      parent.value.push(child.value)
    }
    else if (child.tag === 'city') {
      // city 标签特殊处理，将其值加入父节点的 city 数组
      if (!parent.value.city) {
        parent.value.city = []
      }
      parent.value.city.push(child.value)
    }
    else {
      // 普通元素节点，将其值作为父节点的属性
      parent.value[child.tag] = child.value
    }
  }
}

function remove (child: JSONElementNode): void {
  if (child.parentNode) {
    const parent = child.parentNode
    const index = parent.children.indexOf(child)
    if (index > -1) {
      parent.children.splice(index, 1)
    }
    child.parentNode = null

    // 从父节点的 value 中移除对应的值
    if (child.type === JSONNodeTypes.ELEMENT) {
      if (parent.tag === 'province') {
        const index = parent.value.indexOf(child.value)
        if (index > -1) {
          parent.value.splice(index, 1)
        }
      }
      else if (child.tag === 'city') {
        const cities = parent.value.city
        if (Array.isArray(cities)) {
          const index = cities.indexOf(child.value)
          if (index > -1) {
            cities.splice(index, 1)
          }
        }
      }
      else {
        delete parent.value[child.tag]
      }
    }
  }
}

function setElementText (node: JSONElementNode, text: string): void {
  // 清除所有子节点
  node.children.forEach((child) => {
    child.parentNode = null
  })
  node.children = []

  if (text) {
    // 创建新的文本节点
    const textNode = createText(text)
    textNode.parentNode = node
    node.children = [textNode]
    node.value = text
  }
  else {
    node.value = node.tag === 'province' ? [] : {}
  }
}

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

function setScopeId (el: JSONElementNode, id: string): void {
  el.props[id] = ''
}

export const nodeOps = {
  insert,
  remove,
  createElement,
  createText,
  createComment: () => createElement('!--'), // 注释节点在 JSON 中不需要特殊处理
  setText,
  setElementText,
  parentNode,
  nextSibling,
  querySelector,
  setScopeId,
}
