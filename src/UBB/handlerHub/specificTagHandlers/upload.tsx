import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

import InsertDriveFile from '@material-ui/icons/InsertDriveFile'

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
          <div className="ubb-tag-upload">
            <InsertDriveFile />
            upload文件，请使用电脑网页版下载
          </div>
        )
    }
  },
}

export default handler
