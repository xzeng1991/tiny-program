import { banner } from "../../mock/banner";
import { productList } from "../../mock/product";
const app = getApp()

Page({
  data: {
    banner,
    productList: [],
    indicatorDots: true,
    autoplay: true,
    confirmType: 'search',
    pageNum: 1
  },

  // 页面初始化
  onLoad() {
    // wx.request({
    //   url: 'http://wapp.ncyunqi.com//wapp/api/product/getGroupProductList',
    //   data: { pageNum: this.data.pageNum/* .toString() */ },
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: { // 设置请求的 header
    //     token: app.globalData.token
    //   },
    //   success: res => {
    //     // success
    //     if (res.statusCode === 200 && res.data.code === 0 && res.data.data) {
    //       this.setData({ productList: res.data.data.list })
    //     }
    //   },
    //   fail: err => {
    //     console.log('请求失败', err)
    this.setData({ productList })
    // }
    // })
  },

  // 跳转到搜索页面
  navigateToSearch() {
    wx.navigateTo({ url: '/pages/search-product/search-product' })
  }
})