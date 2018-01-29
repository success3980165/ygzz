new Vue({
  el: '.one',
  data: {
    cover: false,
    dialog: false,
    leiShow:true,
    muShow:false,
    ygzzActivityAPI: new hoolaiActivityAPI(41, true),
    countdown: 60,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    isGrayBg: false,
    telephone: '',
    character:'',
    code: '',
    isAnd: true,
    isIos: false,
    convertId: null,
    success:false,
    fail:false,
    cover2: false,
    channelName: '',
    shijie: false,
    jieshao: false
  },
  created: function() {
    if (isMobile.apple.device) {
      this.isIos = true
      this.isAnd = false
    }
    if (isMobile.android.device) {
      this.isAnd = true
      this.isIos = false
    }
    this.getUrlParam(name);
    this.loadData();
  },
  methods: {
    dialogOpen: function() {
      this.cover = true
      this.dialog = true
    },
    dialogClose: function() {
      this.cover = false
      this.dialog = false
    },
    closeSuccess: function() {
      this.cover2 = false
      this.success = false
    },
    closeFail: function(){
      this.cover2 = false
      this.fail = false
    },
    clickLeft:function () {
      if (this.leiShow) {
        this.leiShow = false;
        this.muShow = true;
      } else {
        this.leiShow = true;
        this.muShow = false;
      }
    },
     chooseXT: function(str) {
      if (str == 'android') {
        this.isAnd = true;
        this.isIos = false;
      } else {
        this.isAnd = false;
        this.isIos = true;
      }
    },
    
    closeMc: function() {
      this.cover = false
      this.yuyue = false
    },
    setTime: function() {
      if (this.countdown == 0) {
        this.isGrayBg = false;
        this.smsCodeVal = "获取验证码";
        this.isDisabled = false;
        return;
      } else {
        this.isDisabled = true;
        this.isGrayBg = true;
        this.smsCodeVal = '重新发送' + this.countdown + 's';
        this.countdown--;
      }
      setTimeout(this.setTime, 1000)
    },
    sendSms: function() {
      var self = this;
      console.log(this.telephone);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
      if (this.leiShow) {
        this.character = '雷震子';
      } else {
        this.character = '母夜叉';
      }
      console.log(this.character)
      data.series = this.character;
      this.ygzzActivityAPI.sendMobileCode(data, function(result) {
        if (result.ret != 1) {
          if (result.code == 19) {
            // 错误的手机号
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 4) {
            // 重复领取
            self.fail=true
            self.cover2=true
            return;
          }
          // alert(result.msg);
        } else {
          self.isGrayBg = true;
          self.countdown = 60;
          self.setTime();
        }
      })
    },
    // 领取礼包，获取礼包码
    saveRecord: function() {
      var mobile = this.telephone;
      var mobilecode = this.code;
      var platform = '';
      var series = this.character;
      if (this.isAnd) {
        platform = 'android';
      } else {
        platform = 'ios';
      }
      if (this.leiShow) {
        this.character = '雷震子';
      } else {
        this.character = '母夜叉';
      }
      console.log(this.character)
      var self = this;
      var data = {};
      data.mobile = mobile;
      data.series = this.character;
      data.verifyCode = mobilecode;
      data.platform = platform;
      data.channel = self.channelName;

      console.log(data);

      this.ygzzActivityAPI.saveRecord(data, function(result) {
        console.log(result)
        if (result.ret != 1) {
          if (result.code == 7) {
            alert("错误的验证码")
            return;
          }
          if (result.code == 19) {
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 5) {
            self.fail=true
            self.cover2=true
            return;
          }
          alert(result.msg);
        } else {
          self.success=true
          self.cover2=true
          self.cover = false
          self.dialog = false
          if (self.convertId) {
            _taq.push({
              convert_id: self.convertId,
              event_type: "button"
            })
          }
        }
      })
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    loadData: function() {
      var that = this;
      that.getUrlParam(name);
      var channelId = that.getUrlParam('channel');
      var channelData = {};
      if (channelId) {
        $.getJSON('/channel.json?n=' + new Date().getTime(), function(list) {
          list.forEach(function(item) {
            if ((item.channelId + "") === channelId) {
              channelData = item;
              that.channelName = channelData.channelName;
              console.log(that.channelName);
              // 今日头条channelId 201-203
              // if (item.channelId >= 201 && item.channelId <= 203) {
              //   that.bindToutiaoBi(item.convertId);
              // }
            }
          })
        })
      }
    }
  }
})
new Vue({
  el: '#app',
  data: {
    cover: false,
    dialog: false,
    leiShow:true,
    muShow:false,
    ygzzActivityAPI: new hoolaiActivityAPI(41, true),
    countdown: 60,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    isGrayBg: false,
    telephone: '',
    character:'',
    code: '',
    isAnd: true,
    isIos: false,
    convertId: null,
    success:false,
    fail:false,
    cover2: false,
    channelName: ''
  },
  methods: {
    dialogOpen: function() {
      this.cover = true
      this.dialog = true
    },
    dialogClose: function() {
      this.cover = false
      this.dialog = false
    },
    closeSuccess: function() {
      this.cover2 = false
      this.success = false
    },
    closeFail: function(){
      this.cover2 = false
      this.fail = false
    },
    clickLeft:function () {
      if (this.leiShow) {
        this.leiShow = false;
        this.muShow = true;
      } else {
        this.leiShow = true;
        this.muShow = false;
      }
    },
     chooseXT: function(str) {
      if (str == 'android') {
        this.isAnd = true;
        this.isIos = false;
      } else {
        this.isAnd = false;
        this.isIos = true;
      }
    },
    
    closeMc: function() {
      this.cover = false
      this.yuyue = false
    },
    setTime: function() {
      if (this.countdown == 0) {
        this.isGrayBg = false;
        this.smsCodeVal = "获取验证码";
        this.isDisabled = false;
        return;
      } else {
        this.isDisabled = true;
        this.isGrayBg = true;
        this.smsCodeVal = '重新发送' + this.countdown + 's';
        this.countdown--;
      }
      setTimeout(this.setTime, 1000)
    },
    sendSms: function() {
      var self = this;
      console.log(this.telephone);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
      if (this.leiShow) {
        this.character = '雷震子';
      } else {
        this.character = '母夜叉';
      }
      console.log(this.character)
      data.series = this.character;
      this.ygzzActivityAPI.sendMobileCode(data, function(result) {
        if (result.ret != 1) {
          if (result.code == 19) {
            // 错误的手机号
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 4) {
            // 重复领取
            self.fail=true
            self.cover2=true
            return;
          }
          // alert(result.msg);
        } else {
          self.isGrayBg = true;
          self.countdown = 60;
          self.setTime();
        }
      })
    },
    // 领取礼包，获取礼包码
    saveRecord: function() {
      var mobile = this.telephone;
      var mobilecode = this.code;
      var platform = '';
      var series = this.character;
      if (this.isAnd) {
        platform = 'android';
      } else {
        platform = 'ios';
      }
      if (this.leiShow) {
        this.character = '雷震子';
      } else {
        this.character = '母夜叉';
      }
      console.log(this.character)
      var self = this;
      var data = {};
      data.mobile = mobile;
      data.series = this.character;
      data.verifyCode = mobilecode;
      data.platform = platform;
      data.channel = self.channelName;

      console.log(data);

      this.ygzzActivityAPI.saveRecord(data, function(result) {
        console.log(result)
        if (result.ret != 1) {
          if (result.code == 7) {
            alert("错误的验证码")
            return;
          }
          if (result.code == 19) {
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 5) {
            self.fail=true
            self.cover2=true
            return;
          }
          alert(result.msg);
        } else {
          self.success=true
          self.cover2=true
          self.cover = false
          self.dialog = false
          if (self.convertId) {
            _taq.push({
              convert_id: self.convertId,
              event_type: "button"
            })
          }
        }
      })
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    loadData: function() {
      var that = this;
      that.getUrlParam(name);
      var channelId = that.getUrlParam('channel');
      var channelData = {};
      if (channelId) {
        $.getJSON('/channel.json?n=' + new Date().getTime(), function(list) {
          list.forEach(function(item) {
            if ((item.channelId + "") === channelId) {
              channelData = item;
              that.channelName = channelData.channelName;
              console.log(that.channelName);
              // 今日头条channelId 201-203
              // if (item.channelId >= 201 && item.channelId <= 203) {
              //   that.bindToutiaoBi(item.convertId);
              // }
            }
          })
        })
      }
    }
  }
})
new Vue({
  el: '.two',
  data: {
    jiangbg:'./img/jiang.jpg',
    muyechabg:'./img/muyecha.jpg',
    leizhenzibg:'./img/leizhenzi.jpg',
    baizebg:'./img/baize.jpg',
    iconJiang:'./img/a1.png',
    iconMu:'./img/b2.png',
    iconLei:'./img/c2.png',
    iconBai:'./img/d2.png',
    cover3Show:false,
    jiangShow:true,
    mu2Show:false,
    lei2Show:false,
    baiShow:false,
    oneShow:false,
    twoShow:false,
    threeShow:false,
    fourShow:false,
    cover: false,
    dialog: false,
    leiShow:true,
    muShow:false,
    ygzzActivityAPI: new hoolaiActivityAPI(41, true),
    countdown: 60,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    isGrayBg: false,
    telephone: '',
    character:'',
    code: '',
    isAnd: true,
    isIos: false,
    convertId: null,
    success:false,
    fail:false,
    cover2: false,
    channelName: '',
    shijie: false,
    jieshao: false
 },
 created: function() {
    if (isMobile.apple.device) {
      this.isIos = true
      this.isAnd = false
    }
    if (isMobile.android.device) {
      this.isAnd = true
      this.isIos = false
    }
    this.getUrlParam(name);
    this.loadData();
  },
 methods: {   
    clickJiang:function () {
      var that = this
      that.jiangShow = true
      that.mu2Show = false
      that.lei2Show = false
      that.baiShow = false
      that.iconJiang = './img/a1.png'
      that.iconMu = './img/b2.png'
      that.iconLei = './img/c2.png'
      that.iconBai = './img/d2.png'
    },
    clickMu:function () {
      var that = this
      that.jiangShow = false
      that.mu2Show = true
      that.lei2Show = false
      that.baiShow = false
      that.iconJiang = './img/a2.png'
      that.iconMu = './img/b1.png'
      that.iconLei = './img/c2.png'
      that.iconBai = './img/d2.png'
    },
    clickLei:function () {
      var that = this
      that.jiangShow = false
      that.mu2Show = false
      that.lei2Show = true
      that.baiShow = false
      that.iconJiang = './img/a2.png'
      that.iconMu = './img/b2.png'
      that.iconLei = './img/c1.png'
      that.iconBai = './img/d2.png'
    },
    clickBai:function () {
      var that = this
      that.jiangShow = false
      that.mu2Show = false
      that.lei2Show = false
      that.baiShow = true
      that.iconJiang = './img/a2.png'
      that.iconMu = './img/b2.png'
      that.iconLei = './img/c2.png'
      that.iconBai = './img/d1.png'
    },
    clickOne:function () {
      var that = this
      that.oneShow = true
      that.cover3Show = true
    },
    clickTwo:function () {
      var that = this
      that.twoShow = true
      that.cover3Show = true
    },
    clickThree:function () {
      var that = this
      that.threeShow = true
      that.cover3Show = true
    },
    clickFour:function () {
      var that = this
      that.fourShow = true
      that.cover3Show = true
    },
    closeDialog:function () {
      var that = this
      that.cover3Show = false
      that.oneShow = false
      that.twoShow = false
      that.threeShow = false
      that.fourShow = false
    },
    dialogOpen: function() {
      this.cover = true
      this.dialog = true
    },
    dialogOpen: function() {
      this.cover = true
      this.dialog = true
    },
    dialogClose: function() {
      this.cover = false
      this.dialog = false
    },
    closeSuccess: function() {
      this.cover2 = false
      this.success = false
    },
    closeFail: function(){
      this.cover2 = false
      this.fail = false
    },
    clickLeft:function () {
      if (this.leiShow) {
        this.leiShow = false;
        this.muShow = true;
      } else {
        this.leiShow = true;
        this.muShow = false;
      }
    },
     chooseXT: function(str) {
      if (str == 'android') {
        this.isAnd = true;
        this.isIos = false;
      } else {
        this.isAnd = false;
        this.isIos = true;
      }
    },
    
    closeMc: function() {
      this.cover = false
      this.yuyue = false
    },
    setTime: function() {
      if (this.countdown == 0) {
        this.isGrayBg = false;
        this.smsCodeVal = "获取验证码";
        this.isDisabled = false;
        return;
      } else {
        this.isDisabled = true;
        this.isGrayBg = true;
        this.smsCodeVal = '重新发送' + this.countdown + 's';
        this.countdown--;
      }
      setTimeout(this.setTime, 1000)
    },
    sendSms: function() {
      var self = this;
      console.log(this.telephone);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
      if (this.leiShow) {
        this.character = '雷震子';
      } else {
        this.character = '母夜叉';
      }
      console.log(this.character)
      data.series = this.character;
      this.ygzzActivityAPI.sendMobileCode(data, function(result) {
        if (result.ret != 1) {
          if (result.code == 19) {
            // 错误的手机号
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 4) {
            // 重复领取
            self.fail=true
            self.cover2=true
            return;
          }
          // alert(result.msg);
        } else {
          self.isGrayBg = true;
          self.countdown = 60;
          self.setTime();
        }
      })
    },
    // 领取礼包，获取礼包码
    saveRecord: function() {
      var mobile = this.telephone;
      var mobilecode = this.code;
      var platform = '';
      var series = this.character;
      if (this.isAnd) {
        platform = 'android';
      } else {
        platform = 'ios';
      }
      if (this.leiShow) {
        this.character = '雷震子';
      } else {
        this.character = '母夜叉';
      }
      console.log(this.character)
      var self = this;
      var data = {};
      data.mobile = mobile;
      data.series = this.character;
      data.verifyCode = mobilecode;
      data.platform = platform;
      data.channel = self.channelName;

      console.log(data);

      this.ygzzActivityAPI.saveRecord(data, function(result) {
        console.log(result)
        if (result.ret != 1) {
          if (result.code == 7) {
            alert("错误的验证码")
            return;
          }
          if (result.code == 19) {
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 5) {
            self.fail=true
            self.cover2=true
            return;
          }
          alert(result.msg);
        } else {
          self.success=true
          self.cover2=true
          self.cover = false
          self.dialog = false
          if (self.convertId) {
            _taq.push({
              convert_id: self.convertId,
              event_type: "button"
            })
          }
        }
      })
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    loadData: function() {
      var that = this;
      that.getUrlParam(name);
      var channelId = that.getUrlParam('channel');
      var channelData = {};
      if (channelId) {
        $.getJSON('/channel.json?n=' + new Date().getTime(), function(list) {
          list.forEach(function(item) {
            if ((item.channelId + "") === channelId) {
              channelData = item;
              that.channelName = channelData.channelName;
              console.log(that.channelName);
              // 今日头条channelId 201-203
              // if (item.channelId >= 201 && item.channelId <= 203) {
              //   that.bindToutiaoBi(item.convertId);
              // }
            }
          })
        })
      }
    }
  }
})