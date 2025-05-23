const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
const appId = app.globalData.appId;

Page({
  data: {
    banners: [],
    categories: [],
    productSets: [],
    recommendProducts: [],
    storeInfo : null,
    autoplay: true, // 开启自动轮播
    interval: 5000, // 轮播间隔时间，单位为毫秒，这里设置为3秒
    duration: 1000, // 滑动动画时长，单位为毫秒，这里设置为1秒
    circular: true,
    storeVideos: []
  },

  playVideo: function (e) {
    const videoUrl = e.currentTarget.dataset.url;
    const storeVideoId = e.currentTarget.dataset.id;
    this.updateStoreVideoPlayById(storeVideoId);
    wx.navigateTo({
        url: `/pages/video/video?videoUrl=${videoUrl}`
    });
},

  onLoad: function (query) {
    this.getStore();
    wx.setStorageSync('shareUserId', decodeURIComponent(query.scene));
  },
  
   /**
   * 用户点击右上角分享
   */
onShareAppMessage() {

    return {
        title : '运城英伦罗孚｜洛恩斯厨电',
        path: '/pages/index/index'
    }
},

  // 分享到朋友圈
onShareTimeline() {
    return {
       title: '运城英伦罗孚｜洛恩斯厨电', // 分享标题
       path: '/pages/index/index'
     };
},

// 获取门店信息
getStore: function () {
    wx.request({
      url: baseUrl+ '/wx/store/getStoreByAppId?appId=' +appId,
      method: 'GET',
      success: function (res) {
          const storeInfo = res.data.data;
          wx.setStorageSync('storeId', storeInfo.id);
          wx.setStorageSync('storeInfo', storeInfo);
          this.setData({
            storeInfo: storeInfo
          });
          this.getBanners(res.data.data.id);
          this.getCategories(res.data.data.id);
          this.getProductSets(res.data.data.id);
          this.getRecommendProducts(res.data.data.id);
          this.getStoreVideoByStoreId(res.data.data.id);
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

  //获取推荐套装
getProductSets: function (storeId) {
  wx.request({
    url: baseUrl+ '/wx/product/set/getProductSetListByStoreId?storeId=' + storeId, 
    method: 'GET',
    success: (res) => {
      if (res.statusCode === 200) {
        const productSets = res.data.data;
        this.setData({
          productSets: productSets
        });
      }
    },
    fail: (err) => {
      console.error('获取产品分类数据失败', err);
    }
  });
},


  //获取门店视频
  getStoreVideoByStoreId: function (storeId) {
    wx.request({
      url: baseUrl+ '/wx/store/getStoreVideoByStoreId?storeId=' + storeId, 
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const storeVideos = res.data.data;
          this.setData({
            storeVideos: storeVideos
          });
        }
      },
      fail: (err) => {
        console.error('获取门店视频数据失败', err);
      }
    });
  },


  //修改门店视频观看数量
  updateStoreVideoPlayById: function (storeVideoId) {
    wx.request({
      url: baseUrl+ '/wx/store/updateStoreVideoPlayById?storeVideoId=' + storeVideoId, 
      method: 'GET',
      success: (res) => {
    
      },
      fail: (err) => {
        console.error('修改门店视频观看数量失败', err);
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
          this.setData({
            recommendProducts: recommendProducts
          });
        }
      },
      fail: (err) => {
        console.error('获取产品分类数据失败', err);
      }
    });
  }

});