
const app = getApp()
var request = require("../../utils/request.js")
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collapseStatus: false,
    threeActionIndex: -1,
    collapseList: [],
    hasBinding:false
  },
  threeSwiteFun(e){
    let {
      index
    } = e.detail
    this.setData({
      threeActionIndex: index
    })
  },
  join(e){
    // console.log("这是点击按钮了")
    // 不用担心数据过长
    let data = encodeURIComponent(JSON.stringify(e.currentTarget.dataset))
    wx.navigateTo({
      url: '../binding/binding?data='+data,
    })
  },
  qrscan(e){
    wx.navigateTo({
      url: '../wsp-qrscan/wsp-qrscan',
    })
  },
  detail(e){
    wx.navigateTo({
      url: '../wsp-detail/wsp-detail',
    })
  },
  schedule(e){
    wx.navigateTo({
      url: '../wsp-schedule/wsp-schedule',
    })
  },
  onLoad:function(params) {
    var stu_info = wx.getStorageSync('studentInfo')
    if (stu_info){
      this.setData({
        hasBinding:true
      })
    }else{
      request.request(config.url+"/sector/"+app.globalData.uid+"/find",null,"GET",{
        "content-type":"application/x-www-form-urlencoded",
        "Authorization":"Bearer "+app.globalData.token
      }).then((res)=>{
        if (res.data.code==0){
          app.globalData.studentInfo = res.data.data
          this.setData({
            hasBinding:true
          })
        }
      })
    }
    var header = {
      "content-type":"application/x-www-form-urlencoded"
    }
    request.request(config.url+"/sector",null,null,header).then((res)=>{
      // console.log(res.data.data)
      this.setData({
        collapseList:res.data.data
      })
    })
  }
})