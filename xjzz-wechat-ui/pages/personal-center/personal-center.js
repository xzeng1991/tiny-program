Page({
  data: {
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'http://192.168.0.101:8080/wapp/api/my/userInfo',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          user: res.data.stories,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

        })
      }
    })


  },
  /*跳转订单列表 */
  redictDetail: function (event) {
    var orderId = event.currentTarget.dataset.orderid;   //获取传递的值
    wx.navigateTo({
      url: '/pages/personal-center/order/order-list/order-list'    //传递参数
    })
  },
  /*跳转地址列表 */
  address: function (event) {
    wx.navigateTo({
      url: '/pages/personal-center/address/address-list/address-list'    //传递参数
    })
  },
})