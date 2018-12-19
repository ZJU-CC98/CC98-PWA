import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const innerText = node.innerText
    const { bili } = node.tagData
    const partNumber = parseInt(bili, 10) || 1

    const props = {
      border: 0,
      frameborder: 'no',
      framespacing: 0,
      allowfullscreen: true,
    }

    return (
      <iframe
        className="ubb-tag-bili"
        {...props}
        src={`https://player.bilibili.com/player.html?aid=${innerText}&page=${partNumber}`}
        allowFullScreen={true}
        scrolling="no"
      />
    )
  },
}

export default handler
