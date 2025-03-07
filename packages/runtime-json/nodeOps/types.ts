import type { JSONNodeTypes } from './const'

export interface JSONElementNode {
  type: JSONNodeTypes
  tag: string
  children: JSONElementNode[]
  parentNode: JSONElementNode | null
  props: Record<string, any>
  value: any
  text?: string
  isComment?: boolean
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
