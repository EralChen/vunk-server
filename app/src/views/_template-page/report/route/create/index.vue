<script lang="ts" setup>
import type { __SkAppForm } from '@skzz/platform/components/app-form'
import type { FirstParameter } from '@vunk/core'
import { cuRole } from '@skzz/platform/api/system/role'
import { SkAppCard } from '@skzz/platform/components/app-card'
import { SkAppForm } from '@skzz/platform/components/app-form'
import { useRouterTo, useRouteSocket } from '@skzz/platform/composables'
import { setData } from '@vunk/core'
import PageOver from '_c/PageOver/index.vue'
import { onBeforeUnmount, ref } from 'vue'

defineProps({
  uid: {
    type: String,
    default: '',
  },
})
const { createSender } = useRouteSocket()
const { routerBack } = useRouterTo()
const formData = ref({} as FirstParameter<typeof cuRole>)
const routeSender = createSender()

const formItems: __SkAppForm.CoreFormItem[] = [
  {
    templateType: 'VkfInput',
    prop: 'name',
    label: '姓名',
  },
  {
    templateType: 'VkfInput',
    prop: 'roleId',
    label: '编码',
  },
]

function c () {
  cuRole(formData.value).then(() => {
    routerBack({
      path: 'create',
    })
  })
}

onBeforeUnmount(() => {
  routeSender.send({
    to: ['report/route/index.vue'],
    message: '离开详情页，通知列表页刷新',
  })
})
</script>

<template>
  <PageOver>
    <SkAppCard
      header="新增角色"
      class="h-full"
    >
      <template #header__options>
        <ElButton
          type="primary"
          @click="c"
        >
          提交
        </ElButton>
      </template>
      <div class="gap-form-x">
        <SkAppForm
          :layout="true"
          label-position="top"
          :form-items="formItems"
          :data="formData"
          @set-data="setData(formData, $event)"
        ></SkAppForm>
      </div>
    </SkAppCard>
  </PageOver>
</template>
