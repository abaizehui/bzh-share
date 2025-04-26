const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
const appId = app.globalData.appId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productSetInfo:{},
    corpId:'',
    extInfo:''
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
          corpId:storeInfo.corpId,
          extInfo:storeInfo.extInfo
        });
    }.bind(this),
    fail: function (err) {
      console.log('接口请求失败', err);
    }
  });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getStore();
    this.getProductSetById(options.productSetId);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    if(res.from === 'menu' || res.from === 'button'){
        const productSetInfo = this.data.productSetInfo;
        const img = productSetInfo.imageUrl;
        return {
            title : productSetInfo.productName,
            path: '/pages/set/set?productSetId=' + productSetInfo.id,
            imageUrl : img
        }
    } else {
        return {
            title : '运城英伦罗孚｜洛恩斯厨电',
            path: '/pages/index/index'
        }
    }
  },

// 分享到朋友圈
onShareTimeline() {
    const productSetInfo = this.data.productSetInfo;
    const img = productSetInfo.imageUrl;
    return {
       title : productSetInfo.productName,
       path: '/pages/set/set?productSetId=' + productSetInfo.id,
       imageUrl : img
    };
},

  // 获取产品详情
getProductSetById: function (productSetId) {
  wx.request({
    url: baseUrl+ '/wx/product/set/getProductSetBySetId?productSetId=' +productSetId,
    method: 'GET',
    success: function (res) {
      const productSetInfo = res.data.data;
        this.setData({
            productSetInfo: productSetInfo
        });
    }.bind(this),
    fail: function (err) {
      console.log('接口请求失败', err);
    }
  });
},


reserveProduct: function () {
  wx.navigateTo({
    url: '/pages/share/share?productSetId='+this.data.productSetInfo.id 
  });
},

// 在线客服
consult: function () {
  wx.openCustomerServiceChat({
      extInfo: {url: this.data.extInfo},
      corpId: this.data.corpId,
    })
},

})