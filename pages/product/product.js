const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: null,
    productList: [],
    sortType: null, // 记录当前选中的类型
    categoryId: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.categoryId = options.categoryId;
    this.getProductList(options.categoryId);
  },


  //根据类目id获取商品列表
  getProductList: function (categoryId) {
    wx.request({
      url: baseUrl+ '/wx/product/getProductListByCategoryId?categoryId=' + categoryId, 
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
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    let sortType = this.data.sortType;
    if (tab === 'price') {
      sortType = sortType === 'asc'? 'desc' : 'asc';
    }
    this.setData({
      activeTab: tab,
      sortType: sortType,
    });
    // 这里添加根据选中标签请求接口的逻辑
    let url = baseUrl+ '/wx/product/getProductListByCategoryId?categoryId=' + this.data.categoryId +'&sortKey='+tab+'&priceSort=' +this.data.sortType;
    wx.request({
      url: url,
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
        console.error('请求失败', err);
      }
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
    return {
        title : '运城英伦罗孚',
        path: '/pages/index/index'
    }
  },
    // 分享到朋友圈
onShareTimeline() {
    return {
       title: '运城英伦罗孚', // 分享标题
       path: '/pages/index/index'
     };
},
  
})