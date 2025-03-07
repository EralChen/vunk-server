import type { JSONElementNode } from '../'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp, JSONNodeTypes } from '../'

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
      template: `<name>中国</name>`,
    })
    app.mount(container)

    expect(container.value).toEqual({
      name: '中国',
    })
  })

  it('should render nested nodes', () => {
    const app = createApp({
      template: `
        <name>中国</name>
        <province>
          <name>广东</name>
          <citys>
            <city>广州</city>
          </citys>
        </province>
      `,
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
      template: `
        <province>
          <name>广东</name>
          <citys>
            <city>广州</city>
            <city>深圳</city>
            <city>珠海</city>
          </citys>
        </province>
      `,
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
      ],
    })
  })

  it('should handle multiple provinces', () => {
    const app = createApp({
      template: `
        <province>
          <name>广东</name>
          <citys>
            <city>广州</city>
          </citys>
        </province>
        <province>
          <name>新疆</name>
          <citys>
            <city>乌鲁木齐</city>
          </citys>
        </province>
      `,
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
