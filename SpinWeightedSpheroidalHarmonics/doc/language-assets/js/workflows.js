/* ==========================================================================
   Workflow Tabs
   ========================================================================== */
$(window).on('ready load resize hashchange', function(){
    if($('body').hasClass('workflow')) {
        var location = window.location.hash;
        if(location !== '' && location.indexOf('-tab') > -1) {
            setCookie("workflow-tab", location);
            $('.platform-container').addClass('hide');
            $('.workflow-tabs li a').removeClass('selected');
            $('.workflow-tabs li').removeClass('noborder');
            $(location.replace('-tab','')).removeClass('hide');
            $(location.replace('#','.')).addClass('selected');
            $(location.replace('#','.')).parents('li').next().addClass('noborder');
        }
        if(location == '') {
            $('.workflow-tabs .selected').parents('li').next().addClass('noborder');
        }
        if(getCookie('workflow-tab')!==null && !$('body').hasClass('workflow-guide')) {
            location = getCookie('workflow-tab');
            if($(location).length) {
                $('.platform-container').addClass('hide');
                $('.workflow-tabs li a').removeClass('selected');
                $('.workflow-tabs li').removeClass('noborder');
                $(location.replace('-tab','')).removeClass('hide');
                $(location.replace('#','.')).addClass('selected');
                $(location.replace('#','.')).parents('li').next().addClass('noborder');
            }
        }
    }
    
/* ==========================================================================
   Workflow guides structures
   ========================================================================== */ 
    if($(window).width() > 600) {
        $('.workflow-guide').each(function(){
            var twoColumns = '';
            var colOne = '';
            var colTwo = '';
            var numLists = $(this).find('.guide ul').length;
            $(this).find('.guide ul').each(function(i){
                i = i + 1;
                if(i % 2 !== 0 && i !== numLists) {
                    colOne = '<div>'+$(this).prev('.special').prop('outerHTML') + $(this).prop('outerHTML')+'</div>';
                }
                else if(i % 2 == 0) {
                    colTwo = '<div>'+$(this).prev('.special').prop('outerHTML') + $(this).prop('outerHTML')+'</div>';
                    twoColumns += '<section class="guide"><div class="inner grid cols-2 heirs-width-1-2">' + colOne + colTwo + '</div></section>';
                } else if (i == numLists) {
                    var lastCol = '<div>'+$(this).prev('.special').prop('outerHTML') + $(this).prop('outerHTML')+'</div>';
                    twoColumns += '<section class="guide"><div class="inner grid cols-2 heirs-width-1-2">' + lastCol + '</div></section>';
                }
            });
            if ($(this).find('.guide ul').length > 0) {
                $('.platform-container').html(twoColumns);
            }
        });
    }
    if($('body').hasClass('workflow-guide')) {
        $('.guide ul').each(function(){
            if($(this).find('.Ellipsis').length) {
                var list = $(this);
                var more = list.find('li').last();
                var href = more.find('a').prop('href');
                var subNum = list.find('li').length - 1;
                getNumLinks(more, subNum, href);
            }
        });
    }
});
$(document).ready(function(){
    $('.inactive-link').click(function(e){
        e.preventDefault();
    });
    $('.workflow section').each(function(){
        if($(this).not('#WorkflowNotes, .related-links, .feedback-wrapper').length) {
            if(!$(this).children('.toggle').length && !$('body').hasClass('workflow-guide')) {
                $(this).addClass('notoggle');
            }
        }
    });
});

function getNumLinks(more, subNum, href) {
    $.ajax({
         url: href,
         type:'GET',
         success: function(data){
            var total = $(data).find('.guide li').length - subNum;
            more.html('<a href="'+href+'"><span class="special-character Ellipsis">More...&nbsp;<span class="paren">('+total+')</span></span></a>');
         }
      });
}