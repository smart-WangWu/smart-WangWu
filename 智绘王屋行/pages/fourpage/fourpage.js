// pages/fourpage/fourpage.js — 王屋山美食推荐列表

const { MERCHANT_LIST } = require('../../utils/foodMerchants.js');

Page({
  data: {
    query: {},
    merchantList: MERCHANT_LIST
  },

  onLoad(options) {
    this.setData({ query: options });
    console.log('[food-fourpage] onLoad', options);
  },

  onReady() {
    wx.setNavigationBarTitle({ title: '王屋山美食' });
  },

  goRestaurantDetail(id) {
    console.log('[food-fourpage] navigate restaurant-detail id=', id);
    wx.navigateTo({
      url: `/pages/restaurant-detail/index?id=${id}`
    });
  },

  /** 点击整张卡片 */
  onMerchantCardTap(e) {
    const id = e.currentTarget.dataset.id;
    this.goRestaurantDetail(id);
  },

  /** 查看详情 */
  onMerchantDetailTap(e) {
    const id = e.currentTarget.dataset.id;
    this.goRestaurantDetail(id);
  }
});
