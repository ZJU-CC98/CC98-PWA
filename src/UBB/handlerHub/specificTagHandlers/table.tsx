import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

// table相关标签说明: https://www.cc98.org/topic/4070950
const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    return <table className="ubb-tag-table">{children}</table>
  },
}

export default handler

/**
 * 解析 td, th, tr 的 tagData
 * @param rawText
 */
export function parseTableTag(rawText: string) {
  let rowSpan = 1
  let colSpan = 1

  // FIXME:
  const tagContext = rawText.slice(4, rawText.length - 1)
  const values = tagContext.split(',')

  if (values.length === 2) {
    rowSpan = parseInt(values[0], 10)
    colSpan = parseInt(values[1], 10)
  }

  return {
    rowSpan,
    colSpan,
  }
}
