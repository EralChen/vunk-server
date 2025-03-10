import type { JSONElementNode } from './nodeOps'
import { h } from './h'
import { nodeOps } from './nodeOps'
import { Fragment } from './renderer'

export * from './renderer'

export const createElement = nodeOps.createElement

function jsx (type, props, key) {
  const { children } = props
  delete props.children
  if (arguments.length > 2) {
    props.key = key
  }
  return h(type, props, children)
}

export {
  Fragment,
  h,
  type JSONElementNode,
  jsx,
  jsx as jsxs,
  jsx as jsxDEV,
  nodeOps,
}
