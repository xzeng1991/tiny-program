Page({
  data: {
  },
  // 获取数据
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'http://wapp.ncyunqi.com/wapp/api/my/getOrderList/10000/1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫orderlist的这个数组中
        that.setData({
          orderlist: res.data.data.list,
          //res代表success函数的事件对，data是固定的，list是是上面json数据中list
        })
      }
    })


  },
  /*跳转详情页 */
  redictDetail: function (event) {
    var orderid = event.currentTarget.dataset.orderid;    
    wx.navigateTo({ 
      url: '/pages/personal/order/order-details/order-details?id=' + orderid   //传递参数
    });
  },
})