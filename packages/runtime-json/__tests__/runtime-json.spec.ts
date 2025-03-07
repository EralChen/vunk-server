import type { JSONElementNode } from '../'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp, h, JSONNodeTypes } from '../'

describe('runtime-json', () => {
  let container: JSONElementNode

  beforeEach(() => {
    container = {
      type: JSONNodeTypes.ELEMENT,
      tag: 'root',
      children: [],
      props: {},
      parentNode: null,
      value: {},
    }
  })

  it('should render basic text node', () => {
    const app = createApp({
      render () {
        return h('div', null, [
          h('name', null, '中国'),
        ])
      },
    })
    app.mount(container)

    expect(container.value).toEqual({
      name: '中国',
    })
  })

  it('should render nested nodes', () => {
    const app = createApp({
      render () {
        return h('div', null, [
          h('name', null, '中国'),
          h('province', null, [
            h('name', null, '广东'),
            h('citys', null, [
              h('city', null, '广州'),
            ]),
          ]),
        ])
      },
    })
    app.mount(container)

    expect(container.value).toEqual({
      name: '中国',
      province: [
        {
          name: '广东',
          citys: {
            city: ['广州'],
          },
        },
      ],
    })
  })

  it('should handle array of cities', () => {
    const app = createApp({
      render () {
        return h('div', null, [
          h('province', null, [
            h('name', null, '广东'),
            h('citys', null, [
              h('city', null, '广州'),
              h('city', null, '深圳'),
              h('city', null, '珠海'),
            ]),
          ]),
          h('province', null, [
            h('name', null, '新疆'),
            h('citys', null, [
              h('city', null, '乌鲁木齐'),
              h('city', null, '喀什'),
            ]),
          ]),

        ])
      },
    })
    app.mount(container)

    expect(container.value).toEqual({
      province: [
        {
          name: '广东',
          citys: {
            city: ['广州', '深圳', '珠海'],
          },
        },
        {
          name: '新疆',
          citys: {
            city: ['乌鲁木齐', '喀什'],
          },
        },
      ],
    })
  })

  it('should handle multiple provinces', () => {
    const app = createApp({
      render () {
        return h('div', null, [
          h('province', null, [
            h('name', null, '广东'),
            h('citys', null, [
              h('city', null, '广州'),
            ]),
          ]),
          h('province', null, [
            h('name', null, '新疆'),
            h('citys', null, [
              h('city', null, '乌鲁木齐'),
            ]),
          ]),
        ])
      },
    })
    app.mount(container)

    expect(container.value).toEqual({
      province: [
        {
          name: '广东',
          citys: {
            city: ['广州'],
          },
        },
        {
          name: '新疆',
          citys: {
            city: ['乌鲁木齐'],
          },
        },
      ],
    })
  })
})
