Page({
  data: {
    // 未设置头像时显示的默认头像（可改为项目内 /images/default-avatar.png）
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    showNicknameEdit: false,
    tempNickname: '',
    version: '1.0.4',
    // 顶部快捷入口：我的关注 / 零售订单 / 我的点赞 / 我的评论（各对应独立页面，图标用 images 下图片）
    shortcutList: [
      { key: 'myFollow', text: '我的关注', iconUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/exe-my-attention-primary.png', url: '/pages/my-follow/my-follow' },
      { key: 'retailOrder', text: '零售订单', iconUrl: '/images/零售预定.png', url: '/pages/retail-order/retail-order' },
      { key: 'myLike', text: '我的点赞', iconUrl: '/images/我的点赞.png', url: '/pages/my-like/my-like' },
      { key: 'myComment', text: '我的评论', iconUrl: '/images/我的评论.png', url: '/pages/my-comment/my-comment' }
    ],
    // 下方功能列表
    featureList: [
      { key: 'companion', text: '随行客', icon: '👥' },
      { key: 'service', text: '联系客服', icon: '🎧' },
      { key: 'userAgreement', text: '用户服务协议', icon: '📋' },
      { key: 'privacy', text: '隐私政策', icon: '🔒' },
      { key: 'about', text: '关于我们', icon: 'ℹ️' },
      { key: 'version', text: '当前版本', icon: '📄' }
    ]
  },

  onLoad() {
    // 初始化用户信息，确保昵称唯一性
    this.initUserInfo();
  },

  // 初始化用户信息
  initUserInfo() {
    // 获取已保存的用户信息
    let savedUserInfo = wx.getStorageSync('userInfo') || {};
    
    // 如果没有昵称，生成一个唯一的昵称
    if (!savedUserInfo.nickName) {
      savedUserInfo.nickName = this.generateUniqueNickname();
    }
    
    this.setData({
      userInfo: savedUserInfo
    });
    
    // 保存到本地存储
    wx.setStorageSync('userInfo', savedUserInfo);
  },

  // 生成唯一的6位随机数字后缀昵称
  generateUniqueNickname() {
    // 常见昵称前缀
    const prefixes = ['游客', '旅行者', '探索者', '漫步者', '行者', '游侠', '旅人', '背包客', '风景控', '旅途'];
    
    // 随机选择一个前缀
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    // 生成6位随机数字
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    
    // 组合昵称
    const nickname = prefix + randomNum;
    
    // 检查是否已存在
    const usedNicknames = wx.getStorageSync('usedNicknames') || [];
    
    // 如果昵称已存在，重新生成
    if (usedNicknames.includes(nickname)) {
      return this.generateUniqueNickname();
    }
    
    // 将新昵称添加到已使用列表
    usedNicknames.push(nickname);
    wx.setStorageSync('usedNicknames', usedNicknames);
    
    return nickname;
  },

  /** 点击箭头：修改头像或用户名 */
  onEditProfile() {
    wx.showActionSheet({
      itemList: ['更换头像', '修改昵称'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this._chooseAvatar();
        } else if (res.tapIndex === 1) {
          this.setData({
            showNicknameEdit: true,
            tempNickname: this.data.userInfo.nickName || ''
          });
        }
      }
    });
  },

  _chooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempPath = res.tempFiles && res.tempFiles[0] && res.tempFiles[0].tempFilePath;
        if (tempPath) {
          const userInfo = this.data.userInfo;
          userInfo.avatarUrl = tempPath;
          this.setData({ userInfo });
          wx.setStorageSync('userInfo', userInfo);
          wx.showToast({ title: '头像已更新', icon: 'success' });
        }
      },
      fail: (err) => {
        if (err.errMsg && !err.errMsg.includes('cancel')) {
          wx.showToast({ title: '选择失败', icon: 'none' });
        }
      }
    });
  },

  onNicknameInput(e) {
    this.setData({ tempNickname: e.detail.value || '' });
  },

  onNicknameConfirm() {
    const nick = (this.data.tempNickname || '').trim();
    if (!nick) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }
    
    // 检查昵称格式（用户昵称 + 6位数字）
    const nicknameRegex = /^.{1,10}\d{6}$/;
    if (!nicknameRegex.test(nick)) {
      wx.showToast({ title: '昵称格式：文字+6位数字', icon: 'none' });
      return;
    }
    
    // 检查昵称是否已被使用
    const usedNicknames = wx.getStorageSync('usedNicknames') || [];
    const currentNickname = this.data.userInfo.nickName;
    
    // 允许保留原来的昵称
    if (usedNicknames.includes(nick) && nick !== currentNickname) {
      wx.showToast({ title: '该昵称已被使用', icon: 'none' });
      return;
    }
    
    // 从旧列表移除，添加到新列表
    if (currentNickname && usedNicknames.includes(currentNickname)) {
      const index = usedNicknames.indexOf(currentNickname);
      usedNicknames.splice(index, 1);
    }
    usedNicknames.push(nick);
    wx.setStorageSync('usedNicknames', usedNicknames);
    
    // 更新用户信息
    const userInfo = this.data.userInfo;
    userInfo.nickName = nick;
    this.setData({
      userInfo,
      showNicknameEdit: false,
      tempNickname: ''
    });
    
    wx.setStorageSync('userInfo', userInfo);
    wx.showToast({ title: '昵称已更新', icon: 'success' });
  },

  onNicknameCancel() {
    this.setData({ showNicknameEdit: false, tempNickname: '' });
  },

  // 点击顶部四个快捷入口：跳转到对应页面
  onShortcutTap(e) {
    const { key, url } = e.currentTarget.dataset || {};
    if (url) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({ title: '即将开放', icon: 'none' });
    }
  },

  onFeatureTap(e) {
    const { key } = e.currentTarget.dataset || {};
    if (!key) return;
    if (key === 'companion') {
      wx.navigateTo({ url: '/pages/companion/companion' });
    } else if (key === 'privacy') {
      wx.navigateTo({ url: '/pages/privacy/privacy' });
    } else if (key === 'userAgreement') {
      wx.navigateTo({ url: '/pages/user-agreement/user-agreement' });
    } else if (key === 'service') {
      wx.makePhoneCall({ phoneNumber: '17839229410' });
    } else if (key === 'about') {
      wx.navigateTo({ url: '/pages/about/about' });
    }
  }
});