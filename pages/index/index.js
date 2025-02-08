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

// 获取门店信息
getStore: function () {
    wx.request({
      url: baseUrl+ '/wx/store/getStoreByAppId?appId=' +appId,
      method: 'GET',
      success: function (res) {
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
          const banners = urlUtils.appendBaseUrlToImages(res.data);
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
          const categories = urlUtils.appendBaseUrlToImages(res.data);
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
        console.log(res.data);
        const recommendProducts = urlUtils.appendBaseUrlToImages(res.data);
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