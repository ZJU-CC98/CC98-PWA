import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    switch (node.tagData.upload) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp':
        return <img className="ubb-tag-img" src={node.innerText} />
      default:
        return (
          <a className="ubb-tag-upload" href={node.innerText}>
            点击下载文件
          </a>
        )
    }
  },
}

export default handler
