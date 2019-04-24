// pages/course/course.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryIndex: 0,
    infoList: [],
    classList: [],
    currentFunctionList: [],
    currentCategoryTitle: '',
    contentHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          contentHeight: res.windowHeight - 64
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getinfoList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  tabClicked: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      categoryIndex: index,
      currentCategoryTitle: this.data.categoryList[index].categoryTitle,
      currentTags: this.data.categoryList[index].tagList
    })
  },

  onSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  onTagClicked: function(e) {
    var id = e.currentTarget.dataset.item.id;
    var type = e.currentTarget.dataset.item.type;
    let title = e.currentTarget.dataset.item.name;
    if (type == 0){
      wx.navigateTo({
        url: '/pages/lesson_learn/lesson_learn?itemid=' + id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/lesson_learn/lesson_learn?itemid=' + id,
      })
    }
  },

  getinfoList() {
    let self = this
    api.get('/getAllInfo', {},
      function (res) {
        self.setData({
          infoList: res
        });
        let temp_classList = [];
        for (let i = 0; i < res.length; i++) {          
          let className = res[i].className;
          if (temp_classList.indexOf(className) < 0){
            temp_classList.push(className);
          }          
        };
        self.setData({
          classList: temp_classList
        });      
        self.tabClickedIndex(self.data.classList[0]);
      }, null)
  },

  tabClicked(e) {
    let className = e.currentTarget.dataset.classname
    this.tabClickedIndex(className)
  },

  tabClickedIndex(className) {
    let array = []
    for (let i = 0; i < this.data.infoList.length; i++) {
      let subItem = this.data.infoList[i]
      if (subItem.className === className) {
        array.push(subItem)
      }
    }
    this.setData({
      currentFunctionList: array,
      currentCategoryTitle: className,
    })
  }

})