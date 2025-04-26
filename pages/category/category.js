const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    productList: [],
    currentIndex: 0
  },

  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    });
    this.getProductList(index);
  },
//获取产品类目
getCategories: function (storeId) {
  wx.request({
    url: baseUrl+ '/wx/category/getCategoryListByStoreId?storeId=' + storeId, 
    method: 'GET',
    success: (res) => {
      if (res.statusCode === 200) {
        const  categories =res.data.data;
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
            const productList = res.data.data;
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

})