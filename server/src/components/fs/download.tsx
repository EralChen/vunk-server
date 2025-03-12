import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join } from 'node:path'
import { defineComponent } from '@vunk/server'
import { useKoa } from '@vunk-server/koa'

export default defineComponent({
  props: {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      default: 'uploads',
    },
  },
  async setup (props) {
    const { context } = useKoa()

    const fullPath = join(process.cwd(), props.path, props.filename)

    // 检查文件是否存在并获取文件信息
    const fileStat = await stat(fullPath)

    // 设置响应头
    context.set({
      'Content-Length': String(fileStat.size),
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(props.filename)}"`,
    })

    // 创建文件流并设置为响应体
    context.body = createReadStream(fullPath)

    // 下载组件不需要返回 JSON 响应
    return () => null
  },
})
