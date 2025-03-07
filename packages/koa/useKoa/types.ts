import type { InjectionKey } from '@vunk-server/runtime-json'
import type { ParameterizedContext } from 'koa'

export type KoaInjection = InjectionKey<{
  context: ParameterizedContext
}>
