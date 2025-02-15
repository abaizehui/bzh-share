const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
const appId = app.globalData.appId;

Page({
  data: {
    banners: [],
    categories: [],
    recommendProducts: [],
    autoplay: true, // 开启自动轮播
    interval: 3000, // 轮播间隔时间，单位为毫秒，这里设置为3秒
    duration: 1000 // 滑动动画时长，单位为毫秒，这里设置为1秒
  },
  onLoad: function () {
    this.getStore();
  },
  
   /**
   * 用户点击右上角分享
   */
onShareAppMessage() {

    return {
        title : '运城英伦罗孚厨电',
        path: '/pages/index/index'
    }
},

  // 分享到朋友圈
onShareTimeline() {
    return {
       title: '运城英伦罗孚厨电', // 分享标题
       imageUrl: '../../icon/share/share.png' // 分享海报图片链接
     };
},

// 获取门店信息
getStore: function () {
    wx.request({
      url: baseUrl+ '/wx/store/getStoreByAppId?appId=' +appId,
      method: 'GET',
      success: function (res) {
          wx.setStorageSync('storeId', res.data.data.id);
          this.getBanners(res.data.data.id);
          this.getCategories(res.data.data.id);
          this.getRecommendProducts(res.data.data.id);

      }.bind(this),
      fail: function (err) {
        console.log('接口请求失败', err);
      }
    });
  },
//获取轮播图
getBanners: function (storeId) {
    wx.request({
      url: baseUrl+ '/wx/carousel/getCarouselList?storeId=' + storeId, 
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const banners = res.data.data;
          urlUtils.appendBaseUrlToImages(banners);
          this.setData({
            banners: banners
          });
        }
      },
      fail: (err) => {
        console.error('获取轮播图数据失败', err);
      }
    });
  },

//获取产品类目
getCategories: function (storeId) {
    wx.request({
      url: baseUrl+ '/wx/category/getCategoryListByStoreId?storeId=' + storeId, 
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
            const categories = res.data.data;
            urlUtils.appendBaseUrlToImages(categories);
            this.setData({
                categories: categories
            });
        }
      },
      fail: (err) => {
        console.error('获取产品分类数据失败', err);
      }
    });
  },

  //获取推荐商品
getRecommendProducts: function (storeId) {
  wx.request({
    url: baseUrl+ '/wx/product/getRecommendProductListByStoreId?storeId=' + storeId, 
    method: 'GET',
    success: (res) => {
      if (res.statusCode === 200) {
        const recommendProducts = res.data.data;
        urlUtils.appendBaseUrlToImages(recommendProducts);
        this.setData({
          recommendProducts: recommendProducts
        });
      }
    },
    fail: (err) => {
      console.error('获取产品分类数据失败', err);
    }
  });
},

});