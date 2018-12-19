import { IRootHandler, RootNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IRootHandler<React.ReactNode> = {
  enter(node: RootNode, context: IContext) {
    // empty
  },

  exit(node: RootNode, context: IContext) {
    // empty
  },

  render(node: RootNode, context: IContext, children: React.ReactNode[]) {
    return <div className="ubb-root">{children}</div>
  },
}

export default handler
