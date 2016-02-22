(function() {
  var productsPaths = ['/engine/'],
      navMaxWidth = 940;

  $(document).ready(function() {

    if ($(window).width() <= navMaxWidth) {
      $('.inner-wrap').addClass('active');
      if (productsPaths.indexOf(window.location.pathname) > -1) {
        console.log('nav-product')
        $('.nav-product').addClass('active'); //should be renamed ".product-nav"
      } else {
        $('.global-nav').addClass('active');
      }
    }

  });

  $('.left-off-toggle').click(function() {
    var innerWrap = $('.inner-wrap');
    if (innerWrap.hasClass('active') || innerWrap.hasClass('slide-right')) {
      innerWrap.removeClass('active');
      innerWrap.removeClass('slide-right');
      innerWrap.addClass('slide-left');
    } else {
      innerWrap.addClass('slide-right');
      innerWrap.removeClass('slide-left');
    }
  });

  $('.site-nav-docs-link').click(function() {
    $('.global-nav').removeClass('active');
    $('.site-nav-docs').addClass('active');
  });

  $('.nav-docs-back').click(function() {
    $('.global-nav').addClass('active');
    $('.site-nav-docs').removeClass('active');
  });

  $('.site-nav-docs a').click(function() {
    $('nav-loading').addClass('active');
  });

  // $('.site-nav-docs a').click(function() {
  //    var classStr = $(this).attr("class"),
  //        product = classStr.substring(0, classStr.lastIndexOf('-'));
  //     $('.site-nav-docs').removeClass('active');
  //     $('.'+product).addClass('active');
  //  });

  $('.nav-product a:first-of-type').click(function() {
    var classStr = $(this).parent().parent().parent().attr("class"),
        product = classStr.substr(0, classStr.indexOf(' '));
    $('.site-nav-docs').addClass('active');
    $('.'+product).removeClass('active');
  });
})();
