import type { __VkUpload } from '@vunk-server/components/upload'
import path from 'node:path'
import { usePrisma } from '@/composables/usePrisma'
import { setData } from '@vunk/core/shared'
import { VkResolve } from '@vunk-server/components/resolve'
import { VkResponse } from '@vunk-server/components/response'
import { VkUpload } from '@vunk-server/components/upload'
import { defineComponent } from '@vunk-server/jsx-runtime'
import { restFetch } from '@vunk-server/shared'
import { serverRoot } from '../../../path.config'

const distPath = path.resolve(serverRoot, './dist/uploads')

export default defineComponent({
  async setup () {
    const prisma = usePrisma()
    const fileData = {
      file: [] as __VkUpload.FileInfo[],
    }

    const upsertFiles = async () => {
      const fileTasks = fileData.file.map(item => prisma.file.upsert({
        where: {
          hash: item.hash,
        },
        create: {
          ...item,
          createdBy: 'admin',
        },
        update: {
          ...item,
          createdBy: 'admin',
        },
      }))
      return prisma.$transaction(fileTasks).then(res => res.map((item) => {
        return {
          ...item,
          url: `${restFetch.baseURL}/download/${item.id}`,
        }
      }))
    }

    return () => (
      <VkUpload
        path={distPath}
        data={fileData}
        onSetData={e => setData(fileData, e)}
      >
        <VkResponse>
          <VkResolve executor={upsertFiles}></VkResolve>
        </VkResponse>
      </VkUpload>
    )
  },
})
