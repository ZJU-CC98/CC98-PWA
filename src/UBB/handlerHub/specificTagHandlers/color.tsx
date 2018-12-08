import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const { color } = node.tagData

    const style = {
      color,
    } as React.CSSProperties

    return <span style={style}>{children}</span>
  },
}

export default handler
