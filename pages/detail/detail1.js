// pages/detail/detail.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    detailInfo: {},
    teacherInfo: {},
    surveys: [],
    messages: [],
    tabList: {
      1: '线上',
      2: '线下',
      3: '专栏'
    },
    teacherId: null,
    showLetter: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options.id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getDetail()
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

  getDetail() {
    let self = this
    api.get('/edu/course/getCourseInfoById', {
        id: self.data.id,
        uid: getApp().globalData.userId
      },
      function(data) {
        self.data.teacherId = data.content.userInfo.id
        console.log(data.content)
        self.setData({
          detailInfo: data.content.course,
          teacherInfo: data.content.userInfo,
          messages: data.content.message.data,
          surveys: data.content.survey.data,
          chapters: data.content.chapter.data
        })
      }, null)
  },

  playVideo() {
    let self = this
    api.get('/edu/video/getRealDownloadUrl', {
        downloadUrl: self.data.detailInfo.video
      },
      function(res) {
        console.log(res)
        self.setData({
          videoURL: res.content,
          isPlayingVideo: true
        })

        wx.navigateTo({
          url: '/pages/detail/video-play?url=' + encodeURIComponent(self.data.videoURL)
        })
      }, null)
  },

  onLetter() {
    this.setData({
      showLetter: true
    })
  },

  inputClickedIndex(e) {
    if (e.detail.index == 0) {
      this.setData({
        showLetter: false
      })
    } else {
      let self = this
      if (!getApp().globalData.userId) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return
      }
      if (!e.detail.value) {
        wx.showToast({
          title: '私信内容不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      api.post('/edu/message/addMessage', {
          sendToIds: self.data.teacherId,
          sendFrom: getApp().globalData.userId,
          content: e.detail.value,
          type: 3
        },
        function(data) {
          wx.showToast({
            title: '私信发送成功',
            icon: 'none',
            duration: 2000
          })
          self.setData({
            showLetter: false
          })
        },
        function() {
          wx.showToast({
            title: '私信发送失败，请稍后再试',
            icon: 'none',
            duration: 2000
          })
        })
    }
  },

  gotoTosurveys(e) {
    let id = e.currentTarget.dataset.id
    let surveyId = e.currentTarget.dataset.index
    if(id==1) return
    wx.navigateTo({
      url: '/pages/questionnaire/questionnaire?id=' + surveyId,
    })
  }
})