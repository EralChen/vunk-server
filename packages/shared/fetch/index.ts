import type { Pagination } from '@vunk/shared'
import type { RestFetchRequestOptions } from '@vunk/shared/fetch'
import { RestFetch } from '@vunk/shared/fetch'

export const restFetch = new RestFetch({
  baseURL: '',
})

export interface R<T> {
  code: number
  message: string
  data: T
}

export interface TableData<T> {
  total: number
  rows: T[]
  pagination: Pagination
}

type RequestFunction = <T = any>(
  input: RestFetchRequestOptions,
  init?: RequestInit
) => Promise<R<T>>

export const request: RequestFunction = restFetch.request.bind(restFetch)
