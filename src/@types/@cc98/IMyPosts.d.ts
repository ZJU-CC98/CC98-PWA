declare module '@cc98/api' {
  export interface IMyPosts {
    /**
     * 回帖
     */
    data: IPost[]
    /**
     * 回帖数
     */
    count: number
    from: number
    size: number
    extra: any
    errorCode: number
  }
}
