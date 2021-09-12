//课表查询页面
//获取应用实例
var req = require("../../utils/request.js")
var config = require("../../utils/config.js")
// import { ckHash } from '../../utils/ckHash.js'
// let change = new ckHash("/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/")
var app = getApp()
Page({
    data: {
        // 颜色数组，用于课程的背景颜色
        color_arrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "#00b4d8", "#0a9396", "#fad2e1", "#e07a5f", "#b6ccfe", "#c4baff", "#72efdd", ""],
        // // 课表数组
        schedule: null,
        mySchedule: null,
        nameColor: null
    },
    async onLoad() {
        let g_schedule = getApp().globalData.schedule
        if (g_schedule["allSchedule"]) {
            this.setData({
                schedule: g_schedule["allSchedule"],
                mySchedule: g_schedule["mySchedule"],
                nameColor: g_schedule["nameColor"]
            })

        } else {
            const schedule_res = await req.request(config.url + "/schedule/" + app.globalData.studentInfo["sector_name"],
                null
                , "GET", { "Authorization": "Bearer " + app.globalData.token })
            if (schedule_res.data.code === 0) {
                this.setData({
                    schedule: schedule_res.data.data
                })
                let myScheduleIndex = 0
                let mySchedule = []
                var nameColor = {}
                let colorIndex = 0
                console.log(this.data.schedule)
                for (let i = 0; i < this.data.schedule.length; i = i + 1) {
                    if (this.data.schedule[i].student_name === getApp().globalData.studentInfo['student_name']) {
                        mySchedule[myScheduleIndex] = this.data.schedule[i]
                        myScheduleIndex = myScheduleIndex + 1
                    }
                    if (nameColor[this.data.schedule[i].student_name] === undefined) {
                        nameColor[String(this.data.schedule[i].student_name)] = colorIndex
                        colorIndex += 1
                    }

                }
                this.setData({
                    mySchedule: mySchedule,
                    nameColor: nameColor,
                })
                app.globalData.schedule["mySchedule"] = mySchedule
                app.globalData.schedule["nameColor"] = nameColor
                app.globalData.schedule["allSchedule"] = this.data.schedule
            }
        }




    }
})