Page({
  data: {
    // address: {
    //   name: '李小辉',
    //   isDefault: true,
    //   phone: '131xxxx6688',
    //   info: '江西省 南昌市 高新技术产业开发区 紫阳大道3399号 云中城B座 4105室'
    // },
    address: undefined,
    product: {
      img: '/assets/images/product/184.jpg',
      title: '小金县菌菇松茸干货100g/袋原色原香土特产',
      attr: ['350g', '精品礼盒'],
      num: 2,
      price: 17.20
    },
    totalFee: '',
    freight: '0.00'
  },

  onLoad() {
    this.setData({ totalFee: this.data.product.num * this.data.product.price })
  },

  // 付款
  pay() {
    wx.navigateTo({ url: '/pages/pay-result/pay-result' })
  }
})