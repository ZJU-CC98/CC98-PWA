import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

import { globalHistory, HistoryUnsubscribe } from '@reach/router'

import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    return <AudioComponent src={node.innerText} />
  },
}

interface IProps {
  /**
   * 音频文件地址
   */
  src: string
}

class AudioComponent extends React.Component<IProps> {
  /**
   * 对div的引用
   */
  div: HTMLDivElement | null
  /**
   * 对播放器的引用
   */
  // tslint:disable-next-line:no-any
  ap: any
  /**
   *  取消页面URL的监听器
   */
  unsubscribe: HistoryUnsubscribe | undefined

  /**
   * 组件加载后初始化播放器
   */
  componentDidMount() {
    try {
      this.ap = new APlayer({
        element: this.div,
        autoplay: false,
        preload: 'metadata',
        music: {
          url: encodeURI(this.props.src),
          title: encodeURI(this.props.src),
          author: '',
          pic: 'https://www.cc98.org/static/images/audio_cover.png',
        },
      })
      // 去掉文件名后面的横杠
      this.div && (this.div.getElementsByClassName('aplayer-author')[0].innerHTML = '')
    } catch (e) {
      // IE 11 下会抛一个 InvalidStateError 的错误，忽略
    }

    // 监听到url改变，暂停
    this.unsubscribe = globalHistory.listen(() => {
      if (!this.ap.audio.paused) {
        // this.ap.pause()
      }
    })
  }

  // 离开帖子时销毁之前的监听器和播放器
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
    this.ap && this.ap.destroy()
    this.div && (this.div.innerHTML = '')
  }

  render() {
    // 重置继承自article的whiteSpace
    return (
      <div
        className="aplayer"
        style={{ whiteSpace: 'normal', color: 'black' }}
        ref={it => {
          this.div = it
        }}
      />
    )
  }
}

export default handler
