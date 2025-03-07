import type { RendererOptions } from '@vue/runtime-core'

export const nodeOps: RendererOptions = {
  insert: () => {},
  remove: () => {},
  createElement: () => ({}),
  createText: () => ({}),
  createComment: () => ({}),
  setText: () => {},
  setElementText: () => {},
  parentNode: () => null,
  nextSibling: () => null,
  querySelector: () => null,
  setScopeId: () => {},
  patchProp: () => {},
  cloneNode: () => ({}),
}
