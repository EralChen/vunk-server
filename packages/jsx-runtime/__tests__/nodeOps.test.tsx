import { expect, it } from 'vitest'
import { createApp, Fragment, h, nodeOps } from '..'

it('should render basic text node', () => {
  const root = nodeOps.createElement('root')

  const app = createApp({
    render () {
      return <name>中国</name>
    },
  })

  app.mount(root)

  expect(root.value).toEqual({
    name: '中国',
  })
})

it('should handle array transformation naturally', () => {
  const root = nodeOps.createElement('root')

  const app = createApp({
    render () {
      return [
        h('item', '1'),
        h('item', '2'),
        h('item', '3'),
        h('single', 'value'),
      ]
    },
  })

  app.mount(root)

  expect(root.value).toEqual({
    item: ['1', '2', '3'],
    single: 'value',
  })
})

it('should  Fragment is Array', () => {
  const root = nodeOps.createElement('root')

  const app = createApp({
    setup () {
      return () => (
        <Fragment array>
          <options>
            <label>1</label>
            <value>2</value>
          </options>
        </Fragment>
      )
    },
  })

  app.mount(root)

  expect(root.value).toEqual({
    options: [
      { label: '1', value: '2' },
    ],
  })
})
