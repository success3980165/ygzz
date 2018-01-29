new Vue({
  el: "#app",
  data: {
    isChecked: 1,
    jzy: true,
    muyecha: false,
    leizhenzi: false,
    baize: false,
    jzypic: 'img/five.png',
    muyechapic: 'img/two.png',
    leizhenzipic: 'img/three.png',
    baizepic: 'img/four.png',
    show: true,
    cover: false,
    dialog: false,
    leiShow: true,
    muShow: false,
    ygzzActivityAPI: new hoolaiActivityAPI(41, true),
    isAndroidActive: true,
    isiOSActive: false,
    iosOrAndroid: 'android',
    countdown: 60,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    isGrayBg: false,
    telephone: '',
    character: '',
    code: '',
    channelName: '',
    isAnd: true,
    isIos: false,
    convertId: null,
    success: false,
    fail: false,
    cover2: false,
    zhuoyaopic: 'img/zhuoyao.png',
    tianshupic: 'img/tianshu.png',
    zhiyipic: 'img/zhiyi.png',
    qiwenpic: 'img/qiwen.png'
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
    clickEnter: function() {
      alert("敬请期待！")
    },
    clickTianshu: function() {
      this.tianshupic = 'img/tshover.png'
    },
    closeTianshu: function() {
      this.tianshupic = 'img/tianshu.png'
    },
    clickZhiyi: function() {
      this.zhiyipic = 'img/zyhover.png'
    },
    closeZhiyi: function() {
      this.zhiyipic = 'img/zhiyi.png'
    },
    clickQiwen: function() {
      this.qiwenpic = "img/qiwen_hover.png"
    },
    closeQiwen: function() {
      this.qiwenpic = "img/qiwen.png"
    },
    clickJzy: function() {
      this.isChecked = 1;
      this.jzy = true;
      this.muyecha = false;
      this.leizhenzi = false;
      this.baize = false;
      this.jzypic = 'img/five.png';
      this.muyechapic = 'img/two.png';
      this.leizhenzipic = 'img/three.png';
      this.baizepic = 'img/four.png'
    },
    clickMuyecha: function() {
      this.isChecked = 2;
      this.jzy = false;
      this.muyecha = true;
      this.leizhenzi = false;
      this.baize = false;
      this.jzypic = 'img/one.png';
      this.muyechapic = 'img/six.png';
      this.leizhenzipic = 'img/three.png';
      this.baizepic = 'img/four.png'
    },
    clickLeizhenzi: function() {
      this.isChecked = 3;
      this.jzy = false;
      this.muyecha = false;
      this.leizhenzi = true;
      this.baize = false;
      this.jzypic = 'img/one.png';
      this.muyechapic = 'img/two.png';
      this.leizhenzipic = 'img/seven.png';
      this.baizepic = 'img/four.png'
    },
    clickBaize: function() {
      this.isChecked = 4;
      this.jzy = false;
      this.muyecha = false;
      this.leizhenzi = false;
      this.baize = true;
      this.jzypic = 'img/one.png';
      this.muyechapic = 'img/two.png';
      this.leizhenzipic = 'img/three.png';
      this.baizepic = 'img/eight.png'
    },
    dialogOpen: function() {
      this.cover = true
      this.dialog = true
      this.zhuoyaopic = 'img/zyghover.png'
    },
    dialogClose: function() {
      this.cover = false
      this.dialog = false
      this.zhuoyaopic = 'img/zhuoyao.png'
    },
    closeSuccess: function() {
      this.cover2 = false
      this.success = false
    },
    closeFail: function() {
      this.cover2 = false
      this.fail = false
    },
    clickGainian: function() {
      alert("敬请期待！")
    },
    clickLeft: function() {
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
        this.isAndroidActive = true;
        this.isiOSActive = false;
        this.iosOrAndroid = 'android';
      } else {
        this.isAndroidActive = false;
        this.isiOSActive = true;
        this.iosOrAndroid = 'ios';
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
            }
          })
        })
      }
    },
    sendSms: function() {
      var self = this;
      console.log(this.telephone);
      console.log(self.channelName);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
      data.channel = self.channelName;
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
            self.fail = true
            self.cover2 = true
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
      if (this.iosOrAndroid == "android") {
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
            self.fail = true
            self.cover2 = true
            return;
          }
          alert(result.msg);
        } else {
          self.success = true
          self.cover2 = true
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
    }
  }
})