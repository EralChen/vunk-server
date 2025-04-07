import type { ElementNamespace } from '@vue/runtime-core'
import type { JSONElementNode, JSONNodeProps } from './types'
import { markRaw } from '@vue/runtime-core'
import { JSONNodeTypes } from './const'

/**
 * @type { RendererOptions['createElement'] }
 */
export function createElement (
  tag: string,
  namespace?: ElementNamespace,
  isCustomizedBuiltIn?: string,
  props?: JSONNodeProps,
): JSONElementNode {
  switch (tag) {
    case 'vk:raw': {
      return markRaw({
        type: JSONNodeTypes.RAW,
        tag: '',
        children: [],
        props: props ?? {},
        parentNode: null,
        value: props?.value,
      })
    }
    default: {
      return markRaw({
        type: JSONNodeTypes.FIELD,
        tag,
        children: [],
        props: props ?? {},
        parentNode: null,
        value: null,
      })
    }
  }
}
