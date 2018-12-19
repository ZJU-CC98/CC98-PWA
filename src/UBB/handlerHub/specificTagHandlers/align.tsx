import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const { align } = node.tagData

    const style = {
      textAlign: align,
    } as React.CSSProperties

    return <div style={style}>{children}</div>
  },
}

export default handler
