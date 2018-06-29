//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    banner: [],
    productList: []
  },
  
  onLoad: function () {
    // 模拟数据，后期从后台获取
    var banner = [
      {id: 1, url: '/assets/images/banner/19.jpg'},
      {id: 2, url: '/assets/images/banner/19.jpg'},
      {id: 3, url: '/assets/images/banner/19.jpg'},
    ];
    this.setData({'banner' : banner});

    var productList = [
      {
        id: 1,
        title: '小金县菌菇松茸干货100g/袋原色原香土特产',
        description: '原色原味 产地直供 新鲜直达',
        defaultPrice: 17.20,
        num: 10,
        cover: '/assets/images/product/184.jpg'
      },
      {
        id: 2,
        title: '牛肝菌松茸茶树菇枸杞组合',
        description: '原色原味 产地直供 新鲜直达',
        defaultPrice: 17.20,
        num: 2,
        cover: '/assets/images/product/185.jpg'
      },
      {
        id: 3,
        title: '小金县菌菇松茸干货100g/袋原色原香土特产',
        description: '原色原味 产地直供 新鲜直达',
        defaultPrice: 17.20,
        num: 10,
        cover: '/assets/images/product/186.jpg'
      }
    ]; 
    this.setData({'productList' : productList})
  }
})
