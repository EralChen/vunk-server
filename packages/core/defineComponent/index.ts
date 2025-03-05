import type { MaybePromise } from '@vunk/core'
import type { NormalObject } from '@vunk/shared'

import type { ParameterizedContext } from 'koa'
import type { ComponentObjectPropsOptions, ExtractPropTypes, LooseRequired, ToResolvedProps } from './types'

export function defineComponent<
  RuntimePropsOptions extends ComponentObjectPropsOptions = ComponentObjectPropsOptions,
  InferredProps = ExtractPropTypes<RuntimePropsOptions>,
> (
  options: {
    props?: RuntimePropsOptions
    setup?: (
      props: LooseRequired<ToResolvedProps<InferredProps>>,
      ctx: ParameterizedContext,
    ) => MaybePromise<NormalObject>
  },
) {
  return options
}

export * from './types'
