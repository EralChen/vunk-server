<script lang="ts" setup>
import { ElFormItem, ElUpload } from 'element-plus'
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
