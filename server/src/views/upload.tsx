import type { SetDataEvent } from '@vunk/core/shared'
import type { __VkUpload } from '@vunk-server/components/upload'
import path from 'node:path'
import { setData } from '@vunk/core/shared'
import { VkResponse } from '@vunk-server/components/response'
import { VkUpload } from '@vunk-server/components/upload'
import { defineComponent, reactive } from '@vunk-server/jsx-runtime'
import { serverRoot } from '../../path.config'

const distPath = path.resolve(serverRoot, './uploads')

export default defineComponent({
  async setup () {
    const data = reactive({
      file: [] as __VkUpload.FileInfo[],
    })
    const handleSetData = (e: SetDataEvent) => {
      setData(data, e)
    }

    return () => (
      <>
        <VkUpload
          path={distPath}
          data={data}
          onSetData={handleSetData}
        >
        </VkUpload>

        <VkResponse>
          <vk:element value={[]}>
            {
              data.file.map(item => (
                <vk:element key={item.filename} value={{}}>
                  <filename>{item.filename}</filename>
                  <encoding>{item.encoding}</encoding>
                  <mimeType>{item.mimeType}</mimeType>
                </vk:element>
              ))
            }
          </vk:element>
        </VkResponse>

      </>
    )
  },
})
