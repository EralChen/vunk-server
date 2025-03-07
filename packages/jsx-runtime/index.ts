import { nodeOps } from './nodeOps'
import { Fragment, h } from './renderer'

export { JSONElementNode, JSONNodeTypes, nodeOps } from './nodeOps'
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
  jsx,
  jsx as jsxs,
  jsx as jsxDEV,
}
