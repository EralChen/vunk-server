import type { JSONElementNode } from '../nodeOps'

export function patchProp (
  el: JSONElementNode,
  key: string,
  prevValue: any,
  nextValue: any,
): void {
  // 更新 props
  el.props[key] = nextValue

  // 更新 value
  if (key === 'value') {
    el.value = nextValue
  }
}
