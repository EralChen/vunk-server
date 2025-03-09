import type { VNode } from '../renderer'
import { defineComponent, getCurrentInstance, h, isVNode } from '../renderer'

export const ArrayFragment = defineComponent({
  name: 'ArrayFragment',
  setup (props, { slots }) {
    const instance = getCurrentInstance()
    const children = instance?.vnode.children as VNode[]
    if (children && Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (isVNode(child)) {
          if (!child.props) {
            child.props = {}
          }
          child.props.__v_isArrayFragment = true
        }
      }
    }
    return () => slots.default?.()
  },
})
