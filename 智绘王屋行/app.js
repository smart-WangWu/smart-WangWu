// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库');
    } else {
      wx.cloud.init({
        // 与同学共用同一 AppID 时，必须填「该 AppID 对应的」云环境 ID，两人一致。在微信开发者工具 → 云开发 → 左上角可看到当前环境 ID
        env: 'cloud1-9gmowq9c924cc435',
        traceUser: true,
      });
    }
    // ----------------------------
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 提前加载刀隶体（天坛极顶、今日景区客流用）
    // 需在微信公众平台 - 开发 - 开发管理 - 开发设置 - 服务器域名 - request 合法域名 中添加：https://at.alicdn.com
    wx.loadFontFace({
      family: '阿里妈妈刀隶体 Regular',
      source: 'url("https://at.alicdn.com/wf/webfont/5LuYNrGy8FTF/3ehsW3D6cVN0.woff")',
      global: true,
      success: () => {},
      fail: (e) => console.warn('刀隶体加载失败，请检查 request 合法域名是否包含 at.alicdn.com', e)
    })
    wx.loadFontFace({
      family: '阿里妈妈刀隶体 客流',
      source: 'url("https://at.alicdn.com/wf/webfont/5LuYNrGy8FTF/6uVGLuPy6GCa.woff")',
      global: true,
      success: () => {},
      fail: () => {}
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
