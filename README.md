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

**tsconfig.json**

```json 
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@vunk/server"
  }
}
```

### 基础示例

```typescript
// main.ts
import { middleware } from '@vunk/server'
import Koa from 'koa'
import KoaBodyParsers from 'koa-body-parsers'
import HelloWorld from './components/hello-world'

const app = new Koa()
KoaBodyParsers(app)

app.use(middleware(HelloWorld))

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

```tsx
// components/hello-world/src/component.tsx
import { defineComponent } from '@vunk/server'

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

`app.use(middleware(EntryComponent))` 入口组件中。

默认将 `ctx.query`, `ctx.request.json()` 传递给组件的 props。

你可以在组件中直接使用这些 props。

> ctx.request.json() 需要使用 [koa-body-parsers](https://www.npmjs.com/package/koa-body-parsers) 中间件来解析请求体。

### Setup 函数

setup 函数是组件的核心，支持异步操作：

```tsx
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

默认会使用 XML的自然规律对数组处理

+ 当同名元素首次出现时作为普通值
+ 当同名元素第二次出现时自动转为数组
+ 后续出现时继续追加到数组


使用 `Fragment array` 可以显式约定字段为数组
```tsx
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

