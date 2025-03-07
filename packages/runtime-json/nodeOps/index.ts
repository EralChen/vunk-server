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
    value: tag === 'root' || tag === 'div'
      ? {}
      : tag === 'province'
        ? { name: '', citys: { city: [] } }
        : tag === 'citys'
          ? { city: [] }
          : {}, // 特殊标签的初始化处理
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
  if (node.parentNode && node.parentNode.children.length === 1) {
    const parent = node.parentNode
    if (parent.tag === 'city') {
      // city 标签的文本需要更新到citys的city数组中
      const citys = parent.parentNode!
      const cities = citys.value.city
      const index = cities.indexOf(node.text)
      if (index > -1) {
        cities[index] = text
      }
    }
    else {
      // 其他节点，更新父节点的值
      parent.value = text
    }
  }
  node.value = text
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

  // 如果父节点是容器节点，将子节点的值复制给父节点
  if (parent.tag === 'root') {
    parent.value = child.value
    return
  }

  // div 作为中间容器，它的值需要向上传递
  if (child.tag === 'div') {
    if (parent.tag === 'root') {
      parent.value = child.value
    }
    return
  }

  // div 容器节点的特殊处理
  if (parent.tag === 'div') {
    if (child.tag === 'province') {
      if (!parent.value.province) {
        parent.value.province = []
      }
      parent.value.province.push(child.value)
    }
    else if (child.type === JSONNodeTypes.ELEMENT) {
      parent.value[child.tag] = child.value
    }
    return
  }

  if (child.type === JSONNodeTypes.TEXT && parent.children.length === 1) {
    if (parent.tag === 'city') {
      // 使用父节点的 citys.city 数组
      const citys = parent.parentNode!

      if (citys.value.city) {
        citys.value.city.push(child.text)
      }
    }
    else if (parent.tag === 'name') {
      // name 标签特殊处理，文本值需要存到 parent.value，并更新到正确的目标
      parent.value = child.text
      if (parent.parentNode) {
        if (parent.parentNode.tag === 'province') {
          // province 的 name
          parent.parentNode.value[0] = child.text
        }
        else if (parent.parentNode.tag === 'div' || parent.parentNode.tag === 'root') {
          // 根级别的 name
          parent.parentNode.value.name = child.text
        }
      }
    }
    else {
      // 其他普通节点，文本直接作为值
      parent.value = child.text
    }
  }
  else if (child.type === JSONNodeTypes.ELEMENT) {
    if (parent.tag === 'province') {
      // province 标签下的元素处理
      if (child.tag === 'name') {
        parent.value.name = child.value
      }
      else if (child.tag === 'citys') {
        parent.value.citys = child.value
      }
    }
    else if (child.tag === 'city' && child.children.length > 0) {
      // 城市文本值直接加入到父节点(citys)的city数组中
      const childText = child.children[0]?.text || ''

      parent.value.city.push(childText)
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

    // 注释节点不需要从父节点的 value 中移除
    if (!child.isComment && child.type === JSONNodeTypes.ELEMENT) {
      if (parent.tag === 'province') {
        const index = parent.value.indexOf(child.value)
        if (index > -1) {
          parent.value.splice(index, 1)
        }
      }
      else if (child.tag === 'city') {
        const cities = parent.value.city
        if (Array.isArray(cities)) {
          const childText = child.children[0]?.text || ''
          const index = cities.indexOf(childText)
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
