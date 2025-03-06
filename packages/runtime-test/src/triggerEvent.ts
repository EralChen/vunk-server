import type { TestElement } from './nodeOps'
import { isArray } from '@vue/shared'

export function triggerEvent (
  el: TestElement,
  event: string,
  payload: any[] = [],
): void {
  const { eventListeners } = el
  if (eventListeners) {
    const listener = eventListeners[event]
    if (listener) {
      if (isArray(listener)) {
        for (let i = 0; i < listener.length; i++) {
          listener[i](...payload)
        }
      }
      else {
        listener(...payload)
      }
    }
  }
}
