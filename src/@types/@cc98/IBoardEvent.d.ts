declare module '@cc98/api' {
  export interface IBoardEvent {
    /**
     * 操作id
     */
    id: number
    /**
     * 主题id
     */
    topicId: number
    /**
     * 版面id
     */
    boardId: number
    /**
     * 操作对象用户名
     */
    targetUserName: string
    /**
     * 操作人用户名
     */
    operatorUserName: string
    /**
     * 事件内容
     */
    content: string
    /**
     * 操作时间
     */
    time: string
    /**
     * ip
     */
    ip: string
    /**
     * 删除
     */
    isDeleted: 0 | 1
  }
}
