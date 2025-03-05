import type { EmitsOptions, EmitsToProps } from 'vue'

export type { LooseRequired } from '@vue/shared'
export type { ExtractPropTypes } from 'vue'
export type { ComponentObjectPropsOptions } from 'vue'
export type ToResolvedProps<
  Props,
  Emits extends EmitsOptions = [],
> = Readonly<Props> & Readonly<EmitsToProps<Emits>>
