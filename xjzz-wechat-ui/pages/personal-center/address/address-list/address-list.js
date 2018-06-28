Page({
  data: {
    isDefault: 'Y',
    pageNumber: 1,
    pageSize: 5,
  },
  // 获取数据
  onLoad: function () {
    var that = this;
    that.addresslist();
    that.pictureList(0, 5);
  },
  // 获取地址列表
  addresslist: function () {
    var that = this;
    wx.request({
      url: 'http://wapp.ncyunqi.com/wapp/api/my/address/list/10000/1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫addresslist的这个数组中
        that.setData({
          addresslist: res.data.data.list,
          //res代表success函数的事件对，data是固定的，list是是上面json数据中list
        })
      }
    })
  },

  /*跳转详情页 */
  redictDetail: function (event) {
    var addressId = event.currentTarget.dataset.addressid;   //获取传递的值
    console.log(addressId)
    wx.navigateTo({
      url: '/pages/personal-center/address/address-reset/address-reset?id=' + addressId    //传递参数
    })
  },
  /*跳转新增页 */
  addaddress: function (event) {
    wx.navigateTo({
      url: '/pages/personal-center/address/address-add/address-add'    //传递参数
    })
  },
  // 默认地址选择
  isDefault: function (e) {
    var that = this;//不要漏了这句，很重要
    var id = e.currentTarget.dataset.addressid;
    console.log(e)
    wx.request({
      url: 'http://wapp.ncyunqi.com/wapp/api/my/address/update',
      data: {
        id: id,
        isDefault: "Y"
      },
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      success: function (res) {
        // wx.navigateTo({
        //   url: '/pages/personal-center/address/address-list/address-list'    //传递参数
        // })
      }
    })
  },
  // 删除地址
  delete: function (e) {
    var that = this;//不要漏了这句，很重要
    var userAddressId = e.currentTarget.dataset.addressid;
    wx.request({
      url: `http://wapp.ncyunqi.com/wapp/api/my/address/delete/${userAddressId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.navigateTo({
          url: '/pages/personal-center/address/address-list/address-list'    //传递参数
        })
      }
    })
  },
})