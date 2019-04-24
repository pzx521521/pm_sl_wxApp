//app.js
App({
  
  onLaunch: function () {
    wx.cloud.init();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  isLogin () {
    if (this.openid != null && this.openid != '') {
      if (this.userInfo.nickName != null && this.userInfo.nickName != ''){
        return true
      }
      return false
    }
    return false
  },
  globalData:{
    userInfo: wx.getStorageSync('userInfo'),
    openid: wx.getStorageSync('openid'),
    userid: wx.getStorageSync('userid'),
  },
  
})