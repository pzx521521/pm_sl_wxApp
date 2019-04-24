// pages/lesson_learn/lesson_learn.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    comments:{},
    id: 0,
    hiddenmodalput: true,
    commit: false,
    comment:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfoByid(options.id);
    this.getComments(options.id);
    this.setData({
      id: options.id,
    })    
  },
  getComments(id){
    var _this = this;
    let url = '/getComment'
    api.get(url, {
      id: id
    },
      function (res) {
        if (res != undefined) {
          _this.setData({
            comments: res,
          })
        }
      }, null)
  },
  onComment(){
    var _this = this;
    var id = this.data.id;
    var openid = wx.getStorageSync('openid');
    var nickName = wx.getStorageSync('userInfo').nickName;
    var comment = this.data.comment;
    var aComment = {};
    aComment.id = id;
    aComment.openid = openid;
    aComment.nickName = nickName;
    aComment.content = comment;
    api.post1('/setComment', aComment,
      function (res) {
        if (res.data == 'Success') {
          wx.showToast({
            title: '提交成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          _this.setData({
            comments: _this.data.comments.concat(aComment),
          })
        }
      }, null)
  },    

  getInfoByid(id){
    var _this = this;
    let url = '/getDetailInfo'
    api.get(url, {
      id: id
    },
    function (res) {
      if (res != undefined) {
        var info = JSON.parse(res.info);
        _this.setData({
          info: info,
        })
      }
    }, null)
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      commit: false,
    });
  },
  //确认  
  confirm: function (e) {
    this.setData({
      hiddenmodalput: true,
      commit: true,
    })
    
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      comment: e.detail.value
    })
    if(this.data.commit){
      this.onComment();
    }    
  },
  star(){
    wx.showToast({
      title: util.formatTime('2019-04-25 00:24:05'),
      icon: 'succes',
      duration: 1000,
      mask: true
    });
  },

})