/* Copy to clipboard functionality.

   developer:   suef, marionm
   requires:    nothing
   ========================================================================== */

var __copyToClipboard = {};

/* ==========================================================================
   load templates
   ========================================================================== */

__copyToClipboard.ajax = function(url, func) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        var context = this.responseText;
        func(context);
    };
    xhr.onerror = 'error';
    xhr.send();
}

__copyToClipboard.load = function() {
    var langs = ['en', 'ja', 'zh'],
        lang = (langs.indexOf(window.navigator.language) > -1) ? window.navigator.language : 'en';

	// Locate the <script src="<...>/clipboard.js" /> that loaded this file.
	// https://stackoverflow.com/a/4440632
	var scriptLocation = document
		.querySelectorAll("script[src*='clipboard.js'")
		.item(0)
		.attributes
		.getNamedItem("src")
		.value;

	var base = scriptLocation.replace("clipboard.js", "");

    __copyToClipboard.ajax(base + './input-template.html', input);
    __copyToClipboard.ajax(base + './output-template.html', output);
    __copyToClipboard.ajax(base + './inline-template.html', inline);
    __copyToClipboard.ajax(base + './inlineblock-template.html', inlineblock);
    __copyToClipboard.ajax(base + './block-template.html', block);
    __copyToClipboard.ajax(base + './code-clipboard-template.html', codeClipboard);
    __copyToClipboard.ajax(base + './not-copiable-template.html', notCopiable);
/*  __copyToClipboard.ajax('/common/js/clipboard/2.0/image-map.html', imageMap); */

    setTimeout(function() {
        __copyToClipboard.ajax(base + './clipboard-text.'+lang+'.json', __copyToClipboard.clipboard);
    }, 1000);
}

__copyToClipboard.load();

/* ==========================================================================
   clipboard copying
   ========================================================================== */

__copyToClipboard.clipboard = function(text) {
    var text = JSON.parse(text),
        hoverElems = document.querySelectorAll('.clipboard-hover'),
        inputElems = document.querySelectorAll('.clipboard-input'),
        copyElems = document.querySelectorAll('.clipboard-copy');
        createClipboard(hoverElems, copyElems, text);
        createEvents(inputElems, hoverElems);
        hideTooltip(hoverElems, text);
        createClickEvents(hoverElems, text);
}

/* ==========================================================================
   functions
   ========================================================================== */

/* input template
   ========================================================================== */

function input(tpl) {
    var elems = document.querySelectorAll('.clipboard-input');
    elems.forEach(function(el, i) {
        var text = el.textContent.trim(),
            code = tpl.replace('[[in]]', el.getAttribute('data-in'));
        code = code.replace('[[copyText]]', text);
        code = code.replace('[[inNum]]', el.getAttribute('data-in-num'));
        if (el.getAttribute('data-in-src') !== null && el.getAttribute('data-in-src') !== '' && el.getAttribute('data-in-src') !=='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==') {
            code = code.replace('[[inSrc]]', el.getAttribute('data-in-src'));
        } else if (el.getAttribute('data-src-swap') !== null && el.getAttribute('data-src-swap') !== '' && el.getAttribute('data-src-swap') !=='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==') {
            code = code.replace('[[inSrc]]', el.getAttribute('data-src-swap'));
        } else {
        	code = code.replace('[[inSrc]]', el.getAttribute('data-src'));
        }
        code = code.replace('[[inWidth]]', el.getAttribute('data-in-width'));
        code = code.replace('[[inHeight]]', el.getAttribute('data-in-height'));
        code = code.replace('[[dataSrc]]', el.getAttribute('data-src'));
        code = code.replace('[[dataSrcSmall]]', el.getAttribute('data-src-swap'));
        code = code.replace('[[dataBig]]', el.getAttribute('data-big'));
        code = code.replace('[[dataSmall]]', el.getAttribute('data-small'));
        code = code.replace('[[dataLink]]', el.getAttribute('data-link'));
        code = code.replace(/null/g, '');

        el.innerHTML = code;

        if(el.getAttribute('data-in') == '') {
            var inCell = el.querySelector('.clipboard-cell');
            inCell.parentNode.removeChild(inCell);
        }
        if(el.getAttribute('data-link')) {
            el.querySelector('.clipboard-hover').classList.add('with-link');
            el.querySelector('.clipboard-link').classList.remove('hide');
        }

        if (el.querySelector('.clipboard-hover img') !== null) {
            if (el.getAttribute('data-src-swap') !== null && el.getAttribute('data-src-swap') !== '') {
                if (el.getAttribute('data-small') !== '' && el.getAttribute('data-small') !== null) {
                    imgSwap(el.querySelector('.clipboard-hover img'));
                }
            }
        }
    });
}

/* not-copiable template
   ========================================================================== */

function notCopiable(tpl) {
    var elems = document.querySelectorAll('.not-copiable');
    elems.forEach(function(el, i) {
        var text = el.textContent.trim(),
            code = tpl.replace('[[in]]', el.getAttribute('data-in'));
        code = code.replace('[[inNum]]', el.getAttribute('data-in-num'));
        if (el.getAttribute('data-in-src') !== null && el.getAttribute('data-in-src') !== '') {
            code = code.replace('[[inSrc]]', el.getAttribute('data-in-src'));
        }
        code = code.replace('[[inWidth]]', el.getAttribute('data-in-width'));
        code = code.replace('[[inHeight]]', el.getAttribute('data-in-height'));
        code = code.replace('[[dataSrc]]', el.getAttribute('data-src'));
        code = code.replace('[[dataSrcSmall]]', el.getAttribute('data-src-swap'));
        code = code.replace('[[dataBig]]', el.getAttribute('data-big'));
        code = code.replace('[[dataSmall]]', el.getAttribute('data-small'));
        code = code.replace(/null/g, '');

        el.innerHTML = code;

        if (el.querySelector('.not-copiable img') !== null) {
            if (el.getAttribute('data-src-swap') !== null && el.getAttribute('data-src-swap') !== '') {
                if (el.getAttribute('data-small') !== '' && el.getAttribute('data-small') !== null) {
                    imgSwap(el.querySelector('.not-copiable img'));
                }
            }
        }
    });
}

/* output template
   ========================================================================== */

function output(tpl) {
    var elems = document.querySelectorAll('.clipboard-output');
    elems.forEach(function(el, i) {
        var code = tpl.replace('[[out]]', el.getAttribute('data-out'));
        code = code.replace('[[outNum]]', el.getAttribute('data-out-num'));
        code = code.replace('[[outWidth]]', el.getAttribute('data-out-width'));
        code = code.replace('[[outHeight]]', el.getAttribute('data-out-height'));
        code = code.replace('[[outDataSrc]]', el.getAttribute('data-src'));
        if (el.getAttribute('data-src') !== null && el.getAttribute('data-src') !== '') {
            code = code.replace('[[outSrc]]', el.getAttribute('data-src'));
        }
        if (el.getAttribute('data-out-separate') == 'true') {
            code = code.replace('[[separate]]', ' separate');
        } else {
            code = code.replace('[[separate]]', '');
        }
        if (el.getAttribute('data-out-link') !== null && el.getAttribute('data-out-link') !== '') {
            code = code.replace('[[outLink]]', el.getAttribute('data-out-link'));
        } else {
            code = code.replace('<a href="[[outLink]]" target="_blank">', '').replace('</a>', '');
        }
        code = code.replace('[[outSrc]]', el.getAttribute('data-out-src'));
        code = code.replace(/null/g, '');

        el.innerHTML = code;

        if ((el.getAttribute('data-media') !== '' && el.getAttribute('data-media') !== null) || (el.getAttribute('data-media-delay') !== null && el.getAttribute('data-media-delay') !== '')) {
            el.querySelector('.clipboard-img').classList.add('media');
            var icon = document.createElement('i'),
                delay,
                file,
                loop;
            if (el.querySelector('.media i') == null) {
                el.querySelector('.media').appendChild(icon);
            }
            if (el.getAttribute('data-media') !== null && el.getAttribute('data-media') !== '') {
                file = el.getAttribute('data-media');
                delay = false;
            }
            if (el.getAttribute('data-media-delay') !== null && el.getAttribute('data-media-delay') !== '') {
                file = el.getAttribute('data-media-delay');
                delay = true;
            }
            if (el.getAttribute('data-media-loop') !== null && el.getAttribute('data-media-loop') !== '') {
                loop = "loop";
            }
            var ext = file.split('.').pop(),
                audioext = ['mp3', 'midi', 'mid', 'wav'],
                videoext = ['mp4', '.webm', '.ogg'];
            if (audioext.indexOf(ext) > -1) {
                audio(el.querySelector('.clipboard-img'), file, delay, loop);
            } else if (videoext.indexOf(ext) > -1) {
                var width = el.getAttribute('data-video').split(' ')[0];
                var height = el.getAttribute('data-video').split(' ')[1];
                video(el.querySelector('.clipboard-img'), file, width, height, delay);
            }
        }
    });
}

/* inline template
   ========================================================================== */

function inline(tpl) {
    var elems = document.querySelectorAll('.clipboard-inline:not(.code)');
    elems.forEach(function(el, i) {
        var text = el.textContent.trim(),
            copy = el.getAttribute('data-copy');
        if (text.length > 1) {
            if (copy !== null && copy !== '') {
                var code = tpl.replace('[[copyText]]', copy).replace(/null/g, '');
                el.innerHTML += code;
            } else {
                var code = tpl.replace('[[copyText]]', text).replace(/null/g, '');
                el.innerHTML += code;
            }

            el.classList.add('clipboard-hover');
            ['mousemove','touchmove','touchend'].forEach( function(evt) {
                if (window.evt) {
                    document.captureEvents(evt.MOUSEMOVE);
                }
                el.addEventListener(evt, function(e) {
                    var left = (window.evt) ? e.pageX : event.clientX - 80;
                    var top = (window.evt) ? e.pageY : event.clientY - 60;
                    this.querySelectorAll('.clipboard-tooltip')[0].style.left = left + 'px';
                    this.querySelectorAll('.clipboard-tooltip')[0].style.top = top + 'px';
                    this.querySelectorAll('.clipboard-tooltip')[0].style.position = 'fixed';
                });
            });
        } else {
            el.classList.remove('clipboard-inline');
        }
    });
}

/* block template
   ========================================================================== */

function block(tpl) {
    var elems = document.querySelectorAll('.clipboard-block');
    elems.forEach(function(el, i) {
        var text = el.textContent.trim(),
            copy = el.getAttribute('data-copy');
        if (text.length > 1) {
            if (copy !== null && copy !== '') {
                var code = tpl.replace('[[copyText]]', copy);
            } else {
                var code = tpl.replace('[[copyText]]', text);
            }
            code = code.replace(/null/g, '');

            el.innerHTML += code;

            el.classList.add('clipboard-hover');
            ['mousemove','touchmove'].forEach( function(evt) {
                if (window.evt) {
                    document.captureEvents(evt.MOUSEMOVE);
                }
                el.addEventListener(evt, function(e) {
                    var left = (window.evt) ? e.pageX : event.clientX - 80;
                    var top = (window.evt) ? e.pageY : event.clientY - 60;
                    this.querySelectorAll('.clipboard-tooltip')[0].style.left = left + 'px';
                    this.querySelectorAll('.clipboard-tooltip')[0].style.top = top + 'px';
                    this.querySelectorAll('.clipboard-tooltip')[0].style.position = 'fixed';
                });
            });
        } else {
            el.classList.remove('clipboard-block');
        }
    });
}

/* inlineblock template
   ========================================================================== */

function inlineblock(tpl) {
    var elems = document.querySelectorAll('.clipboard-inlineblock:not(.code)');
    elems.forEach(function(el, i) {
        var text = el.textContent.trim(),
            copy = el.getAttribute('data-copy');
        if (text.length > 1) {
            if (copy !== null && copy !== '') {
                var code = tpl.replace('[[copyText]]', copy).replace(/null/g, '');
                el.innerHTML += code;
            } else {
                var code = tpl.replace('[[copyText]]', text).replace(/null/g, '');
                el.innerHTML += code;
            }
            el.classList.add('clipboard-hover');  
        } else {
            el.classList.remove('clipboard-inlineblock');
        }
    });
}

/* code clipboard template
   ========================================================================== */

function codeClipboard(tpl) {
    var elems = document.querySelectorAll('.code.clipboard-inline');
    elems.forEach(function(el, i) {
        var text = el.innerHTML;
        var url = el.getAttribute('data-code');
        el.classList.add('clipboard-hover');
        el.innerHTML = tpl.replace('[[dataSrc]]', url);
        ['mousemove','touchmove','touchend'].forEach( function(evt) {
            if (window.evt) {
                document.captureEvents(evt.MOUSEMOVE);
            }
            el.addEventListener(evt, function(e) {
                var left = (window.evt) ? e.pageX : event.clientX - 80;
                var top = (window.evt) ? e.pageY : event.clientY - 60;
                this.querySelectorAll('.clipboard-tooltip')[0].style.left = left + 'px';
                this.querySelectorAll('.clipboard-tooltip')[0].style.top = top + 'px';
                this.querySelectorAll('.clipboard-tooltip')[0].style.position = 'fixed';
            });
        });
        if(el.querySelectorAll('code-clipboard-copy').length === 1) {
            el.querySelector('code-clipboard-copy').insertAdjacentHTML( 'beforeend', '<div>' + text + '</div>' );
        }
    });
}

/* image map template
   ========================================================================== */
/* function imageMap(tpl) {
    var elems = document.querySelectorAll('.clipboard-image-map');
    elems.forEach(function(el, i) {
        var code = tpl.replace('[[copyText]]', el.getAttribute('data-link'));
		
		var coords = el.getAttribute('data-map-coords');
		console.log('test', el.parentElement.offsetHeight);
		if (coords) {
			coords = coords.split(',');
			coords[2] = parseInt(coords[2]) - parseInt(coords[0]);
			coords[3] = parseInt(coords[3]) - parseInt(coords[1]);
		}

		code = code.replace('[[mapLeft]]', coords[0]+'px');
		code = code.replace('[[mapTop]]', coords[1]+'px');
        code = code.replace('[[mapWidth]]', coords[2]+'px');
        code = code.replace('[[mapHeight]]', coords[3]+'px');
        
        code = code.replace(/null/g, '');

        el.innerHTML = code;

        if(el.getAttribute('data-in') == '') {
            var inCell = el.querySelector('.clipboard-cell');
            inCell.parentNode.removeChild(inCell);
        }
        if(el.getAttribute('data-link')) {
            el.querySelector('.clipboard-hover').classList.add('with-link');
        }
    });
} */
   
/* helper functions
   ========================================================================== */

/* set multiple attributes
   ================================== */

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

/* responsive image swap
   ================================== */

function imgSwap(img) {
    swap(img);
    window.addEventListener('resize', function() {
        swap(img);
    }, false);
    function swap(img) {
        if (window.innerWidth < 600) {
            var src = img.getAttribute('data-src-swap'),
                ext = src.split('.').pop(),
                w = img.getAttribute('data-small').split(' ')[0],
                h = img.getAttribute('data-small').split(' ')[1];
            if (src.indexOf('_405') < 0) {
                img.setAttribute('data-src', src.replace('.' + ext, '_405.' + ext));
                img.setAttribute('width', w);
                img.setAttribute('height', h);
                if (img.getAttribute('src') !== null && img.getAttribute('src') !== '') {
                    img.setAttribute('src', src.replace('.' + ext, '_405.' + ext));
                }
            }
        } else {
            var src = img.getAttribute('data-src-swap'),
                w = img.getAttribute('data-big').split(' ')[0],
                h = img.getAttribute('data-big').split(' ')[1];
            img.setAttribute('data-src', src);
            img.setAttribute('width', w);
            img.setAttribute('height', h);
            if (img.getAttribute('src') !== null && img.getAttribute('src') !== '') {
                img.setAttribute('src', src);
            }
        }
    }
}

/* audio files
   ================================== */

function audio(output, file, delay, loop) {
    var img = output.querySelector('img'),
        audio = document.createElement('audio');
    if (delay && loop) {
        setAttributes(audio, { "data-src": file, "loop": "loop" });
    } else if (delay && !loop) {
        setAttributes(audio, { "data-src": file });
    } else if (!delay && loop) {
        setAttributes(audio, { "src": file, "loop": "loop" });
    } else {
        setAttributes(audio, { "src": file });
    }
    if (output.querySelector('audio') == null) {
        output.appendChild(audio);
    }
    output.addEventListener('click', function() {
        var el = this.querySelector('audio');
        el.classList.add('audio');
        if (el.paused) {
            el.play();
            this.classList.add('pause');
        } else {
            el.pause();
            this.classList.remove('pause');
        }
    });
}

/* video files
   ================================== */

function video(output, src, width, height, delay) {
    var video = document.createElement('video');
    if (delay) {
        setAttributes(video, { "class": "hide", "data-src": src, "width": width, "height": height, "type": "video/mp4", "loop": true });
    } else {
        setAttributes(video, { "class": "hide", "src": src, "width": width, "height": height, "type": "video/mp4", "loop": true });
    }
    var img = output.querySelector('img');
    if (img !== null) {
        output.appendChild(video);
    }
    output.addEventListener('click', function() {
        var el = this.querySelector('video');
        el.classList.remove('hide');
        this.querySelector('img').classList.add('hide');
        if (el.paused) {
            el.play();
            this.classList.add('pause');
        } else {
            el.pause();
            this.classList.remove('pause');
        }
    });
}

/* create clipboard elements
   ========================================================================== */

function createClipboard(hoverElems, copyElems, text) {
    hoverElems.forEach(function(el, i) {
        if(el.querySelector('.clipboard-tooltip') && !el.classList.contains('clipboard-link')) {
            el.querySelector('.clipboard-tooltip .text').textContent = text.copy;
        } else {
            el.querySelector('.clipboard-tooltip .text').textContent = text.link;
        }
    });
    copyElems.forEach(function(el, i) {
        // add id and close button
        ['mouseup','touchend'].forEach(function(evt){
            el.parentNode.querySelector('.clipboard-close').addEventListener(evt, function(e) {
                var parent = e.parentNode;
                e.stopPropagation();
                parent.querySelector('.clipboard-copy, .clipboard-close').classList.remove('show-code').style.display = 'none';
                parent.querySelector('.clipboard-tooltip').classList.remove('copied').style.opacity = 0;
                parent.querySelector('.clipboard-tooltip .text').textContent = text.copy;
                parent.querySelector('.clipboard-icon').classList.remove('copied').opacity = 0;
            });
        });
    });
}

/* create clipboard events
   ========================================================================== */

function createEvents(inputElems, hoverElems) {
    ['mouseenter', 'touchstart'].forEach(function(e) {
        // populate code field with file data if data-code present
        inputElems.forEach(function(el, i) {
            var codeField = function() {
                var input = this;
                if (input.hasAttribute('data-code')) {
                    var dataCode = input.getAttribute('data-code');
                    if (input.querySelector('.clipboard-copy').textContent.trim() == '') {
                        __copyToClipboard.ajax(dataCode, populateCodeField);
                        function populateCodeField(data) {
                            input.querySelector('code').textContent = data;
                        }
                    }
                }
            };
            el.addEventListener(e, codeField, false);
        });
        // tooltip positioning relative to window
        hoverElems.forEach(function(el, i) {
            var positionTooltip = function() {
                if (window.scrollTop + 100 > el.offsetTop) {
                    // below element
                    el.querySelector('.clipboard-tooltip').classList.add('bottom');
                } else {
                    // above element
                    el.querySelector('.clipboard-tooltip').classList.remove('bottom');
                }
            };
            el.addEventListener(e, positionTooltip, false);
            el.addEventListener('mouseenter', function(e){
                this.querySelector('.clipboard-tooltip').classList.add('show');
            });
            el.addEventListener('touchend', function(e){
                var element = this;
                setTimeout(function(){
                    element.querySelector('.clipboard-tooltip').classList.add('show');
                }, 300);
            });
        });
    });
}

function hideTooltip(hoverElems, text) {
    // hide tooltip when not hovering over input
    hoverElems.forEach(function(el, i) {
        var hideTooltip = function() {
            el.querySelector('.clipboard-tooltip').classList.remove('bottom');
            el.querySelector('.clipboard-tooltip').classList.remove('show');
            el.querySelector('.clipboard-tooltip').classList.remove('copied');
        }
        var showTooltip = function() {
            if(!el.classList.contains('clipboard-link')) {
                el.querySelector('.clipboard-tooltip .text').textContent = text.copy;
            } else {
                el.querySelector('.clipboard-tooltip .text').textContent = text.link;
            }
        }
        el.addEventListener('mouseleave', hideTooltip, false);
        el.addEventListener('mouseenter', showTooltip, false);
        el.querySelector('.clipboard-tooltip').addEventListener('mouseenter', hideTooltip, false);
    });
}
/* create click events
   ========================================================================== */
function createClickEvents(hoverElems, text) {
    hoverElems.forEach(function(el, i) {
        // copy action
        var copy = function() {     
            var target = el.querySelector('.clipboard-copy'),
                doc = window.document,
                range;
            if(el.classList.contains('clipboard-link')) {
                target = el.querySelector('code');
            }
            // select code
            if (window.getSelection && doc.createRange) {
                var selection = window.getSelection();
                selection.removeAllRanges();
                range = doc.createRange();
                range.selectNodeContents(target);
                selection.addRange(range);
            } else if (doc.body.createTextRange) {
                range = doc.body.createTextRange();
                range.moveToElementText(target);
                range.select();
            }
            // copy code
            if (document.queryCommandSupported('copy')) {
                var success = document.execCommand('copy');
                var tooltip = el.querySelector('.clipboard-tooltip');
                if (success) {
                    // mark as copied
                    tooltip.classList.add('copied');
                    tooltip.querySelector('.text').textContent = text.copied;
                } else {
                    setTimeout(function(){
                        // mark as not copied
                        tooltip.querySelector('.text').textContent = text.unable;
                        copy();
                    }, 300);
                }
            } else {
                // show code and let user copy it manually; for safari ಠ_ಠ
                el.querySelector('.clipboard-tooltip').classList.remove('copied');
                tooltip.querySelector('.text').textContent = text.copy;
                tooltip.classList.remove('show');
                el.querySelector('.clipboard-copy').classList.add('show', 'show-code');
                el.querySelector('.clipboard-close').classList.add('show');
            }
        };
        var codeCopy = function(event) {
            var tooltip = el.querySelector('.clipboard-tooltip');
            tooltip.classList.add('copied');
            tooltip.querySelector('.text').textContent = text.copied;
        }
        if(el.querySelector('code-clipboard-copy')) {
            el.addEventListener('mouseup', codeCopy);
        } else {
            el.addEventListener('mouseup', copy, false);
            el.addEventListener('touchend', copy, false);
        }
    });
}