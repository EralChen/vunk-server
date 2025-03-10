import type { JSONElementNode } from '../'
import consola from 'consola'

export function patchProp (
  el: JSONElementNode,
  key: string,
  prevValue: any,
  nextValue: any,
): void {
  consola.log('patchProp', `key: ${key}, prevValue: ${prevValue}, nextValue: ${nextValue}`)

  el.props[key] = nextValue
}
