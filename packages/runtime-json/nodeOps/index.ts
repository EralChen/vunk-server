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
    value: {},
  })
  return node
}

function createText (text: string): JSONElementNode {
  const node = markRaw({
    type: JSONNodeTypes.TEXT,
    tag: '',
    children: [],
    props: {},
    parentNode: null,
    value: text,
    text,
  })
  return node
}

function setText (node: JSONElementNode, text: string): void {
  node.text = text
  node.value = text

  if (node.parentNode && node.parentNode.children.length === 1) {
    // 如果是唯一的文本子节点，更新父节点的值
    node.parentNode.value = text
  }
}

function insert (
  child: JSONElementNode,
  parent: JSONElementNode,
): void {
  if (child.isComment) {
    return // 跳过注释节点
  }

  remove(child) // 先移除旧的父节点引用

  child.parentNode = parent
  parent.children.push(child)

  // 跳过对 root 的赋值，它只是最外层容器节点
  if (child.tag === 'root') {
    return
  }

  if (child.type === JSONNodeTypes.TEXT) {
    // 如果是唯一的文本子节点，直接设置父节点的值
    if (parent.children.length === 1) {
      parent.value = child.text
    }
    return
  }

  // 处理元素节点
  if (child.type === JSONNodeTypes.ELEMENT) {
    const tag = child.tag
    const currentValue = parent.value[tag]

    if (currentValue === undefined) {
      // 第一次出现，直接设置值
      parent.value[tag] = child.value
    }
    else if (Array.isArray(currentValue)) {
      // 已经是数组，直接添加
      currentValue.push(child.value)
    }
    else {
      // 第二次出现，转换为数组
      parent.value[tag] = [currentValue, child.value]
    }

    // 如果父节点是根节点，将其值设置为子节点的值
    if (parent.tag === 'root') {
      parent.value = child.value
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

    // 非注释节点需要从父节点的value中移除
    if (!child.isComment && child.type === JSONNodeTypes.ELEMENT) {
      const tag = child.tag
      const currentValue = parent.value[tag]

      if (Array.isArray(currentValue)) {
        // 如果是数组，移除对应值
        const valueIndex = currentValue.indexOf(child.value)
        if (valueIndex > -1) {
          currentValue.splice(valueIndex, 1)
          // 如果数组只剩一个元素，转回普通值
          if (currentValue.length === 1) {
            parent.value[tag] = currentValue[0]
          }
        }
      }
      else {
        // 非数组直接删除
        delete parent.value[tag]
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
    node.value = {}
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
  createComment: (text: string): JSONElementNode => {
    const node = markRaw({
      type: JSONNodeTypes.ELEMENT,
      tag: '!--',
      children: [],
      props: {},
      parentNode: null,
      value: null,
      isComment: true,
      text,
    })
    return node
  },
  setText,
  setElementText,
  parentNode,
  nextSibling,
  querySelector,
  setScopeId,
}
