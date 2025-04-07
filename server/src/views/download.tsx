import fs from 'node:fs'
import { usePrisma } from '@/composables/usePrisma'
import { defineComponent } from '@vunk-server/jsx-runtime'
import { useKoa } from '@vunk-server/koa'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup (props) {
    const prisma = usePrisma()
    const { context } = useKoa()

    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id: props.id,
      },
    })

    // 设置响应头
    context.set({
      'Content-Length': `${file.size}`,
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(file.filename)}"`,
    })

    // 确认文件在磁盘上存在
    const filePath = file.path
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    // 创建文件流并设置为响应体
    const fileStream = fs.createReadStream(filePath)

    return () => (
      <vk:raw
        value={fileStream}
      >
      </vk:raw>
    )
  },
})
