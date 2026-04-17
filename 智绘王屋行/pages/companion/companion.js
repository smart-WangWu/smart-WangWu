// pages/companion/companion.js
Page({
  data: {
    // 热门话题列表
    topicList: [
      { id: 'all', name: '推荐', icon: '🔥' },
      { id: 'scenery', name: '风景', icon: '🏔️' },
      { id: 'food', name: '美食', icon: '🍜' },
      { id: 'homestay', name: '民宿', icon: '🏡' },
      { id: 'tips', name: '攻略', icon: '📝' },
      { id: 'autumn', name: '秋色', icon: '🍂' },
      { id: 'photo', name: '打卡', icon: '📸' },
      { id: 'culture', name: '文化', icon: '🏛️' }
    ],
    currentTopic: 'all',  // 当前选中的话题
    
    // 照片列表
    photoList: [],
    leftPhotos: [],
    rightPhotos: [],
    
    // 分页
    page: 1,
    pageSize: 10,
    isLoading: false,
    noMore: false,
    
    // 用户信息（模拟）
    userInfo: {
      nickname: '王屋山游客',
      avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg'
    }
  },

  onLoad() {
    this.loadPhotos();
  },

  onShow() {
    // 检查是否有新发布的笔记
    const newPost = wx.getStorageSync('newPost');
    if (newPost) {
      wx.removeStorageSync('newPost');
      // 将新笔记添加到列表顶部
      const list = this.data.photoList;
      list.unshift(newPost);
      this.distributePhotos();
      wx.showToast({ title: '发布成功', icon: 'success' });
    }
  },

  // 模拟照片数据
  getMockPhotos(topic, page, pageSize) {
    const basePhotos = [
      {
        id: 1,
        title: '天坛极顶的云海太美了！仿佛置身仙境',
        image: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E5%A4%A9%E5%9D%9B%E6%9E%81%E9%A1%B6.png',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg',
        nickname: '山水旅行者',
        likes: 234,
        comments: 45,
        topic: 'scenery'
      },
      {
        id: 2,
        title: '王屋山的秋天，金黄的银杏叶美翻了',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181451334.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg',
        nickname: '摄影达人小王',
        likes: 456,
        comments: 89,
        topic: 'autumn'
      },
      {
        id: 3,
        title: '道境广场的建筑太有气势了',
        image: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E9%81%93%E5%A2%83%E5%B9%BF%E5%9C%BA.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png',
        nickname: '旅行博主',
        likes: 189,
        comments: 23,
        topic: 'scenery'
      },
      {
        id: 4,
        title: '农家乐的招牌菜，味道绝了！',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg',
        nickname: '吃货小分队',
        likes: 312,
        comments: 67,
        topic: 'food'
      },
      {
        id: 5,
        title: '阳台宫古建筑群，道教文化的瑰宝',
        image: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E9%98%B3%E5%8F%B0%E5%AE%AB.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20251115233412125.png',
        nickname: '文化探索者',
        likes: 278,
        comments: 34,
        topic: 'culture'
      },
      {
        id: 6,
        title: '山里的民宿推荐，住着太舒服了',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png',
        nickname: '民宿体验师',
        likes: 567,
        comments: 123,
        topic: 'homestay'
      },
      {
        id: 7,
        title: '太乙池边的风景，如诗如画',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181502317.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg',
        nickname: '风景摄影师',
        likes: 345,
        comments: 56,
        topic: 'scenery'
      },
      {
        id: 8,
        title: '一日游攻略｜超详细路线推荐',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181526290.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20251115233449543.png',
        nickname: '旅行攻略官',
        likes: 892,
        comments: 234,
        topic: 'tips'
      },
      {
        id: 9,
        title: '索道上的风景，心跳加速的感觉',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181502317.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg',
        nickname: '冒险爱好者',
        likes: 456,
        comments: 78,
        topic: 'photo'
      },
      {
        id: 10,
        title: '王屋山红叶，错过等一年',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181451334.jpg',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20251115233412125.png',
        nickname: '秋日限定',
        likes: 678,
        comments: 145,
        topic: 'autumn'
      }
    ];

    // 根据话题过滤
    let filteredPhotos = topic === 'all' 
      ? basePhotos 
      : basePhotos.filter(p => p.topic === topic);

    // 分页
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredPhotos.slice(start, end);
  },

  // 加载照片
  loadPhotos() {
    if (this.data.isLoading || this.data.noMore) return;
    
    this.setData({ isLoading: true });
    
    // 模拟网络延迟
    setTimeout(() => {
      const newPhotos = this.getMockPhotos(
        this.data.currentTopic,
        this.data.page,
        this.data.pageSize
      );
      
      if (newPhotos.length === 0) {
        this.setData({
          isLoading: false,
          noMore: true
        });
        return;
      }
      
      // 分配到瀑布流两列
      let photoList = this.data.page === 1 ? [] : this.data.photoList;
      photoList = photoList.concat(newPhotos);
      
      this.setData({
        photoList: photoList,
        page: this.data.page + 1,
        isLoading: false
      });
      
      this.distributePhotos();
      
      if (newPhotos.length < this.data.pageSize) {
        this.setData({ noMore: true });
      }
    }, 800);
  },

  // 分配照片到两列（瀑布流）
  distributePhotos() {
    const list = this.data.photoList;
    const left = [];
    const right = [];
    
    list.forEach((photo, index) => {
      // 根据索引奇偶性分配，保持平衡
      if (index % 2 === 0) {
        left.push(photo);
      } else {
        right.push(photo);
      }
    });
    
    this.setData({
      leftPhotos: left,
      rightPhotos: right
    });
  },

  // 话题切换
  onTopicTap(e) {
    const topicId = e.currentTarget.dataset.id;
    if (topicId === this.data.currentTopic) return;
    
    this.setData({
      currentTopic: topicId,
      page: 1,
      photoList: [],
      leftPhotos: [],
      rightPhotos: [],
      noMore: false
    });
    
    this.loadPhotos();
  },

  // 加载更多
  onLoadMore() {
    this.loadPhotos();
  },

  // 照片点击 - 跳转到详情页
  onPhotoTap(e) {
    const id = e.currentTarget.dataset.id;
    const photo = this.data.photoList.find(p => p.id === id);
    if (!photo) return;
    
    // 跳转到详情页，传递必要参数
    const params = {
      id: photo.id,
      title: encodeURIComponent(photo.title),
      cover: encodeURIComponent(photo.image),
      blogger: encodeURIComponent(photo.nickname),
      authorAvatar: encodeURIComponent(photo.avatar),
      authorTags: encodeURIComponent('随行客,摄影达人'),
      likes: photo.likes,
      comments: photo.comments,
      collects: Math.floor(photo.likes * 0.3), // 模拟收藏数
      desc: encodeURIComponent(photo.title),
      detail: encodeURIComponent('这是一篇来自随行客社区的精彩分享，记录了作者在王屋山的美好旅行时光。欢迎大家点赞评论，也欢迎关注作者获取更多精彩内容。'),
      tags: encodeURIComponent('王屋山,旅行,摄影,风景')
    };
    
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    wx.navigateTo({
      url: `/pages/companion-detail/companion-detail?${queryString}`
    });
  },

  // 搜索
  onSearchTap() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    });
  },

  // 发布
  onPublishTap() {
    wx.showModal({
      title: '发布笔记',
      content: '选择发布方式',
      confirmText: '拍照',
      cancelText: '相册',
      success: (res) => {
        if (res.confirm) {
          this.chooseImage('camera');
        } else {
          this.chooseImage('album');
        }
      }
    });
  },

  // 选择图片
  chooseImage(source) {
    wx.chooseImage({
      count: 9,
      sourceType: [source],
      success: (res) => {
        // 跳转到发布页（可扩展）
        wx.showToast({
          title: `已选择${res.tempFilePaths.length}张图片`,
          icon: 'success'
        });
        
        // 模拟发布（实际项目中跳转到发布页）
        setTimeout(() => {
          const newPost = {
            id: Date.now(),
            title: '我的王屋山之旅分享',
            image: res.tempFilePaths[0],
            avatar: this.data.userInfo.avatar,
            nickname: this.data.userInfo.nickname,
            likes: 0,
            comments: 0,
            topic: this.data.currentTopic === 'all' ? 'scenery' : this.data.currentTopic
          };
          wx.setStorageSync('newPost', newPost);
          this.onShow();
        }, 1000);
      }
    });
  }
});
