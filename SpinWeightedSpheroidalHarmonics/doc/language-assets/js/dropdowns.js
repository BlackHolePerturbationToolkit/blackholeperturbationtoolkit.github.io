/* ==========================================================================
   Dropdowns
   ========================================================================== */
$(function(){
    $("ul.dropdown .menu").on('click', function(e) {
        var menu = $(this);
        e.preventDefault();
        $("ul.dropdown .menu").not(menu).parents('li').removeClass("hover");
        menu.parents("li").toggleClass("hover");
        var elm = menu.next('.sub_menu');
        var l = menu.offset().left;
        var w = elm.outerWidth();
        var docW = $(".main").outerWidth();
        var isEntirelyVisible = (l + w <= docW);
        if (!isEntirelyVisible || l == undefined) {
            if (w > 425 && docW <= 430) {
                menu.parents("li").addClass("shrink");
            }
            if(!$('.collapsed-dropdown').hasClass('hide')) {
                menu.parents("li").addClass('right-edge');
                menu.parents("li").removeClass('edge');
            } else {
                menu.parents("li").addClass('edge');
                menu.parents("li").removeClass('right-edge');
            }
        } 
        else {
            menu.parents("li").removeClass('edge');
            menu.parents("li").removeClass('right-edge');
        }
        var mainWrapperHeight = $('.main').height(); // height of main wrapper
        var dropdownHeight = $('li.hover ul').height() + 291; // height of selected dropdown
        if (dropdownHeight > mainWrapperHeight && menu.parents("li").hasClass("hover")) {
            $('.main').height(dropdownHeight);
        } else {
            $('.main').css('height', 'auto');
        }
    });
    $('body').on('touchstart', '.sub_menu a', function(){
        window.location = $(this).prop('href');
    });
    $('.dropdown .menu').on('mouseleave touchend', function(){
        $(this).removeClass("hover").removeClass("edge");
        $('.main').css('height', 'auto');
    });
    $('.dropdown > li').on('mouseleave', function(){
        $(this).removeClass("hover").removeClass("edge");
        $('.main').css('height', 'auto');
    });
    $('body').on('click', '.collapsed-dropdown', function(){
        $('.dropdown').toggleClass('hide');
        $(this).toggleClass('open');
        $('.main-heading-wrapper').toggleClass('open');
    });
});
$(window).on('load resize scroll', function(){
    var badgeWidth = $('.badge').outerWidth() + 40;
    var badgeEllipsisWidth = badgeWidth + $('.collapsed-dropdown').outerWidth();
    var mainTitleWidth = $('.main-title').outerWidth();
    var mainHeadingWidth = $('.main-heading').outerWidth() + 10;
    var windowWidth = $(this).width();
    var dropdownWidth = 0;
    var monographWidth = $('.overview-nav-buttons').outerWidth();
    $('.dropdown > li').each(function(){
        dropdownWidth += $(this).outerWidth();
    });
    var firstDropdownWidth = $('.dropdown > li:first-of-type').outerWidth();
    var navBarWidth = dropdownWidth + 30;
    if($('.sticky').length > 0) {
        if($('.overview-nav-buttons').length) {
            navBarWidth += mainHeadingWidth + monographWidth + 30;
            if (mainHeadingWidth + monographWidth + 40 > windowWidth) {
                $('.main-heading-wrapper').addClass('smaller-title');
            } 
        } else {
            navBarWidth += mainHeadingWidth + 30;
            if (mainHeadingWidth + 30 > windowWidth) {
                $('.main-heading-wrapper').addClass('smaller-title');
            } 
        }
    } else {
        $('.main-heading-wrapper').removeClass('smaller-title');
        if($('.main-heading-wrapper.collapse').length > 0) {
            navBarWidth +=  badgeEllipsisWidth;
        } else {
            navBarWidth += badgeWidth + 30;
        }
    }
    if(navBarWidth >= $(this).width()) {
        if($('.dropdown').length) {
            if($(this).scrollTop() > 70) {
                if($('.overview-nav-buttons').length) {
                    dropdownWidth = windowWidth - mainHeadingWidth - monographWidth - 45;
                }
                else {
                    dropdownWidth = windowWidth - mainHeadingWidth - 45;
                }
            } else {
                dropdownWidth = windowWidth - badgeEllipsisWidth - 45;
            }
            if(dropdownWidth < firstDropdownWidth + 10) {
                $('.dropdown').addClass('hide');
            } else {
                $('.dropdown').removeClass('hide');
                $('.dropdown').css('width', dropdownWidth);
            }
            if($('.hover').length < 1) {
                $('.collapsed-dropdown').removeClass('open').removeClass('hide');
                $('.main-heading-wrapper').removeClass('open').addClass('collapsed');
            }
        }
    } else {
        $('.dropdown').css('width', 'auto').removeClass('hide');
        $('.collapsed-dropdown').addClass('hide');
        $('.collapsed-dropdown').removeClass('open');
        $('.main-heading-wrapper').removeClass('collapsed');
        $('.main-heading-wrapper').removeClass('open');
    }
});