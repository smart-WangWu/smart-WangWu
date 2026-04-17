Page({
  data: {
    currentTab: 'following',
    followingCount: 0,
    followersCount: 0,
    followList: []
  },

  onLoad() {
    // 从本地存储加载关注列表
    this.loadFollowList();
  },

  onShow() {
    // 每次页面显示时刷新数据
    this.loadFollowList();
  },

  // 加载列表数据
  loadFollowList() {
    // 从本地存储获取关注列表
    const followingData = wx.getStorageSync('followingList') || [];
    const followersData = wx.getStorageSync('followersList') || [];
    
    const { currentTab } = this.data;
    
    if (currentTab === 'following') {
      this.setData({
        followList: followingData,
        followingCount: followingData.length
      });
    } else {
      this.setData({
        followList: followersData,
        followersCount: followersData.length
      });
    }
  },

  // 切换标签
  onTabChange(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.currentTab) return;
    
    this.setData({
      currentTab: tab,
      followList: []
    });
    
    this.loadFollowList();
  },

  // 点击用户卡片 - 跳转作者主页
  onUserTap(e) {
    const userId = e.currentTarget.dataset.id;
    const user = this.data.followList.find(item => item.id === userId);
    if (!user) return;
    
    // 跳转到随行客详情页（模拟用户内容）
    const params = {
      id: user.id,
      title: encodeURIComponent(`${user.nickname} 的分享`),
      cover: encodeURIComponent(user.avatar),
      blogger: encodeURIComponent(user.nickname),
      authorAvatar: encodeURIComponent(user.avatar),
      likes: user.followerCount,
      comments: Math.floor(user.followerCount * 0.1),
      collects: Math.floor(user.followerCount * 0.05)
    };
    
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    wx.navigateTo({
      url: `/pages/companion-detail/companion-detail?${queryString}`
    });
  },

  // 取关
  onUnfollow(e) {
    const userId = e.currentTarget.dataset.id;
    const { currentTab, followList } = this.data;
    
    wx.showModal({
      title: '确认取消关注',
      content: '确定要取消关注这个人吗？',
      success: (res) => {
        if (res.confirm) {
          // 从本地存储移除
          if (currentTab === 'following') {
            let followingList = wx.getStorageSync('followingList') || [];
            followingList = followingList.filter(item => item.id !== userId);
            wx.setStorageSync('followingList', followingList);
            this.setData({
              followList: followingList,
              followingCount: followingList.length
            });
          } else {
            let followersList = wx.getStorageSync('followersList') || [];
            followersList = followersList.filter(item => item.id !== userId);
            wx.setStorageSync('followersList', followersList);
            this.setData({
              followList: followersList,
              followersCount: followersList.length
            });
          }
          
          wx.showToast({
            title: '已取消关注',
            icon: 'success'
          });
        }
      }
    });
  },

  // 跳转随行客页面
  onGotoCompanion() {
    wx.navigateTo({
      url: '/pages/companion/companion'
    });
  },

  onPullDownRefresh() {
    this.loadFollowList();
    wx.stopPullDownRefresh();
  }
});
