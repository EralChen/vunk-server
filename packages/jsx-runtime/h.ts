import type { JSONNodeProps } from './nodeOps'
import { isArray, isObject } from '@vue/shared'
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

  if (Fragment === type && props.array) {
    children.forEach((element) => {
      element.props = element.props || {}
      const props: JSONNodeProps = element.props
      props.__v_isArrayFragment = true
    })
  }

  return createVNode(type, props, children)
}
