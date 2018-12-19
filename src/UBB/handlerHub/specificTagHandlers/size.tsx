import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'
import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const { size } = node.tagData
    let fontSize = parseInt(size, 10)

    // TODO: 调整计算规则
    fontSize = fontSize > 7 ? 3.5 : fontSize / 2
    fontSize /= 1.5

    const style = {
      fontSize: `${fontSize}rem`,
    } as React.CSSProperties

    return <span style={style}>{children}</span>
  },
}

export default handler
