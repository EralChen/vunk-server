import type { __VkUpload } from '@vunk-server/components/upload'
import path from 'node:path'
import { usePrisma } from '@/composables/usePrisma'
import { setData } from '@vunk/core/shared'
import { pickObject } from '@vunk/shared/object'
import VkResolve from '@vunk-server/components/resolve'
import { VkResponse } from '@vunk-server/components/response'
import { VkUpload } from '@vunk-server/components/upload'
import { defineComponent } from '@vunk-server/jsx-runtime'
import { serverRoot } from '../../../path.config'

const distPath = path.resolve(serverRoot, './dist/uploads')

export default defineComponent({
  async setup () {
    const prisma = usePrisma()
    const fileData = {
      file: [] as __VkUpload.FileInfo[],
    }

    const handleFiles = async () => {
      const files = await prisma.file.createManyAndReturn({
        data: fileData.file.map((item) => {
          return {
            ...pickObject(item, {
              excludes: ['data'],
            }),
            createdBy: 'admin',
          }
        }),
      })
      return files
    }

    return () => (
      <VkUpload
        path={distPath}
        data={fileData}
        onSetData={e => setData(fileData, e)}
      >
        <VkResponse>
          <VkResolve executor={handleFiles}></VkResolve>
        </VkResponse>
      </VkUpload>
    )
  },
})
