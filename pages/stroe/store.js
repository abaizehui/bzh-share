const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
const appId = app.globalData.appId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeInfo : null,
  },


// 获取门店信息
getStore: function () {
    wx.request({
      url: baseUrl+ '/wx/store/getStoreByAppId?appId=' +appId,
      method: 'GET',
      success: function (res) {
          const storeInfo = res.data.data;
          storeInfo.imageUrl = urlUtils.appendBaseUrlToImage(storeInfo.imageUrl);
          this.setData({
            storeInfo: storeInfo
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
  onLoad() {
    this.getStore();
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