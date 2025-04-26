const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
  },


  //获取预约商品列表
  getProductListByPhoneNumber: function (phoneNumber) {
    wx.request({
      url: baseUrl+ '/wx/product/getProductListByPhoneNumber?phoneNumber=' + phoneNumber, 
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
            const productList = res.data.data;
            urlUtils.appendBaseUrlToImages(productList);
            this.setData({
                productList: productList
            });
        }
      },
      fail: (err) => {
        console.error('获取商品列表数据失败', err);
      }
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const phone = wx.getStorageSync('phone');
    if (phone !== '') {
      this.getProductListByPhoneNumber(phone);
    }

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

  }
})