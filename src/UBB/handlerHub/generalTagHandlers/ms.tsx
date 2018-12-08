import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /ms\d{2}/i,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const msID = node.tagData.__tagName__.slice(2)

    const url = `${context.imgBaseURL}/ms/ms${msID}.png`

    return <img className="ubb-tag-ms" src={url} alt={`[ms${msID}]`} />
  },
}

export default handler
