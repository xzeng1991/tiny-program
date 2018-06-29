// pages/product/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productDetail = {
      address: '江西',
      id: 1,
      cover: '',
      imageUrls: [
        '/assets/images/product/184.jpg',
        '/assets/images/product/185.jpg',
      ],
      title: '小金县菌菇松茸干货100g/袋原色原香土特产',
      description: '原色原味 产地直供 新鲜直达',
      defaultPrice: 17.20,
      sales: 1500,
      groupNum: 10,
      num: 2,
      stock: 199,
      freight: 10,
      content: [
        '/assets/images/product/detail/1.jpg',
        '/assets/images/product/detail/2.jpg',
        '/assets/images/product/detail/3.jpg',
        '/assets/images/product/detail/4.jpg',
        '/assets/images/product/detail/5.jpg',
        '/assets/images/product/detail/6.jpg',
        '/assets/images/product/detail/7.jpg',
        '/assets/images/product/detail/8.jpg',
        '/assets/images/product/detail/9.jpg',
        '/assets/images/product/detail/10.jpg'
      ]
    };

    this.setData({ 'productDetail': productDetail });
  },

  confirmOrder() {
    wx.navigateTo({ url: '/pages/order/detail' })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})