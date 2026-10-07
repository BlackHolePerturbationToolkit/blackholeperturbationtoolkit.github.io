$(document).ready(function(){
     /* ==========================================================================
   Search
   ========================================================================== */
    $('.clearfield').click(function(e){
        e.preventDefault();
        $('#query').prop('value', '');
        $('.clearfield').hide();
        $('#query').focus();
    })
    $("#ref-search-form").submit(function() {
        $.ajax({
            type: "GET",
            traditional: true,
            url: "/search-api/search.json",
            dataType: "json",
            data: {
                query: $("#query").val(),
                limit: 3,
                disableSpelling: true,
                collection: ["documentation10"],
                fields: "uri,title"
            },

            success: function(data) {
                if(data.adResult) {
                    if(data.adResult.fields.title[0] == $("#query").val()) {
                        location.href = "/language/" + data.adResult.fields.uri[0] + ".html?q=" + encodeURIComponent($("#query").val());
                    } else {
                            location.href = "/search/?q="+ encodeURIComponent($("#query").val());
                    }
                } else {
                    location.href = "/search/?q="+ encodeURIComponent($("#query").val());
                }
            }

        });
        return false;
    });
    if(window.location.search.length) {
        if(window.location.search.indexOf('q=') > -1) {
            $('.search #query').prop('value', decodeURIComponent(window.location.search.split('q=')[1]));
            $('.search #query').addClass('term-found');
        }
    }
    $('.search #query').on('keyup', function(){
        $('.search #query').addClass('term-found');
    }); 
});
$(document).on('ready change keyup', function(){
    if($('#query').prop('value') == '') {
        $('.clearfield').hide();
    }
});
$(document).on('keyup ready', function(){
    if($('#query').prop('value') !== '') {
        $('.clearfield').show();
    }
});
$(document).ready(function() {
    if(!$('.dropdown').length) {
        $('.collapsed-dropdown').addClass('hide');
    }
    if(!$('.main-heading-wrapper').find('.workflow-tabs').length) {
        $('.main-heading-wrapper').addClass('no-workflow-tabs');
    }
});

/* ==========================================================================
   Sticky header
   ========================================================================== */
// Hide header on on scroll down
var didScroll;
var scrollPosition = 0;
var delta = 5;
var navbarHeight = $('.header').height() + $('.main-heading-wrapper').height();
var stickyHeight = $('.main-heading-wrapper').not('.sticky').outerHeight()+50;

var alphabet = $('.AlphabetListingJumpTo');
if(alphabet.length) {
    var alphabetHeight = alphabet.height();
}

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 100);

function hasScrolled() {
    var currentScrollPosition = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(scrollPosition - currentScrollPosition) <= delta)
        return;

    // If scrolled down and past the navbar
    // This is necessary so you never see what is "behind" the navbar.
    if (currentScrollPosition > scrollPosition || currentScrollPosition < navbarHeight) {
        // Scroll down
        $('.main-heading-wrapper').removeClass('sticky');
        $('.filler').remove();
    }
    else if (currentScrollPosition + 50 < scrollPosition) {
        // Scroll up
        $('.main-heading-wrapper').addClass('sticky');
        if(!$('.main-heading-wrapper').next('.filler').length) {
            $('.main-heading-wrapper').after('<div class="filler" style="height: '+navbarHeight+'px"></div>');
        } 
    } else {
        $('.dropdown').find('.hover').removeClass('hover');
    }
    if(alphabet.length) {
        if(currentScrollPosition > scrollPosition || currentScrollPosition < alphabetHeight) {
            $('.AlphabetListingJumpTo').removeClass('sticky');
        }
        else if(currentScrollPosition + 50 < scrollPosition) {
            $('.AlphabetListingJumpTo').addClass('sticky');
        }
    }
    scrollPosition = currentScrollPosition;
}
/* ==========================================================================
   root guide tooltip
   ========================================================================== */
if($('body').prop('id') === 'languageRootGuide') {
  if(window.innerWidth > 900) {
    tooltip();
  } else {
      if($('.guide').length > 0) {
        $('.guide').each(function(){
          $(this).addClass('hide');
        });
      }
  }
  $(window).on('load resize', function(){
    if(window.innerWidth > 900) {
      tooltip();
    } else {
      if($('.guide').length > 0) {
        $('.guide').each(function(){
          $(this).addClass('hide');
        });
      }
    }
  });
  function tooltip() {
    $('.links-list > .list-table > ul > li > a').on('mouseover', function(){
        if(window.innerWidth > 900) {
            var link = $(this);
            var href = $(this).prop('href');
            if($('.guide').length < 1) {
                setTimeout(function(){
                    ajax(link, href);
                }, 1000);
            } else {
                if(link.next('.guide').length < 1) {
                    ajax(link, href);
                } else {
                    $('.guide').each(function(){
                        $(this).addClass('hide');
                    });
                    link.next('.guide').removeClass('hide');
                    var height = link.next('.guide').find('.tooltip-inner').outerHeight();
                    link.next('.guide').css('height', height+'px');
                }
                bounding(link);
            }
        }
    });
    $('body').on('click', function(){
      $('.guide').addClass('hide');
    });
    $('body').on('click', '.guide', function(e){
      e.stopPropagation();
    });
  }
  function ajax(link, href) {
    $.ajax({
       url: href,
       type:'GET',
       dataType: 'html',
       success: function(data){
        if(link.next('#guide').length < 1) {
          var content = $(data).filter('main');
          content.find('header').remove();
          content.find('nav').remove();
          content.find('.main-heading + .GuideDelimiterSubsection').remove();
          content.find('.main-heading').remove();
          content.find('.intro + .GuideDelimiterSubsection').remove();
          content.find('.intro').remove();
          var title = link.prop('outerHTML');
          content.find('img').each(function() {
            var src = $(this).prop('src').replace('Files', 'guide/Files');
            $(this).prop('src', src);
          });
          $('.guide').each(function(){
                $(this).addClass('hide');
          });
          link.after('<div id="guide" class="guide"><div class="function-intro-tooltip"><div class="tooltip-inner"><h2>'+title+'</h2>'+content.html()+'</div></div></div>');
          link.next('.guide').find('.related-links').each(function(){
            $(this).remove();
          });
          link.next('.guide').find('.feedback-wrapper').remove();
          var height = link.next('#guide').find('.tooltip-inner').outerHeight();
          link.next('.guide').css('height', height+'px');
          bounding(link);
        }
       }
    });
  }
  function bounding(link) {
    if(link.next('#guide').length > 0) {
        var tooltipInner = link.next('.guide');
        var tooltipPosition = tooltipInner[0].getBoundingClientRect();
        if(tooltipPosition.bottom > (window.innerHeight + 80 || document.documentElement.clientHeight + 80)) {
            var list = link.parents('.links-list');
            var listPosition = list[0].getBoundingClientRect().bottom - tooltipPosition.top;
            link.next('.guide').find('.tooltip-inner').css('bottom', '-'+listPosition+'px');
        } else {
            link.next('.guide').find('.tooltip-inner').css('bottom', '');
        }
    }
  }
}