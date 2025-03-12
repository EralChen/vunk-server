## @vunk/server 简介

一个创新的 Node.js 服务端框架，让你用熟悉的 Vue 组件方式编写服务端接口。

使用之前请阅读 [README](./README.md) 了解基本理念


## 用例

请务必查看 [server](./server/) 目录下提供的用例。这将帮助你了解如何使用 `@vunk/server` 构建应用。


## 源码

由于 `@vunk/server` 处在项目的初期。

如果你需要了解它是如何工作的, 请不要犹豫, 直接访问 [packages](./packages/) 目录, 查看相关源码！

如果你在使用的过程中遇到框架能力上不足的问题, 请仔细研读源码, 提出改进意见, 并一起参与建设！

以下是你需要了解的目录结构:

```bash
packages
  ├── components  # 通用组件目录
  ├── jsx-runtime # JSX 转请求 Response 的运行时
  ├── koa         # Koa 相关, 将组件包装为 Koa 中间件
  ├── ...         # 其他目录暂时不需要关注
  └── shared      # 通用工具函数
```

