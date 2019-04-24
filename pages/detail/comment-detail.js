var api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: null,
    navTitle: '评论详情',
    loadingStatus: 1,
    courseId: 37,
    pid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      courseId: options.courseId,
      pid: options.pid
    })
    this.getComments()
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

  getComments() {
    let self = this
    api.get('/edu/comment/getCommenPageByCourseNew', {
        cid: self.data.courseId,
        pid: self.data.pid
      },
      function(data) {
        self.setData({
          comments: data.content.records
        })
        if (self.data.comments.length == data.content.total) {
          self.setData({
            loadingStatus: 2
          })
        }
      },
      function(e) {})
  },
  send(e) {
    let self = this
    api.post('/edu/comment/addComment', {
        cid: this.data.courseId,
        uid: getApp().globalData.userId,
        content: e.detail.value,
        pid: this.data.pid
      },
      function(data) {
        console.log(data)
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          duration: 2000
        })
        self.getComments()
      },
      function(e) {
        console.log(e)
      })
  }
})