declare module '@cc98/api' {
  export interface IBoard {
    /**
     * 版面id
     */
    id: number
    /**
     * 版面名称
     */
    name: string
    /**
     * 版面名称
     */
    description: string
    /**
     * 发帖总数
     */
    topicCount: number
    /**
     * 回复总数
     */
    postCount: number
    /**
     * 今日回复总数
     */
    todayCount: number
    /**
     * 版主
     */
    boardMasters: string[]
    /**
     * 是否关注
     */
    isUserCustomBoard?: boolean
  }
}
