let goodsList = [
  { actEndTime: '2019-08-01 10:00:43' },
]
Page({
  data: {
    countDownList: [],
    actEndTimeList: []
  },
  onLoad: function (orderid) {
    // 传递id
    var orderid = orderid.id
    console.log(orderid)
    var pageNum = 1
    // 获取数据
    var that = this//不要漏了这句，很重要
    wx.request({
      url: `http://wapp.ncyunqi.com/wapp/api/my/getOrderDetail/${orderid}/${pageNum}`,
      headers: {
        'Content-Type': 'application/json'
      },
      
      success: function (res) {
        //将获取到的json数据，存在名字叫orderlist的这个数组中
        that.setData({
          orderlist: res.data.data,
          //res代表success函数的事件对，data是固定的，list是是上面json数据中list
        })
      }
    })
    // 倒计时
    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    goodsList.forEach(o => { endTimeList.push(o.actEndTime) })
    this.setData({ actEndTimeList: endTimeList });
    // 执行倒计时函数
    this.countDown();
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ countDownList: countDownArr })
    setTimeout(this.countDown, 1000);
  }
})