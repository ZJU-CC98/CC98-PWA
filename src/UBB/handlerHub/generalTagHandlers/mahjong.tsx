import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /[acf]:/i,

  render(node: TagNode, context: IContext) {
    const tagName = node.tagData.__tagName__
    const mahjongType = tagName[0]
    const mahjongID = tagName.slice(2)

    let url = ''
    switch (mahjongType) {
      case 'a':
        url = getAnimalUrl(mahjongID, context.imgBaseURL)
        break
      case 'c':
        url = getCartoonUrl(mahjongID, context.imgBaseURL)
        break
      case 'f':
        url = getFaceUrl(mahjongID, context.imgBaseURL)
        break
    }

    return <img className="ubb-tag-mahjong" src={url} alt={tagName} />
  },
}

function getAnimalUrl(mahjongId: string, imgBaseURL: string) {
  return `${imgBaseURL}/mahjong/animal2017/${mahjongId}.png`
}

function getCartoonUrl(mahjongId: string, imgBaseURL: string) {
  switch (mahjongId) {
    case '018':
    case '049':
    case '096':
      return `${imgBaseURL}/mahjong/carton2017/${mahjongId}.gif`
    default:
      return `${imgBaseURL}/mahjong/carton2017/${mahjongId}.png`
  }
}

function getFaceUrl(mahjongId: string, imgBaseURL: string) {
  switch (mahjongId) {
    case '004':
    case '009':
    case '056':
    case '061':
    case '062':
    case '087':
    case '115':
    case '120':
    case '137':
    case '168':
    case '169':
    case '175':
    case '206':
      return `${imgBaseURL}/mahjong/face2017/${mahjongId}.gif`
    default:
      return `${imgBaseURL}/mahjong/face2017/${mahjongId}.png`
  }
}

export default handler
