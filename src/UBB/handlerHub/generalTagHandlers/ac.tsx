import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /ac\d{2}/i,

  render(node: TagNode, context: IContext) {
    const acID = node.tagData.__tagName__.slice(2)

    const url = `${context.imgBaseURL}/ac/${acID}.png`

    return <img className="ubb-tag-ac" src={url} alt={`[ac${acID}]`} />
  },
}

export default handler
