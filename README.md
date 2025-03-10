# @vunk/server

一个创新的 Node.js 服务端框架，让你用熟悉的 Vue 组件方式编写服务端接口。

## 特性

- 🚀 基于 Koa.js，轻量且高性能
- 💡 Vue 风格的组件系统
- 🔥 拥抱 JSX/TSX 语法
- ⚡️ 内置异步组件支持
- 🛠️ 完整的 TypeScript 支持
- 🎯 熟悉的 Vue API（defineComponent、setup 等）

## 快速开始

### 安装

```bash
pnpm add @vunk/server
```

### 基础示例

```typescript
// main.ts
import { middleware } from '@vunk-server/koa'
import Koa from 'koa'
import HelloWorld from './components/hello-world'

const app = new Koa()

app.use(middleware(HelloWorld))

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

```tsx
// components/hello-world/src/component.tsx
import { defineComponent, Fragment } from '@vunk-server/jsx-runtime'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup() {
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

上述示例将返回如下 JSON 响应：

```json
{
  "code": 200,
  "data": {
    "test": "Hello World"
  },
  "message": "操作成功"
}
```

## 核心概念

### 服务端组件

@vunk/server 允许你使用类似 Vue 的组件方式来构建 API 响应。每个组件可以：

- 定义接收的参数（props）
- 处理异步逻辑
- 构建结构化的响应数据

### Props 定义

就像 Vue 组件一样，你可以定义组件的 props：

```typescript
defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      default: 1
    }
  }
})
```

### Setup 函数

setup 函数是组件的核心，支持异步操作：

```typescript
async setup(props) {
  const data = await fetchData(props.id)
  
  return () => (
    <>
      <code>200</code>
      <data>{data}</data>
    </>
  )
}
```

## 最佳实践

### 项目结构

使用你熟悉的项目结构：

```
src/
  components/             # 全局组件
    response.tsx
    auth.tsx
  views/
    user/                 # 业务组件1
    product/              # 业务组件2
    
  main.ts                 # 应用入口
```

### 错误处理

使用 try/catch 处理异步操作：

```typescript
async setup() {
  try {
    const data = await fetchData()
    return () => (
      <>
        <code>200</code>
        <data>{data}</data>
      </>
    )
  } catch (error) {
    return () => (
      <>
        <code>500</code>
        <message>{error.message}</message>
      </>
    )
  }
}
```

### 响应格式

推荐使用统一的响应格式：

```typescript
{
  code: number      // 状态码
  data: any         // 响应数据
  message: string   // 响应消息
}
```

## API 参考

### defineComponent

用于定义一个服务端组件：

```typescript
defineComponent({
  props: {},        // 属性定义
  async setup() {}  // 组件逻辑
})
```

### Fragment

用于返回多个元素：

```typescript
<Fragment array>
  <item>1</item>
</Fragment>
```

将生成数组响应：

```json
{
  "item": ['1']
}
```

