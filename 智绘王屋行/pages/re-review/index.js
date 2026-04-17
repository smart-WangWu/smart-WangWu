Page({
  onLoad() {
    wx.redirectTo({
      url: '/pages/my-comment/my-comment',
      fail: () => {
        wx.navigateBack({ delta: 1 });
      }
    });
  }
});
