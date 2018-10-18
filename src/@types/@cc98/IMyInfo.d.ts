declare module '@cc98/api' {
  export interface IMyInfo {
    /**
     * 生日
     */
    birthday: string

    boardMasterTitles: any[]
    /**
     * 定制版面 ID
     */
    customBoards: number[]

    customTitle: string
    /**
     * 被删帖数
     */
    deleteCount: number

    displayTitle: any

    displayTitleId: number
    /**
     * 邮件地址
     */
    emailAddress: string
    /**
     * 门派
     */
    faction: string
    /**
     * 粉丝数
     */
    fanCount: number
    /**
     * 关注用户数
     */
    followCount: number

    /**
     *
     */
    gender: number
    /**
     *
     */
    groupName: string
    /**
     * 是否有电话号码
     */
    hasPhoneNumber: boolean
    /**
     * 用户 ID
     */
    id: number
    /**
     * 介绍
     */
    introduction: any
    /**
     * 是否已关注
     */
    isFollowing: true
    /**
     * 是否在线
     */
    isOnline: true
    /**
     *
     */
    isSUser: number
    /**
     * 已经认证
     */
    isVerified: string
    /**
     * 最后登录 IP
     */
    lastIpAddress: string
    /**
     * 最后登录时间
     */
    lastLogOnTime: string

    levelTitle: string
    /**
     * 锁定状态
     */
    lockState: number
    /**
     * 用户名
     */
    name: string
    /**
     * 电话号码
     */
    phoneNumber: string | null
    /**
     * 风评
     */
    popularity: number
    /**
     * 头像链接
     */
    portraitUrl: string
    /**
     * 发帖数
     */
    postCount: number
    /**
     * 威望
     */
    prestige: number
    /**
     * 特权
     */
    privilege: string
    /**
     * QQ 号
     */
    qq: string
    /**
     * 注册时间
     */
    registerTime: string
    /**
     * 签名档
     */
    signatureCode: string
    /**
     * 主题
     */
    theme: number
    /**
     *
     */
    userTitleIds: number[]
    /**
     * 财富值
     */
    wealth: number
  }
}
