import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React, { useEffect, useRef } from 'react'

import { globalHistory, HistoryUnsubscribe } from '@reach/router'

import 'dplayer/dist/DPlayer.min.css'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    return <Video src={node.innerText} />
  },
}

interface Props {
  /**
   * 视频文件地址
   */
  src: string
}

const Video: React.FC<Props> = ({ src }) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // tslint:disable-next-line
    let dplayer: any = null
    let unsubscribe: HistoryUnsubscribe | null

    import('dplayer').then(({ default: DPlayer }) => {
      dplayer = new DPlayer({
        container: divRef.current,
        autoplay: false,
        preload: 'metadata',
        video: {
          url: encodeURI(src),
          type: 'auto',
        },
      })

      // 监听到 url 改变，暂停播放
      unsubscribe = globalHistory.listen(() => {
        dplayer && dplayer.pause()
      })
    })

    return () => {
      unsubscribe && unsubscribe()
      dplayer && dplayer.destroy()
    }
  }, [])

  return <div className="dplayer" style={{ whiteSpace: 'normal' }} ref={divRef} />
}

export default handler
