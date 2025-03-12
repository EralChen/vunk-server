import { mkdir, writeFile } from 'node:fs/promises'
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

    // 获取上传的文件内容
    const fileBuffer = await context.request.buffer() as any

    // 确保目录存在
    const savePath = join(process.cwd(), props.path)
    await mkdir(savePath, { recursive: true })

    // 完整文件路径
    const fullPath = join(savePath, props.filename)

    // 保存文件
    await writeFile(fullPath, fileBuffer)

    return () => (
      <>
        <filename>{props.filename}</filename>
        <path>{fullPath}</path>
        <size>{fileBuffer.length}</size>
      </>
    )
  },
})
