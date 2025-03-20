export interface ErrorData {
  component: 'VkError'

  /**
   * 错误信息
   */
  stack?: string

  /**
   * name
   */
  name?: string

  /**
   * 组件提供的错误信息
   */
  info?: string

  /**
   * 引发错误的实例
   */
  instance?: string

}
export {}
