(function() {
  var productsPaths = ['/engine/'],
      path = window.location.pathname,
      basePath = path.substring(0, path.indexOf('/',1)+1);

  // console.log(path.split("/").length-1);

  $(document).ready(function() {
    viewMobileNav();
  });

  $('.left-off-toggle').click(function(e) {
    e.stopPropagation();
    var innerWrap = $('.inner-wrap');
    if (innerWrap.hasClass('active') || innerWrap.hasClass('slide-right')) {
      closeMobileNav();
    } else {
      innerWrap.addClass('slide-right');
      innerWrap.removeClass('slide-left');
      sessionStorage.mobileNav = 'open';
      viewMobileNav();
    }
  });

  $('.nav-docs').click(function(e) {
    e.stopPropagation();
  })

  $('.inner-wrap').click(function() {
    closeMobileNav();
  });

  $('.site-nav-docs-link').click(function(e) {
    e.stopPropagation();
    $('.global-nav').removeClass('active');
    $('.site-nav-docs').addClass('active');
  });

  $('.nav-docs-back').click(function(e) {
    e.stopPropagation();
    $('.global-nav').addClass('active');
    $('.site-nav-docs').removeClass('active');
  });

  $('.site-nav-docs a').click(function(e) {
    e.stopPropagation();
    $('nav-loading').addClass('active');
  });

  $('.nav-product a:first-of-type').click(function(e) {
    e.stopPropagation();
    $('.menu').removeClass('active');
    $('.site-nav-docs').addClass('active');
  });

  function viewMobileNav() {
    if (sessionStorage.mobileNav == 'open') {
      $('.inner-wrap').addClass('active');
      if (productsPaths.indexOf(basePath) > -1) {
        $('.nav-product').addClass('active'); //should be renamed ".product-nav"
      } else {
        $('.global-nav').addClass('active');
      }
    }
  };

  function closeMobileNav() {
    var innerWrap = $('.inner-wrap');
    innerWrap.removeClass('active');
    innerWrap.removeClass('slide-right');
    innerWrap.addClass('slide-left');
    sessionStorage.mobileNav = 'close';
  };


})();
