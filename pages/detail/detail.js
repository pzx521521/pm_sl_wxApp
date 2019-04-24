var api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCommentDialog: false,
    id: 0,
    detailInfo: null,
    teacherInfo: null,
    tabIndex: 0,
    tablist: ['介绍', '图文', '评价'],
    comments: [],
    introductions: null,
    enrollNum: 0,
    collectionNum: 0,
    videoURL: null,
    isPlayingVideo: false,
    isFocused: false,
    isEnroll: false
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
    this.getDetailInfo()
    this.getComments()
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

  onTeacherHeaderClicked() {
    wx.navigateTo({
      url: '/pages/teacher/teacher?id=' + this.data.teacherInfo.id
    })
  },

  getDetailInfo() {
    let self = this
    api.get('/edu/course/getCourseInfoById', {
        id: self.data.id,
        uid: getApp().globalData.userId
      },
      function(data) {
        self.setData({
          detailInfo: data.content.course,
          introductions: data.content.introduction,
          collectionNum: data.content.collectionNum,
          enrollNum: data.content.enrollNum,
          teacherInfo: data.content.userInfo,
          isEnroll: data.content.isEnroll
        })
        self.getIsFoucs()
      }, null)
  },

  onTabClicked: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index
    })
  },

  onBack() {
    wx.navigateBack({

    })
  },

  onCommentDetail(e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/detail/comment-detail?courseId=' + this.data.id + '&pid=' + item.id
    })
  },

  focus() {
    if (!getApp().isLogin()) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }

    api.post('/edu/collection/addCollection', {
        collectionid: this.data.teacherInfo.id,
        uid: getApp().globalData.userId,
        type: 2
      },
      function(res) {

      }.bind(this), null)
  },

  getIsFoucs() {
    if (!getApp().isLogin()) {
      return
    }

    let self = this
    api.get('/edu/collection/isCollection', {
        uid: getApp().globalData.userId,
        collectionid: self.data.teacherInfo.id,
        type: 2
      },
      function(data) {
        self.setData({
          isFocused: data.content
        })
      }, null)
  },

  showCommentDialog() {
    this.setData({
      showCommentDialog: true
    })
  },

  playVideo() {
    if (!this.data.isEnroll) {
      this.payOrder()
      return
    }
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

  getComments() {
    let self = this
    api.get('/edu/comment/getCommenPageByCourseNew', {
        cid: self.data.id
      },
      function(res) {
        self.setData({
          comments: res.content.records
        })
      }, null)
  },

  commentBtnClicked(e) {
    if (e.detail.index == 0) {
      this.setData({
        showCommentDialog: false
      })
    } else {
      api.post('/edu/comment/addComment', {
          uid: getApp().globalData.userId,
          cid: this.data.id,
          content: e.detail.value
        },
        function(res) {
          // this.setData({
          //   showCommentDialog: false
          // })
          this.getComments()
        }.bind(this), null)
    }
  },

  payOrder() {
    if (!getApp().isLogin()) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }

    api.post('/edu/order/addOrder', {
        cid: this.data.id,
        userid: getApp().globalData.userId,
        price: this.data.detailInfo.price
      },
      function(res) {
        let orderResult = res.content
        if (!this.data.detailInfo.price ||
          this.data.detailInfo.price === 0 ||
          this.data.detailInfo.price === '0') {
          api.post('/edu/wechat/unifiedorder', {
              cid: this.data.id,
              uid: getApp().globalData.userId,
              totalFee: 0,
              body: this.data.detailInfo.name,
              billno: orderResult
            },
            function(res) {
              wx.showToast({
                title: '课程报名成功',
                icon: 'none',
                duration: 2000
              })

            }.bind(this),
            function(res) {
              wx.showToast({
                title: '课程报名失败',
                icon: 'none',
                duration: 2000
              })
            })
        }
        wx.navigateTo({
          url: '/pages/myorder/order?orderId=' + orderResult + '&courseId=' + this.data.id
        })

      }.bind(this),
      function(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      })
  },

  tryPlay() {
    let self = this
    api.get('/edu/video/getRealDownloadUrl', {
        downloadUrl: this.data.detailInfo.video
      },
      function(data) {
        let videoUrl = data.content
        wx.navigateTo({
          url: '/pages/detail/video-play?url=' + encodeURIComponent(videoUrl)
        })
      }, null)
  }
})