import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const code = node.innerText.trim().split('\n')

    return (
      <ol className="ubb-tag-code">
        {code.map((line, index) => (
          <li key={index} className="ubb-tag-code-line">
            {line}
          </li>
        ))}
      </ol>
    )
  },
}

export default handler
