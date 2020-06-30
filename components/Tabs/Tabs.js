// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      default: []
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
    // 点击标题事件
    handleItemTap(e) {
      // 1 获取当前的索引
      const {index} = e.currentTarget.dataset;
      // 2 触发 父组件的自定义事件
      this.triggerEvent('tabsItemChange', {index})
    }
  }
})
