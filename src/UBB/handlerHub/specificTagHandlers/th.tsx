import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

import { parseTableTag } from './table'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const { rowSpan, colSpan } = parseTableTag(node._rawText)

    return (
      <th className="ubb-tag-th" rowSpan={rowSpan} colSpan={colSpan}>
        {children}
      </th>
    )
  },
}

export default handler
