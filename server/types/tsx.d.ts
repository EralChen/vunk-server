import type { VNode } from '@vue/runtime-core'
import type { NormalObject } from '@vunk/shared'

declare global {
  namespace JSX {
    export interface Element extends VNode {}
    export interface ElementClass {
      $props: {}
    }
    export interface ElementAttributesProperty {
      $props: {}
    }
    export interface IntrinsicAttributes extends NormalObject {

    }
  }
}

export {}
