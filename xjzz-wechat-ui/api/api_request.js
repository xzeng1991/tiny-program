
function request(url, params, method, success, fail) {
  this.requestLoading(url, params, method, "", success, fail)
}


/* url:网络请求的url
 * params:请求参数
 * message:进度条的提示信息
 * success:成功的回调函数
 * fail：失败的回调
 */
function requestLoading(url, params, method, message, success, fail) {
  // if (!getApp().globalData.isConnected) {
  //   // 网络断开提示
  //   wx.showToast({
  //     title: '您的网络已断开,请重新联网',
  //     icon: 'none'
  //   })
  //   return;
  // }

  // wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }

  if (params == null) {
    params = {};
  }

  params.cmd = "card_bind";
  params.nonce = "5n5roaj0umav5t5q1sftg5c7unqjrq70";
  params.sign = "9D04A108FAA198C5CD463A5349085877";
  params.openId = getApp().globalData.openId;
  params.userId = getApp().globalData.userId;


  console.error("request_url:" + url);
  console.error("request_params:" + JSON.stringify(params));

  wx.request({
    url: url,
    data: params,
    header: {
      'content-Type': 'application/json' // default
      // 'content-type': 'application/x-www-form-urlencoded'
    },
    method: method,
    success: function (res) {
      // wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }

      console.error("response_success:" + JSON.stringify(res));

      if (res.statusCode == 200) {
        if (res.data && res.data.code == 0) {
          success(res.data)
        } else {
          if (res.data.msg) {
            requestFail(res.data.msg);
          } else {
            requestFail("操作失败");
          }

          fail(res.data);
        }
      } else {
        if (res) {
          requestFail(JSON.stringify(res));
        } else {
          requestFail("操作失败");
        }

        fail(res.data);
      }
    },
    fail: function (res) {
      // wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }

      console.error("response_fail:" + JSON.stringify(res));

      if (res) {
        requestFail(JSON.stringify(res));
      } else {
        requestFail("操作失败");
      }

      fail(res.data);
    },
    complete: function (res) {

    },
  })
}

function requestFail(errMsg) {
  wx.showToast({
    title: errMsg,
    icon: 'none'
  })
}

module.exports = {
  request: request,
  requestLoading: requestLoading
}