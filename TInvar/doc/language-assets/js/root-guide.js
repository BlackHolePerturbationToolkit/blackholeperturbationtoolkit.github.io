$(document).ready(function(){
    var link = window.location.hash;
    if(link !== '' && link !== '#_') {
        if(link == '#FastIntroductions') {
            var tab = link;
        }
        else {
            var tab = link.replace('#', '#tab-');
            $('body').addClass('tile-selected');
        }
        if(!$(tab).parents('.thumb').hasClass('bluebg')) {
            $('body, html').stop().delay(750).animate({
                scrollTop:   $(tab).offset().top - 42
            }, 500);
        }
    }
    $('.container:not(.left) .podheader').click(function(e){
        var clickedPod = $(this);
        $('.podheader').not(clickedPod).parents('.thumb').removeClass('selected');
        $('.podheader').not(clickedPod).next('.links-list').removeClass('show');
        $('.podheader').not(clickedPod).parents('.menu-wrapper').removeClass('hover');
        clickedPod.parents('.thumb').toggleClass('selected');
        clickedPod.next('.links-list').toggleClass('show');
        if($('.links-list.show').length) {
            $('body').addClass('tile-selected');
        } else {
            if(clickedPod.find('.title').prop('href').indexOf('#') > -1) {
                e.preventDefault();
                $('body').removeClass('tile-selected');
                window.history.pushState({ page: "Root Guide" }, "Root Guide", location.pathname);
            }
        }
    });
    $('.container.left .podheader').click(function(){
        var innerLink = $(this).find('.title').prop('href');
        if(innerLink.indexOf('#') == -1 && innerLink.prop('target') !== '_blank'){
            window.location = innerLink;
        }
        
    });
});
$('.menu').click(function(){
    $(this).parents('.menu-wrapper').toggleClass('hover');
    $(this).parents('.thumb').toggleClass('selected');
});
$(window).on('ready load hashchange', function(){
    var link = window.location.hash;
    if(link !== '' && link !== '#_') {
        targetLink = link.replace('#', '#tab-');
        $(link).attr('id', targetLink.replace('#',''));
        $('.podheader').not(targetLink).parents('.thumb').removeClass('selected');
        $(targetLink).parents('.thumb').addClass('selected');
        $(targetLink).parents('.menu-wrapper').addClass('hover');
        $('.thumb').children('.podheader').not(targetLink).next('.links-list').removeClass('show');
        $('.thumb').find(targetLink).next('.links-list').addClass('show');
        if($(targetLink).parents('.thumb').hasClass('bluebg')) {
            $('body, html').stop().delay(750).animate({
                scrollTop:   $(targetLink).next('.links-list').offset().top - 42
            }, 500);
        }
    }
});
/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function(){if("undefined"!==typeof window&&window.addEventListener){var e=Object.create(null),l,d=function(){clearTimeout(l);l=setTimeout(n,100)},m=function(){},t=function(){window.addEventListener("resize",d,!1);window.addEventListener("orientationchange",d,!1);if(window.MutationObserver){var k=new MutationObserver(d);k.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0});m=function(){try{k.disconnect(),window.removeEventListener("resize",d,!1),window.removeEventListener("orientationchange",
d,!1)}catch(v){}}}else document.documentElement.addEventListener("DOMSubtreeModified",d,!1),m=function(){document.documentElement.removeEventListener("DOMSubtreeModified",d,!1);window.removeEventListener("resize",d,!1);window.removeEventListener("orientationchange",d,!1)}},u=function(k){function e(a){if(void 0!==a.protocol)var c=a;else c=document.createElement("a"),c.href=a;return c.protocol.replace(/:/g,"")+c.host}if(window.XMLHttpRequest){var d=new XMLHttpRequest;var m=e(location);k=e(k);d=void 0===
d.withCredentials&&""!==k&&k!==m?XDomainRequest||void 0:XMLHttpRequest}return d};var n=function(){function d(){--q;0===q&&(m(),t())}function l(a){return function(){!0!==e[a.base]&&(a.useEl.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+a.hash),a.useEl.hasAttribute("href")&&a.useEl.setAttribute("href","#"+a.hash))}}function p(a){return function(){var c=document.body,b=document.createElement("x");a.onload=null;b.innerHTML=a.responseText;if(b=b.getElementsByTagName("svg")[0])b.setAttribute("aria-hidden",
"true"),b.style.position="absolute",b.style.width=0,b.style.height=0,b.style.overflow="hidden",c.insertBefore(b,c.firstChild);d()}}function n(a){return function(){a.onerror=null;a.ontimeout=null;d()}}var a,c,q=0;m();var f=document.getElementsByTagName("use");for(c=0;c<f.length;c+=1){try{var g=f[c].getBoundingClientRect()}catch(w){g=!1}var h=(a=f[c].getAttribute("href")||f[c].getAttributeNS("http://www.w3.org/1999/xlink","href")||f[c].getAttribute("xlink:href"))&&a.split?a.split("#"):["",""];var b=
h[0];h=h[1];var r=g&&0===g.left&&0===g.right&&0===g.top&&0===g.bottom;g&&0===g.width&&0===g.height&&!r?(f[c].hasAttribute("href")&&f[c].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a),b.length&&(a=e[b],!0!==a&&setTimeout(l({useEl:f[c],base:b,hash:h}),0),void 0===a&&(h=u(b),void 0!==h&&(a=new h,e[b]=a,a.onload=p(a),a.onerror=n(a),a.ontimeout=n(a),a.open("GET",b),a.send(),q+=1)))):r?b.length&&e[b]&&setTimeout(l({useEl:f[c],base:b,hash:h}),0):void 0===e[b]?e[b]=!0:e[b].onload&&(e[b].abort(),
delete e[b].onload,e[b]=!0)}f="";q+=1;d()};var p=function(){window.removeEventListener("load",p,!1);l=setTimeout(n,0)};"complete"!==document.readyState?window.addEventListener("load",p,!1):p()}})();