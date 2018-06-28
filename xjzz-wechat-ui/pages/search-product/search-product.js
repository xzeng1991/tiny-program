import { productList } from "../../mock/product";
const app = getApp()

Page({
  data: {
    lastestSearch: ['皮肤衣', '户外烧烤', '防晒衣', '速干', '户外露营'],
    hotSearch: ['皮肤衣', '户外烧烤', '防晒衣', '速干'],
    pageNum: 1,
    productList: [],
    title: ''
  },

  // 输入搜索
  onSearchInput(e) {
    this.setData({ title: e.detail.value })
  },

  // 提交搜索
  onSearch(e) {
    wx.request({
      url: 'http://192.168.0.101:8080/wapp/api/product/getGroupProductList',
      data: { pageNum: this.data.pageNum, title: e.detail.value },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { // 设置请求的 header
        token: app.globalData.token
      },
      success: res => {
        // success
        if (res.statusCode === 200 && res.data.code === 0 && res.data.data) {
          this.setData({ productList: res.data.data.list })
        }
      },
      fail: err => {
        console.log('请求失败', err)
        this.setData({ productList })
      }
    })
  },

  // 销毁搜索结果
  cancelSearch() {
    this.setData({ productList: [], title: '' })
  }
})