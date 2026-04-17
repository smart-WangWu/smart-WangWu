// pages/contact/contact.js
const {
  MERCHANT_LIST,
  getMerchantDetailById
} = require('../../utils/foodMerchants.js');
const {
  HOMESTAY_LIST,
  getHomestayDetailById
} = require('../../utils/homestays.js');

Page({
  data: {
    activeTab: 'food', // 'food' | 'homestay'

    // 美食榜单（按评分降序）
    foodRanking: (() => {
      const sorted = [...MERCHANT_LIST]
        .sort((a, b) => b.rating - a.rating);
      return sorted.map((m, i) => {
        const detail = getMerchantDetailById(m.id);
        return {
          ...detail,
          rank: i + 1,
          medal: i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`,
          barWidth: Math.round(((sorted.length - i) / sorted.length) * 100)
        };
      });
    })(),

    // 民宿榜单（按评分降序）
    homestayRanking: (() => {
      const sorted = [...HOMESTAY_LIST]
        .sort((a, b) => b.rating - a.rating);
      return sorted.map((h, i) => {
        const detail = getHomestayDetailById(h.id);
        return {
          ...detail,
          rank: i + 1,
          medal: i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`,
          barWidth: Math.round(((sorted.length - i) / sorted.length) * 100)
        };
      });
    })()
  },

  // Tab 切换
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.activeTab) return;
    this.setData({ activeTab: tab });
  },

  // 跳转美食详情
  goFoodDetail(e) {
    const id = e.currentTarget.dataset.id || (e.detail && e.detail.id);
    if (!id) return;
    wx.navigateTo({ url: `/pages/restaurant-detail/index?id=${id}` });
  },

  // 跳转民宿详情
  goHomestayDetail(e) {
    const id = e.currentTarget.dataset.id || (e.detail && e.detail.id);
    if (!id) return;
    wx.navigateTo({ url: `/pages/homestay-detail/index?id=${id}` });
  },

  // 体验按钮（点击 +1，视觉反馈）
  onExperience(e) {
    const { tab, id } = e.currentTarget.dataset;
    const key = tab === 'food' ? 'foodRanking' : 'homestayRanking';
    const list = this.data[key].map(item => {
      if (item.id !== id) return item;
      return { ...item, experienceCount: item.experienceCount + 1 };
    });
    this.setData({ [key]: list });
    wx.showToast({ title: '已体验 +1', icon: 'none', duration: 1200 });
  }
});
