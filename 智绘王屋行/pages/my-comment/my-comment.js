const { getAllReviews, deleteReview } = require('../../utils/foodMerchants.js');

Page({
  data: {
    reviewList: [],
    totalCount: 0
  },

  onLoad() {},

  onShow() {
    this._loadReviews();
  },

  onPullDownRefresh() {
    this._loadReviews();
    wx.stopPullDownRefresh();
  },

  _loadReviews() {
    const list = getAllReviews();
    this.setData({
      reviewList: list,
      totalCount: list.length
    });
  },

  // 跳转商家详情
  onMerchantTap(e) {
    const id = e.currentTarget.dataset.id;
    if (id) {
      wx.navigateTo({ url: `/pages/restaurant-detail/index?id=${id}` });
    }
  },

  // 删除评论
  onDelTap(e) {
    const { id, merchantid } = e.currentTarget.dataset || {};
    if (!id) return;
    wx.showModal({
      title: '确认删除',
      content: '确定删除这条评论吗？',
      success: (res) => {
        if (res.confirm) {
          deleteReview(Number(merchantid) || 0, id);
          this._loadReviews();
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  },

  // 空态按钮：跳转美食列表
  onGoEat() {
    wx.switchTab({ url: '/pages/contact/contact' });
  }
});
