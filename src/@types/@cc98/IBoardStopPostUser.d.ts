declare module '@cc98/api' {
  export interface IBoardStopPostUser {
    /**
     * 用户id
     */
    userId: number
    /**
     * 用户名
     */
    userName: string
    /**
     * 解禁时间
     */
    expiredTime: string
    /**
     * TP天数
     */
    days: number
    /**
     * 操作人用户名
     */
    operatorUserName: string
  }
}
