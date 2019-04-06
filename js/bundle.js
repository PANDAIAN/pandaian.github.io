!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var c=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,s=0,l=c.length;s<l;s++)a[c[s]]=i(a[c[s]],a);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),c=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n},t.prototype.onTouchMove=function(t){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,c,a,s,l,u=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,c=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(l=t.changedTouches[0],u=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||u,u.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=u.tagName.toLowerCase(),"label"===a){if(e=this.findControl(u)){if(this.focus(u),n)return!1;u=e}}else if(this.needsFocus(u))return t.timeStamp-c>100||o&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(u),this.sendClick(u,t),o&&"select"===a||(this.targetElement=null,t.preventDefault()),!1);return!(!o||i||(s=u.fastClickScrollParent,!s||s.fastClickLastScrollTop===s.scrollTop))||(this.needsClick(u)||(t.preventDefault(),this.sendClick(u,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return!this.targetElement||(!!t.forwardedTouchEvent||(!t.cancelable||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))))},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(e.content.indexOf("user-scalable=no")!==-1)return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(c&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(e.content.indexOf("user-scalable=no")!==-1)return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction||(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],!!(r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(e.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth)))||("none"===t.style.touchAction||"manipulation"===t.style.touchAction))},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}(),function t(e,n,o){function i(c,a){if(!n[c]){if(!e[c]){var s="function"==typeof require&&require;if(!a&&s)return s(c,!0);if(r)return r(c,!0);var l=new Error("Cannot find module '"+c+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[c]={exports:{}};e[c][0].call(u.exports,function(t){var n=e[c][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[c].exports}for(var r="function"==typeof require&&require,c=0;c<o.length;c++)i(o[c]);return i}({1:[function(t,e,n){"use strict";e.exports=function(t){var e=t.getBoundingClientRect(),n=document.body,o=document.documentElement,i=window.pageYOffset||o.scrollTop||n.scrollTop,r=window.pageXOffset||o.scrollLeft||n.scrollLeft,c=o.clientTop||n.clientTop||0,a=o.clientLeft||n.clientLeft||0,s=e.top+i-c,l=e.left+r-a;return{top:Math.round(s),left:Math.round(l)}}},{}],2:[function(t,e,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},i=t("./scroll-spy");!function(t){"function"==typeof define&&define.amd?define([],t):"object"===("undefined"==typeof window?"undefined":o(window))&&(window.scrollSpy=t())}(function(){return i})},{"./scroll-spy":3}],3:[function(t,e,n){"use strict";function o(t){for(var e=[],n=0,o=t.length;n<o;n++){var i=decodeURI(t[n].hash.replace(/^#/,"")),c=document.getElementById(i),a=r(c),s=window.getComputedStyle(document.getElementById(i)).height;e[n]={height:parseInt(s),top:a.top,elem:t[n]}}return e}function i(t,e){for(var n=0,o=0,i=t.length;o<i;o++)if(a.scrollTop<t[o].top-t[o].height/3){n=o;break}for(var r=0,s=t.length;r<s;r++)c.removeClass(t[r].elem,e);n>0&&c.addClass(t[n-1].elem,e)}var r=t("./getOffsetRect"),c=t("./util"),a=document.body;e.exports={init:function(t){var e=t.activeClassName||"active",n=t.scrollTarget||document,r=Array.prototype.slice.call(t.nodeList),a=o(r);i(a,e),c.bind(n,"scroll",function(){i(a,e)})}}},{"./getOffsetRect":1,"./util":4}],4:[function(t,e,n){"use strict";e.exports={bind:function(t,e,n){t.addEventListener(e,n,!1)},addClass:function(t,e){var n=t.className.split(" ");return n.indexOf(e)<0&&n.push(e),t.className=n.join(" "),t},removeClass:function(t,e){var n=t.className.split(" "),o=n.indexOf(e);return o>-1&&n.splice(o,1),t.className=n.join(" "),t}}},{}]},{},[2]),function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():t.zenscroll=e()}(this,function(){"use strict";var t=function(t,e,n){e=e||500,n&&0===n||(n=9);var o,i=document.documentElement,r=function(){return"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t?t:document.body)["scroll-behavior"]},c=function(){return t?t.scrollTop:window.scrollY||i.scrollTop},a=function(){return t?Math.min(t.offsetHeight,window.innerHeight):window.innerHeight||i.clientHeight},s=function(e){return t?e.offsetTop-t.offsetTop:e.getBoundingClientRect().top+c()-i.offsetTop},l=function(){clearTimeout(o),o=0},u=function(n,s){if(l(),r())(t||window).scrollTo(0,n);else{var u=c(),d=Math.max(n,0)-u;s=s||Math.min(Math.abs(d),e);var f=(new Date).getTime();!function h(){o=setTimeout(function(){var e=Math.min(((new Date).getTime()-f)/s,1),n=Math.max(Math.floor(u+d*(e<.5?2*e*e:e*(4-2*e)-1)),0);t?t.scrollTop=n:window.scrollTo(0,n),e<1&&a()+n<(t||i).scrollHeight?h():setTimeout(l,99)},5)}()}},d=function(t,e){u(s(t)-n,e)},f=function(t,e){var o=t.getBoundingClientRect().height+2*n,i=a(),r=s(t),l=r+o,f=c();r-f<n||o>i?d(t,e):f+i-l<n&&u(l-i,e)},h=function(t,e,n){u(Math.max(s(t)-a()/2+(n||t.getBoundingClientRect().height/2),0),e)},m=function(t,o){t&&(e=t),(0===o||o)&&(n=o)};return{setup:m,to:d,toY:u,intoView:f,center:h,stop:l,moving:function(){return!!o}}},e=t();if("addEventListener"in window&&"smooth"!==document.body.style.scrollBehavior&&!window.noZensmooth){var n=function(t){try{history.replaceState({},"",window.location.href.split("#")[0]+t)}catch(e){}};window.addEventListener("click",function(t){for(var o=t.target;o&&"A"!==o.tagName;)o=o.parentNode;if(!(!o||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){var i=o.getAttribute("href")||"";if(0===i.indexOf("#"))if("#"===i)t.preventDefault(),e.toY(0),n("");else{var r=o.hash.substring(1),c=document.getElementById(r);c&&(t.preventDefault(),e.to(c),n("#"+r))}}},!1)}return{createScroller:t,setup:e.setup,to:e.to,toY:e.toY,intoView:e.intoView,center:e.center,stop:e.stop,moving:e.moving}});var Util={bind:function(t,e,n){t.addEventListener(e,n,!1)},addClass:function(t,e){var n=t.className?t.className.split(" "):[];return n.indexOf(e)<0&&n.push(e),t.className=n.join(" "),t},removeClass:function(t,e){var n=t.className?t.className.split(" "):[],o=n.indexOf(e);return o>-1&&n.splice(o,1),t.className=n.join(" "),t},request:function(t,e,n,o){var i=new XMLHttpRequest;"function"==typeof n&&(o=n,n=null),i.open(t,e);var r=new FormData;if("POST"===t&&n)for(var c in n)r.append(c,JSON.stringify(n[c]));i.onload=function(){o(JSON.parse(i.response))},i.send(n?r:null)}};!function(){"use strict";function t(t,e){var n=[];return t.forEach(function(t){var o=!1,i=[];t.content=t.content.replace(/<[^>]*>/g,""),e.forEach(function(e){var n=new RegExp(e,"i"),r=t.title.search(n),c=t.content.search(n);(r>-1||c>-1)&&(o=!0,i.push(e))}),o&&(t.matchKeyWords=i,n.push(t))}),n}function e(t){var e="";return t.forEach(function(t){var i;i=o(t.content,t.matchKeyWords),i=n(i,t.matchKeyWords),t.title=o(t.title,t.matchKeyWords),t='<li class="item"><a href="'+t.url+'"" target="_blank"><h3 class="title">'+t.title+'</h3></a><p class="post-content">'+i+"</h3></li>",e+=t}),e}function n(t,e){var n=!1,o=0;return e.forEach(function(e){var i=new RegExp(e,"i");o=t.search(i),o<0||(n=!0)}),t=n?o<120?t.substr(0,140):t.substr(o-60,200):t.substr(0,120)}function o(t,e){return t=t.replace(/<[^>]*>/g,""),e.forEach(function(e){var n=new RegExp("("+e+")","ig");t=t.replace(n,'<span class="color-hightlight">$1</span>')}),t}function i(){Util.addClass(f,"hide-dialog"),Util.removeClass(f,"show-dialog"),Util.addClass(u,"hide"),Util.removeClass(u,"show")}var r=document.documentElement,c=document.body,a=document.getElementById("toc"),s=document.getElementById("backTop"),l=document.getElementById("toolbox-mobile"),u=document.getElementById("cover"),d=document.getElementById("close"),f=document.getElementById("modal-dialog"),h=0;if(function(){if(s&&(h=c.scrollTop||r.scrollTop,h>10?Util.addClass(s,"show"):Util.removeClass(s,"show")),a){var t=parseInt(window.getComputedStyle(a).height,10),e=document.documentElement.clientHeight;if(t+20>e)return;h=c.scrollTop||r.scrollTop,h>180?Util.addClass(a,"fixed"):Util.removeClass(a,"fixed")}}(),document.addEventListener("DOMContentLoaded",function(){FastClick.attach(document.body)},!1),window.noZensmooth=!0,scrollSpy.init({nodeList:document.querySelectorAll(".toc-link"),scrollTarget:window}),Util.bind(window,"scroll",function(){if(h=c.scrollTop||r.scrollTop,a){var t=parseInt(window.getComputedStyle(a).height,10),e=document.documentElement.clientHeight;if(t+20>e)return;h>180?Util.addClass(a,"fixed"):Util.removeClass(a,"fixed")}s&&(h>10?Util.addClass(s,"show"):Util.removeClass(s,"show"))}),s&&Util.bind(s,"click",function(){zenscroll.to(c)}),a){var a=document.getElementById("toc"),m=document.querySelectorAll(".toc-link"),p=Array.prototype.slice.call(m);p.forEach(function(t){Util.bind(t,"click",function(t){var e=document.getElementById(this.hash.substring(1));zenscroll.to(e),t.preventDefault()})})}l&&(Util.bind(l,"click",function(){Util.addClass(f,"show-dialog"),Util.removeClass(f,"hide-dialog"),Util.addClass(u,"show"),Util.removeClass(u,"hide")}),Util.bind(u,"click",i),Util.bind(d,"click",i)),"/search/"===location.pathname&&Util.request("GET","/search.json",function(n){var o=document.getElementById("input-search");Util.bind(o,"keyup",function(){var o=this.value.trim().toLowerCase().split(/[\s\-]+/);if(!(this.value.trim().length<=0)){var i=t(n,o),r=document.getElementById("list-search");r.innerHTML=e(i)}})})}();function playBody(){if(document.getElementById("donation-body").style.display=="none"){document.getElementById("donation-body").style.display="inline-block";document.getElementById("btn-donation").innerHTML="Close it";}else{document.getElementById("donation-body").style.display="none";document.getElementById("btn-donation").innerHTML="SUPPORT";}}