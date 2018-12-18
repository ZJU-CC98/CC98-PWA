import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const innerText = node.innerText
    const tagData: string = node.tagData.bili
    const partNumber: number = parseInt(tagData, 10) || 1

    const style = {
      border: 'none',
      width: '80%',
      marginLeft: '10%',
    } as React.CSSProperties

    const props = {
      border: '0',
      frameborder: 'no',
      framespacing: '0',
      allowfullscreen: 'true',
    }

    return (
      <iframe
        {...props}
        src={`https://player.bilibili.com/player.html?aid=${innerText}&page=${partNumber}`}
        allowFullScreen={true}
        style={style}
        scrolling="no"
      />
    )
  },
}

export default handler
