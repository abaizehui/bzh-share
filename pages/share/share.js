// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: ''
  },

  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
    console.log(e);
  },

  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
    console.log(e);
  },

  getPhoneNumber (e) {
    console.log(e.detail.code);  // 动态令牌
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 用户同意授权，可以通过 e.detail.code 向服务器请求手机号
      // 注意：code 需要通过后端接口换取手机号
      
    } else {
      // 用户拒绝授权或发生错误
      console.error('获取手机号失败', e.detail.errMsg);
    }
  },
  
  submitForm: function () {
    const {name, phone} = this.data;
    if (!name ||!phone) {
      wx.showToast({
        title: '姓名和手机号必填',
        icon: 'none'
      });
      return;
    }
    // 提交表单逻辑，比如发送网络请求将数据提交到服务器
    console.log('提交的表单数据：', this.data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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