
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "";

  var uuid = s.join("");
  return uuid;
}

var index = 0;
var token = "";
var pageObj;

Page({
  data: {

  },

  // 获取数据
  getInfo() {
    index = index + 1;
    this.setData({ msg: "World , click times：" + index })
    console.log("clicked " + index);
    pageObj = this;
    wx.login({
      success: function (res) {
        pageObj.setData({ msg: "tuweiguo , click times：" + index })
        console.info(res);
        var code = res.code;
        if (code) {
          //发起网络请求
          wx.request({
            url: 'https://wapp.ncyunqi.com/wapp/api/onLogin',
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            data: {
              code: code
            },
            success: function (res) {
              console.log(res);
              token = res.data.resp;
              console.log('got token' + token);
              pageObj.setData({ token: token });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },

  // 支付
  pay() {
    wx.request({
      url: 'https://wapp.ncyunqi.com/wapp/api/unifyOrder',
      header: {
        'token': token
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var res = res.data.resp;
        pageObj.setData({ paymentParams: JSON.stringify(res) });
        wx.requestPayment({
          'timeStamp': res.timestamp,
          'nonceStr': res.nonceStr,
          'package': "prepay_id=" + res.prepayId,
          'signType': 'MD5',
          'paySign': res.paySign,
          'success': function (res) {
            console.log(res);
          },
          'fail': function (res) {
            console.log(res);
          }
        })
      }
    })
  }
})