$(function() {
    $(".tianshu").click(function() {
      var left_val = $(".page_east").css("left");
      $(".page_east").css("display", "block");
      if (left_val == '2000px') {
        $('.page_east').animate({
          left: '0px'
        })
      }
    })
    $(".goback").click(function() {
      var left_val = $(".page_east").css("left");
      if (left_val == '0px') {
        $('.page_east').animate({
          left: '2000px'
        })
      }
      $(".page_east").delay(200).fadeOut();
    })
    $(".zhiyi").click(function() {
      var right_val = $(".page_west").css("right");
      $(".page_west").css("display", "block");
      if (right_val == '2000px') {
        $('.page_west').animate({
          right: '0px'
        })
      }
    })
    $(".go_west").click(function() {
      var right_val = $(".page_west").css("right");
      if (right_val == '0px') {
        $('.page_west').animate({
          right: '2000px'
        })
      }
      $(".page_west").delay(200).fadeOut();
    })
    $(".qiwen").click(function() {
      var top_val = $(".page_north").css("top");
      $(".page_north").css("display", "block");
      if (top_val == '-920px') {
        $('.page_north').animate({
          top: '0px'
        })
      }
    })
    $(".go_north").click(function() {
      var top_val = $(".page_north").css("top");
      if (top_val == '0px') {
        $('.page_north').animate({
          top: '-920px'
        })
      }
      $(".page_north").delay(300).fadeOut();
    })
  })
  // $(window).resize(function() {
  //   // alert($('.first').html($(window).width()));
  //   alert($(window).width()); //浏览器时下窗口可视区域宽度 
  //   alert($(window).height()); //浏览器时下窗口可视区域高度
  //   //  alert($(document).height()); //浏览器时下窗口文档的高度 
  //   //  alert($(document.body).height());//浏览器时下窗口文档body的高度 
  //   //  alert($(document.body).outerHeight(true));//浏览器时下窗口文档body的总高度 包括border padding margin 
  //   //  
  //   //  alert($(document).width());//浏览器时下窗口文档对于象宽度 
  //   //  alert($(document.body).width());//浏览器时下窗口文档body的高度 
  //   //  alert($(document.body).outerWidth(true));//浏览器时下窗口文档body的总宽度 包括border padding margin 
  // })