<script>
import { useInitTheme } from '@/composables'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './init-esri'

export default {
  name: 'App',
  data () {
    return {
      zhCn,
    }
  },
  mounted () {
    useInitTheme()
  },
}
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
html {
  height: 100%;
}

body,
#app {
  height: inherit;
}
</style>
