"use strict";
exports.__esModule = true;
exports.kebabCase = exports.highlight = exports.isValueInArrayOfObjects = exports.debounce = exports.putContent = exports.ensureElementInView = exports.hasClassInTree = void 0;
function hasClassInTree(element, className) {
    function hasClass(e, c) {
        if (!(!c || !e || !e.classList || !e.classList.contains(c))) {
            return e;
        }
        return null;
    }
    function parentByClass(e, c) {
        if (!e || e === document) {
            return null;
        }
        else if (hasClass(e, c)) {
            return e;
        }
        else {
            return parentByClass(e.parentNode, c);
        }
    }
    return hasClass(element, className) || parentByClass(element, className);
}
exports.hasClassInTree = hasClassInTree;
function ensureElementInView(container, element) {
    var cTop = container.scrollTop + container.offsetTop;
    var cBottom = cTop + container.clientHeight;
    var eTop = element.offsetTop;
    var eBottom = eTop + element.clientHeight;
    if (eTop < cTop) {
        container.scrollTop -= (cTop - eTop);
    }
    else if (eBottom > cBottom) {
        container.scrollTop += (eBottom - cBottom);
    }
}
exports.ensureElementInView = ensureElementInView;
function putContent(el, currentPosition, isOpen) {
    var height = el.offsetHeight;
    var rect = el.getBoundingClientRect();
    var elemTop = (isOpen ? rect.top : rect.top - height);
    var elemBottom = (isOpen ? rect.bottom : rect.bottom + height);
    if (elemTop <= 0) {
        return 'below';
    }
    if (elemBottom >= window.innerHeight) {
        return 'above';
    }
    return (isOpen ? currentPosition : 'below');
}
exports.putContent = putContent;
function debounce(func, wait, immediate) {
    if (wait === void 0) { wait = 100; }
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = self;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
exports.debounce = debounce;
function isValueInArrayOfObjects(selected, key, value) {
    if (!Array.isArray(selected)) {
        return selected[key] === value;
    }
    for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
        var s = selected_1[_i];
        if (s && s[key] && s[key] === value) {
            return true;
        }
    }
    return false;
}
exports.isValueInArrayOfObjects = isValueInArrayOfObjects;
function highlight(str, search, className) {
    var completedString = str;
    var regex = new RegExp('(' + search.trim() + ')(?![^<]*>[^<>]*</)', 'i');
    if (!str.match(regex)) {
        return str;
    }
    var matchStartPosition = str.match(regex).index;
    var matchEndPosition = matchStartPosition + str.match(regex)[0].toString().length;
    var originalTextFoundByRegex = str.substring(matchStartPosition, matchEndPosition);
    completedString = completedString.replace(regex, "<mark class=\"" + className + "\">" + originalTextFoundByRegex + "</mark>");
    return completedString;
}
exports.highlight = highlight;
function kebabCase(str) {
    var result = str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, function (match) { return '-' + match.toLowerCase(); });
    return (str[0] === str[0].toUpperCase())
        ? result.substring(1)
        : result;
}
exports.kebabCase = kebabCase;
(function () {
    var w = window;
    if (typeof w.CustomEvent === 'function') {
        return;
    }
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = w.Event.prototype;
    w.CustomEvent = CustomEvent;
})();
