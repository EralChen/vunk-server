import { LIB_ALIAS, LIB_NAME } from '@lib-env/build-constants'

export const fixPath = (id: string) => id.replaceAll(`${LIB_ALIAS}`, LIB_NAME)
