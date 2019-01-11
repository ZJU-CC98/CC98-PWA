import { ITagHandler, TagNode } from '@cc98/ubb-core'
import { IContext } from '@cc98/context'

import React, { useRef, useEffect } from 'react'
import { globalHistory, HistoryUnsubscribe } from '@reach/router'
import { IMG_BASE_URL } from '@/config'

import 'aplayer/dist/APlayer.min.css'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    return <Audio src={node.innerText} />
  },
}

interface Props {
  /**
   * 音频文件地址
   */
  src: string
}

const Audio: React.FC<Props> = ({ src }) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // tslint:disable-next-line
    let aplayer: any = null
    let unsubscribe: HistoryUnsubscribe | null

    import('aplayer').then(({ default: APlayer }) => {
      aplayer = new APlayer({
        element: divRef.current,
        autoplay: false,
        preload: 'metadata',
        music: {
          url: encodeURI(src),
          title: encodeURI(src),
          author: '',
          pic: `${IMG_BASE_URL}/audio_cover.png`,
        },
      })

      // 监听到 url 改变，暂停播放
      unsubscribe = globalHistory.listen(() => {
        aplayer && aplayer.audio.pause()
      })
    })

    return () => {
      unsubscribe && unsubscribe()
      aplayer && aplayer.destroy()
    }
  }, [])

  return <div className="aplayer" style={{ whiteSpace: 'normal' }} ref={divRef} />
}

export default handler
