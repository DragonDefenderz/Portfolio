/* -------------------------------------------

Name: 		Toria
Version:  1.0
Author:		Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). mail: miller.themes@gmail.com

------------------------------------------- */

$(function() {

  "use strict";

  /***************************

  preloader

  ***************************/

  $(document).ready(function() {
    $('html').addClass('is-animating');
    $(".trm-scroll-container").animate({
      opacity: 0,
    });
    setTimeout(function() {
      $('html').removeClass('is-animating');
      $(".trm-scroll-container").animate({
        opacity: 1,
      }, 600);
    }, 1000);
  });

  /***************************

  swup

  ***************************/
  const options = {
    containers: ['#trm-dynamic-content'],
    animateHistoryBrowsing: true,
    linkSelector: '.trm-menu a:not([data-no-swup]), .trm-anima-link:not([data-no-swup])',
    animationSelector: '[class="trm-swup-animation"]'
  };
  const swup = new Swup(options);
  /***************************

  menu

  ***************************/
  $('.trm-menu-btn').on('click', function() {
    $('.trm-menu-btn , .trm-right-side').toggleClass('trm-active');
  })
  $('.trm-menu ul li a').on('click', function() {
    $('.trm-menu-btn , .trm-right-side').removeClass('trm-active');
  })
  /***************************
  
  mode switch
  
  ***************************/
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on initial load
    if (currentTheme === 'dark') {
        $('.trm-hidden-switcher input').prop("checked", true);
        $("#trm-switch-style").attr("href", "css/style-dark.css");
    } else {
        $('.trm-hidden-switcher input').prop("checked", false);
        $("#trm-switch-style").attr("href", "css/style-light.css");
    }

    $('.trm-mode-switcher').clone().appendTo('.trm-mode-switcher-place');
    $('#trm-swich').change(function () {
        if (this.checked) {
            $('.trm-hidden-switcher input').prop("checked", true);
            $('.trm-mode-swich-animation-frame').addClass('trm-active');
            $("#trm-scroll-container").animate({
                opacity: 0,
            }, 600, function () {
                setTimeout(function () {
                    $('.trm-mode-swich-animation').addClass('trm-active');
                    $("#trm-switch-style").attr("href", "css/style-dark.css");
                    // Save to localStorage
                    localStorage.setItem('theme', 'dark');
                }, 200);
                setTimeout(function () {
                    $('.trm-mode-swich-animation-frame').removeClass('trm-active');
                    $("#trm-scroll-container").animate({
                        opacity: 1,
                    }, 600);
                }, 1000);
            });
        } else {
            $('.trm-hidden-switcher input').prop("checked", false);
            $('.trm-mode-swich-animation-frame').addClass('trm-active');
            $("#trm-scroll-container").animate({
                opacity: 0,
            }, 600, function () {
                setTimeout(function () {
                    $('.trm-mode-swich-animation').removeClass('trm-active');
                    $("#trm-switch-style").attr("href", "css/style-light.css");
                    // Save to localStorage
                    localStorage.setItem('theme', 'light');
                }, 200);
                setTimeout(function () {
                    $('.trm-mode-swich-animation-frame').removeClass('trm-active');
                    $("#trm-scroll-container").animate({
                        opacity: 1,
                    }, 600);
                }, 1000);
            });
        }
    });
  /***************************

  counters

  ***************************/
  $('.trm-counter').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'linear',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
  /***************************

  locomotive scroll

  ***************************/
  const scroll = new LocomotiveScroll({
    el: document.querySelector('#trm-scroll-container'),
    smooth: true,
    lerp: .1
  });
  document.addEventListener('swup:contentReplaced', (event) => {
    scroll.destroy()
  });

  /***************************

  slideshow

  ***************************/
  var swiper = new Swiper('.trm-slideshow', {
    slidesPerView: 1,
    effect: 'fade',
    parallax: true,
    autoplay: true,
    speed: 1400,
  });
  /***************************

  testimonials slider

  ***************************/
  var swiper = new Swiper('.trm-testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    parallax: true,
    autoplay: false,
    speed: 1400,
    pagination: {
      el: '.trm-testimonials-slider-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.trm-testimonials-slider-next',
      prevEl: '.trm-testimonials-slider-prev',
    },

  });
  /***************************

fancybox

***************************/
$('[data-fancybox]').fancybox({
  animationEffect: "zoom-in-out",
  animationDuration: 600,
  transitionDuration: 1200,
  buttons: [
    "zoom",
    "slideShow",
    "thumbs",
    "close",
  ],
  // Add these options to force side-by-side layout
  caption: function(instance, item) {
    return $(this).data('caption') || item.opts.$orig.data('caption') || '';
  },
  afterLoad: function(instance, current) {
    // Force caption to be visible and positioned properly
    current.$content.addClass('fancybox-content');
  },
  beforeShow: function(instance, current) {
    // Add custom class to the slide for styling
    current.$slide.addClass('fancybox-slide--custom');
  }
});

$('[data-fancybox="gallery"]').fancybox({
  animationEffect: "zoom-in-out",
  animationDuration: 600,
  transitionDuration: 1200,
  buttons: [
    "zoom",
    "slideShow",
    "thumbs",
    "close",
  ],
});

$('[data-fancybox="portfolio"]').fancybox({
  animationEffect: "zoom-in-out",
  animationDuration: 600,
  transitionDuration: 1200,
  buttons: [
    "zoom",
    "slideShow",
    "thumbs",
    "close",
  ],
});

// Disable hash
$.fancybox.defaults.hash = false;

// Force side-by-side layout after Fancybox initializes
$(document).on('afterShow.fb', function(e, instance) {
  setTimeout(function() {
    $('.fancybox-slide--image').each(function() {
      var $slide = $(this);
      var $content = $slide.find('.fancybox-content');
      var $caption = $slide.find('.fancybox-caption');
      
      if ($content.length && $caption.length) {
        $slide.css({
          'display': 'flex',
          'flex-direction': 'row',
          'align-items': 'center',
          'justify-content': 'center',
          'gap': '30px',
          'padding': '40px'
        });
        
        $content.css({
          'flex': '0 1 55%',
          'max-width': '55%',
          'margin': '0',
          'padding': '0'
        });
        
        $caption.css({
          'position': 'relative',
          'flex': '0 1 35%',
          'max-width': '35%',
          'padding': '30px 25px',
          'background': 'rgba(25,25,25,0.95)',
          'border-radius': '16px',
          'border': '1px solid rgba(255,255,255,0.08)',
          'margin': '0',
          'min-height': '180px',
          'display': 'flex',
          'align-items': 'center'
        });
      }
    });
  }, 100);
});
  $.fancybox.defaults.hash = false;

  /*----------------------------------------------------------
  ------------------------------------------------------------

  REINIT

  ------------------------------------------------------------
  ----------------------------------------------------------*/
  document.addEventListener("swup:contentReplaced", function() {

    /***************************

    preloader

    ***************************/
    $(".trm-scroll-container").animate({
      opacity: 1,
    }, 600);
    /***************************

    menu

    ***************************/
    $('.trm-menu-btn').on('click', function() {
      $('.trm-menu-btn , .trm-right-side').toggleClass('trm-active');
    })
    $('.trm-menu ul li a').on('click', function() {
      $('.trm-menu-btn , .trm-right-side').removeClass('trm-active');
    })
      /***************************
  
      mode switch
  
      ***************************/
      // Check for saved theme preference or default to light
      const currentTheme = localStorage.getItem('theme') || 'light';

      // Apply saved theme on initial load
      if (currentTheme === 'dark') {
          $('.trm-hidden-switcher input').prop("checked", true);
          $("#trm-switch-style").attr("href", "css/style-dark.css");
      } else {
          $('.trm-hidden-switcher input').prop("checked", false);
          $("#trm-switch-style").attr("href", "css/style-light.css");
      }

      $('.trm-mode-switcher').clone().appendTo('.trm-mode-switcher-place');
      $('#trm-swich').change(function () {
          if (this.checked) {
              $('.trm-hidden-switcher input').prop("checked", true);
              $('.trm-mode-swich-animation-frame').addClass('trm-active');
              $("#trm-scroll-container").animate({
                  opacity: 0,
              }, 600, function () {
                  setTimeout(function () {
                      $('.trm-mode-swich-animation').addClass('trm-active');
                      $("#trm-switch-style").attr("href", "css/style-dark.css");
                      // Save to localStorage
                      localStorage.setItem('theme', 'dark');
                  }, 200);
                  setTimeout(function () {
                      $('.trm-mode-swich-animation-frame').removeClass('trm-active');
                      $("#trm-scroll-container").animate({
                          opacity: 1,
                      }, 600);
                  }, 1000);
              });
          } else {
              $('.trm-hidden-switcher input').prop("checked", false);
              $('.trm-mode-swich-animation-frame').addClass('trm-active');
              $("#trm-scroll-container").animate({
                  opacity: 0,
              }, 600, function () {
                  setTimeout(function () {
                      $('.trm-mode-swich-animation').removeClass('trm-active');
                      $("#trm-switch-style").attr("href", "css/style-light.css");
                      // Save to localStorage
                      localStorage.setItem('theme', 'light');
                  }, 200);
                  setTimeout(function () {
                      $('.trm-mode-swich-animation-frame').removeClass('trm-active');
                      $("#trm-scroll-container").animate({
                          opacity: 1,
                      }, 600);
                  }, 1000);
              });
          }
      });
    /***************************

    counters

    ***************************/
    $('.trm-counter').each(function() {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 2000,
        easing: 'linear',
        step: function(now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
    /***************************

    locomotive scroll

    ***************************/
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#trm-scroll-container'),
      smooth: true,
      lerp: .1
    });
    document.addEventListener('swup:contentReplaced', (event) => {
      scroll.destroy()
    });
    /***************************

    slideshow

    ***************************/
    var swiper = new Swiper('.trm-slideshow', {
      slidesPerView: 1,
      effect: 'fade',
      parallax: true,
      autoplay: true,
      speed: 1400,
    });
    /***************************

    testimonials slider

    ***************************/
    var swiper = new Swiper('.trm-testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 40,
      parallax: true,
      autoplay: false,
      speed: 1400,
      pagination: {
        el: '.trm-testimonials-slider-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.trm-testimonials-slider-next',
        prevEl: '.trm-testimonials-slider-prev',
      },

    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $('[data-fancybox="gallery"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $('[data-fancybox="portfolio"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $.fancybox.defaults.hash = false;
  });

});
