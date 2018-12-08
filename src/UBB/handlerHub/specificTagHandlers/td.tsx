import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

import { parseTableTag } from './table'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const { rowSpan, colSpan } = parseTableTag(node._rawText)

    return (
      <td className="ubb-tag-td" rowSpan={rowSpan} colSpan={colSpan}>
        {children}
      </td>
    )
  },
}

export default handler
