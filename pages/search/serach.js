const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    historySearch: [],
    serachProducts:[],
    storeId: null,
    isSearching: false,
    hasResult: false,

  },

  handleInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  clearInput: function () {
    this.setData({
      inputValue: ''
    });
  },
  search: function () {
    const inputValue = this.data.inputValue;
    this.setData({
      isSearching: true
    });
    if (inputValue.trim()!== '') {
      let historySearch = this.data.historySearch;
      if (historySearch.indexOf(inputValue) === -1) {
        historySearch.unshift(inputValue);
      }
      if (historySearch.length > 10) {
        historySearch.pop();
      }
      this.setData({
        historySearch: historySearch,
        inputValue: ''
      });
      // 这里添加实际搜索逻辑，如调用接口
      console.log('执行搜索，搜索词为：', inputValue);
      this.getProductListByStoreIdAndProductName(inputValue);
    } 
  },
  clearHistory: function () {
    this.setData({
      historySearch: []
    });
  },
  selectHistory: function (e) {
    const historyWord = e.currentTarget.dataset.word;
    this.setData({
      inputValue: historyWord
    });
  },


  //获取搜索商品
  getProductListByStoreIdAndProductName: function (inputValue) {
  wx.request({
    url: baseUrl+ '/wx/product/getProductListByStoreIdAndProductName?storeId=' + this.data.storeId +'&productName='+inputValue, 
    method: 'GET',
    success: (res) => {
      if (res.statusCode === 200) {
        const serachProducts = urlUtils.appendBaseUrlToImages(res.data);
        if(serachProducts.length<=0) {
          this.setData({
            hasResult: false
          });
        } else {
          this.setData({
            hasResult: true
          });
        }
        this.setData({
          serachProducts: serachProducts
        });
      }
    },
    fail: (err) => {
      console.error('搜索产品数据失败', err);
    }
  });
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const storeId = wx.getStorageSync('storeId');
    this.data.storeId = storeId;
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