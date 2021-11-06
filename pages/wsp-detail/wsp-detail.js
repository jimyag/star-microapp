// pages/wsp-detail/wsp-detail.js
var req = require("../../utils/request.js")
var config = require("../../utils/config.js")
var util = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const detail_res = await req.request(config.url+"/user/"+app.globalData.uid+"/record",null,"GET",{
      "Authorization":"Bearer " + app.globalData.token 
    })
    var new_detail = []
    if (detail_res.data.code===0){
      var detail = detail_res.data.data
      for(let index in detail){
        var begin_time = new Date(detail[index]["begin_time"]*1000)
        console.log(begin_time)
        new_detail[index] = {
          "title":detail[index]["remark"],
          "begin_time":begin_time.getFullYear()+"-"+begin_time.getMonth()+"-"+begin_time.getDay()+" "+begin_time.getHours()+":"+begin_time.getMinutes(),
          "all_time":util.timezero2hs(detail[index]["begin_time"]*1000,detail[index]["end_time"]*1000)
        }
      }
      console.log(new_detail)
      this.setData({
        detail:new_detail
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})