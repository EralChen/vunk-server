import type { JSONElementNode } from '../'

export function patchProp (
  el: JSONElementNode,
  key: string,
  prevValue: any,
  nextValue: any,
): void {
  el.props[key] = nextValue

  if (
    key === 'v-json'
    && nextValue !== undefined
  ) { // 模拟指令
    el.value = nextValue
  }
}
