import type { JSONElementNode } from './types'
import { createText } from './createText'

/**
 * @type { RendererOptions<JSONElementNode>['setElementText'] }
 * @param node
 * @param text
 */
export function setElementText (node: JSONElementNode, text: string): void {
  // 清除所有子节点
  node.children.forEach((child) => {
    child.parentNode = null
  })
  node.children = []
  node.json = null

  if (text) {
    // 创建新的文本节点
    const textNode = createText(text)
    textNode.parentNode = node
    node.children = [textNode]

    node.json = {
      [node.tag]: text,
    }
  }
}
