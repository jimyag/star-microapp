// app.js
const req = require("utils/request.js")
const config = require("utils/config.js")
const promisify = require("utils/promisify.js")
const login = promisify(wx.login)


App({
  onLaunch: async function () {
    console.groupCollapsed("%c用户打开小程序过程", "font-weight: normal");
    var that = this
    const uid = wx.getStorageSync('uid');
    // 缓存中是否有uid
    if (uid) {
      // 有id
      console.log("从缓存中获得数据")
      that.globalData.uid = uid
      that.globalData.userInfo = wx.getStorageSync('userInfo')
      that.globalData.token = wx.getStorageSync('token')
    } else {
      // 用户注册
      console.log("用户注册")
      // 登录成功
      const loginCode = await login()
      console.log(loginCode)
      const registration = await req.request(config.url + "/registration", {
        "code": loginCode.code
      }, "POST")
      console.log(registration.data)
      // 如果登录成功或者用户已存在
      if (registration.data.code == 0 || registration.data.code == 101) {
        that.globalData.uid = registration.data.data.data.ID
        that.globalData.userInfo = registration.data.data.data
        that.globalData.token = registration.data.data.token
        wx.setStorageSync('uid', that.globalData.uid)
        wx.setStorageSync('userInfo', that.globalData.userInfo)
        wx.setStorageSync('token', that.globalData.token)
      } else {
        console.log("请联系管理员")
      }
    }
    console.groupEnd();
  },
  globalData: {
    userInfo: {},
    hasUserInfo: false,
    hasBinding: false,
    studentInfo: {},
    uid: null,
    token: null,
    schedule: {
      "allSchedule": null,
      "mySchedule": null,
      "nameColor": null
    }
  }
})