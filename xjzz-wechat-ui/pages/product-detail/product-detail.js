import { productDetail } from "../../mock/product";
const app = getApp()

Page({
  data: {
    // 商品详情
    productDetail: {},
    // 服务
    services: [
      { title: '满88包邮', icon: '/assets/icons/1.png' },
      { title: '7天退换', icon: '/assets/icons/1.png' },
      { title: '极速发货', icon: '/assets/icons/1.png' },
      { title: '假一赔十', icon: '/assets/icons/1.png' },
    ],
    // 是否显示弹出框
    modalVisible: false,
    // 商品属性
    productAttr: [
      {
        title: '包装',
        attr: ['普通袋装', '礼盒精装', '定制LOGO']
      },
      {
        title: '重量',
        attr: ['250g', '350g']
      }
    ],
    // 购买数量
    selectorNum: 1,
  },

  onLoad(opt) {
    // wx.request({
    //   url: `http://wapp.ncyunqi.com//wapp/api/product/getProductDetail/${opt.id}`,
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: { // 设置请求的 header
    //     token: app.globalData.token
    //   },
    //   success: res => {
    //     // success
    //     if (res.statusCode === 200 && res.data.code === 0 && res.data.data) {
    //       this.setData({ productDetail: res.data.data })
    //     }
    //   },
    //   fail: err => {
    //     console.log('请求失败', err)
    this.setData({ productDetail: productDetail.filter(v => v.id === 1)[0] })
    // }
    // })
  },

  // 显示/隐藏弹出框
  toggleModal() {
    this.setData({ modalVisible: !this.data.modalVisible })
  },

  // 输入购买数量
  selectorNumInput(e) {
    this.setData({ selectorNum: e.detail.value })
  },

  // 购买数量失焦，检查输入的数字是否正确（必须为数字，大于1且小于库存stock）
  selectorNumBlur(e) {
    const value = parseInt(e.detail.value, 10)
    let result

    if (value !== NaN) {
      if (value < 1) {
        result = 1
      } else if (value > parseInt(this.data.productDetail.stock, 10)) {
        result = parseInt(this.data.productDetail.stock, 10)
      } else {
        result = value
      }
    } else {
      result = 1
    }

    this.setData({ selectorNum: result })
  },

  // 购买数量+1
  addNum() {
    if (this.data.selectorNum < this.data.productDetail.stock) {
      this.setData({ selectorNum: this.data.selectorNum + 1 })
    }
  },

  // 购买数量-1
  minusNum() {
    if (this.data.selectorNum > 1) {
      this.setData({ selectorNum: this.data.selectorNum - 1 })
    }
  },

  // 确认下单
  confirmOrder() {
    wx.navigateTo({ url: '/pages/confirm-order/confirm-order' })
  },
})