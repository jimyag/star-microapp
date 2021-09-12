// components/panel/panel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    paper:{
      type:JSON,
      value:{
        "id":0,
        "release_sector":"资助管理中心",
        "title":"2021-2022学年生源地贷款的通知",
        "content":"我是完整内容",
        "release_name":"叶菁",
        "release_time":"2021-8-15",
        "phone":"60873022",
        "attachment":""
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    test1:"ceshi"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test:function(res){
      console.log(res)
      console.log("我被点击了")
    },
    detail:function () {
      var paper = encodeURIComponent(JSON.stringify(this.data.paper))
      wx.navigateTo({
        url: '../../pages/index-paper/index-paper?paper='+paper,
      })
      console.log("我被点击了")
      console.log(this.data.paper)
      console.log("查看详细点击结束")
    }

  }
})
