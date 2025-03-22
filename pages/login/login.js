const app = getApp();
const baseUrl = app.globalData.apiBaseUrl;
const appId = app.globalData.appId;

Page({

  getPhoneNumber (e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 显示加载提示
      wx.showLoading({
        title: '正在登录...',
        mask: true
     });
      // 用户同意授权，可以通过 e.detail.code 向服务器请求手机号
      wx.request({
        url: baseUrl+ '/wx/api/getPhoneNumber?code=' +e.detail.code,
        method: 'GET',
        success: function (res) {
          const phone = res.data.msg;
          this.login(phone);
          wx.setStorageSync('phone', phone);
          wx.setStorageSync('login', true);
          // 返回上一页
          wx.navigateBack({
             delta: 1
          });
        }.bind(this),
            fail: function (err) {
              console.log('接口请求失败', err);
              wx.hideLoading();
            }
        });
    } else {
      // 用户拒绝授权或发生错误
      console.error('获取手机号失败', e.detail.errMsg);
       // 返回上一页
       wx.navigateBack({
         delta: 1
       });
    }
  },
  login (phoneNumber) {
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: baseUrl+ '/wx/api/login?code=' +res.code+'&phoneNumber='+phoneNumber,
            method: 'GET',
            success: function (result) {
              wx.setStorageSync('openId', result.data.data.openId);
              wx.hideLoading();
            }.bind(this),
            fail: function (err) {
                console.log('接口请求失败', err);
                wx.hideLoading();
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          wx.hideLoading();
        }
      }
    })
    }   
})
