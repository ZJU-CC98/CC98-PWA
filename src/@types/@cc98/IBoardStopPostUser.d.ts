declare module '@cc98/api' {
  export interface IBoardStopPostUser {
    /**
     * 用户id
     */
    userId: number
    /**
     * 用户姓名
     */
    userName: string
    /**
     * 到期时间
     */
    expiredTime: string
    /**
     * 天数
     */
    days: number
    /**
     * 操作人
     */
    operatorUserName: string
  }
}
