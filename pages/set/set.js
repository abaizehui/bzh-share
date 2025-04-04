const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productSetInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    if(res.from === 'button'){
        const productSetInfo = this.data.productSetInfo;
        const img = productSetInfo.imageUrl;
        return {
            title : productSetInfo.productName,
            path: '/pages/set/set?productSetId=' + productSetInfo.id,
            imageUrl : img
        }
    } else {
        return {
            title : '运城英伦罗孚厨电',
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

      console.log(res);
      const productSetInfo = res.data.data;
      productSetInfo.imageUrl = urlUtils.appendBaseUrlToImage(productSetInfo.imageUrl);

      urlUtils.appendBaseUrlToImages(productSetInfo.productSetDetailImages);
      urlUtils.appendBaseUrlToImages(productSetInfo.productList);
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