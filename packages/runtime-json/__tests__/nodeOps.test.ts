import type { JSONElementNode } from '../'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp, Fragment, h, JSONNodeTypes, nodeOps } from '../'

it('should render basic text node', () => {
  const root = nodeOps.createElement('root')

  const app = createApp({
    render () {
      return h('name', null, '中国')
    },
  })

  app.mount(root)

  expect(root.json).toEqual({
    name: '中国',
  })
})

it('should handle array transformation naturally', () => {
  const root = nodeOps.createElement('root')

  const app = createApp({
    render () {
      return [
        h('item', null, '1'),
        h('item', null, '2'),
        h('item', null, '3'),
        h('single', null, 'value'),
      ]
    },
  })

  app.mount(root)

  expect(root.json).toEqual({
    item: ['1', '2', '3'],
    single: 'value',
  })
})
