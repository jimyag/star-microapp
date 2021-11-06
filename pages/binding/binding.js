
var config = require("../../utils/config.js")
var req= require("../../utils/request.js")
var app = getApp()
Page({

  data: {
    studentName:null,
    studentId:null,
    sectorKey:null,
    sector:null
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(decodeURIComponent(options.data))
    
    this.setData({
      sector:data.sector 
    })
    console.log(this.data.sector.sector_name)

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
    console.log("11")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  sign:function(){
    
    console.log("提交")
    // todo 校验学号和姓名长度类型
    var data = {
      "student_id":this.data.studentId,
      "student_name":this.data.studentName,
      "sector_key":this.data.sectorKey
    }
    console.log(data)
    var header = {
      "content-type": "application/json",
      "Authorization":"Bearer "+app.globalData.token
  }
    req.request(config.url+"/user/"+app.globalData.uid+"/sector"+this.data.sector.sector_name,"POST",header).then((res)=>{
      if(res.data.code===0){
        app.globalData.studentInfo = data
        wx.setStorageSync('studentInfo', data)
        wx.showModal({
          showCancel:false,
          content: '恭喜您，加入成功',
          success (res){
            wx.reLaunch({
              url: '../wsp/wsp',
            })
          }
        })
       
      }else{
        wx.showModal({
          showCancel:false,
          title:"失败",
          content:res.data.msg
        })
      }
    })

  },
  bindStudentName:function(e){
    this.setData({
      studentName: e.detail.value,
  })
  console.log(this.data)
  },
  bindStudentId:function(e){
    this.setData({
      studentId: e.detail.value,
  })
  console.log(this.data)
  

  },
  bindSector:function(e){
    this.setData({
      sectorKey: e.detail.value,
  })
  console.log(this.data)
  }

})