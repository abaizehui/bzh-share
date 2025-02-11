const urlUtils = require('../../utils/urlUtils');

const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    productList: [],
    currentTab: 0
  },

  switchTab: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
    // 这里可添加根据点击的分类过滤产品列表的逻辑，目前仅记录点击索引
  },

//获取产品类目
getCategories: function (storeId) {
  wx.request({
    url: baseUrl+ '/wx/category/getCategoryListByStoreId?storeId=' + storeId, 
    method: 'GET',
    success: (res) => {
      if (res.statusCode === 200) {
        const  categories =res.data.data;
        console.log(categories);
        this.setData({
          categoryList: categories,
        });
        this.getProductList(categories[0].id);

      }
    },
    fail: (err) => {
      console.error('获取产品分类数据失败', err);
    }
  });
},


  //根据类目id获取商品列表
  getProductList: function (categoryId) {
    wx.request({
      url: baseUrl+ '/wx/product/getProductListByCategoryId?categoryId=' + categoryId, 
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const productList = urlUtils.appendBaseUrlToImages(res.data);
          console.log(productList);

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
    const storeId = wx.getStorageSync('storeId');
    this.getCategories(storeId);
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