/* REFERENCE SITE GLOBAL FUNCTIONALITIES

   developer:   suef
   requires:    jQuery
   ========================================================================== */
$(document).ready(function(){
/* ==========================================================================
   Feedback
   ========================================================================== */
    $('.feedback').click(function(){
        $('#feedback').toggleClass('opened');
        var iframeHeight = $('#feedback').contents().find('.main').outerHeight();
        $('#feedback').css('height', iframeHeight);
    });
   
    $('body').on('click', '.animation', function(){
        if($(this).find('.video img').length) {
            var width = $(this).find('.video img').attr('data-video').split(' ')[0];
            var height = $(this).find('.video img').attr('data-video').split(' ')[1];
            var src = $(this).find('.video img').prop('src').replace(/\.[^/.]+$/, "") + '.mp4';
            $(this).find('.video').html('<video width="'+width+'" height="'+height+'" loop><source src="'+src+'" type="video/mp4"></video>');
        }
        if($(this).find('video').get(0).paused) {
            $(this).find('video').get(0).play();
            $(this).addClass('pause');
        } 
        else {
            $(this).find('video').get(0).pause();
            $(this).removeClass('pause');
        }
    });

    if($('.main-title-top').length && $('.experimental').length) {
        $('.main-heading').addClass('make-room');
    }
    if($('.related-links').length) {
        $('.related-links').last().addClass('last');
    }

/* ==========================================================================
   Notes tables styling based on column width
   ========================================================================== */
    $('.NotesTable').each(function() {
        if ($(this).find('col').length == 4) {
            $(this).addClass('three-col');
        } else if ($(this).find('col').length == 3) {
            $(this).addClass('two-col');
        }
    });

    $('body').click(function(){
        $('.overview-menu-items').addClass('hide');
    });
    $('.overview-menu .hamburger').click(function(e){
        e.stopPropagation();
        $('.overview-menu-items').toggleClass('hide');
    });

/* ==========================================================================
   Sticky Alphabet listing
   ========================================================================== */
    if ($('.AlphabetListingJumpTo').length) {
        $('.AlphabetListingJumpTo a').click(function() {
            var id = $(this).prop('href').split("#")[1];
            $('html,body').animate({
                scrollTop: $('#' + id).offset().top - 65 //offset height of header here too.
            }, 1000);
        });
    }

});

/* ==========================================================================
   Highlight
   ========================================================================== */
    $('.main-heading').on('click', '.highlight-link', function() {
        $('highlighting').not('.highlight-link').toggleClass('highlighting');
        $('.highlight-link').toggleClass('highlighting');
        $('.modified-text').toggleClass('highlighting');
        if($('.highlight-link').length) {
            $('.HighlightableSection h1, .alternateHeader h1').toggleClass('highlighting');
        }
    });
/* ==========================================================================
   Tooltips in top icons
   ========================================================================== */
    if($('.media')) {
        $('.media').on('mouseenter', function(){
            $('.media').removeClass('hover');
            $(this).addClass('hover');
        });
        $('.media').on('click', function(){
            $(this).toggleClass('hover');
        });
        $('.tooltip, .media-icons').on('mouseleave', function(){
            $('.media').removeClass('hover');
        });
    }
$(window).on('load resize', function() {
/* ==========================================================================
   Search swap
   ========================================================================== */
    if($(window).width() < 600) {
        $('.no-bfc').prop('action', '/search/');
        $('#_search-input').prop('name', 'q');
        if($('input[name="source"]').length) {
            $('input[name="source"]').remove();
        }
    }
/* ==========================================================================
   related links if more than 3 list items
   ========================================================================== */
    $('.related-links .functionList').each(function(){
        if($(this).find('li').length > 3) {
            $(this).addClass('related-grid');
        }
    });
});
/* ==========================================================================
   Back to top link
   ========================================================================== */
$(window).on('load resize scroll', function() {
    if($('.feedback').length) {
        var offset = 250;
        var duration = 100;
        var main_scroll_height = $('.feedback').offset().top - 100;
        var topLinkPos = $('.footer-links .toplink').offset().top;
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if ($(this).scrollTop() > offset) {
            $('.footer-links .toplink').fadeIn(duration);
            if (topLinkPos > main_scroll_height) {
                $('.footer-links .toplink').addClass('above-footer');
            } else {
                $('.footer-links .toplink').removeClass('above-footer');
            }
        } else {
            $('.footer-links .toplink').fadeOut(duration);
        }
    }

    $('.clipboard-inline').click('a', function(e){
        e.preventDefault();
    });
});
$(document).ready(function(){
    $('.toplink').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        return false;
    });
});
$(window).on('ready load hashchange', function() {
/* ==========================================================================
   Open anchor location even on closed content
   ========================================================================== */
   if(window.location.hash) {
        var jumpLocation = window.location.hash.replace('#','');
        if(isNaN(jumpLocation) == false) {
            var foundLocation = false;
            $('section a').each(function(){
                if($(this).prop('name') == jumpLocation) {
                    foundLocation = true;
                    $(this).parents('.hideable').prev('.toggle').addClass('open');
                    if($(this).parents('section').find('.NotesThumbnails').length) {
                        $(this).parents('.hideable').prev('.NotesThumbnails').prev('.toggle').addClass('open');
                    }
                }
            });
            if(foundLocation == false && $('#Examples').length) {
                $('h2.toggle').each(function(i){
                    $(this).next('.hideable').find('.clipboard-input').each(function(){
                        if($(this).prop('id') == jumpLocation) {
                            $(this).parents('.hideable').prev('.toggle').addClass('open');
                        }
                    });
                });
            }
        }
    }
});

$(window).on('load resize', function(){
    var iconographyHeight = 0;
    $('.iconography > span').each(function(){
        iconographyHeight = iconographyHeight + $(this).outerHeight();
    });
    $('.iconography').css('height', iconographyHeight);
    var titleWidth = $('.main-title').width();
    var formatIntroWidth = $('.formatIntro').width();
    var iconographyWidth = $('.iconography span').width();
    var relatedInterpreterWidth = $('.related-interpreter').width();
    var windowWidth = $('.main-heading').width();
    var iconWidth = iconographyWidth;
    if(relatedInterpreterWidth > iconographyWidth) {
        iconWidth = relatedInterpreterWidth;
    }
    if($('.iconography-wrapper').length < 1) {
        $('.iconography').wrap('<div class="iconography-wrapper">');
    }
    if(windowWidth <= (titleWidth + iconWidth) || windowWidth <= iconWidth) {
        $('.iconography-wrapper').addClass('wrap-down');
    } else {
        $('.iconography-wrapper').removeClass('wrap-down');
    }
    if($('.iconography').text() == '') {
        $('.iconography-wrapper').addClass('empty');
    }
});

/* ==========================================================================
   citations
   ========================================================================== */

window.onload = function() {
		$('.citation-overlay').on('click', function(event) {
		    $('.citation-tooltip-content').slideUp(100);
		    $('.citation-overlay').hide();
		});

    $('.citation-tooltip-button').on('click', function() {
        var x = document.getElementsByClassName("citation-timestamp");
        var date = new Date();
        var i;
        for (i = 0; i < x.length; i++) {
            var str = x[i].innerHTML;
            var text = str.replace("TIMESTAMP", "Accessed " + date.getDate() + "-" + date.toLocaleString('en-US', { month: 'long' }) + "-" + date.getFullYear());
            x[i].innerHTML = text;
        }
			  var cite2 = $(this).nextAll('.citation-tooltip-content');

			  if (cite2.is(':visible')) {
				    // hide on second click
				    cite2.slideUp(100);
				    $('.citation-overlay').hide();
			  } else {
				    // show on first click
				    cite2.slideDown(100);
				    $('.citation-overlay').show();
			  }
    });

  	$('.x-close-svg').on('click', function() {
			  if ($('.citation-tooltip-content').is(':visible')) {
					  $('.citation-tooltip-content').slideUp(100);
					  $('.citation-overlay').hide();
			  }
    });
}

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}
!function(l){l.fn.unveil=function(t,i){var e,o=l(window),u=t||0,n=1<window.devicePixelRatio?"data-src-retina":"data-src",r=this;function s(){var t=r.filter(function(){var t=l(this);if(!t.is(":hidden")){var i=o.scrollTop(),e=i+o.height(),n=t.offset().top,r=n+t.height();return i-u<=r&&n<=e+u}});e=t.trigger("unveil"),r=r.not(e)}return this.one("unveil",function(){var t=this.getAttribute(n);(t=t||this.getAttribute("data-src"))&&(this.setAttribute("src",t),"function"==typeof i&&i.call(this))}),o.on("scroll.unveil resize.unveil lookup.unveil",s),s(),this}}(window.jQuery||window.Zepto);