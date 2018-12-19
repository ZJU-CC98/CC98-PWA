import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /needreply/,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    return (
      <>
        <hr />
        <div className="ubb-tag-needreply">该内容回复后才可浏览</div>
        <hr />
      </>
    )
  },
}

export default handler
