declare module '@cc98/api' {
  export interface ILike {
    /**
     * 踩 数量
     */
    dislikeCount: number
    /**
     * 赞 数量
     */
    likeCount: number
    likeState: number
  }
}
