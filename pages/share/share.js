const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
const appId = app.globalData.appId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:null,
    productSetId:null,
    name: '',
    phone: '',
    storeId:null
  },
  

  // 显示弹窗
  showModal() {
    this.setData({
      showModal: true
    })
  },

  // 隐藏弹窗
  hideModal() {
    this.setData({
      showModal: false
    })
  },


  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  getPhoneNumber (e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 用户同意授权，可以通过 e.detail.code 向服务器请求手机号
        const phoneSync = wx.getStorageSync('phone')
        if (phoneSync ===  ''){
            wx.request({
                url: baseUrl+ '/wx/api/getPhoneNumber?code=' +e.detail.code,
                method: 'GET',
                success: function (res) {
                    const phone = res.data.msg;
                    wx.setStorageSync('phone', phone);
                    this.setData({
                        phone: phone
                    });
                }.bind(this),
                fail: function (err) {
                console.log('接口请求失败', err);
                }
            });
        } else {
            this.setData({
                phone: phoneSync
            });
        }
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
    if (phone.length != 11) {
        wx.showToast({
            title: '请填写正确的手机号',
            icon: 'none'
        });
        return;
    }
    let  shareUserId = wx.getStorageSync('shareUserId');
    if (shareUserId==='undefined') {
        shareUserId = 0;
    }
    const submitData = {
      storeId: this.data.storeId,
      name: this.data.name,
      phone: this.data.phone,
      inviterUserId: shareUserId,
      productId:this.data.productId
    };

    // 提交表单逻辑
    wx.request({
        url: baseUrl+ '/wx/share/submit',
        method: 'POST',
        data: submitData,
        success: function () {
              // 提交成功后，恢复按钮可点击状态
            wx.showToast({
                title: '预约成功',
                icon: 'none'
            });
            this.setData({
                showModal: false
              })
            wx.setStorageSync('submitPhone',this.data.phone);
            wx.setStorageSync('submitName',this.data.name);
        }.bind(this),
        fail: function (err) {
            console.log('接口请求失败', err);
        }
    });
  },


// 获取门店信息
getStore: function () {
    wx.request({
      url: baseUrl+ '/wx/store/getStoreByAppId?appId=' +appId,
      method: 'GET',
      success: function (res) {
          this.setData({
            storeId: res.data.data.id
          });
          wx.setStorageSync('storeId', res.data.data.id);
      }.bind(this),
      fail: function (err) {
        console.log('接口请求失败', err);
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getStore();
    const phone = wx.getStorageSync('submitPhone');
    const name = wx.getStorageSync('submitName');
    this.setData({
        phone: phone,
        name: name,
        productId: options.productId
    })
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
        title : '预约享多重好礼',
        path: '/pages/share/share?productId=' + this.data.productId,
     };
  },

// 分享到朋友圈
onShareTimeline() {
    return {
       title : '预约享多重好礼',
       path: '/pages/share/share?productId=' + this.data.productId,
    };
},
})