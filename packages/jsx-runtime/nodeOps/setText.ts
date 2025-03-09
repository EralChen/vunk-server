import type { RendererOptions } from '@vue/runtime-core'
import type { JSONElementNode } from './types'

/**
 * @type { RendererOptions<JSONElementNode>['setText'] }
 */
export function setText (
  node: JSONElementNode,
  text: string,
) {
  node.value = text
}
