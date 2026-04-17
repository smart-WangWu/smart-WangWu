Page({
  data: {
    list: []
  },
  onLoad() {},
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  }
});
