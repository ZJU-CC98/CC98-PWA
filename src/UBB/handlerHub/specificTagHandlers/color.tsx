import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const { color } = node.tagData
    // FIXME: ban blue in quote
    const banColor = color === 'blue' && context.quoteRoot ? undefined : color

    const style = {
      color: banColor,
    } as React.CSSProperties

    return <span style={style}>{children}</span>
  },
}

export default handler
