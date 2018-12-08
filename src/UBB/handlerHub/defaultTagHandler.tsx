import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    return (
      <>
        {node._isClose ? (
          <span>
            {node._rawText}
            {children}
            {`[/${node.tagName}]`}
          </span>
        ) : (
          <>{node._rawText}</>
        )}
      </>
    )
  },
}

export default handler
