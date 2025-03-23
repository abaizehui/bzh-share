const urlUtils = require('../../utils/urlUtils');
const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    avatarUrl:'../../image/avatar.jpg',
    nickName:'微信用户',
    showPopup: false,
    qrCodeUrl:""
    
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
 
   // 保存图片到相册
  saveImage() {
    wx.downloadFile({
      url: this.data.qrCodeUrl, //仅为示例，并非真实的资源
      success (res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: (res) => {
              console.log(res);
              wx.showToast({ title: '保存成功', icon: 'success' });
            },
            fail: (err) => {
              console.log(err);
              if (err.errMsg.includes('auth deny')) {
                // 处理授权拒绝情况
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting['scope.writePhotosAlbum']) {
                      this.saveImage(); // 重新调用保存
                    }
                  }
                });
              }
            }
          });
        }
      }
    })
  },

    // 显示弹框
  showPopup() {
    if(this.data.isLogin===false){
      wx.navigateTo({
        url: '/pages/login/login'
      });
      return;
    } ;
    this.getQrCode();
  },

  // 隐藏弹框
  hidePopup() {
    this.setData({
      showPopup: false
    });
  },


  //获取二维码
  getQrCode: function () {

    const  shareUserId = wx.getStorageSync('userId');
    const requestData = {
      page: 'pages/index/index',
      scene: shareUserId,
      envVersion: 'trial',
      userId: wx.getStorageSync('userId')
    };
  wx.request({
    url: baseUrl+ '/wx/api/getQrCode' ,
    method: 'POST',
    data: requestData,
    header: {
      'Content-Type': 'application/json' 
    },
    success: (res) => {
      if (res.statusCode === 200) {
        const data = res.data;
        const qrCodeUrl =urlUtils.appendBaseUrlToImage(data.msg);
        console.log(qrCodeUrl);
        this.setData({
          qrCodeUrl: qrCodeUrl,
          showPopup: true

        });
      }
    },
    fail: (err) => {
      console.error('获取产品分类数据失败', err);
    }
  });
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