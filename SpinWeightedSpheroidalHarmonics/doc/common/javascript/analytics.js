/* Determines if or which Google Analytics tracking code should be included on the page.

   developer:   suef, marionm
   ========================================================================== */

/* Google Analytics
   ========================================================================== */

// only track users that have accepted our privacy policy or don't require consent
if (/.*(__cookie_consent=(1|2)).*/i.test(document.cookie)) {

    // setup domain mapping
    var ga_data = [{
        'domain': 'wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'blog.stephenwolfram.com',
        'root': 'stephenwolfram.com',
        'id': 'UA-33987538-1'
    }, {
        'domain': 'blog.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'community.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-216407-15'
    }, {
        'domain': 'company.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'download.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'education.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'functions.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-216407-20'
    }, {
        'domain': 'library.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'media.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'msgcache.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'prerelease.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'search.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'site.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'store.wolfram.com',
        'root': 'wolfram.com',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'computerbasedmath.org',
        'root': 'computerbasedmath.com',
        'id': 'UA-216407-24'
    }, {
        'domain': 'mathematica-camp.org',
        'root': 'mathematica-camp.org',
        'id': 'UA-5677369-10'
    }, {
        'domain': 'wolframblockchainlabs.com',
        'root': 'wolframblockchainlabs.com',
        'id': 'UA-115548006-1'
    }, {
        'domain': 'wolframfoundation.org',
        'root': 'wolframfoundation.org',
        'id': 'UA-5677369-12'
    }];
    var ga_data_length = ga_data.length;

    // trim url elements we don't need
    var ga_url = window.location.hostname;
    var ga_url_regex = {
        'www.': '',
        'devel3.': '',
        'devel2.': '',
        'devel.': '',
        'test.': ''
    };
    var ga_domain = ga_url.replace(/www.|devel3.|devel2.|devel.|test./gi, function(i) {
        return ga_url_regex[i];
    });
    var ga_included = false;

    // determine if analytics should be included
    for (i = 0; i < ga_data_length; i++) {
        if (ga_domain == ga_data[i].domain) {
            ga_included = true;
            /*
            Creates a temporary global ga object and loads analytics.js. Paramenters o, a, and m are all used internally.
            @param {Window}      i The global context object.
            @param {Document}    s The DOM document object.
            @param {string}      o Must be 'script'.
            @param {string}      g URL of the analytics.js script. Inherits protocol from page.
            @param {string}      r Global name of analytics object.  Defaults to 'ga'.
            @param {DOMElement?} a Async script tag.
            @param {DOMElement?} m First script tag in document.
            */
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; // Acts as a pointer to support renaming.

                // Creates an initial ga() function. The queued commands will be executed once analytics.js loads.
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                },

                // Sets the time (as an integer) this tag was executed. Used for timing hits.
                i[r].l = 1 * new Date();

                // Insert the script tag asynchronously. Inserts above current tag to prevent blocking in addition to using the async attribute.
                a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
            ga('create', ga_data[i].id, ga_data[i].root); // Creates the tracker with parameters.
            ga('send', 'pageview'); // Sends a pageview hit.
        }
    }

    /* ScrollDepth plugin
       ========================================================================== */

    var ga_sd_data = [
        'wolfram.com/',
        'wolfram.com/cloud-credits/',
        'wolfram.com/cloud/',
        'wolfram.com/data-science/',
        'wolfram.com/discovery-platform/',
        'wolfram.com/engine-integration-system/',
        'wolfram.com/engine/',
        'wolfram.com/knowledgebase/',
        'wolfram.com/language/',
        'wolfram.com/language/for-experts/',
        'wolfram.com/mathematica/',
        'wolfram.com/mathematica/pricing/colleges-universities.php',
        'wolfram.com/mathematica/pricing/community-technical-colleges.php',
        'wolfram.com/mathematica/pricing/government.php',
        'wolfram.com/mathematica/pricing/industry-individuals.php',
        'wolfram.com/mathematica/pricing/primary-secondary-education.php',
        'wolfram.com/mathematica/pricing/students.php',
        'wolfram.com/programming-cloud/',
        'wolfram.com/programming-cloud/pricing/',
        'wolfram.com/tweet-a-program/',
        'wolfram.com/universal-deployment-system/',
        'wolfram.com/wolfram-one/',
        'blog.stephenwolfram.com/2015/11/how-should-we-talk-to-ais/',
        'wolfram.com/resources/computational-thinking/'
    ];
    var ga_sd_data_length = ga_sd_data.length;

    // trim url elements we don't need
    var ga_sd_url = window.location.href.split('?')[0];
    var ga_sd_url_regex = {
        'http://': '',
        'https://': '',
        'www.': '',
        'devel3.': '',
        'devel2.': '',
        'devel.': '',
        'test.': ''
    };
    var ga_sd_domain = ga_sd_url.replace(/http:\/\/|https:\/\/|www.|devel3.|devel2.|devel.|test./gi, function(i) {
        return ga_sd_url_regex[i];
    });

    // only enable jQuery functionality if it is present (some ancient pages don't have it)
    if (window.jQuery !== undefined && ga_included) {

        // determine if ScrollDepth plugin should be included
        $(document).ready(function() {
            for (i = 0; i < ga_sd_data_length; i++) {
                if (ga_sd_domain == ga_sd_data[i]) {
                    /*
                    jquery.scrolldepth.js | v0.7.1

                    Copyright (c) 2009-2014 Rob Flaherty

                    Permission is hereby granted, free of charge, to any person obtaining a copy of
                    this software and associated documentation files (the "Software"), to deal in
                    the Software without restriction, including without limitation the rights to
                    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
                    of the Software, and to permit persons to whom the Software is furnished to do
                    so, subject to the following conditions:

                    The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.

                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
                    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
                    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                    */
                    !function(e,n,t){"use strict";var o,r,a,l={minHeight:0,elements:[],percentage:!0,userTiming:!0,pixelDepth:!0,nonInteraction:!0},i=e(n),c=[],u=0;e.scrollDepth=function(h){function p(e){a?a({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:e,eventLabel:"Baseline",eventValue:1,eventNonInteraction:!0}):(o&&ga("send","event","Scroll Depth",e,"Baseline",1,{nonInteraction:!0}),r&&_gaq.push(["_trackEvent","Scroll Depth",e,"Baseline",1,!0]))}function g(e,n,t,l){a?(a({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:e,eventLabel:n,eventValue:1,eventNonInteraction:h.nonInteraction}),h.pixelDepth&&arguments.length>2&&t>u&&(u=t,a({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:"Pixel Depth",eventLabel:D(t),eventValue:1,eventNonInteraction:h.nonInteraction})),h.userTiming&&arguments.length>3&&a({event:"ScrollTiming",eventCategory:"Scroll Depth",eventAction:e,eventLabel:n,eventTiming:l})):(o&&(ga("send","event","Scroll Depth",e,n,1,{nonInteraction:h.nonInteraction}),h.pixelDepth&&arguments.length>2&&t>u&&(u=t,ga("send","event","Scroll Depth","Pixel Depth",D(t),1,{nonInteraction:h.nonInteraction})),h.userTiming&&arguments.length>3&&ga("send","timing","Scroll Depth",e,l,n)),r&&(_gaq.push(["_trackEvent","Scroll Depth",e,n,1,h.nonInteraction]),h.pixelDepth&&arguments.length>2&&t>u&&(u=t,_gaq.push(["_trackEvent","Scroll Depth","Pixel Depth",D(t),1,h.nonInteraction])),h.userTiming&&arguments.length>3&&_gaq.push(["_trackTiming","Scroll Depth",e,l,n,100])))}function s(e){return{"25%":parseInt(.25*e,10),"50%":parseInt(.5*e,10),"75%":parseInt(.75*e,10),"100%":e-5}}function v(n,t,o){e.each(n,function(n,r){-1===e.inArray(n,c)&&t>=r&&(g("Percentage",n,t,o),c.push(n))})}function f(n,t,o){e.each(n,function(n,r){-1===e.inArray(r,c)&&e(r).length&&t>=e(r).offset().top&&(g("Elements",r,t,o),c.push(r))})}function D(e){return(250*Math.floor(e/250)).toString()}function m(e,n){var t,o,r,a=null,l=0,i=function(){l=new Date,a=null,r=e.apply(t,o)};return function(){var c=new Date;l||(l=c);var u=n-(c-l);return t=this,o=arguments,0>=u?(clearTimeout(a),a=null,l=c,r=e.apply(t,o)):a||(a=setTimeout(i,u)),r}}var d=+new Date;h=e.extend({},l,h),e(t).height()<h.minHeight||("function"==typeof ga&&(o=!0),"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&(r=!0),"function"==typeof h.eventHandler?a=h.eventHandler:"undefined"!=typeof dataLayer&&"function"==typeof dataLayer.push&&(a=dataLayer.push),h.percentage?p("Percentage"):h.elements&&p("Elements"),i.on("scroll.scrollDepth",m(function(){var o=e(t).height(),r=n.innerHeight?n.innerHeight:i.height(),a=i.scrollTop()+r,l=s(o),u=+new Date-d;return c.length>=4+h.elements.length?void i.off("scroll.scrollDepth"):(h.elements&&f(h.elements,a,u),void(h.percentage&&v(l,a,u)))},500)))}}(jQuery,window,document);
                    if (ga_sd_domain == 'wolfram.com/mathematica/') {
                        $.scrollDepth({
                            elements: ['#about', '#coverage', '#core', '#stats', '#products']
                        });
                    } else {
                        $.scrollDepth();
                    }
                }
            }

        /* track AdWords referrals
           ========================================================================== */

            var ga_url_with_params = window.location.href.split('?')[0];
            var ga_url_params = window.location.search.slice(1).split('&');

            // strip gclid parameter from the url
            if (ga_url_params.length > 0) {
                ga_url_with_params += '?';
                $.each(ga_url_params, function(index, value) {
                    if (value.indexOf('gclid=') < 0) ga_url_with_params += value + '&';
                });
                ga_url_with_params = ga_url_with_params.substring(0, ga_url_with_params.length - 1);
            }

            $('.gl-track-adwords-referrals').each(function() {
                if (typeof ga !== 'undefined' && window.location.href.indexOf('src=google&') > 0 && $(this).prop('href') !== '' && $(this).prop('href') !== '#') {
                    $(this).on('click', function() {
                        ga('send', 'event', 'AdWordsReferralClick', 'From: ' + ga_url_with_params, 'To: ' + $(this).prop('href'), {'nonInteraction': 1});
                    });
                }
            });

            $('.gl-track-click').each(function() {
                if (typeof ga !== 'undefined' && $(this).prop('href') !== '' && $(this).prop('href') !== '#' && $(this).data('gl-category') !== '' && $(this).data('gl-action') !== '' && $(this).data('gl-label') !== '') {
                    $(this).on('click', function() {
                        ga('send', 'event', $(this).data('gl-category'), $(this).data('gl-action'), $(this).data('gl-label'), {'nonInteraction': 1});
                    });
                }
            });

        });

    }

}