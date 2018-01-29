new Vue({
  el: '#app',
  data: {
    hoolaiCmsAPI: new hoolaiCmsAPI(22, false),
    listData: [],
    listName: '',
    more_href: '',
    gonggao: false,
    zuixin: false,
    gonglue: false,
    huodong: false,
    xinwen: true,
    lunboArr: [],
    mySwiper1: '',
    tsqw_bg: 'img/1_big.png',
    icon_one: 'img/1_little_act.png',
    icon_two: 'img/2_little.png',
    icon_three: 'img/3_little.png',
    icon_four: 'img/4_little_act.png',
    cur_page: 1,
    total_page: 1,
    jieshaoArr: [],
    taozhuangArr: [],
    jinengArr: [],
    mySwiper2: '',
    article_title: '',
    article_time: '',
    article_content: '',
    show_dialog: false,
    download_link: ''
  },
  mounted(){
    this.initData();
  },
  beforeCreate: function() {
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?045c456e3df2a4d5395bf76b241770da";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },
  created: function() {
    if (isMobile.apple.device) {
      this.download_link = 'javascript:alert("敬请期待")'
    }
    if (isMobile.android.device) {
      this.download_link = 'https://www.taptap.com/app/69752'
    }
  },
  methods: {
    initData: function() {
      var that = this;
      var tag = window.location.hash.substr(1);
      console.log(tag)
      var locationHrefArr = window.location.href.split("#");

      if (locationHrefArr.length == 1) {

        // 判断是首页还是游戏资料页
        var biaoshi = window.location.pathname.split('/');
        if (biaoshi[biaoshi.length-1] == 'ziliao.html'){
          console.log('资料页');
          that.goGetZiliao();
        }else{
          console.log('首页')
          that.goGetList('公告', 1, 2);
          that.goGetLunbo();
        }
      } else {
        // 二级页
        if (tag == 'zuixin') {
          console.log('二级页')
          that.goGetList('最新', 1, 3);
        } else if (tag == 'xinwen') {
          console.log('二级页')
          that.goGetList('新闻', 1, 3);
        } else if (tag == 'gonggao') {
          console.log('二级页')
          that.goGetList('公告', 1, 3);
        } else if (tag == 'gonglue') {
          console.log('二级页')
          that.goGetList('攻略', 1, 3);
        } else if (tag == 'huodong') {
          console.log('二级页')
          that.goGetList('活动', 1, 3);
        } else {
          console.log('文章页')
          // 三级页
          that.goGetByID(tag);
        }
      }

    },
    goGetList: function(str, num, rows) {
      var that = this;
      if (str == '最新') {
        that.more_href = 'list.html#' + 'zuixin';
        that.listName = '最新';
        that.zuixin = true;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '新闻') {
        that.more_href = 'list.html#' + 'xinwen';
        that.listName = '新闻';
        that.zuixin = false;
        that.xinwen = true;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '公告') {
        that.more_href = 'list.html#' + 'gonggao';
        that.listName = '公告';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = true;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '攻略') {
        that.more_href = 'list.html#' + 'gonglue';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = true;
        that.huodong = false;
        that.listName = '攻略';
      } else if (str == '活动') {
        that.more_href = 'list.html#' + 'huodong';
        that.listName = '活动';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = true;
      }

      var params = {};
      // 1: 获取推荐的文章
      // params.isRecommend = 1;
      // 2: 获取某个类型的所有文章
      params.categoryName = str;
      // 3: 分页 page 默认显示第1页
      // params.page = 1;
      params.page = num;
      // 4: 每页显示多少个 默认10个
      // if (rows) {
      //   params.rows = 100;
      // } else {
      //   params.rows = 5;
      // }
      params.rows = rows;
      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        listData.forEach(function(item) {
          item.updated = item.created.substr(0, 10);
          item.hrefVal = 'article.html#' + item.id;
        })
        that.listData = listData;
        that.total_page = Math.ceil(result.total/3);
        console.log(result);


      })
    },
    goGetZiliao: function(){
      var that = this;
      var params = {};
      params.categoryName = '游戏资料';
      params.rows = 100;
      that.hoolaiCmsAPI.getList(params, function(result) {
        var arr = result.rows;
        for (var i=0;i<arr.length;i++){
          if (arr[i].fields.classify === '妖怪介绍'){
            that.jieshaoArr.push(arr[i]);
          } else if (arr[i].fields.classify === '套装资料'){
            that.taozhuangArr.push(arr[i]);
          } else if (arr[i].fields.classify === '技能说明'){
            that.jinengArr.push(arr[i]);
          }
        }
        console.log(that.jieshaoArr)
        that.mySwiper2 = new Swiper('.jieshao_swiper', {
           paginationClickable :true,
           observer: true,
           loop: false,
           prevButton: '.swiper-button-prev',
           nextButton: '.swiper-button-next'
         })
      })
    },
    goGetByID: function(articleTag) {
      var that = this;
      console.log(articleTag);
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        that.article_title = result.data.title;
        that.article_time = result.data.updated;
        that.article_content = result.data.content;
      }, 'json')
    },
    goGetLunbo: function(){
      var that = this;
      var params = {};
      params.categoryName = '轮播';
      that.hoolaiCmsAPI.getList(params, function(result) {
        console.log(result.rows)
        that.lunboArr = result.rows;
        that.mySwiper1 = new Swiper('.shouye_swiper', {
           paginationClickable :true,
           observer: true,
           loop: false
         })
      })
    },
    playVideo: function(num){
      console.log(num)
    },
    changeIcon: function(num){
      var that = this;
      if (num == 1) {
        that.tsqw_bg = 'img/1_big.png';
        that.icon_one = 'img/1_little_act.png';
        that.icon_two = 'img/2_little.png';
        that.icon_three = 'img/3_little.png';
        that.icon_four = 'img/4_little_act.png';
      }else if (num == 2) {
        that.tsqw_bg = 'img/2_big.png';
        that.icon_one = 'img/1_little.png';
        that.icon_two = 'img/2_little_act.png';
        that.icon_three = 'img/3_little.png';
        that.icon_four = 'img/4_little_act.png';
      }else if (num == 3) {
        that.tsqw_bg = 'img/3_big.png';
        that.icon_one = 'img/1_little.png';
        that.icon_two = 'img/2_little.png';
        that.icon_three = 'img/3_little_act.png';
        that.icon_four = 'img/4_little_act.png';
      }else if (num == 4) {
        that.tsqw_bg = 'img/4_big.png';
        that.icon_one = 'img/1_little.png';
        that.icon_two = 'img/2_little.png';
        that.icon_three = 'img/3_little.png';
        that.icon_four = 'img/4_little_act.png';
      }
    },
    showWechat: function(){
      this.show_dialog = true;
    },
    nextPage: function(){
      var that = this;
      console.log(this.cur_page);
      console.log(this.total_page)
      if (that.cur_page < that.total_page){
        that.goGetList(that.listName, that.cur_page+1, 3);
        that.cur_page += 1;
      } else{
        that.cur_page = that.total_page;
      }
    },
    prevPage: function(){
      var that = this;
      console.log(this.cur_page);
      console.log(this.total_page)
      if (that.cur_page > 1){
        that.goGetList(that.listName, that.cur_page-1, 3);
        that.cur_page -= 1;
      } else{
        that.cur_page = 1;
      }
    },
    goBack: function(){
      window.history.back();
    },
    showDialog: function(){
      this.show_dialog = true;
    },
    closeDialog: function(){
      this.show_dialog = false;
    },
    qidai: function(){
      console.log('aa')
      alert('敬请期待！')
    }
  }
})
