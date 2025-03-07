import type { JSONElementNode } from './types'

/**
 * @type { RendererOptions<JSONElementNode>['setText'] }
 */
export function setText (
  node: JSONElementNode,
  text: string,
) {
  node.text = text
  node.json = text
}
