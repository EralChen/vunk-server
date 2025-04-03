<script lang="tsx" setup>
import type { __VkTablesV1 } from '@vunk/plus/components/tables-v1'
import type { Pagination } from '@vunk/shared'
import type { FileDTO } from './types'
import { VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { ElButton } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { rFile } from './api'

type Row = FileDTO

type Col = __VkTablesV1.Column<Row>

const loading = ref(false)
const pagination = reactive({
  currentPage: 1,
  pageSize: 2,
} as Pagination)
const total = ref(0)

const tableData = ref([] as Row[])
const tableColumns = ref([
  {
    prop: 'filename',
    label: '文件名称',
  },
  {
    prop: 'size',
    label: '文件大小',
  },
  {
    prop: undefined,
    label: '操作',
    width: 200,
    slots: ({ row }) => (
      <ElButton>
        <a href={row.url}>下载</a>
      </ElButton>
    ),
  },
] as Col[])

watch(pagination, read, { deep: true, immediate: true })

function read () {
  loading.value = true
  rFile({}, pagination).then((res) => {
    tableData.value = res.rows
    total.value = res.total

    loading.value = false
  })
}
</script>

<template>
  <ElButton @click="read">
    刷新
  </ElButton>
  <VkTablesV1
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    v-loading="loading"
    :data="tableData"
    :total="total"
    :columns="tableColumns"
    background
  ></VkTablesV1>
</template>
