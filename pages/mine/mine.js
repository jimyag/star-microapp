
// pages/mine/mine.js
var app = getApp()
var req= require("../../utils/request.js")
var config = require("../../utils/config.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        hasBinding:false,
    },
    getUserProfile: async function(e) {
        console.groupCollapsed("用户授权");
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        await wx.getUserProfile({
            desc: '展示用户信息',
            success: (res) => {
                console.log("授权的信息",res)
                wx.setStorageSync('userInfo', res.userInfo)
                var header = {
                    "content-type": "application/json",
                    "Authorization":"Bearer "+app.globalData.token
                }
                var url = config.url+"/user/"+app.globalData.uid+"/update"
                var data = res.userInfo
                console.log(data)
                req.request(url,data,"PUT",header).then((res)=>{
                    console.log("请求返回值",res)
                    if (res.data.code==0){
                        this.setData({
                            userInfo: data,
                            hasUserInfo: true
                        })
                        app.globalData.userInfo =data
                        wx.setStorageSync('userInfo', data)
                    }
                })
            },
            fail: (res) => {
                console.log("用户拒绝授权",res)
            }
        })
        console.groupEnd()
    },

    /**
     * 生命周期函数--监听页面加载
     */  
    onLoad: function (options) {
        console.groupCollapsed("mine")
        var userInfo = wx.getStorageSync('userInfo')
        console.log(userInfo)
        if (userInfo){
            if (userInfo['avatarUrl']){
                this.setData({
                    userInfo:userInfo,
                    hasUserInfo:true
                })
            }
            console.log(this.data)
        }else{
            this.setData({
                hasUserInfo:false
            })
        }
        console.groupEnd()
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