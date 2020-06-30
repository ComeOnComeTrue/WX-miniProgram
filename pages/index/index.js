// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";

//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数据
    catesList: [],
    // 楼层数据
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // 获取轮播图数据 因为异步回调多了会产生回调地域，所有这边用promise解决
    // wx.reqTask = wx.request({
    //   url: '/home/swiperdata',
    //   data: {}, // 你要发送什么数据给后台
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList: result.data.message,
    //     })
    //     console.log(result.data.message)
    //   },
    //   fail: ()=>{}, // 失败的回调函数
    //   complete: ()=>{} // 成功或者失败都会调用的函数
    // });
    this.getSwiperList();

    // 获取轮播图数据
    this.getCateList();
    // 获取楼层数据
    this.getFloorList();

  },
  // 获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {

        result.forEach(ele => ele.navigator_url = ele.navigator_url.replace(/\main/g,'index'));// 修正数据，可忽略
        
        this.setData({
          // swiperList: result.data.message,
          swiperList: result,
        })
      })
  },
  // 获取导航数据
  getCateList() {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          catesList: result,
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(result => {

        result.forEach(ele => { // 修正数据，可忽略
          ele.product_list.forEach(ele => ele.navigator_url = ele.navigator_url.replace(/\list/g,'list/index'));
        })

        this.setData({
          floorList: result,
        })
      })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});