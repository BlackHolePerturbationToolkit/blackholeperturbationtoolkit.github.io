$(document).ready(function(){
    /* ==========================================================================
       Temporary: remove when built pages have this
       ========================================================================== */
    if(!$('body').hasClass('workflow') && !$('#languageRootGuide').length) {
        
        if($('.main-heading').length > 0) {
            $('.main').find('.topContentWrap, .main-heading, .ContextNameCell').wrapAll('<div class="main-heading-wrapper"><div class="inner">');
        } else {
            $('.main').find('.topContentWrap, .main-title, .ContextNameCell').wrapAll('<div class="main-heading-wrapper"><div class="inner">');
            $('.main-title, .iconography').wrapAll('<div class="main-heading">');
        }
    }
    if($('.dropdown').length > 0) {
        $('.main-heading-wrapper .inner .topContentWrap').prepend('<div class="collapsed-dropdown"><span class="square"></span><span class="square"></span><span class="square"></span></div>');
    }
    if(!$('#languageRootGuide').length) {
        $('.container').wrapInner('<div class="inner">');
    }
    $('.functionIntroWrap').wrap('<section class="function-wrapper"><div class="inner">');
    $('.FormatList, .formatIntroWrap, .indicatorIntroWrap').wrap('<section class="format-wrapper"><div class="inner">');
    $('.main-content').contents().unwrap();
    $('.modified').wrap('<section class="modified-wrapper"><div class="inner">');
    $('#SeeAlso, #TechNote, #Tutorials, section[id^="Related"]').addClass('related-links');
    $('.DeviceImage, .DeviceImageCaption').wrapAll('<section><div class="inner">');
    if($('.related-links').length) {
        $('.related-links').last().addClass('last');
    }
    if($('body#guide').length > 0 || $('body#techNote').length > 0 || $('body#monograph').length > 0 || $('body#monographOverview').length > 0 || $('body#tutorial').length > 0) {
        if($('section').not('.related-links, .feedback-wrapper').length > 0) {
            $('.main > *').each(function(){
                if($(this).find('.inner').length < 1) {
                    $(this).wrapInner('<div class="inner">');
                }
                if($(this).prop('src') && $(this).is('img')) {
                    $(this).wrapAll('<section><div class="inner">');
                }
            });
        }else {
            $('.main .main-heading-wrapper ~').not('.related-links, .feedback-wrapper, .footer-links, #_footer, #_footer-offset, script').wrapAll('<section><div class="inner">');
            $('.AlphabetListingJumpTo a').wrapAll('<div class="inner">');
        }
        $('.ObsolescenceNote, .AwaitingReviewNote').wrapInner('<div class="inner">');
    } 
    else {
        $('.main > *').not('script').each(function(){
            if($(this).find('.inner').length < 1) {
                $(this).wrapInner('<div class="inner">');
            }
            if($(this).prop('src') && $(this).is('img')) {
                $(this).wrapAll('<section><div class="inner">');
            }
        });
    }
    if($('.main-title').find('.quote').length > 0) {
        $('.main-title').addClass('has-quotes');
    }
    $('body#ref.function .main-title').addClass('clipboard-inline');
});