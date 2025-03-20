# Error

Error

## Client Demo

:::demo
error/basic
:::

## Server Component

:::source
views/error.tsx
:::

## Koa Middleware

使用 `CatchErrorMiddleware` 中间件来捕获由组件发生的错误
```ts
import { CatchErrorMiddleware } from '@vunk-server/koa'
import Koa from 'koa'
const app = new Koa()
app.use(CatchErrorMiddleware)
// 其他 Server 组件
```

如果你需要执行一些额外的操作，你可以参考 `CatchErrorMiddleware` 的实现，自定义一个中间件来替代它。

:::source
koa/CatchErrorMiddleware/index.ts
:::

## Response Props

:::props
error/src/ctx
:::

## ErrorData

:::source
components/error/src/types.ts
:::
