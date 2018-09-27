declare module 'api' {

  export interface IHotTopic {
    /**
     * 作者名
     */
    authorName: string
    /**
     * 版面 ID
     */
    boardId: number
    /**
     * 版面名
     */
    boardName: string
    /**
     * 创建时间
     */
    createTime: string
    /**
     * 点击数
     */
    hitCount: number
    /**
     * ID
     */
    id: number
    /**
     * 参与者数量
     */
    participantCount: number
    /**
     * 回复数
     */
    replyCount: number
    /**
     * 标题
     */
    title: string
    /**
     * 0 普通帖子  1 校园活动  2 学术信息
     * TODO: 不确定
     */
    type: number
  }

}
