// pages/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    author:"",
    detail:""
  },

  //获取标题
  getTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  //获取标题
  getAuthor: function (e) {
    this.setData({
      author: e.detail.value
    })
  },
  //获取内容
  getDetail: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
//发送信息
sendMessage:function(){
  var that = this
  wx.request({
    url: 'http://127.0.0.1:5000/add_msg?title=' + that.data.title + '&author=' + that.data.author + '&detail=' + that.data.detail,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: "text",
    success: function (res) {
     if(res.data=='success'){
      
       that.setData({
         title: "",
         author: "",
         detail: ""
       }),

       wx.showToast({
         title: '留言成功',
         icon: 'success',
         duration: 2000,
         complete: wx.navigateTo({
           url: '/pages/index/index'
         })
       })
    
     }else{
       wx.showToast({
         title: '留言失败',
         icon: 'fail',
         duration: 2000
       })
     }
     
    }
  })
}

  
})