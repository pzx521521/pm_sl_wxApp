// pages/interest/interest.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interestList: [],
    interestArr: [],
    a: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getInterestList()
    this.getUserInterest()
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
    let interestIndex = e.currentTarget.dataset.selected;
    this.data.interestArr[interestIndex] = !this.data.interestArr[interestIndex]
    this.setData({
      interestArr: this.data.interestArr
    })
  },

  getInterestList() {
    let self = this
    api.get('/edu/dic/getInterestList', {},
      function(res) {
        var interestLists = res.content
        interestLists.forEach(list => {
          self.data.interestArr[list.id] = false
        });

        self.setData({
          interestList: res.content
        })
      }, null)
  },

  getUserInterest() {
    let self = this
    api.get('/edu/dic/getInterestList', {
        uid: getApp().globalData.userId
      },
      function(res) {
        var results = res.content
        results.forEach(result => {
          let child = result.interestChildrenList;
          child.forEach(item => {
            self.data.interestArr[item.id] = true
          })
        })
        self.setData({
          interestArr: self.data.interestArr
        })
      }, null)
  },

  onChooseClicked() {
    var interestIds = "";
    for (var key in this.data.interestArr) {
      if (this.data.interestArr[key])
        interestIds += key + ",";
    }
    if (interestIds.length > 0) {
      interestIds = interestIds.substr(0, interestIds.length - 1);
    }
    if (!interestIds) {
      wx.showToast({
        title: '至少选择一个标签',
        icon: 'none',
        duration: 2000
      })
      return
    }

    api.post('/edu/dic/addUserInterestList', {
        uid: getApp().globalData.userId,
        iid: interestIds
      },
      function(res) {
        wx.showToast({
          title: '添加成功！',
          icon: 'none',
          duration: 2000
        })
      }.bind(this),
      function(res) {
        wx.showToast({
          title: '添加失败！',
          icon: 'none',
          duration: 2000
        })
      })
  }
})