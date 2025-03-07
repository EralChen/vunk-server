import consola from 'consola'

export function patchProp (
  el: unknown,
  key: string,
  prevValue: any,
  nextValue: any,
) {
  consola.log('patchProp', el, key, prevValue, nextValue)
}
