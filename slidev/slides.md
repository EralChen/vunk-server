---
theme: ./theme
title: '@vunk/server'
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide
mdc: true
---

# @vunk/server

创新的 Node.js 服务端框架

<div class="pt-12">
  <span class="px-2 py-1">
    使用熟悉的 Vue 组件方式编写服务端接口
  </span>
</div>

---
layout: default
---

# 核心特性

<v-clicks>

- 🚀 基于 Koa.js，轻量且高性能
- 💡 Vue 风格的组件系统
- 🔥 拥抱 JSX/TSX 语法
- ⚡️ 内置异步组件支持
- 🛠️ 完整的 TypeScript 支持
- 🎯 熟悉的 Vue API

</v-clicks>

---
layout: default
---

# 快速开始

安装依赖
```bash
pnpm add @vunk/server
```

创建入口文件
```typescript {all|1-3|5-7|9-11|all}
import { middleware } from '@vunk/server'
import Koa from 'koa'
import HelloWorld from './components/hello-world'

const app = new Koa()
// 使用中间件
app.use(middleware(HelloWorld))

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

---
layout: default
---

# 服务端组件示例

```tsx {all|2,12|3-7|8-16|17-25|all}
// components/hello-world.tsx
import { defineComponent, Fragment } from '@vunk-server/jsx-runtime'
export default defineComponent({
  props: {
    id: { type: String, required: true },
    page: { type: Number, default: 1 }
  },
  async setup () {
    const data = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Hello World')
      }, 100)
    })

    return () => (
      <>
        <code>200</code>
        <data>
          <test>{data}</test>
        </data>
        <message>操作成功</message>
      </>
    )
  },
})
```

---
layout: default
---

# 响应结果

```json
{
  "code": 200,
  "data": {
    "test": "Hello World"
  },
  "message": "操作成功"
}
```

---
layout: two-cols
---

# 核心概念

<v-clicks>

- 服务端组件
  - 类 Vue 组件语法
  - Props 定义
  - Setup 函数支持
  - 异步操作处理

- XML 响应规则
  - 自然数组转换
  - Fragment 显式数组
  - 结构化数据响应

</v-clicks>

::right::

# 最佳实践

<v-clicks>

- 项目结构
  ```
  src/
    components/     # 全局组件
    views/         # 业务组件
    main.ts        # 入口文件
  ```

- 组件设计
  - 单一职责
  - 逻辑复用
  - 类型安全

</v-clicks>

---
layout: cover
---

# 谢谢观看

基于 Vue + Koa 的现代服务端框架
