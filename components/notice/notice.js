// components/notice/notice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msgList:{
      type:Array,
      value:[
       { url: "url", title: "公告：我在翻滚呀！！！！！！！" },
       { url: "url", title: "公告：我是一个无情的滚动机器！" },
       { url: "url", title: "公告：我来测试通知能否正确显示。" }]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
