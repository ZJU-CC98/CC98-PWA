declare module '@cc98/api' {
  export interface IBoardRecord {
    /**
     * 版面id
     */
    boardId: number
    /**
     * 数量
     */
    count: number
    /**
     * 开始
     */
    from: number
    /**
     * 个数
     */
    size: number
    /**
     * 子版面
     */
    boardEvents: IBoardEvent[]
  }
}
