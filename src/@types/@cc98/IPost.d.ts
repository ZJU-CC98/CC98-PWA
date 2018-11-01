declare module '@cc98/api' {
  export interface IPost {
    allowedViewers: any

    awardInfo: any

    awards: IAward[]
    /**
     * 帖子内容
     */
    content: string

    contentType: number
    /**
     * 楼层数
     */
    floor: number
    /**
     * 用户 ID
     */
    id: number
    /**
     * IP
     */
    ip: string

    isAllowedOnly: boolean
    /**
     * 是否匿名
     */
    isAnonymous: boolean

    isBest: boolean
    /**
     * 是否被删除
     */
    isDeleted: boolean
    /**
     * 是否是楼主（LZ）
     */
    isLZ: boolean

    lastUpdateAuthor: any
    /**
     * 最后更新时间
     */
    lastUpdateTime: any
    /**
     * 赞同数
     */
    likeCount: number
    /**
     * 反对数量
     */
    dislikeCount: number

    likeState: number
    /**
     * 总楼层数
     */
    length: number

    parentId: number

    state: number
    /**
     * 回复时间
     */
    time: string
    /**
     * 帖子标题
     */
    title: string
    /**
     * 帖子的 ID
     */
    topicId: number
    /**
     * 版面 ID
     */
    boardId: number
    /**
     * 用户 ID
     */
    userId: number
    /**
     * 用户名
     */
    userName: string
    /**
     * 是否热帖
     */
    isHot?: boolean
  }
}
