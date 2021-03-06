// directory.js
// var address = require('../../../../utils/city.js')
Page({

  /**
   * 页面的初始数据
   * 当前    provinces:所有省份
   * citys选择省对应的所有市,
   * areas选择市对应的所有区
   * provinces：当前被选中的省
   * city当前被选中的市
   * areas当前被选中的区
   */
  data: {
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    isDefault: 'N',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (addressId) {
    // 获取地址详情
    var that = this//不要漏了这句，很重要
    // 传递id
    var addressId = addressId.id
    wx.request({
      url: `http://wapp.ncyunqi.com/wapp/api/my/address/edit/${addressId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫addresslist的这个数组中
        that.setData({
          address: res.data.data,
          //res代表success函数的事件对，data是固定的，list是是上面json数据中list
          areaInfo: res.data.data.address
        })
      }
    })

    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  },

  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ' ' + that.data.citys[value[1]].name + ' ' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  hideCitySelected: function (e) {
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },

  // 修改地址
  reset: function (e) {
    var that = this;//不要漏了这句，很重要
    // var userAddressId = e.detail.value.id;
    wx.request({
      url: 'http://wapp.ncyunqi.com/wapp/api/my/address/update',
      data: {
        userId:10000,
        id: e.detail.value.id,
        contactor: e.detail.value.name,
        mobile: e.detail.value.mobile,
        address: e.detail.value.address,
        addressDetail: e.detail.value.addressDetail,
        isDefault: this.data.isDefault
      },
      method: "POST",  
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
  checkboxChange: function (e) {
    console.log('checkbox：', e.detail.value)
    if (e.detail.value == "") {
      this.setData({
        isDefault: "N"
      })
    } else if (e.detail.value == "N") {
      this.setData({
        isDefault: "Y"
      })
    }
  },
})