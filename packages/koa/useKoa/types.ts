import type { InjectionKey } from '@vunk-server/runtime-body'
import type { ParameterizedContext } from 'koa'

export type KoaInjection = InjectionKey<{
  context: ParameterizedContext
}>
