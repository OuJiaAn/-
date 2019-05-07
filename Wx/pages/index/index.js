
Page({
  data: {
  

  },
  onReady: function () {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/get_all_msg',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          list: res.data,
        })
      }
    })
  },
//下拉刷新
  onPullDownRefresh() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/get_all_msg',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          list: res.data,
        })
      }
    })

  },
//跳转留言界面
  gotoWrite: function () {
    wx.navigateTo({
      url: '/pages/write/write'
    })
  },

  //列表点击事件
  onPostTap:function(e){
    var that= this
    var postId = e.currentTarget.dataset.postid;
    console.log(postId);
   
    wx.navigateTo({
      url: '/pages/detail/detail?id='+postId,
    })

  }

})
