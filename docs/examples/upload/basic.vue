<script lang="ts" setup>
import { ElFormItem, ElUpload } from 'element-plus'
import { onMounted } from 'vue'
import { testUpload } from './api'

onMounted(() => {
  testUpload()
    .then((res) => {
      console.log('Upload test response:', res)
    })
})
</script>

<template>
  <ElFormItem label="Upload">
    <ElUpload
      action="http://localhost:4545/upload"
      multiple
    >
      <el-button type="primary">
        Click to upload
      </el-button>
    </ElUpload>
  </ElFormItem>
</template>
