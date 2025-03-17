import type { __VkUpload } from '@vunk-server/components/upload'
import { setData } from '@vunk/core/shared'
import { VkUpload } from '@vunk-server/components/upload'
import { defineComponent, reactive } from '@vunk-server/jsx-runtime'

export default defineComponent({
  async setup () {
    const data = reactive({
      file: [] as __VkUpload.FileInfo[],
    })

    return () => (
      <>
        <VkUpload
          data={data}
          onSetData={e => setData(data, e)}
        >
        </VkUpload>

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

      </>
    )
  },
})
