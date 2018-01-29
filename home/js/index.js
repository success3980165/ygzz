new Vue({
  el: '#app',
  data: {
    hoolaiCmsAPI: new hoolaiCmsAPI(22, false),
    listName: '',
    listData: [],
    isChecked: 1,
    navChecked: 1,
    jzy_pic: true,
    myc_pic: false,
    lzz_pic: false,
    baze_pic: false,
    jzy: 'img/jzy_hover.png',
    myc: 'img/myc.png',
    lzz: 'img/lzz.png',
    baze: 'img/baze.png',
    black_cloud: 1,
    shouye: true,
    more1: true,
    article_title: '',
    article_time: '',
    article_content: '',
    all: 8,
    cur: 1,
    more1: true,
    more_href: '',
    lunboArr: [],
    ziliaoArr: [],
    mySwiper: '',
    ziliaoSwiper: '',
    cover: false,
    video: false,
    video_play: false
  },
  watch: {
    cur: function(oldValue, newValue) {
      console.log(arguments);
    }
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
  mounted: function() {
    this.initData();
  },
  // created: function() {
  //   this.initData();
  // },
  computed: {
    indexs: function() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2
          right = this.cur + 2
        } else {
          if (this.cur <= 3) {
            left = 1
            right = 5
          } else {
            right = this.all
            left = this.all - 4
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    videoClose: function() {
      this.video_play = false
      this.cover = false
    },
    clickVideo: function() {
      this.cover = true;
      this.video = true;
      this.video_play = true;
    },
    expect: function() {
      alert("敬请期待！")
    },
    btnClick: function(indexVal) { //页码点击事件
      console.log(indexVal);
      this.goGetList(this.listName, indexVal, 3);
    },
    clickJzy: function() {
      this.jzy_pic = true;
      this.myc_pic = false;
      this.lzz_pic = false;
      this.baze_pic = false;
      this.jzy = 'img/jzy_hover.png';
      this.myc = 'img/myc.png';
      this.lzz = 'img/lzz.png';
      this.baze = 'img/baze.png'
    },
    clickMyc: function() {
      this.jzy_pic = false;
      this.myc_pic = true;
      this.lzz_pic = false;
      this.baze_pic = false;
      this.myc = 'img/myc_hover.png';
      this.jzy = 'img/jzy.png';
      this.lzz = 'img/lzz.png';
      this.baze = 'img/baze.png';
    },
    clickLzz: function() {
      this.jzy_pic = false;
      this.myc_pic = false;
      this.lzz_pic = true;
      this.baze_pic = false;
      this.lzz = 'img/lzz_hover.png';
      this.myc = 'img/myc.png';
      this.jzy = 'img/jzy.png';
      this.baze = 'img/baze.png';
    },
    clickBaze: function() {
      this.jzy_pic = false;
      this.myc_pic = false;
      this.lzz_pic = false;
      this.baze_pic = true;
      this.baze = 'img/baze_hover.png';
      this.lzz = 'img/lzz.png';
      this.myc = 'img/myc.png';
      this.jzy = 'img/jzy.png';
    },
    initData: function() {
      var that = this;
      var tag = window.location.hash.substr(1);
      var locationHrefArr = window.location.href.split("#");
      if (locationHrefArr.length == 1) { //首页
        var biaoshi = window.location.pathname.split('/');
        if (biaoshi[biaoshi.length - 1] == 'list.html') {
          that.goGetList('公告', 1, 3)
        } else {
          console.log('首页')
          that.goGetList('公告', 1, 4);
          that.goGetLunbo();
        }

        if (biaoshi[biaoshi.length - 1] == 'datum.html') {
          that.ZiliaoLunbo();
        }
        this.navChecked = 1;
      } else { //二级页
        if (tag == 'zuixin') {
          console.log('二级页')
          that.goGetList('最新', 1, 3);
        } else if (tag == 'xinwen') {
          console.log('二级页')
          that.goGetList('新闻', 1, 3);
          this.navChecked = 2;
        } else if (tag == 'gonggao') {
          console.log('二级页')
          that.goGetList('公告', 1, 3);
          this.navChecked = 3;
        } else if (tag == 'gonglue') {
          console.log('二级页')
          that.goGetList('攻略', 1, 3);
          this.navChecked = 4;
        } else if (tag == 'huodong') {
          console.log('二级页')
          that.goGetList('活动', 1, 3);
          this.navChecked = 5;
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
        that.isChecked = 2;
      } else if (str == '新闻') {
        that.more_href = 'list.html#' + 'xinwen';
        that.listName = '新闻';
        that.isChecked = 5;
      } else if (str == '公告') {
        that.more_href = 'list.html#' + 'gonggao';
        that.listName = '公告';
        that.isChecked = 1;
      } else if (str == '攻略') {
        that.more_href = 'list.html#' + 'gonglue';
        that.listName = '攻略';
        that.isChecked = 3;
      } else if (str == '活动') {
        that.more_href = 'list.html#' + 'huodong';
        that.listName = '活动';
        that.isChecked = 4;
      }

      var that = this;
      // that.clean();
      var params = {};
      // 1: 获取推荐的文章
      // params.isRecommend = 1;
      // 2: 获取某个类型的所有文章
      params.categoryName = str;
      // 3: 分页 page 默认显示第1页
      // params.page = 1;
      params.page = num;
      // 4: 每页显示多少个 默认10个
      params.rows = rows;
      that.listName = str;


      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        if (listData.length < 3 && num == 1) {
          that.more1 = false;
        } else {
          that.more1 = true;
        }
        that.listData = result.rows;
        console.log(that.listData)
        listData.forEach(function(item) {
            // item.listDataTime = moment(item.updated).format('YYYY-MM-DD');
            item.updated = item.created.substr(0, 10);
            item.hrefVal = 'article.html#' + item.id;
          })
          // 总页数
        that.all = Math.ceil(result.total / params.rows);
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
    goGetLunbo: function() {
      var that = this;
      var params = {};
      params.categoryName = '轮播';
      that.hoolaiCmsAPI.getList(params, function(result) {
        console.log(result.rows)
        that.lunboArr = result.rows;
        that.$nextTick(function() {
          that.mySwiper = new Swiper('.shouye_swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            // spaceBetween: 30,
            centeredSlides: true,
            // autoplay: 2500,
            // autoplayDisableOnInteraction: false,
            // loop: true
            paginationClickable: true,
            observer: true,
            loop: true,
            autoplay: 2500,
          })
        })
      })
    },
    ZiliaoLunbo: function() {
      var that = this;
      var params = {};
      params.categoryName = '游戏资料';
      that.hoolaiCmsAPI.getList(params, function(result) {
        console.log(result.rows)
        that.ziliaoArr = result.rows;
        that.$nextTick(function() {
          // DOM 更新了
          that.ziliaoSwiper = new Swiper('.ziliao-swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            // autoplay: 2500,
            autoplayDisableOnInteraction: false,
            loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
          })
        })

      })
    }
  }
})