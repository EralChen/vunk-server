import { serialize, stringify } from 'superjson'
import { it } from 'vitest'

it('test json function', () => {
  function add (a: number, b: number) {
    return a + b
  }
  const data = {
    addFunc: add,
  }

  const json = stringify(data)
  const parsed = serialize(json)
})
