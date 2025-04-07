import type { FileInfo } from './types'
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import { useDeferred } from '@vunk/core/composables'
import { noop } from '@vunk/shared/function'
import { Deferred } from '@vunk/shared/promise'
import { useKoa } from '@vunk-server/koa'
import busboy from 'busboy'
import consola from 'consola'
import iconv from 'iconv-lite'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'
import { calculateFileHashSample } from './utils'

export default defineComponent({
  name: 'VkUpload',
  emits,
  props,
  async setup (props, { emit, slots }) {
    const { context: { req } } = useKoa()
    const readyDef = useDeferred()

    const bb = busboy({
      headers: req.headers,
    })

    const fileFieldIndexMap = new Map<string, number>()
    const fileWriteTaskMap = new Map<
      string/* saveTo */,
      Promise<void>
    >()

    bb.on('file', (name, file, info) => {
      let { filename, encoding, mimeType } = info

      filename = iconv.decode(
        Buffer.from(filename, 'binary'),
        'utf8',
      )

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

      if (props.path) { // Save file to disk
        if (!fs.existsSync(props.path)) {
          fs.mkdirSync(props.path, { recursive: true })
        }
        let saveTo = path.join(props.path, filename)

        // Check if file already exists, if so, rename it
        let savaToIndex = 1
        while (fs.existsSync(saveTo)) {
          const ext = path.extname(filename)
          const nameWithoutExt = path.basename(filename, ext)
          const newFilename = `${nameWithoutExt}(${savaToIndex})${ext}`
          saveTo = path.join(props.path, newFilename)
          savaToIndex++
        }

        emit('setData', {
          k: [name, index, 'path'],
          v: saveTo,
        })
        const fileTask = new Deferred<void>()

        const writeStream = fs.createWriteStream(saveTo)

        writeStream.on('error', (err) => {
          consola.error(`File [${name}] error: %j`, err)
          fileTask.reject(err)
        })

        writeStream.on('finish', () => {
          consola.log(`File [${name}] saved to %j`, saveTo)
          fileTask.resolve()
        })

        file.pipe(writeStream)

        fileWriteTaskMap.set(saveTo, fileTask.promise)
      }
      file
        .on('data', noop)
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

    for (const key in props.data) {
      let list: FileInfo[] = props.data[key]
      if (!Array.isArray(list)) {
        continue
      }
      list = list.filter(item => item.path)

      for (const [index, item] of list.entries()) {
        await fileWriteTaskMap.get(item.path)

        const file = fs.statSync(item.path)
        const { size } = file
        emit('setData', {
          k: [key, index, 'size'],
          v: size,
        })

        const hash = await calculateFileHashSample(item.path)

        emit('setData', {
          k: [key, index, 'hash'],
          v: hash,
        })
        const hashPath = path.join(props.path, hash)

        if (fs.existsSync(hashPath)) { // 如果文件已经存在，舍弃当前文件
          fs.rmSync(item.path)
        }
        else { // 将文件重命名为 hash
          fs.renameSync(item.path, hashPath)
        }

        emit('setData', {
          k: [key, index, 'path'],
          v: hashPath,
        })

        consola.log(`File [${key}]: hash: %j`, hash)
      }
    }

    return () => slots.default?.({
      data: props.data,
    })
  },
})
