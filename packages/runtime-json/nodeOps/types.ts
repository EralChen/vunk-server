import type { NormalObject } from '@vunk/shared'
import type { JSONNodeTypes } from './const'

export type JSONData = NormalObject | Array<any> | string | number | boolean | null

export interface JSONElementNode {
  type: JSONNodeTypes
  tag: string
  children: JSONElementNode[]
  parentNode: JSONElementNode | null
  props: NormalObject
  json: JSONData
  text?: string
}

export interface NodeOp {
  type: 'create' | 'insert' | 'remove' | 'setText' | 'setElementText' | 'patch'
  targetNode?: JSONElementNode
  parentNode?: JSONElementNode
  refNode?: JSONElementNode | null
  text?: string
  propKey?: string
  propPrevValue?: any
  propNextValue?: any
}
