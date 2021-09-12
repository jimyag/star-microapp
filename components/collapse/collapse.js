Component({
  // 可通过外部传入 "collapse-item-class" 改变手风琴列表内容的默认样式
  // 可通过外部传入 "custom-collapse" 手风琴列表的默认样式
  // 可通过外部传入 "custom-title" 改变标题默认样式
  externalClasses: ['collapse-item-class', 'custom-collapse', 'custom-title'],

  // 开启插槽功能
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      // observer(val) {
      //   console.log(val, '标题')
      // }
    },
    // 索引
    index: {
      type: [Number, String]
    },
    // 选中索引
    actionIndex: {
      type: [Number, String],
      value: -1,
      observer(newVal) {
        if (newVal > -1) {
          // 计算手风琴高度
          this.calculationCollapseHeight()
        }
      }
    },
    // 自定义右侧icon
    customRightIcon: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    collapseItemHeihgt: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 计算手风琴内容高度
     */
    calculationCollapseHeight() {
      return new Promise((resolve) => {
        let self = this;
        let query = wx.createSelectorQuery().in(this)
        query.select('.collapse-item-class').boundingClientRect()
        query.exec(function (res) {
          self.setData({
            collapseItemHeihgt: res[0].height
          })
          resolve();
        })
      })
    },

    /**
     * 点击手风琴列表
     */
    switchCollapseList(e) {
      // console.log(e, '---e')
      let self = this;
      let {
        index
      } = e.currentTarget.dataset;
      let actionIndex = self.data.actionIndex;

      // 判断当前点击手风琴列表是否为展开状态
      if (actionIndex == index) {
        self.setData({
          actionIndex: -1
        })
      } else {
        self.triggerEvent('switchCollapseItem', {
          index
        })
      }
    },
  }
})
