import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /tb\d{2}/i,

  render(node: TagNode, context: IContext) {
    const tbID = node.tagData.__tagName__.slice(2)

    const url = `${context.imgBaseURL}/tb/tb${tbID}.png`

    return <img className="ubb-tag-tb" src={url} alt={`[tb${tbID}]`} />
  },
}

export default handler
