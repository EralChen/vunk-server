import type { __VkfForm } from '@vunk/form'
import type { FileDTO } from '@vunk-server/api'

export default [
  {
    templateType: 'VkfInput',
    prop: 'filename',
    label: '文件名',

  },
] satisfies __VkfForm.FormItem<keyof FileDTO>[]
