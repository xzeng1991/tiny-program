// directory.js
var address = require('../../../../utils/city.js')
var animation
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
  onLoad: function (options) {
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
  // 增加地址
  formSubmit: function (e) {
    var warn = "";//弹框时提示的内容  
    var flag = true;//判断信息输入是否完整  
    //判断的顺序依次是：姓名-手机号-地址-具体地址
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.mobile == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.mobile))) {
      warn = "手机号格式不正确";
    } else if (e.detail.value.address == "") {
      warn = "请选择您的地址"
    } else if (e.detail.value.addressDetail == "") {
      warn = "请输入您的具体地址";
    } else {
      flag = false;
      var that = this;//不要漏了这句，很重要
      wx.request({
        url: 'http://wapp.ncyunqi.com/wapp/api/my/address/create',
        data: {
          userId: 10000,
          contactor: e.detail.value.name,
          mobile: e.detail.value.mobile,
          address: e.detail.value.address,
          addressDetail: e.detail.value.addressDetail,
          isDefault: this.data.isDefault,
        },
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // wx.navigateTo({
          //   url: '/pages/personal/address/address-list/address-list'
          // })
        }
      })
    }
    //如果信息填写不完整，弹出输入框  
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }

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