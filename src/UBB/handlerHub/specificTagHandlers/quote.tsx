import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  enter(node: TagNode, context: IContext) {
    if (!context.quoteRoot) {
      context.quoteRoot = node
      context.quotes = []
    }
  },

  exit(node: TagNode, context: IContext) {
    if (context.quoteRoot === node) {
      context.quoteRoot = null
      context.quotes = []
    }
  },

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    context.quotes!.push(children)

    if (context.quoteRoot !== node) {
      return null
    }

    return (
      <div className="ubb-tag-quote-container">
        {context.quotes!.map((item, i) => (
          <div key={i} className={i !== 0 ? 'ubb-tag-quote-item' : undefined}>
            {item}
          </div>
        ))}
      </div>
    )
  },
}

export default handler
