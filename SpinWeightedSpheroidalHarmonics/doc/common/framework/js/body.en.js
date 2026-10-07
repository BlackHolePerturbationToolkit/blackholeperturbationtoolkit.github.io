/* Global ui functionality for the <body> element.

   developer:   marionm
   requires:    jQuery
                /common/framework/js/head.en.js
   ========================================================================== */

/* ==========================================================================
   variables
   ========================================================================== */

var _headerOffset = 42; // clearance needed to properly offset linked elements from the thin header
var _headerThick = 100; // maximum height of header, should always match css
var _headerThin = 42; // minimum height of header, should always match css

/* ==========================================================================
   functions
   ========================================================================== */

/* Return an element's true top offset that has been adjusted to include its margin-top, border-top, and (optionally) the header offset.

   params:      el (string, default=false) the element to assess, can be any standard jQuery selector
                header (boolean, default=true) if true and the global header is present, subtract _headerOffset from the offset value
   returns:     integer or float
   ========================================================================== */

function _getTopOffset(el, header) {
    var el = el || false;
    var header = header || true;
    var offset = 0;
    if (el && $(el).length > 0) {
        offset = Math.ceil($(el).offset().top);
        var diff = Math.ceil(parseFloat($(el).css('margin-top')) + parseFloat($(el).css('border-top-width')));
        if (diff > 0) offset -= diff;
        if (header && $('#_header').length > 0) offset -= _headerOffset;
    }
    return offset;
}

/* A scrollTop function enhanced to compensate for the global header's height when jumping to specific elements or areas of the page.

   params:      href (string, no default), the anchor's href attribute
   returns:     n/a
   ========================================================================== */

function _getScrollTop(href) {
    // use the current location if no href is specified
    var url = href || window.location.href;

    // search for hash
    var hash = url.indexOf('#');
    var len = url.slice(hash).length;
    if (hash == -1 || len < 2) return false;

    // search for element identifiers
    var id = url.slice(hash);
    var name = 'a[name=' + id.replace('#', '') + ']';
    if ($(id).length == 0 && $(name).length == 0) return false;

    // determine which element selector to use
    if ($(id).length > 0) {
        var select = id; // use element id
    } else if ($(id).length == 0 && $(name).length > 0) {
        var select = name; // use element name
    } else {
        return false;
    }

    // get element's top position and adjust for the html element's border; also remove Firefox's incorrect body offset caused by the html element's border
    var offset = Math.ceil(parseFloat($('html').css('border-top-width')) - $('body').offset().top);
    var top = _getTopOffset(select) + offset;

    // scroll to adjusted top position
    $('html, body').stop(true, true).animate({
        scrollTop: top + 'px'
    }, 1);
    //history.pushState(null, null, '#' + hash);

    return false;
}

$(document).ready(function() {

    // always start at the top of the page; prevents Safari from starting at the incorrect scrollTop position on iOS
    window.scrollTo(0, 0);

/* ==========================================================================
   gui header
   ========================================================================== */

    if ($('#_header').length > 0) {

        // remove href from tabs (they're only for users without js)
        $('html:not(._header-no-dropdowns) #_nav ._nav-l1').prop('href', '');

        // set header height
        if ($('html._header-thin-only').length > 0) {
            $('html').addClass('_header-thin');
        } else {
            $('html').addClass('_header-thick');
        }

        // enable sticky functionality
        if ($('html:not(._header-no-sticky)').length > 0) {
            $('html').addClass('_header-sticky');
        }

        // switch from thick to thin (or vice versa) as needed
        var left = 0;
        if ($('html:not(._header-no-sticky)').length > 0) left = $('html:not(._header-no-sticky) #_header-b').offset().left - $(window).scrollLeft();
        $(window).on('load resize scroll', _throttle(function() {
            if ($(window).scrollTop() > _headerThick - _headerThin && $('html._header-absolute').length <= 0 && $('html._header-no-sticky').length <= 0) {
                // switch to thin header
                $('html:not(._header-thick-only)').addClass('_header-thin').removeClass('_header-thick');
            } else {
                // switch to thick header
                $('html:not(._header-thin-only)').addClass('_header-thick').removeClass('_header-thin');
            }

            // emulate horizontal scroll effect on fixed header
            var offset = typeof $('html:not(._header-no-sticky) #_header-b').offset() === 'number' ? $('html:not(._header-no-sticky) #_header-b').offset().left : 0;
            if ($('html').width() > $(window).width() && left !== offset) {
                offset = $(window).scrollLeft() > 0 ? left : 0;
                $('html:not(._header-no-sticky) #_header-b').offset({
                    left: offset
                });
            }
        }));

        // look for hash in url and matching element on the page; if found, trigger scroll animation
        $(window).on('hashchange load pageshow', function() {
            _getScrollTop();
        });

        // look for anchors with a hash in the href attribute; if found, replace default scroll with animated scroll on click
        $('a[href*="#"]:not([href="#"])').on('click tap', function(e) {
            if ($(this).prop('href') === window.location.href) {
                // prevent default anchor behavior
                e.preventDefault();
                // scroll to anchor
                _getScrollTop($(this).prop('href'));
            }
        });

        // manage the global header's hamburger tab
        $(window).on('pageshow load resize', _throttle(function() {
            // get viewport width
            var width = window.innerWidth;
            if (width >= 601) {
                // hide hamburger tab & restore default tabs
                $('#_nav #_nav-burger').hide();
                $('#_nav ._nav-tab:not(#_nav-burger)').show();
            } else {
                // show hamburger tab & hide default tabs
                $('#_nav ._nav-tab').hide();
                $('#_nav #_nav-search, #_nav #_nav-burger').show();
            }
            // show nav
            $('#_nav').removeClass('hide').addClass('show');
        }));

        // build hamburger nav content from existing tabs
        if ($('#_nav-burger ._nav-tab-content ul').length < 1) {
            var i = 0;
            var output = '<ul class="_burger-l1">';

            // loop through level 1 items
            $('#_nav ._nav-tab').not('#_nav-search, #_nav-burger').each(function() {
                // clone data and get rid of paragraphs
                var data = $(this).clone();
                data.find('p').remove();

                // begin building hamburger nav output
                output += '<li id="_burger-l1-subnav-' + i + '"><a>' + data.find('._nav-l1').html() + '</a>';
                output += '<ul class="_burger-l2">';
                var i2 = 0;

                // loop through level 2 items
                data.find('._nav-l2:not(._exclude-from-burger)').each(function() {
                    var has_subnav = $(this).parent().find('._nav-l3').length > 0 ? true : false;
                    var has_link = (typeof $(this).prop('href') !== 'undefined' && $(this).prop('href') !== '') ? true : false;
                    var line_class = ($(this).hasClass('_nav-has-line')) ? ' _nav-has-line' : '';
                    var subnav_class = (has_subnav) ? ' class="_burger-has-subnav' + line_class + '"' : '';
                    subnav_class = (!has_subnav && line_class.length > 0) ? ' class="' + line_class + '"' : subnav_class;
                    var icon_class = $(this).html().indexOf('_icon') > 0 ? ' class="mini"' : '';

                    // level 2 item output
                    if (has_link && !has_subnav) {
                        output += '<li id="_burger-l1-subnav-' + i + '-' + i2 + '"' + subnav_class + '><a href="' + $(this).prop('href') + '"' + icon_class + '>' + $(this).html() + '</a>';
                    } else {
                        output += '<li id="_burger-l1-subnav-' + i + '-' + i2 + '"' + subnav_class + '><span><span' + icon_class + '>' + $(this).html() + '</span></span>';
                    }

                    var is_deep = ($(this).parent('li').parent('ul').parent('li').find('._nav-l3').length > 0) ? true : false;
                    var data_sub = (is_deep) ? $(this).parent().parent().parent() : $(this).parent();

                    // level 3
                    if (has_subnav) {
                        output += '<ul class="_burger-l3">';

                        // loop through level 3 items
                        data_sub.find('._nav-l3:not(._exclude-from-burger)').each(function() {
                            has_link = (typeof $(this).prop('href') !== 'undefined' && $(this).prop('href') !== '') ? true : false;
                            icon_class = $(this).html().indexOf('_icon') > 0 ? ' class="mini"' : '';

                            // level 3 item output
                            if (has_link) {
                                output += '<li><a href="' + $(this).prop('href') + '"' + icon_class + '>' + $(this).html() + '</a></li>';
                            } else {
                                output += '<li><span><span' + icon_class + '>' + $(this).html() + '</span></span></li>';
                            }
                        });

                        // close level 3
                        output += '</ul>';
                    }

                    // close level 2
                    output += '</li>';
                    i2++;
                });

                // close level 2
                output += '</ul></li>';
                i++;
            });

            // add all sites link and close level 1
            output += '<li class="_burger-all"><a href="http://www.wolfram.com/resources/" class="chevron-after">All Sites &amp; Public Resources</a></li></ul>';

            // output as burger content
            $('#_nav-burger ._nav-tab-content').prepend(output);

            // level 1 click behavior
            $('#_nav-burger ._burger-l1 > li > a').on('click tap', function() {
                // close open drawers
                var pid = $(this).parent().prop('id');
                $('._burger-active').removeClass('_burger-active');
                $('._burger-l2').not('#' + pid + ' ._burger-l2').slideUp(100);
                $('._burger-l3').slideUp(100);
                // open this drawer
                $(this).addClass('_burger-active');
                $(this).next('._burger-l2').slideDown(300);
                // temporarily allow downward scrolling
                $('html:not(._header-absolute)').addClass('_header-absolute');
                $('#_header').css('top', $(window).scrollTop()).css('left', $(window).scrollLeft());
            });

            // level 2 click behavior
            $('#_nav-burger ._burger-l2 > li > *').on('click tap', function() {
                // close open drawers
                var pid = $(this).parent().prop('id');
                $('._burger-l2 > li > ._burger-active').removeClass('_burger-active');
                $('._burger-l3').not('#' + pid + ' ._burger-l3').slideUp(100);
                // open this drawer
                $(this).addClass('_burger-active');
                $(this).next('._burger-l3').slideDown(300);
                // temporarily allow downward scrolling
                $('html:not(._header-absolute)').addClass('_header-absolute');
                $('#_header').css('top', $(window).scrollTop()).css('left', $(window).scrollLeft());
            });
        }

        /* global nav setup
           ================================================================== */

        if ($('html._header-no-dropdowns').length === 0) {
            if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {

                /* touch-enabled version
                   ========================================================== */

                $('body').attr({
                    ontouchstart: '',
                    onmouseover: ''
                });

            } else {

                /* standard version (not optimized for touch-enabled devices)
                   ========================================================== */

                // show dropdowns on hover
                var config = {
                    over: function() {
                        // only show if user has clicked a tab
                        if ($('#_nav').hasClass('_nav-clicked')) {
                            // close any other tabs that may be open
                            $('._nav-tab-active').removeClass('_nav-tab-active');

                            // show and switch focus
                            $(this).addClass('_nav-tab-active');
                            $(this).children('._nav-tab-content').focus();
                            if ($(this).attr('id') === '_nav-search') $('#_search-input').focus();
                        }
                    },
                    out: function() {
                        $('body').focus();
                    },
                    interval: 50, // default = 100
                    timeout: 0, // default = 0
                    sensitivity: 500 // default = 6
                };
                $('#_nav ._nav-tab').hoverIntent(config);
            }

            /* dropdowns
               ============================================================== */

            // enable dropdown hover functionality on click
            $('#_nav ._nav-tab > ._nav-l1').on('click tap', function(e) {
                e.preventDefault(); // don't trigger links

                // close when clicked/tapped a 2nd time
                if ($(this).parent().hasClass('_nav-tab-active')) {
                    // close tabs
                    $('._nav-clicked, ._nav-tab-active, ._burger-active').removeClass('_nav-clicked _nav-tab-active _burger-active');
                    // close hamburger nav sublevels
                    $('._burger-l2, ._burger-l3').hide();
                    // enable upward scrolling
                    $('html._header-absolute').removeClass('_header-absolute');
                    $('#_header').css('top', 0).css('left', 0);
                    // shift focus
                    $('#_nav').focus();
                    return;
                }

                // enable hover events on the menu
                $('#_nav').addClass('_nav-clicked');

                // close any others that may be open
                $('._nav-tab-active, ._burger-active').removeClass('_nav-tab-active _burger-active');

                // show and switch focus
                $(this).parent().addClass('_nav-tab-active');
                $(this).parent().children('._nav-tab-content').focus();
                if ($(this).parent().attr('id') === '_nav-search') $('#_search-input').focus();

                // get viewport height
                var height = $(window).height();
                // temporarily allow downward scrolling when hamburger nav is taller than the viewport
                if ($(this).parent().is('#_nav-burger') || height < ($(this).parent().find('._nav-tab-content').height() + $('#_header').height() + 30)) {
                    $('html:not(._header-absolute)').addClass('_header-absolute');
                    $('#_header').css('top', $(window).scrollTop()).css('left', $(window).scrollLeft());
                }
            });

            /* deactivate tabs
               ============================================================== */

            // close all tabs and subnavs
            var deactivateTabs = function() {
                if ($('._nav-clicked, ._nav-tab-active, ._burger-active').length > 0) {
                    // close tabs
                    $('._nav-clicked, ._nav-tab-active, ._burger-active').removeClass('_nav-clicked _nav-tab-active _burger-active');
                    // close hamburger nav sublevels
                    $('._burger-l2, ._burger-l3').stop().hide();
                    // disable downward scrolling
                    $('html._header-absolute').removeClass('_header-absolute');
                    $('#_header').css('top', 0).css('left', 0);
                    $('body').focus();
                }
            };

            // click outside the header boundaries to close tabs
            $('body > *:not(#_header)').bind('click tap', deactivateTabs);

            // bypass back-forward cache in Safari and Firefox; make sure nav dropdown is closed on pageshow when bfcache is detected
            $(window).on('pageshow', function(e) {
                if (e.originalEvent.persisted) {
                    deactivateTabs();
                }
            });

            /* manage click to hide menu event
               ============================================================== */

            var assessTabs = _throttle(function() {
                // get viewport width
                var width = window.innerWidth;
                if (width >= 601) {
                    // click mouse outside the header boundaries to close tabs
                    $('body').bind('click', function(e){
                        if(e.target.id == "#_header") {
                            return true;
                        } else {
                            deactivateTabs;
                        }
                    });
                } else {
                    // unbind in case viewport size has decreased
                    $('body').unbind('click', function(e){
                        if(e.target.id == "#_header") {
                            return true;
                        } else {
                            deactivateTabs;
                        }
                    });
                }
            });

            assessTabs();
            $(window).on('pageshow load resize', assessTabs);

            /* monitor scrolltop position
               ============================================================== */

            // watch for the position of the header in relation to the window's scroll top; switch back to fixed position
            var lastscrolltop = $(window).scrollTop();
            var monitorScrollTop = _throttle(function() {
                var headerheight = $('#_header').height(),
                    scrolltop = $(window).scrollTop() || 0,
                    headertop = $('#_header').offset().top + headerheight,
                    contentheight = $('._nav-tab-active ._nav-tab-content').height() + headerheight;

                if ($('html').hasClass('_header-absolute')) {
                    // deactivate mobile nav when user scrolls beyond it's boundaries
                    if (scrolltop < headertop - 300 || scrolltop > (headertop + contentheight)) {
                        deactivateTabs();
                    } else if (scrolltop <= 42) {
                        $('#_header').css('top', 0).css('left', 0);
                    }
                } else {
                    // deactivate non-mobile nav when user scrolls up or down by 61px
                    if (lastscrolltop - scrolltop > 61 || lastscrolltop - scrolltop < -61) {
                        deactivateTabs();
                        lastscrolltop = scrolltop;
                    }
                }

            });

            monitorScrollTop();
            $(window).on('scroll', monitorScrollTop);

            /* search input
               ============================================================== */

            // ensure default localized placeholder text is being used
            $('#_nav-search form').get(0).reset();

            // don't submit if no terms are entered
            $('#_nav-search form').on('submit', function(e) {
                if ($('#_search-input').val() == '') e.preventDefault();
            });

            $('#_search-input').on('click', function() {
                // refocus on click; fixes bug with flash movies stealing focus in Firefox on OSX
                $(this).blur().focus();
            });
        }

    }

/* ==========================================================================
   gui footer
   ========================================================================== */

    if ($('html:not(._no-footer) #_footer').length > 0) {

        // rearrange the global footer when the language picker is present and other languages are available
        if ($('#_language-picker-select').length > 0 && $('#_language-picker-select option:not(:disabled)').length > 0) {
            // move links to new line
            $('#_footer-br > *').prependTo('#_footer-bc');
            // move link picker to right column
            $('#_language-picker').removeClass('hide').prependTo('#_footer-br');
            // make language picker switch to selected language on change
            $('#_language-picker-select').on('change', function() {
                window.location.href = $(this).val();
            });
        } else {
            $('#_language-picker, #_footer-bc').remove();
        }

        // insert footer offset div
        $('#_footer').before('<div id="_footer-offset"></div>');

        // use footer offset div to fill gaps between the global footer and the end of the page
        var offsetFooter = _throttle(function() {
            // remove existing offset
            $('#_footer-offset').hide().height(0);
            // get the difference between the viewport height and the document height
            var difference = parseInt($(window).height() - $('body').height() - parseFloat($('html').css('border-top-width')));
            if (difference > 0) {
                $('#_footer-offset').show().height(difference);
            }
        });

        // do first assessment on document ready and reassess as needed
        offsetFooter();
        $(window).on('load resize', offsetFooter);

    } else {
        // remove footer, if present
        $('#_footer').remove();
        if ($('#_language-picker._standalone-language-picker').length > 0 && $('#_language-picker._standalone-language-picker #_language-picker-select option:not(:disabled)').length > 0) {
            $('#_language-picker._standalone-language-picker').show().removeClass('hide');
            // make language picker switch to selected language on change
            $('#_language-picker-select').on('change', function() {
                window.location.href = $(this).val();
            });
        } else {
            // remove the language picker
            $('#_language-picker').remove();
        }
    }

/* ==========================================================================
   gui alert
   ========================================================================== */

    // once enabled, temporarily set your computer's clock forward to the start and end dates/times to confirm they are working correctly
    var alertActive = false; // set to true to enable
    var alertStart = new Date('August 8 2015 07:55:00'); // set start date and time
    var alertEnd = new Date('August 8 2015 16:00:00'); // set end date and time; test same as the start date
    var alertNow = new Date();
    var alertMessage = '<div id="_alert"><p>Note: Our purchasing system is down for maintenance right now. We\'re sorry for the inconvenience. We expect purchasing to be available again by 4pm CDT.</p><p>Close</p></div>';

    // only trigger when active and date is in range
    if (alertActive && alertStart < alertNow && alertNow < alertEnd) {
        // only trigger once per site
        if (document.cookie.indexOf('_alert') < 0) {
            // append message to page
            $('body').append(alertMessage);

            // remove alert on click/tap
            $('#_alert').on('click tap').remove();

            // set cookie
            document.cookie = '_alert=1; expires=' + alertEnd.toUTCString();
        }
    }

    if (window.location.href.indexOf('_show_alert') > -1) {
        $('body').append(alertMessage);
        $('#_alert').on('click tap').remove();
    }

/* ==========================================================================
   utility functionality
   ========================================================================== */

    /* widow management
       ====================================================================== */

    // prevent lone words on the last line of text when it wraps; automatically inserts a non-breaking space character between the last two words (or elements) found
    $('.no-widows, .heirs-no-widows > *').each(function() {
        var text = $(this).text().trim().split(' ');
        var last = text.pop();
        $(this).html(text.join(' ') + (text.length > 0 ? '&nbsp;' + last : last));
    });

    /* back/forward cache
       ====================================================================== */

    // disable back/forward cache by resetting forms
    $(window).on('load pageshow', function() {
        $('form.no-bfc').each(function() {
            $(this).get(0).reset();
        });
    });

    /* hide/show/remove
       ====================================================================== */

    $('.hide__ready, .heirs-hide__ready > *').removeClass('show').addClass('hide');
    $('.show__ready, .heirs-show__ready > *').removeClass('hide').addClass('show');
    $('.remove__ready, .heirs-remove__ready > *').remove();

    $(window).on('pageshow', function() {
        $('.hide__pageshow, .heirs-hide__pageshow > *').removeClass('show').addClass('hide');
        $('.show__pageshow, .heirs-show__pageshow > *').removeClass('hide').addClass('show');
        $('.remove__pageshow, .heirs-remove__pageshow > *').remove();
    });

    $(window).on('pagehide', function() {
        $('.hide__pagehide, .heirs-hide__pagehide > *').removeClass('show').addClass('hide');
        $('.show__pagehide, .heirs-show__pagehide > *').removeClass('hide').addClass('show');
        $('.remove__pagehide, .heirs-remove__pagehide > *').remove();
    });

    $(window).on('load', function() {
        $('.hide__load, .heirs-hide__load > *').removeClass('show').addClass('hide');
        $('.show__load, .heirs-show__load > *').removeClass('hide').addClass('show');
        $('.remove__load, .heirs-remove__load > *').remove();
    });

});