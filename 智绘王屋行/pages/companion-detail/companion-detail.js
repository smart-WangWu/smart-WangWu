Page({
  data: {
    // 图片相关
    imageList: [],
    currentImageIndex: 0,
    
    // 基本信息
    id: '',
    title: '',
    content: '',
    location: '',
    publishTime: '',
    
    // 作者信息
    authorId: '',
    authorName: '',
    authorAvatar: '',
    isVip: false,
    isFollowed: false,
    
    // 互动数据
    likes: 0,
    comments: 0,
    collects: 0,
    isLiked: false,
    isCollected: false,
    
    // 评论区
    commentList: []
  },

  onLoad(options) {
    // 解析参数
    const {
      id,
      title,
      cover,
      blogger,
      authorAvatar,
      authorTags,
      likes,
      comments,
      collects,
      desc,
      detail,
      tags,
      content
    } = options;
    
    // 处理图片列表
    let imageList = [];
    if (cover) {
      imageList = cover.split(',').map(url => decodeURIComponent(url.trim()));
    }
    
    // 模拟评论数据
    const mockCommentList = [
      {
        id: 1,
        name: '旅行爱好者',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg',
        content: '这个地方太美了！下次一定要去打卡',
        time: '2小时前',
        likes: 12,
        isLiked: false,
        subComments: [
          { id: 101, name: '山水旅行者', content: '确实很棒，建议早点去，人少' }
        ]
      },
      {
        id: 2,
        name: '摄影达人',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg',
        content: '照片拍得真好看，用的什么相机呀？',
        time: '5小时前',
        likes: 8,
        isLiked: true,
        subComments: []
      },
      {
        id: 3,
        name: '王屋山本地人',
        avatar: 'https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png',
        content: '欢迎大家来玩！有什么问题可以问我',
        time: '1天前',
        likes: 56,
        isLiked: false,
        subComments: []
      }
    ];
    
    this.setData({
      id: id || '',
      imageList: imageList,
      title: decodeURIComponent(title || ''),
      content: decodeURIComponent(content || detail || desc || ''),
      location: '王屋山风景区',
      publishTime: this.formatTime(Date.now() - Math.random() * 86400000 * 3),
      authorId: 'author_001',
      authorName: decodeURIComponent(blogger || '随行客'),
      authorAvatar: decodeURIComponent(authorAvatar || ''),
      isVip: Math.random() > 0.7,
      likes: parseInt(likes || '0'),
      comments: parseInt(comments || '0'),
      collects: parseInt(collects || '0'),
      commentList: mockCommentList
    });
  },
  
  // 格式化时间
  formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const hour = 3600000;
    const day = 86400000;
    
    if (diff < hour) {
      return Math.floor(diff / 60000) + '分钟前';
    } else if (diff < day) {
      return Math.floor(diff / hour) + '小时前';
    } else if (diff < day * 7) {
      return Math.floor(diff / day) + '天前';
    } else {
      const date = new Date(timestamp);
      return `${date.getMonth() + 1}-${date.getDate()}`;
    }
  },
  
  // 图片预览
  onImagePreview(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.imageList[index],
      urls: this.data.imageList
    });
  },
  
  // 图片轮播切换
  onSwiperChange(e) {
    this.setData({
      currentImageIndex: e.detail.current
    });
  },
  
  // 作者点击
  onAuthorTap(e) {
    const authorId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看作者主页',
      icon: 'none'
    });
  },
  
  // 关注/取消关注
  onFollow() {
    this.setData({
      isFollowed: !this.data.isFollowed
    });
    wx.showToast({
      title: this.data.isFollowed ? '已关注' : '已取消关注',
      icon: 'none'
    });
  },
  
  // 点赞
  onLike() {
    this.setData({
      isLiked: !this.data.isLiked,
      likes: this.data.isLiked ? this.data.likes - 1 : this.data.likes + 1
    });
  },
  
  // 评论
  onComment() {
    this.onCommentInput();
  },
  
  // 收藏
  onCollect() {
    this.setData({
      isCollected: !this.data.isCollected,
      collects: this.data.isCollected ? this.data.collects - 1 : this.data.collects + 1
    });
    wx.showToast({
      title: this.data.isCollected ? '已收藏' : '已取消收藏',
      icon: 'none'
    });
  },
  
  // 分享
  onShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  
  // 评论输入
  onCommentInput() {
    wx.showModal({
      title: '发表评论',
      editable: true,
      placeholderText: '说点什么...',
      success: (res) => {
        if (res.confirm && res.content) {
          const newComment = {
            id: Date.now(),
            name: '我',
            avatar: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg',
            content: res.content,
            time: '刚刚',
            likes: 0,
            isLiked: false,
            subComments: []
          };
          
          const commentList = this.data.commentList;
          commentList.unshift(newComment);
          
          this.setData({
            commentList: commentList,
            comments: this.data.comments + 1
          });
          
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 评论点赞
  onCommentLike(e) {
    const commentId = e.currentTarget.dataset.id;
    const commentList = this.data.commentList.map(item => {
      if (item.id === commentId) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    });
    
    this.setData({ commentList });
  },
  
  // 回复
  onReply(e) {
    const commentId = e.currentTarget.dataset.id;
    const comment = this.data.commentList.find(item => item.id === commentId);
    
    wx.showModal({
      title: `回复 @${comment.name}`,
      editable: true,
      placeholderText: '说点什么...',
      success: (res) => {
        if (res.confirm && res.content) {
          const newSubComment = {
            id: Date.now(),
            name: '我',
            content: res.content
          };
          
          const updatedCommentList = this.data.commentList.map(item => {
            if (item.id === commentId) {
              const subComments = [...(item.subComments || []), newSubComment];
              return { ...item, subComments };
            }
            return item;
          });
          
          this.setData({ commentList: updatedCommentList });
          
          wx.showToast({
            title: '回复成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 分享配置
  onShareAppMessage() {
    return {
      title: this.data.title,
      path: `/pages/companion-detail/companion-detail?id=${this.data.id}&title=${encodeURIComponent(this.data.title)}&cover=${encodeURIComponent(this.data.imageList[0] || '')}`
    };
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.data.title,
      query: `id=${this.data.id}`
    };
  }
});
