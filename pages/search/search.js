// pages/search/search.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeys: ['前端开发', '王大锤老师'],
    historyKeys: [],
    checkId: 1,
    loadingStatus: 1,
    results: [],
    type: [
      '视频',
      '图文',
      '专栏'
    ],
    pageNo: 1,
    searchContent: null,
    searchVal: true,
    pageCount: 0, // 总页数
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: this.data.type
    })

    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow(){
    var historyKeys = wx.getStorageSync('historyKeys') || [];
    this.setData({
      historyKeys: historyKeys
    })    
  },

  onBack() {
    wx.navigateBack({

    })
  },

  checkOption(e) {
    this.setData({
      checkId: e.currentTarget.dataset.id
    })
  },

  onBack() {
    wx.navigateBack({

    })
  },

  courseOrTeacherinput(e) {
    this.data.searchContent = e.detail.value
  },

  searchCourseOrTeacher(e) {
    this.getSearchResults()
  },
  onSearch() {
    this.getSearchResults();

  },  
  getSearchResults() {
    let self = this
    this.insertArr(self.data.searchContent);
    let url = '/searchInfo'
    if (this.data.checkId == 2) {
      url = '/searchInfoAllText'
    }    
    api.get(url, {
        searchText: self.data.searchContent,
        status: 2,
        pageNo: self.data.pageNo,
        pageCount: 10
      },
      function(res) {
        if (res != undefined) {
          let array = res;
          self.setData({
            results: array,
            searchVal: false
          })
          // if (self.data.pageNo !== res.content.pages) {
          //   self.setData({
          //     loadingStatus: 1
          //   })
          // } else {
            self.setData({
              loadingStatus: 2
            })
          // }
        }
      }, null)
  },

  onDetail (e) {
    var id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  reIndex(arr, index) {
    arr.unshift(arr[index]);
    arr.splice(index + 1, 1);
  },
  insertArr(str){
    var historyKeys = [].concat(this.data.historyKeys);
    if (historyKeys.indexOf(str)> -1){
      this.reIndex(historyKeys, historyKeys.indexOf(str))
    }else{
      historyKeys.unshift(str);
      if (historyKeys.length > 5) { historyKeys.splice(5,1);}      
    }
    this.setData({
      historyKeys: historyKeys
    })    
    wx.setStorageSync('historyKeys', historyKeys)
  }
})