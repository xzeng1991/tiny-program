// pages/order/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:null,
    totalFee: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var product = {
      img: '/assets/images/product/184.jpg',
      title: '小金县菌菇松茸干货100g/袋原色原香土特产',
      attr: ['350g', '精品礼盒'],
      num: 2,
      price: 17.20
    };

    this.setData({ 'product': product });
    this.setData({'totalFee':17.20});
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