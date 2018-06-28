var page = 0;


// 请求数据
var loadMore = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: "http://wapp.ncyunqi.com/wapp/api/my/address/list/10000/1",
    data: {
      page: page,
      page_size: 5,
    },
    success: function (res) {
      var list = res.data.data.list;
      for (var i = 0; i < res.data.data.length; i++) {
        list.push(res.data.data[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}

Page({
  data: {
    isDefault: 'Y',
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  // 获取数据
  onLoad: function () {
    var that = this;
    // that.addresslist();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that);
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    loadMore(that);
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },

  // 获取地址列表
  // addresslist: function () {
  //   var that = this;
  //   wx.request({
  //     url: 'http://172.16.202.54:8080/wapp/api/my/address/list/10000/1',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       //将获取到的json数据，存在名字叫addresslist的这个数组中
  //       that.setData({
  //         addresslist: res.data.data.list,
  //         //res代表success函数的事件对，data是固定的，list是是上面json数据中list
  //       })
  //     }
  //   })
  // },

  /*跳转详情页 */
  redictDetail: function (event) {
    var addressId = event.currentTarget.dataset.addressid;   //获取传递的值
    console.log(addressId)
    wx.navigateTo({
      url: '/pages/personal/address/address-reset/address-reset?id=' + addressId    //传递参数
    })
  },
  /*跳转新增页 */
  addaddress: function (event) {
    wx.navigateTo({
      url: '/pages/personal/address/address-add/address-add'    //传递参数
    })
  },
  // 默认地址选择
  isDefault: function (e) {
    var that = this;//不要漏了这句，很重要
    var addressId = e.currentTarget.dataset.addressid;
    var isDefault = "Y";
    var userId = 10000;
    console.log(e)
    wx.request({
      url: `http://wapp.ncyunqi.com/wapp/api/my/address/addaddress/${userId}/${addressId}/${isDefault}`,
      headers: {
        'Content-Type': 'application/json'
      },
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
          url: '/pages/personal/address/address-list/address-list'    //传递参数
        })
      }
    })
  },
})