/* Global functionality for the <head> element.

   developer:   marionm
   requires:    nothing
   ========================================================================== */

/* ==========================================================================
   functions
   ========================================================================== */

/* Limit the rate at which a function is permitted to trigger.

   params:      func (function, no default) function to throttle
                threshold (integer, default=100ms) maximum rate at which function is permitted to trigger
                scope (object, no default) scope to use if different from "this"
   returns:     function
   ========================================================================== */

function _throttle(func, threshold, scope) {
    threshold || (threshold = 100);
    var last, deferTimer;
    return function () {
        var context = scope || this;
        var now = +new Date, args = arguments;
        if (last && now < last + threshold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                func.apply(context, args);
            }, threshold);
        } else {
          last = now;
          func.apply(context, args);
        }
    };
}

/* Delay a function from triggering when within a specific threshold.

   params:      func (function, no default) function to delay
                threshold (integer, default=100ms) maximum time permitted to delay the function from triggering
                immediate (boolean, default=true) if true, immediately trigger the function then begin the delay; if false, only trigger the function after the delay
   returns:     function
   ========================================================================== */

function _debounce(func, threshold, immediate) {
    threshold || (threshold = 100);
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, threshold);
        if (callNow) func.apply(context, args);
    };
};

/* ==========================================================================
   variables
   ========================================================================== */

var _html = document.documentElement;

/* ==========================================================================
   actions
   ========================================================================== */

// add class indicator for javascript-enabled environments
_html.className += ' js-enabled';

if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
    // enable :active pseudo styles on iOS Safari
    window.addEventListener('touchstart', function() {}, false);
    // add class indicator for touch-enabled environments
    _html.className += ' touch-enabled';
}

/* breakpoints
   ========================================================================== */

// manage breakpoint class indicators on the html element
var _breakpoints = _throttle(function() {
    var width = window.innerWidth;
    // add class indicator for current screen size
    if (width >= 1201) {
        if (_html.className.indexOf(' __full') < 0) _html.className += ' __full';
        _html.className = _html.className.replace(/(?:^|\s)(__1200|__900|__600|__320)(?!\S)/g, '');
    } else if (width >= 901 && width <= 1200) {
        if (_html.className.indexOf(' __1200') < 0) _html.className += ' __1200';
        _html.className = _html.className.replace(/(?:^|\s)(__full|__900|__600|__320)(?!\S)/g, '');
    } else if (width >= 601 && width <= 900) {
        if (_html.className.indexOf(' __900') < 0) _html.className += ' __900';
        _html.className = _html.className.replace(/(?:^|\s)(__full|__1200|__600|__320)(?!\S)/g, '');
    } else if (width >= 321 && width <= 600) {
        if (_html.className.indexOf(' __600') < 0) _html.className += ' __600';
        _html.className = _html.className.replace(/(?:^|\s)(__full|__1200|__900|__320)(?!\S)/g, '');
    } else if (width <= 320) {
        if (_html.className.indexOf(' __320') < 0) _html.className += ' __320';
        _html.className = _html.className.replace(/(?:^|\s)(__full|__1200|__900|__600)(?!\S)/g, '');
    }
});

_breakpoints();
window.addEventListener('pageshow', _breakpoints);
window.addEventListener('load', _breakpoints);
window.addEventListener('resize', _breakpoints);