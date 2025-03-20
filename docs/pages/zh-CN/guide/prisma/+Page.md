# Prisma

你可以选择任意 NodeJs 的技术栈, 和数据库进行交互。

本篇我们使用 [Prisma](https://prisma.org.cn/docs/orm/overview/introduction/what-is-prisma) 来编写用例。

它是一个现代化的 ORM, 提供了类型安全的查询构建器。

## Prisma 集成

### 安装

```bash
# Prisma 客户端 和 加速器支持
pnpm i @prisma/client @prisma/extension-accelerate -S

# Prisma CLI
npm i prisma -g
```

### 初始化

在工作目录下编写以下文件

**.env**

```env
# 数据库连接字符串
DATABASE_URL="postgresql://postgres:password@localhost:5432/test"
```

**prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

通过以上配置, Prisma CLI 便能够连接到数据库。

### 构建 Prisma 客户端

如果你的数据库中已经存在表。使用 `prisma db pull` 命令来拉取表结构。
```bash
prisma db pull
```

**prisma/schema.prisma** 文件里会根据数据库中的表结构自动生成 **model**

```prisma
// ...
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  Post  Post[]
}
```

**model** 是 Prisma [数据建模](https://prisma.org.cn/docs/orm/overview/introduction/data-modeling) 的结果。

保持 `schema.prisma` 文件和数据库表结构一致是 `Prisma CLI` 的主要工作。`schema.prisma` 确保了 **Prisma Client** 能够拥有类型安全的查询构建器。

而从数据库同步结构的过程被称为 `Introspect`. 以下是 `Introspect` 的工作流程:

![Introspection workflow](https://www.prisma.io/docs/assets/images/prisma-evolve-app-workflow-ef3834a9ab4af0633eb1e1ee32d2fde7.png)

`Introspect` 后, 你可以使用 Studio 来可视化数据库表结构。

```bash
prisma studio
```

![Prisma Studio](./studio.png)

:::tip

同步数据库表和 schema.prisma , 其实可以是一个双向的过程, 参考 [使用 Prisma ORM 进行数据建模](https://prisma.org.cn/docs/orm/overview/introduction/data-modeling#data-modeling-with-prisma-orm)

:::

## Prisma Client

### 实例化
在 server 应用中实例化 Prisma Client

:::source
composables/usePrisma.ts
:::

### Server 组件

```ts
router.get('/prisma_try', middleware(PrismaTryView))
```
:::source
views/prisma_try.tsx
:::

## 客户端使用

:::demo
prisma/basic
>>>subs
[prisma/api]
>>>
:::

<br><br><br>
