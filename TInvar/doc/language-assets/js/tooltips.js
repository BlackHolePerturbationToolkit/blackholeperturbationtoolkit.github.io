if($('body').prop('id') === 'guide') {
  if(window.innerWidth > 600) {
    guide_tooltip();
  } else {
      if($('.function-intro-tooltip').length > 0) {
        $('.function-intro-tooltip').each(function(){
          $(this).addClass('hide');
        });
      }
    }
  $(window).on('load resize', function(){
    if(window.innerWidth > 600) {
      guide_tooltip();
    } else {
      if($('.function-intro-tooltip').length > 0) {
        $('.function-intro-tooltip').each(function(){
          $(this).addClass('hide');
        });
      }
    }
  });
  function guide_tooltip() {
    $('.IFSans > a, .MenuName > a').on('mouseover', function(){
      if(window.innerWidth > 600) {
        var link = $(this);
        var href = $(this).prop('href');
        if(href.indexOf('/ref/') > -1 && href.indexOf('/ref/character') < 0) {
          if($('.function-intro-tooltip').length < 1) {
            setTimeout(function(){
              guide_ajax(link, href);
            }, 1000);
          } else {
            if(link.next('.function-intro-tooltip').length < 1) {
              guide_ajax(link, href);
            } else {
              $('.function-intro-tooltip').each(function(){
                $(this).addClass('hide');
                $(this).removeClass('align-right');
              });
              link.next('.function-intro-tooltip').removeClass('hide');
              placement(link);
            }
          }
        }
      }
    });
    $('.singleFunction').each(function(){
      if($(this).parents('.tooltip-wrap').length < 1) {
        $(this).wrap('<div class="tooltip-wrap">');
      }
    });
    $('body').on('mouseover', '.expand', function(){
      $(this).text('... less');
      $(this).prev('.more-container').slideDown();
      if(!$(this).hasClass('expanded')) {
        $(this).addClass('expanded');
      }
    });
    $('body').on('click', '.expand', function() {
        $('.more-container').slideUp();
        $(this).text('... more');
        $(this).toggleClass('expanded');
    });
    $('body').on('click', function(){
      $('.function-intro-tooltip').addClass('hide');
    });
    $('body').on('click', '.function-intro-tooltip', function(e){
      e.stopPropagation();
    });
  }
  function placement(elm) {
    var elm = elm.parents('.IFSans').find('.function-intro-tooltip');
    var l = elm.offset().left;
    var w = elm.outerWidth();
    var docW = $(".main").outerWidth();
    var isEntirelyVisible = (l + w <= docW);
    var numFunctions = elm.parents('.singleFunction').find('.IFSans').length;
    var numLinks = elm.parents('.singleFunction').find('.IFSans > a').length;
    if (!isEntirelyVisible || l == undefined) {
      elm.addClass('align-right');
    }
    else {
      elm.removeClass('align-right');
    }
    if (numFunctions > 1) {
      elm.parents('.singleFunction').addClass('multiple');
    }
  }
  function guide_ajax(link, href) {
    var path = href.substring(0, href.lastIndexOf("/") + 1);
    $.ajax({
       url:href,
       type:'GET',
       success: function(data){
         var newHTMLDocument = document.implementation.createHTMLDocument().body;
             newHTMLDocument.innerHTML = data;
         if(link.parents('.IFSans').find('.function-intro-tooltip').length < 1 && $(newHTMLDocument).find('.functionIntroWrap').length > 0) {
          var content = $(newHTMLDocument).find('.functionIntroWrap').html();
          if($(newHTMLDocument).find('.functionIntroWrap img').length > 0) {
              content = content.replace(/src="Files/g, 'src="'+path+'/Files');
          } else if($(newHTMLDocument).find('.functionIntroWrap .clipboard-inline').length > 0) {
              content = content.replace(/data-code="Files/g, 'data-code="'+path+'/Files');
          } 
          $('.function-intro-tooltip').each(function(){
                $(this).addClass('hide');
          });
          link.after('<div class="function-intro-tooltip">'+content+'</div>');
          var numFunctionIntro = link.parents('.IFSans').find('.functionIntro').length;
          if(numFunctionIntro > 3) {
            link.parents('.IFSans').find('.function-intro-tooltip').append('<div class="more-container">');
            link.parents('.IFSans').find('.functionIntro').each(function(index){
              if(index > 2) {
                link.parents('.IFSans').find('.more-container').append($(this));
              }
            });
              var num = numFunctionIntro - 3;
              link.parents('.IFSans').find('.more-container').after('<button class="expand">... '+num+' more</button>');
            }
            placement(link);
          }
       }
    });
  }
}
if($('body').prop('id') === 'ref') {
  $('h2.toggle').each(function(){
    for(let description of descriptions) {
      let name = description.name;
      let text = description.text;
      if($(this).text().split('(')[0].trim() === name) {
        $(this).append('<span class="description">'+text+'</span>');
      }
    }
  });
}