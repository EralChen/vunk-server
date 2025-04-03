<script lang="ts" setup>
import { VkfUpload } from '@vunk/form/components/upload'
import { ref } from 'vue'

const fileList = ref([])
</script>

<template>
  {{ fileList }}

  <VkfUpload
    v-model:file-list="fileList"
    action="http://localhost:4545/upload"
    multiple
    class="w-full"
  >
    <el-button type="primary">
      Click to upload
    </el-button>
  </VkfUpload>
</template>
