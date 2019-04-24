const app = getApp()
var api = require('../../utils/api.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    openid: app.globalData.openid,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    titleList: [
      [{
        "contentColor": "#999999",
        "icon": "/assets/images/content/zh_xxxq.png",
        "isNeedLogin": 1,
        "link": "/pages/login/login",
        "showRedPointType": 0,
        "title": "完善个人资料",
        "isLogin": true
      }],
      [{
        "contentColor": "#999999",
        "icon": "/assets/images/content/zh_xx.png",
        "isNeedLogin": 1,
        "link": "/pages/interest/interest",
        "showRedPointType": 0,
        "title": "我的收藏",
        "isLogin": false
      }],
      [{
        "content": "",
        "contentColor": "#999999",
        "icon": "/assets/images/content/zh_set.png",
        "isNeedLogin": 0,
        "link": "/pages/setting/setting",
        "showRedPointType": 0,
        "title": "设置",
        "isLogin": false
      },
      {
        "content": "",
        "contentColor": "#999999",
        "icon": "/assets/images/content/zh_help.png",
        "isNeedLogin": 0,
        "link": "/pages/help/help",
        "showRedPointType": 0,
        "title": "帮助与反馈",
        "isLogin": false
      }]
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (!wx.getStorageSync('openid')){
      this.onGetOpenid();
    }    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },
  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.db_new_user();
  },

  db_new_user: function () {
    let tempuserInfo = this.data.userInfo;
    tempuserInfo.openid = this.data.openid;    
    api.post1('/newUser', tempuserInfo,
      function (res) {
        if (res.data != undefined) {
          let userInfo = res.data;          
          wx.setStorageSync('userInfo', userInfo);
          app.globalData.id = userInfo.id;
          wx.showToast({
            title: '登录成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })

        }

      }, null)
  },
 
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        this.setData({
          openid: res.result.openid,
        })
        app.openid = res.result.openid;
        wx.setStorageSync('openid', res.result.openid);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },  
  onCellClick(e) {
    var needLogin = e.currentTarget.dataset.isLogin;
    if (needLogin && !getApp().isLogin()) {
      this.onLogin()
      return
    }
    var url = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: url
    })
  },
})