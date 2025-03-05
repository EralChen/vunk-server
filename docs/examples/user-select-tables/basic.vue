<script lang="ts" setup>
import type { User } from '@vunk-server/api/user'
import { SkUserSelectTables } from '@vunk-server/components/user-select-tables'
import { ref } from 'vue'

const currentUsers = ref<User[]>([])
</script>

<template>
  <p>currentUsers: {{ currentUsers }}</p>
  <SkUserSelectTables
    v-model="currentUsers"
  ></SkUserSelectTables>
</template>
