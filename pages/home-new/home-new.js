// pages/home-new/home-new.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBanners()
  },
  getBanners() {
    let self = this
    api.get('/getIndexItem', {},
      function (res) {
        self.setData({
          bannerList: res
        })
      }, null)
  },
  onDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
})