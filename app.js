// app.js
var req = require("utils/request.js")
var config =require("utils/config.js")
App({
  onLaunch() {
    var that = this
    var id = wx.getStorageSync('uid')
    // 缓存中是否有uid
    if(id){
      // 有id
      console.log("从缓存中获得数据")
      that.globalData.uid = id
      that.globalData.userInfo = wx.getStorageSync('userInfo')
      that.globalData.token = wx.getStorageSync('token')
    }else{
      // 用户注册
      console.log("用户注册")
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var data = {
            "code":res.code
          }
          req.request(config.url+"/registration",data,"POST").then(
            (res)=>{
              console.log(res)
              // 用户已经存在或者注册成功
              if(res.data.code==0||res.data.code==101){
                that.globalData.uid = res.data.data.data.ID
                that.globalData.userInfo = res.data.data.data
                that.globalData.token = res.data.data.token
                wx.setStorageSync('uid', that.globalData.uid)
                wx.setStorageSync('userInfo', that.globalData.userInfo)
                wx.setStorageSync('token',that.globalData.token)
              }
            }
          )
        },fail:err=>{
          console.log("联系管理员")
        }
      })
    }
    // 登录
    
  },
  globalData: {
    userInfo: {},
    hasUserInfo: false,
    hasBinding: false,
    studentInfo: {},
    uid:null,
    token:null,
    schedule:{"allSchedule":null,"mySchedule":null,"nameColor":null}
  }
})
