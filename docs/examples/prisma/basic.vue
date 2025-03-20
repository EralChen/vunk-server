<script lang="ts" setup>
import type { User } from '@prisma/client'
import type { __VkTablesV1 } from '@vunk/plus/components/tables-v1'
import type { Pagination } from '@vunk/shared'
import { VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { ref, watch } from 'vue'
import {
  cuUser as createOrUpdateApi,
  dUser as deleteApi,
  rUser as readApi,
} from './api'

type Row = User

const tableData = ref([] as Row[])
const tableColumns: __VkTablesV1.Column[] = [
  {
    prop: 'name',
    label: '姓名',
  },
]

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 1,
})
const total = ref(0)

watch(() => pagination.value, read, { deep: true })

read()
function read () {
  readApi({}, pagination.value)
    .then((res) => {
      tableData.value = res.rows
      total.value = res.total
    })
}
</script>

<template>
  <VkTablesV1
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    :data="tableData"
    :columns="tableColumns"
    :total="total"
    background
  ></VkTablesV1>
</template>
