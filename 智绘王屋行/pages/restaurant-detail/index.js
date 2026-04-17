const {
  getMerchantDetailById,
  getQAForMerchant,
  addQuestion,
  addAnswer,
  getReviewsForMerchant,
  submitReview,
  deleteReview,
  getDishLikes,
  toggleDishLike,
  MOOD_OPTIONS
} = require('../../utils/foodMerchants.js');

Page({
  data: {
    merchant: null,
    qaList: [],
    reviews: [],
    dishLikes: {},   // { [dishName]: true } 当前用户已点赞的菜
    // 回答输入：{ questionId: text }；高亮发送按钮用 replyBtnActive[qid]
    replyInputs: {},
    replyBtnActive: {},
    // 提问弹窗（WXML 内禁止写 .trim() 等 JS 方法）
    showAskModal: false,
    askInput: '',
    askInputLen: 0,
    askCanSubmit: false,
    // 评价弹窗
    showReviewModal: false,
    revScore: 0,
    revMood: '',
    revContent: '',
    revContentLen: 0,
    revCanSubmit: false,
    scoreStarList: [1, 2, 3, 4, 5],
    moodOptions: MOOD_OPTIONS,
    // 用户信息（从 storage 读）
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    userInfo: { avatarUrl: '', nickName: '' }
  },

  onLoad(options) {
    const id = options.id;
    console.log('[restaurant-detail] onLoad id=', id);
    const merchant = getMerchantDetailById(id);
    if (!merchant) {
      wx.showToast({ title: '商家不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ merchant });
    this._loadUserInfo();
    this._loadDishLikes();
  },

  _loadDishLikes() {
    const m = this.data.merchant;
    if (m) {
      this.setData({ dishLikes: getDishLikes(m.id) });
    }
  },

  onShow() {
    // 每次显示页面时刷新问答、评价与店铺综合分（评价变更后重算）
    const m = this.data.merchant;
    if (m) {
      const id = m.id;
      this.setData({
        merchant: getMerchantDetailById(id),
        qaList: getQAForMerchant(id),
        reviews: getReviewsForMerchant(id)
      });
    }
  },

  onReady() {
    const m = this.data.merchant;
    if (m && m.nameShort) {
      wx.setNavigationBarTitle({ title: m.nameShort });
    }
  },

  // ── 用户信息 ──
  _loadUserInfo() {
    try {
      const stored = wx.getStorageSync('food_user_info');
      if (stored) {
        const info = JSON.parse(stored);
        this.setData({ userInfo: info });
      }
    } catch {}
    // 补充 userInfo 到 Storage（供后续登录等用）
    this._saveUserInfo();
  },

  _saveUserInfo() {
    const { userInfo } = this.data;
    try {
      wx.setStorageSync('food_user_info', JSON.stringify(userInfo));
    } catch {}
  },

  preventTouchMove() {},

  // ── 提问 ──
  onAskTap() {
    this.setData({
      showAskModal: true,
      askInput: '',
      askInputLen: 0,
      askCanSubmit: false
    });
  },

  onAskCancel() {
    this.setData({
      showAskModal: false,
      askInput: '',
      askInputLen: 0,
      askCanSubmit: false
    });
  },

  onAskInput(e) {
    const v = e.detail.value || '';
    this.setData({
      askInput: v,
      askInputLen: v.length,
      askCanSubmit: v.trim().length > 0
    });
  },

  onAskSubmit() {
    const text = this.data.askInput.trim();
    if (!text) {
      wx.showToast({ title: '请输入问题', icon: 'none' });
      return;
    }
    if (text.length < 4) {
      wx.showToast({ title: '问题至少 4 个字', icon: 'none' });
      return;
    }
    const m = this.data.merchant;
    const nick = this.data.userInfo.nickName || '游客';
    addQuestion(m.id, text, nick);
    this.setData({
      showAskModal: false,
      askInput: '',
      askInputLen: 0,
      askCanSubmit: false,
      qaList: getQAForMerchant(m.id)
    });
    wx.showToast({ title: '提问成功', icon: 'success' });
  },

  // ── 回答 ──
  onReplyInput(e) {
    const qid = e.currentTarget.dataset.qid || '';
    const val = e.detail.value || '';
    const inputs = { ...this.data.replyInputs, [qid]: val };
    const active = { ...this.data.replyBtnActive, [qid]: val.trim().length > 0 };
    this.setData({ replyInputs: inputs, replyBtnActive: active });
  },

  onReplyConfirm(e) {
    const qid = e.currentTarget.dataset.qid || '';
    const text = (this.data.replyInputs[qid] || '').trim();
    if (!text) {
      wx.showToast({ title: '请输入回答内容', icon: 'none' });
      return;
    }
    const m = this.data.merchant;
    if (!m) {
      wx.showToast({ title: '商家信息异常', icon: 'none' });
      return;
    }
    const nick = this.data.userInfo.nickName || '热心游客';
    const ok = addAnswer(m.id, qid, text, nick);
    if (ok) {
      const inputs = { ...this.data.replyInputs };
      const active = { ...this.data.replyBtnActive };
      delete inputs[qid];
      delete active[qid];
      this.setData({
        replyInputs: inputs,
        replyBtnActive: active,
        qaList: getQAForMerchant(m.id)
      });
      wx.showToast({ title: '回答成功', icon: 'success' });
    } else {
      wx.showToast({ title: '回答失败，问题可能已删除', icon: 'none' });
    }
  },

  // ── 发表评价 ──
  onWriteReviewTap() {
    this.setData({
      showReviewModal: true,
      revScore: 0,
      revMood: '',
      revContent: '',
      revContentLen: 0,
      revCanSubmit: false
    });
  },

  onReviewCancel() {
    this.setData({ showReviewModal: false });
  },

  onScoreTap(e) {
    const star = Number(e.currentTarget.dataset.star) || 0;
    const content = this.data.revContent || '';
    this.setData({
      revScore: star,
      revCanSubmit: star > 0 && content.trim().length > 0
    });
  },

  onMoodTap(e) {
    const mood = e.currentTarget.dataset.mood || '';
    this.setData({ revMood: mood });
  },

  onReviewContentInput(e) {
    const v = e.detail.value || '';
    const score = this.data.revScore || 0;
    this.setData({
      revContent: v,
      revContentLen: v.length,
      revCanSubmit: score > 0 && v.trim().length > 0
    });
  },

  onReviewSubmit() {
    const { revScore, revContent } = this.data;
    if (revScore === 0) {
      wx.showToast({ title: '请选择评分', icon: 'none' });
      return;
    }
    if (!revContent.trim()) {
      wx.showToast({ title: '请输入评价内容', icon: 'none' });
      return;
    }
    if (revContent.trim().length < 4) {
      wx.showToast({ title: '评价至少 4 个字', icon: 'none' });
      return;
    }
    const m = this.data.merchant;
    const nick = this.data.userInfo.nickName || '游客';
    const avatarUrl = this.data.userInfo.avatarUrl || '';

    submitReview(m.id, {
      nick,
      avatarUrl,
      mood: this.data.revMood || '不错',
      rating: revScore,
      content: revContent.trim(),
      images: [],
      merchantName: m.nameShort,
      merchantImageUrl: m.imageUrl
    });

    this.setData({
      showReviewModal: false,
      revScore: 0,
      revMood: '',
      revContent: '',
      revContentLen: 0,
      revCanSubmit: false,
      merchant: getMerchantDetailById(m.id),
      reviews: getReviewsForMerchant(m.id)
    });
    wx.showToast({ title: '评价发布成功', icon: 'success' });
  },

  // ── 删除评价 ──
  onDeleteReviewTap(e) {
    const revId = e.currentTarget.dataset.revid || '';
    if (!revId) return;
    const m = this.data.merchant;
    wx.showModal({
      title: '确认删除',
      content: '确定删除这条评价吗？',
      success: (res) => {
        if (res.confirm) {
          deleteReview(m.id, revId);
          this.setData({
            merchant: getMerchantDetailById(m.id),
            reviews: getReviewsForMerchant(m.id)
          });
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  },

  // ── 统计数字点击（滚动到评价区） —
  onReviewCountTap() {
    // 小程序 scroll-into-view 需要 id，简单跳顶部再让用户自行滚动
    wx.showToast({ title: '向下滚动查看评价', icon: 'none' });
  },

  // ── 其余占位 ──
  onAlbumTap() {
    wx.showToast({ title: '相册功能开发中', icon: 'none' });
  },

  onVideoTap() {
    wx.showToast({ title: '视频功能开发中', icon: 'none' });
  },

  onRankTap() {
    wx.showToast({ title: '榜单详情开发中', icon: 'none' });
  },

  onMoreServiceTap() {
    wx.showToast({ title: '详情开发中', icon: 'none' });
  },

  onMapTap() {
    wx.showToast({ title: '地图导航开发中', icon: 'none' });
  },

  onGrabTap(e) {
    const title = (e.currentTarget.dataset && e.currentTarget.dataset.title) || '';
    console.log('[restaurant-detail] grab', title);
    wx.showToast({ title: '抢购功能开发中', icon: 'none' });
  },

  onDishLikeTap(e) {
    const dishName = e.currentTarget.dataset.dish || '';
    if (!dishName) return;
    const m = this.data.merchant;
    if (!m) return;
    toggleDishLike(m.id, dishName);
    this.setData({ dishLikes: getDishLikes(m.id) });
  },

  onMoreDishesTap() {
    wx.showToast({ title: '推荐菜开发中', icon: 'none' });
  },

  onAllQaTap() {
    wx.showToast({ title: '问大家开发中', icon: 'none' });
  },

  onAllReviewsTap() {
    wx.showToast({ title: '全部评价开发中', icon: 'none' });
  }
});
