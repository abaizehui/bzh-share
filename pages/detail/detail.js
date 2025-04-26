const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
const appId = app.globalData.appId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    showModal: false,
    showConfigModal: false,
    corpId:'',
    extInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getStore();
    this.getProductById(options.productId);
  },

  // 显示弹窗
  showModal() {
    this.setData({
      showModal: true
    })
  },

  // 隐藏弹窗
  hideModal() {
    this.setData({
      showModal: false
    })
  },


  // 显示弹窗
  showConfigModal() {
    this.setData({
      showConfigModal: true
    })
  },

  // 隐藏弹窗
  hideConfigModal() {
    this.setData({
      showConfigModal: false
    })
  },

  reserveProduct: function () {
    wx.navigateTo({
      url: '/pages/share/share?productId='+this.data.productInfo.id 
    });
  },

  // 获取产品详情
getProductById: function (productId) {
    wx.request({
      url: baseUrl+ '/wx/product/getProductDetailByProductId?productId=' +productId,
      method: 'GET',
      success: function (res) {

        const productInfo = res.data.data;
        this.setData({
            productInfo: productInfo
          });
      }.bind(this),
      fail: function (err) {
        console.log('接口请求失败', err);
      }
    });
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

// 在线客服
consult: function () {
    wx.openCustomerServiceChat({
        extInfo: {url: this.data.extInfo},
        corpId: this.data.corpId,
      })
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
        const productInfo = this.data.productInfo;
        const img = productInfo.imageUrl;
        return {
            title : productInfo.productName,
            path: '/pages/detail/detail?productId=' + productInfo.id,
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
    const productInfo = this.data.productInfo;
    const img = productInfo.imageUrl;
    return {
       title : productInfo.productName,
       path: '/pages/detail/detail?productId=' + productInfo.id,
       imageUrl : img
    };
},

})
