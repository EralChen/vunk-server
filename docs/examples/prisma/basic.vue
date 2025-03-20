<script lang="ts" setup>
import type { User } from '@prisma/client'
import type { __VkTablesV1 } from '@vunk/plus/components/tables-v1'
import type { Pagination } from '@vunk/shared'
import { VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { ref } from 'vue'
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
  pageSize: 10,
})
const total = ref(0)

read()
function read () {
  readApi()
    .then(res => tableData.value = res)
}
</script>

<template>
  <VkTablesV1
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    :data="tableData"
    :columns="tableColumns"
    :total="total"
  ></VkTablesV1>
</template>
