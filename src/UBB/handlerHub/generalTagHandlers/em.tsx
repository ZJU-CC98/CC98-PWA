import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: true,

  match: /em\d{2}/i,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    const emID = node.tagData.__tagName__.slice(2)

    const url = `${context.imgBaseURL}/em/em${emID}.gif`

    return <img className="ubb-tag-em" src={url} alt={`[em${emID}]`} />
  },
}

export default handler
