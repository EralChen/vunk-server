import type { ElementNamespace } from '@vue/runtime-core'
import type { JSONElementNode, JSONNodeProps } from './types'
import { markRaw } from '@vue/runtime-core'
import { de, sw } from 'element-plus/es/locale'
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
    case 'vk:element': {
      return markRaw({
        type: JSONNodeTypes.ELEMENT,
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
