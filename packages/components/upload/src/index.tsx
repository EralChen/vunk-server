import { useDeferred } from '@vunk/core/composables'
import { useKoa } from '@vunk-server/koa'
import busboy from 'busboy'
import consola from 'consola'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkUpload',
  emits,
  props,
  async setup (props, { emit }) {
    const { context: { req } } = useKoa()
    const readyDef = useDeferred()

    const bb = busboy({
      headers: req.headers,
    })

    const fileFieldIndexMap = new Map<string, number>()

    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info
      const index = fileFieldIndexMap.get(name) ?? 0
      emit('setData', {
        k: [name, index],
        v: {
          filename,
          encoding,
          mimeType,
        },
      })

      fileFieldIndexMap.set(name, index + 1)

      file
        .on('data', (data) => {
          emit('setData', {
            k: [name, index, 'data'],
            v: data,
          })
        })
        .on('close', () => {
          consola.log(`File [${name}] done`)
        })
      fileFieldIndexMap.set(name, index + 1)
    })

    bb.on('field', (name, val) => {
      consola.log(`Field [${name}]: value: %j`, val)
      emit('setData', {
        k: name,
        v: val,
      })
    })

    bb.on('close', readyDef.resolve)
    req.pipe(bb)

    await readyDef.promise

    return () => null
  },
})
