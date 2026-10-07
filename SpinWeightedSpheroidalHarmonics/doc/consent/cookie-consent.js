if (window.self == window.top) {
    var __cookieConsent = {};

    __cookieConsent.countryCode = 'us';
    __cookieConsent.signedIn = '';

    __cookieConsent.getDomain = function(d) {
        var p = d.split('.');
        if (p.length <= 2) {
            return __cookieConsent.buildDomain(p);
        }
        p = p.slice(-3);
        if (p[2].length >= 3 || p[1].length > 3) {
            return __cookieConsent.buildDomain(p.slice(-2));
        }
        return __cookieConsent.buildDomain(p);
    }

    __cookieConsent.buildDomain = function(p) {
        var d = '.' + p.join('.');
        return d;
    }

    __cookieConsent.getValue = function() {
        var n = '__cookie_consent=',
            a = decodeURIComponent(document.cookie).split(';');
        for (var i = 0; i < a.length; i++) {
            var c = a[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(n) == 0) {
                return parseInt(c.substring(n.length, c.length));
            }
        }
        return null;
    }

    __cookieConsent.setValue = function(v) {
        v = parseInt(v);
        v = v >= 0 && v <= 2 ? v : -1;
        if (v < 0) return;
        var d = __cookieConsent.getDomain(window.location.hostname),
            e = new Date,
            t = new Date;
        t.setHours(e.getHours() + 1);
        switch (v) {
            case 0:
                e = t.toUTCString();
                break;
            case 1:
                e.setFullYear(e.getFullYear() + 100);
                __cookieConsent.killMessage();
                break;
            case 2:
                e = t.toUTCString();
                __cookieConsent.killMessage();
                break;
        }
        document.cookie = '__cookie_consent='+v+';expires='+e+';domain='+d+';path=/;';
    }

    __cookieConsent.killCookie = function() {
        var d = __cookieConsent.getDomain(window.location.hostname),
            e = new Date;
        e.setDate(e.getDate() - 1);
        document.cookie = '__cookie_consent=0;expires='+e+';domain='+d+';path=/;';
    }

    __cookieConsent.killMessage = function() {
        var w = document.getElementById('__cookie-consent-wrapper');
        if (w !== null) {
            w.style.display = 'none';
            w.outerHTML = '';
        }
    }

    __cookieConsent.appendMessage = function() {
        __cookieConsent.wrapper = '';
        if (__cookieConsent.wrapper !== '' && document.getElementById(__cookieConsent.wrapper) !== null) {
            var w = document.createElement('div');
            w.id = '__cookie-consent-wrapper';
            var ow = document.getElementById(__cookieConsent.wrapper);
            ow.appendChild(w);
        } else {
            var w = document.createElement('div');
            w.id = '__cookie-consent-wrapper';
            document.body.appendChild(w);
        }
        w.innerHTML = '<div id=__cookie-consent-styles style=display:none><style>#__cookie-consent,#__cookie-consent *{color:#fff;font-family:Arial,sans-serif;font-weight:400;line-height:1.2;margin:0;padding:0;z-index:3000000000}@keyframes slideup{0%{bottom:-70px}100%{bottom:0}}#__cookie-consent{animation-name:slideup;animation-delay:1s;animation-duration:.5s;animation-fill-mode:forwards;animation-iteration-count:1;animation-timing-function:ease;background:rgba(101,101,101,.9);bottom:-70px;height:70px;left:0;min-width:320px;position:fixed;right:0;width:100%}#__cookie-consent-table{display:table;width:100%}#__cookie-consent-left,#__cookie-consent-right{display:table-cell;font-size:13px;height:70px;vertical-align:middle}#__cookie-consent-left{line-height:1.2;padding:0 15px;text-align:left}#__cookie-consent-right{padding:0 15px 0 0;text-align:right}#__cookie-consent-button{background:#51a9b1;border-radius:4px;border:1px solid #6c6c6c;cursor:pointer;padding:5px 15px;white-space:nowrap}#__cookie-consent-button:hover{background:#55b8c0}#__cookie-consent-link{color:#bdf4f8;text-decoration:none}#__cookie-consent-link:hover{border-bottom:1px dashed #bdf4f8;color:#bdf4f8}@media all and (max-width:600px){#__cookie-consent-left{font-size:10px}#__cookie-consent-button{font-size:12px}#__cookie-consent-button span:before{clear:both;content:\'\';display:table}}</style></div><div id=__cookie-consent><div id=__cookie-consent-table><div id=__cookie-consent-left>This website uses cookies to optimize your experience with our services on the site, as described in our <a href=http://www.wolfram.com/legal/privacy/wolfram-research.html target=_blank id=__cookie-consent-link>Privacy Policy</a>.</div><div id=__cookie-consent-right><button id=__cookie-consent-button type=button>Accept <span>&amp; Close</span></span></button></div></div></div>';
        var b = document.getElementById('__cookie-consent-button');
        b.onclick = function() {
            __cookieConsent.setValue(1);
        }
        document.removeEventListener('DOMContentLoaded', __cookieConsent.appendMessage);
    }

    __cookieConsent.load = function() {
        var c = __cookieConsent.countryCode,
            v = __cookieConsent.getValue();
        if (__cookieConsent.signedIn == 'true' && (v == null || v == 0)) {
            __cookieConsent.setValue(1);
        } else {
            if (v == null) {
                var a = ['ad', 'al', 'am', 'at', 'az', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'ge', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'tr', 'ua', 'va', 'xk'];
                if (a.indexOf(c) > -1) {
                    __cookieConsent.setValue(0);
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', __cookieConsent.appendMessage);
                    } else {
                        __cookieConsent.appendMessage();
                    }
                } else {
                    __cookieConsent.setValue(2);
                }
            } else if (v == 0) {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', __cookieConsent.appendMessage);
                } else {
                    __cookieConsent.appendMessage();
                }
            }
        }
    }();
}