// pages/help/help.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpId: 1,
    helpLists: ['关于取消课程与变更策略', '关于评分系统说明', '关于投诉争议的说明'],
    focus: false,
    textareaval: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onBack() {
    wx.navigateBack({

    })
  },

  onTagClicked(e) {
    let index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/feedback/feedback?id=' + index
    })
  },

  bindFormSubmit(e) {
    if (!e.detail.value.textarea) {
      wx.showToast({
        title: '反馈不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let newbug = {};
    newbug.openid = wx.getStorageSync('openid');
    newbug.descript = e.detail.value.textarea;
    api.post1('/newBug', newbug,
      function(res) {
        wx.showToast({
          title: '感谢您的宝贵意见，我们会尽快回复',
          icon: 'none',
          duration: 2000
        })
        this.setData({
          textareaval: ''
        })
      }.bind(this),
      function(res) {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000
        })
      })
  }
})