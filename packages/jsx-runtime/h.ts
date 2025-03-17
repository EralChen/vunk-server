import type { JSONNodeProps } from './nodeOps'
import { isArray, isObject } from '@vue/shared'
import { isCallable } from '@vunk/shared/function'
import { createVNode, Fragment, isVNode, type VNode } from './renderer'

export function h (
  type: any,
  propsOrChildren?: any,
  children?: any,
): VNode {
  const l = arguments.length
  let props = propsOrChildren

  if (l === 2) {
    if (
      isObject(propsOrChildren)
      && !isArray(propsOrChildren)
    ) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        children = [propsOrChildren]
      }
      // props without children
      props = propsOrChildren
    }
    else {
      props = null
      children = propsOrChildren
    }
  }
  else {
    if (l > 3) {
      // eslint-disable-next-line prefer-rest-params
      children = Array.prototype.slice.call(arguments, 2)
    }
    else if (l === 3 && isVNode(children)) {
      children = [children]
    }
  }

  if (
    isComponent(type)
    && isArray(children)
  ) {
    // <component><test><test></component>
    // <component>{{ default: () => <test><test> }}</component>
    return createVNode(type, props, {
      default: () => children,
    })
  }

  return createVNode(type, props, children)
}

/**
 * [TODO] 这里先简单判断是否是组件
 */
function isComponent (type: any): boolean {
  return isCallable(type.setup)
}
