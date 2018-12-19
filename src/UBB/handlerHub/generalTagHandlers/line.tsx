import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /line/,

  render(node: TagNode, context: IContext) {
    return <hr />
  },
}

export default handler
