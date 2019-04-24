var api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPasswordPopup: false,    
    userInfo: wx.getStorageSync('userInfo'),
  },
  onBack() {
    wx.navigateBack({
      
    })
  },
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },  
  bindFormSubmit(e) {
    var _this = this;
    let userInfo = this.data.userInfo;
    userInfo.openid = this.data.userInfo.openid;
    userInfo.phone = e.detail.value.useraccount;
    userInfo.lockNum = e.detail.value.userpassword;
    api.post1('/updateUser', userInfo,
      function(res) {
        wx.showToast({
          title: '更新成功',
          icon: 'none',
          duration: 2000
        });        
        wx.setStorageSync('userInfo', userInfo);
        _this.onBack(); 
      }      
    );    
  },
})