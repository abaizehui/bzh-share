// pages/my/my3.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    avatarUrl:'../../image/avatar.jpg',
    nickName:'微信用户'
    
  },
    // 其他事件处理函数
    goToReservationForm() {
        if(this.data.isLogin===true){
          wx.navigateTo({
            url: '/pages/reservation/reservation'
          });
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }
    },

    phoneCall() {
      const storeInfo = wx.getStorageSync('storeInfo');
      wx.makePhoneCall({
        phoneNumber: storeInfo.tel
      })
    },


    consult() {
      const storeInfo = wx.getStorageSync('storeInfo');
      wx.openCustomerServiceChat({
        extInfo: {url: storeInfo.extInfo},
        corpId: storeInfo.corpId,
      })
    },

    goToPrize() {
      console.log('点击了活动抽奖');
    },
 
    goToShareQrForm() {
      console.log('点击了分享二维码');
    },

 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    const login = wx.getStorageSync('login');    
    if (login) {
      const phone = wx.getStorageSync('phone');
      this.setData({
        isLogin: login,
        phone: phone
      })
    }
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
        title : '运城英伦罗孚厨电',
        path: '/pages/index/index'
      } 
  }
})