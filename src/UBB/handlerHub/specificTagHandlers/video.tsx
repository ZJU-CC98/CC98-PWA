import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

import 'DPlayer/dist/DPlayer.min.css'
import DPlayer from 'DPlayer'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    return <VideoComponent src={node.innerText} />
  },
}

interface IProps {
  /**
   * 音频文件地址
   */
  src: string
}

interface IState {
  /**
   * 播放器高度
   */
  height: string
}

// tslint:disable-next-line:no-any
declare const Hls: any

class VideoComponent extends React.Component<IProps, IState> {
  /**
   * 对div的引用
   */
  div: HTMLDivElement | null
  /**
   * 对播放器的引用
   */
  // tslint:disable-next-line:no-any
  dp: any = null
  /**
   * 播放器默认高度
   */
  defaultHeight: string = '200px'

  state: IState = {
    height: this.defaultHeight,
  }

  /**
   * 组件加载后初始化播放器
   */
  componentDidMount() {
    if (this.props.src.match(/\.m3u8$/)) {
      try {
        new Hls()
        this.initPlayer('hls')
      } catch (e) {
        const script = document.createElement('script')
        script.src = 'https://www.cc98.org/static/content/hls.min.js'
        document.getElementsByTagName('head')[0].appendChild(script)
        script.onload = () => {
          this.initPlayer('hls')
        }
      }
    } else {
      this.initPlayer()
    }
  }

  initPlayer = (type?: string) => {
    try {
      this.dp = new DPlayer({
        element: this.div,
        autoplay: false,
        preload: 'metadata',
        video: {
          url: encodeURI(this.props.src),
          type,
        },
      })
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e, 'new Dplayer Error.')
    }

    if (!this.dp) {
      return
    }

    this.dp.on('abort', () => null)

    // 对全屏下高度的调整
    this.dp.on('fullscreen', () => this.setState({ height: 'auto' }))
    this.dp.on('fullscreen_cancel', () => this.setState({ height: this.defaultHeight }))
    this.dp.on('webfullscreen', () => this.setState({ height: '100%' }))
    this.dp.on('webfullscreen_cancel', () => this.setState({ height: this.defaultHeight }))
    // tslint:disable-next-line:max-line-length
    this.div &&
      (this.div.getElementsByClassName('dplayer-menu')[0].innerHTML =
        '<div class="dplayer-menu-item"><a target="_blank" href="https://github.com/MoePlayer/DPlayer">关于 DPlayer 播放器</a></div>')
  }

  componentWillUnmount() {
    if (!this.dp) {
      return
    }

    this.dp.destroy()
    this.div && (this.div.innerHTML = '')
  }

  render() {
    // 重置继承自article的whiteSpace
    return (
      <div style={{ display: 'flex' }}>
        <div
          className="dplayer"
          style={{ whiteSpace: 'normal', height: this.state.height }}
          ref={it => (this.div = it)}
        />
      </div>
    )
  }
}

export default handler
