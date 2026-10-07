$(document).ready(function(){
/* ==========================================================================
   Toggles
   ========================================================================== */
    $('.toggle').click(function(){
        if($(this).parents('section').attr('id') !== "Examples") {
            $(this).toggleClass('open');
            $(this).parents('section').toggleClass('open');
        }
    });
    $('#Examples').on('click', '.toggle', function(){
        var clicked = $(this);
        clicked.toggleClass('open');
    /* ==========================================================================
       unveil
       ========================================================================== */
        setTimeout(function(){
            $('.main img, .main video, .main audio').unveil();
        }, 500);
    });
    if($('#Examples').length) {
        $('#Examples .hideable').last().addClass('last-hideable');
    }
    $('.open-all').click(function(){
        if(window.location.search.indexOf('?view=all') < 0) {
            window.history.pushState({ page: "View All" }, "View All", "?view=all");
        }
        openAll();
    });
    if(window.location.search.indexOf('?view=all') > -1 && $('.open-all').length) {
        openAll();
    }
    function openAll() {
        $('.open-all').removeClass('on');
        $('.close-all').addClass('on');
        $('#Examples .toggle, #guide .toggle').addClass('open');
    }
    $('.close-all').click(function(){
        $('.open-all').addClass('on');
        $('.close-all').removeClass('on');
        $('#Examples .hideable .toggle, #guide .toggle').removeClass('open');
        $(window).trigger('resize');
    });
    $('#DetailsAndOptions, .alternateHeader').click(function(){
        if(!$(this).hasClass('open') && $('.NotesThumbnails').length > 0 || !$(this).find('h1').hasClass('open')) {
            if($(this).find('h1').hasClass('open')) {
                $(this).find('h1').removeClass('open');
                $(this).removeClass('open');
            }
            else {
                $(this).find('h1').addClass('open');
                $(this).addClass('open');
            }
        }
    });
    $('#DetailsAndOptions .toggle, .alternateHeader .toggle').click(function(e){
        e.stopPropagation();
        $(this).parent('section').toggleClass('open');
    });
});