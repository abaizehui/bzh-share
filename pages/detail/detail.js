const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    isPopupVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getProductById(options.productId);
  },

  // 获取产品详情
getProductById: function (productId) {
    wx.request({
      url: baseUrl+ '/wx/product/getProductDetailByProductId?productId=' +productId,
      method: 'GET',
      success: function (res) {

        const productInfo = res.data.data;
        productInfo.imageUrl = urlUtils.appendBaseUrlToImage(productInfo.imageUrl);

        urlUtils.appendBaseUrlToImages(productInfo.productDetailImages);
        this.setData({
            productInfo: productInfo
          });
          console.log(productInfo);

      }.bind(this),
      fail: function (err) {
        console.log('接口请求失败', err);
      }
    });
  },

  showPopup: function() {
    this.setData({
      isPopupVisible: true
    });
  },
  hidePopup: function() {
    this.setData({
      isPopupVisible: false
    });
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
  onShareAppMessage() {

  }
})
