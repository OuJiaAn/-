// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   user:"",
   password:""
  },

  //获取标题
  getUser: function (e) {
    this.setData({
      user: e.detail.value
    })
  }, //获取标题
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  login: function () {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/login?username='+that.data.user+'&password='+that.data.password,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: "text",
      success: function (res) {
       
       
        if (res.data.logined == true) {

          that.setData({
            user: "",
            password: ""
          }),

            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
            complete: wx.redirectTo({
                url: '/pages/index/index'
              })
            })

        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'loading',
            duration: 1500
          })
        }

      }
    })
  }

})