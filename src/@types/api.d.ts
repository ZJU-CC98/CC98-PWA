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
     * FIXME: 不确定
     */
    type: number
  }
  export interface IPost {

    allowedViewers: any,

    awardInfo: any,

    awards: any[],
    /**
     * 帖子内容
     */
    content: string,

    contentType: number,
    /**
     * 楼层数
     */
    floor: number,
    /**
     * 用户 ID
     */
    id: number,
    /**
     * IP
     */
    ip: string,

    isAllowedOnly: boolean,
    /**
     * 是否匿名
     */
    isAnonymous: boolean,

    isBest: boolean,
    /**
     * 是否被删除
     */
    isDeleted: boolean,
    /**
     * 是否是楼主（LZ）
     */
    isLZ: boolean,

    lastUpdateAuthor: any,
    /**
     * 最后更新时间
     */
    lastUpdateTime: any,
    /**
     * 赞同数
     */
    likeCount: number,
    /**
     * 反对数量
     */
    dislikeCount: number,

    likeState: number,
    /**
     * 总楼层数
     */
    length: number,

    parentId: number,

    state: number,
    /**
     * 回复时间
     */
    time: string,
    /**
     * 帖子标题 ?
     */
    title: string,
    /**
     * 帖子的 ID
     */
    topicId: number,
    /**
     * 版面 ID
     */
    boardId: number,
    /**
     * 用户 ID
     */
    userId: number,
    /**
     * 用户名
     */
    userName: string,
  }

  export interface IUser {
    /**
    * 用户名
    */
    name: string
    /**
    * 用户性别
    */
    gender: 0 | 1
    /**
    * 用户生日
    */
    birthday: string
    /**
    * 用户个人简介图片
    */
    photourl: string
    /**
    * 用户个人简介
    */
    introduction: string
    /**
    * 用户个性签名
    */
    signatureCode: string
    /**
    * id
    */
    id: number
    /**
    * 当前用户是否关注了该用户
    */
    isFollowing: boolean
    /**
    * 邮箱地址
    */
    emailAddress: string
    /**
    * QQ
    */
    qq: string
    /**
    * 发帖数
    */
    postCount: number
    /**
    * 威望
    */
    prestige: number
    /**
    * 显示的用户组
    */
    displayTitle: string
    /**
    * 全站权限等级
    */
    privilege: string
    /**
    * 注册时间
    */
    registerTime: string
    /**
    * 最后登录时间
    */
    lastLogOnTime: string
    /**
    * 自定义头衔
    */
    customTitle: string
    /**
     * 用户锁定状态：0正常  1锁定  2屏蔽  3全站TP
     */
    lockState: 0 | 1 | 2 | 3
    /**
     * 风评
     */
    popularity: number
    /**
     * 用户拥有的头衔 ID 们
     */
    userTitleIds: number[]
    /**
     * 当前显示的头衔 ID
     */
    displayTitleId: number
    /**
     * 粉丝数
     */
    fanCount: number
    /**
     * 财富值
     */
    wealth: number
    /**
     * 用户头像地址
     */
    portraitUrl: string
    /**
     * 用户关注的版面 ID 数组
     */
    customBoards: number[]
    /**
     * 用户关注数
     */
    followCount: number
    /**
     * 用户选择的主题
     */
    theme: number
    /**
     * 等级（已经废弃）
     */
    levelTitle: string
    /**
     * 用户版主头衔信息
     * FIXME: BoardMasterTitle[]
     */
    boardMasterTitles: any
    /**
     * 被删除的数量
     */
    deleteCount: number
  }

}
