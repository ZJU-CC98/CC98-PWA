declare module '@cc98/context' {
  import React, { ReactNode } from 'react'
  import { TagNode, IContext as ICoreContext } from '@cc98/ubb-core'

  export interface IContext extends ICoreContext {
    /**
     * 主题
     */
    theme: 'light' | 'dark'
    /**
     * 表情包地址 baseURL
     */
    imgBaseURL: string
    /**
     * 最外层的 [quote]
     */
    quoteRoot?: TagNode | null
    /**
     * 嵌套引用列表
     */
    quotes?: React.ReactNode[]
  }
}
