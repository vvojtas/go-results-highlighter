!function e(t,r,n){function i(o,a){if(!r[o]){if(!t[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(s)return s(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var g=r[o]={exports:{}};t[o][0].call(g.exports,function(e){var r=t[o][1][e];return i(r?r:e)},g,g.exports,e,t,r,n)}return r[o].exports}for(var s="function"==typeof require&&require,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,r){var n=(0,a.asArray)(document.querySelectorAll(e)).filter(function(e){if(r)return!0;if("TABLE"===e.nodeName){for(var t=(0,a.asArray)(e.querySelectorAll("td")),n=t.length,i=0;i<n;i++)if(l.test(t[i].textContent))return!0;return!1}var s=e.textContent.match(u);return s&&s.length>6});if(!n.length){var s=void 0;return s=r?prompt('Could not find any elements matching "'+e+'" selector. Do you want to provide another one?'):prompt('Could not find any tables with Go results ("'+e+'"). If you are confident that this page has one - please provide a specific selector to the element.'),void(s?i(s,t,!0):console.log("Could not find any elements with Go results."))}var g=0,c=0;n.forEach(function(e){return e.goResultsHighlighter?void(c+=1):(new o["default"](e,t),void(g+=1))}),console.log("Go Results Highlighter was applied to "+g+" DOM elements. "+c+" had Highlighter before.")}var s=e("./lib/wrapper"),o=n(s),a=e("./lib/utils");e("./styles/bookmark.less");var l=/^[^0-9]*([0-9]+[-+?])[^0-9]*$/,u=/[0-9]+[-+?]/g;location.hostname.indexOf("europeangodatabase")!==-1?i("#tab_wallist",{placeColumn:1}):i("table, pre")},{"./lib/utils":6,"./lib/wrapper":7,"./styles/bookmark.less":8}],2:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){var r=e.getBoundingClientRect().top-t;Math.abs(r)>10&&window.scrollBy(0,r)}function o(e){for(var t={player:null,games:null,target:null};e&&e!==document;){var r=e.getAttribute(g.DOM_ATTRIBUTES.OPPONENT_PLACEMENT),n=e.getAttribute(g.DOM_ATTRIBUTES.PLAYER_PLACEMENT);if(r&&(t.games=Number(r)),n){t.player=Number(n);break}e=e.parentNode}return t.target=e,t}function a(e){e.filter(function(e){return e.row.properNextSibling}).reverse().forEach(function(e){e.row.properNextSibling===-1?e.row.parentNode.appendChild(e.row):e.row.parentNode.insertBefore(e.row,e.row.properNextSibling),e.row.properNextSibling=null})}function l(e,t){var r=e.row.parentNode,n=e.row.nextElementSibling;t.forEach(function(t){t.row.properNextSibling=t.row.nextElementSibling||-1,t.tournamentPlace<e.tournamentPlace?r.insertBefore(t.row,e.row):(r.insertBefore(t.row,n),n=t.row.nextElementSibling)})}Object.defineProperty(r,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),g=e("./settings"),c=e("./parser"),f=n(c),p=e("./raw2table"),h=n(p),d=e("./utils"),m=function(){function e(t,r){if(i(this,e),this.settings=(0,d.defaults)(g.DEFAULT_SETTINGS,(0,g.readTableSettingsFromDOM)(t),r),t instanceof HTMLPreElement){var n=(0,h["default"])(t.innerHTML,r),s=t.parentNode;s.insertBefore(n,t),s.removeChild(t),this.element=n}else this.element=t;this.element.classList&&(this.createPlayersMap(),this.bindEvents(),this.element.classList.add(this.settings.prefixCls+this.settings.tableCls),this.current=null,this.games=[],this.isRearranged=!1,this.isHighlighting=!1)}return u(e,[{key:"createPlayersMap",value:function(){this.map=(0,f["default"])(this.element,this.settings),this.players=[];for(var e in this.map)this.map.hasOwnProperty(e)&&this.players.push(this.map[e])}},{key:"highlight",value:function(e){var t=this;e||(e={});var r=e.player,n=e.rearrange===!0,i=e.games,s=this.map[r],o=(0,g.toPrefixedClasses)(this.settings);this.isRearranged&&a(this.players),s&&n?(l(s,s.opponents.map(function(e){return t.map[e]})),this.element.classList.add(o.rearrangedCls),this.isRearranged=!0):(this.element.classList.remove(o.rearrangedCls),this.isRearranged=!1);var u=(0,d.asArray)(this.element.querySelectorAll("."+o.gameCls)),c=this.element.querySelector("."+o.currentCls),f=c?c.getAttribute(g.DOM_ATTRIBUTES.PLAYER_PLACEMENT):null,p=f?this.map[f]:null,h=function(e,r){var n=r?"add":"remove";e.row.classList[n](o.currentCls),e.opponents.forEach(function(r){var i=t.map[r];i.row.classList[n](t.settings.prefixCls+e.games[r].cls)})};u.forEach(function(e){e.classList.remove(o.gameCls)}),p&&p!==s&&h(p,!1),s&&s!==p&&h(s,!0),this.games.length=0,s?("number"==typeof i&&(i=[i]),i&&"number"==typeof i.length?i.forEach(function(e){var n=t.map[e],i=s.games[e];n&&i&&(i.cell.classList.add(o.gameCls),n.games[r].cell.classList.add(o.gameCls),t.games.push(e))}):this.isRearranged&&s.opponents.forEach(function(e){t.map[e].games[r].cell.classList.add(o.gameCls),t.games.push(e)}),this.current=r,this.isHighlighting=!0):(this.current=null,this.isHighlighting=!1)}},{key:"configure",value:function(e){this.highlight(null),this.element.classList.remove(this.settings.prefixCls+this.settings.tableCls),this.settings=(0,d.defaults)(this.settings,e),this.createPlayersMap(),this.element.classList.add(this.settings.prefixCls+this.settings.tableCls)}},{key:"bindEvents",value:function(){var e=this,t=!1;this.element.addEventListener("touchstart",function(){t=!1}),this.element.addEventListener("touchmove",function(){t=!0}),this.element.addEventListener("touchend",function(r){if(!(t||e.settings.rearranging===!1&&e.settings.hovering===!1)){var n=o(r.target),i=n.target,a=n.player,l=n.games;if(a){var u=!1,g=void 0;e.current===a?(e.settings.rearranging&&e.settings.hovering||(a=null),u=!e.isRearranged):!e.isRearranged&&e.settings.hovering||(u=!0),u&&(g=i.getBoundingClientRect().top),e.highlight({player:a,games:l,rearrange:u}),g&&s(i,g),r.preventDefault()}}}),this.element.addEventListener("click",function(t){if(e.settings.rearranging!==!1){var r=o(t.target),n=r.target,i=r.player,a=r.games,l=!1,u=void 0;i&&(!e.isRearranged||n.properNextSibling?l=!0:e.settings.hovering||(i=null),l&&(u=n.getBoundingClientRect().top),e.highlight({player:i,games:a,rearrange:l}),u&&s(n,u))}}),this.element.addEventListener("mouseover",function(t){if(e.settings.hovering!==!1){var r=o(t.target),n=r.player,i=r.games,s=e.isRearranged;if(n){if(e.isRearranged){if((!i||n!==e.current)&&e.games.length===e.map[e.current].opponents.length)return;n!==e.current&&(n=e.current,i=null)}e.highlight({player:n,rearrange:s,games:i})}}},!1),this.element.addEventListener("mouseout",function(t){if(e.settings.hovering!==!1){for(var r=t.relatedTarget;r&&r!==document&&r!==e.element;)r=r.parentNode;r!==e.element&&(e.isRearranged&&e.games.length!==e.map[e.current].opponents.length?e.highlight({player:e.current,rearrange:!0}):e.isRearranged||e.highlight(null))}},!1)}}]),e}();r["default"]=m,m.DEFAULT_SETTINGS=g.DEFAULT_SETTINGS},{"./parser":3,"./raw2table":4,"./settings":5,"./utils":6}],3:[function(e,t,r){"use strict";function n(e,t){e.setAttribute(o.DOM_ATTRIBUTES.PLAYER_PLACEMENT,t)}function i(e,t){function r(e,t){"string"==typeof i.roundsColumns&&(t=i.roundsColumns.split(",").map(function(e){return t[Number(e)]})),t.forEach(function(t){var r=void 0,n=void 0;if(t.hasAttribute(o.DOM_ATTRIBUTES.GAME_RESULT)&&t.hasAttribute(o.DOM_ATTRIBUTES.OPPONENT_PLACEMENT))r=Number(t.getAttribute(o.DOM_ATTRIBUTES.OPPONENT_PLACEMENT)),n=t.getAttribute(o.DOM_ATTRIBUTES.GAME_RESULT);else{for(var i=0;i<u;i++){var s=t.textContent.match(l[i].regexp);s&&(r=Number(s[1]),n=l[i].cls,t.setAttribute(o.DOM_ATTRIBUTES.OPPONENT_PLACEMENT,r),t.setAttribute(o.DOM_ATTRIBUTES.GAME_RESULT,l[i].cls))}if(!r)return}e.games[r]={cell:t,cls:n},e.opponents.push(r)})}var i=(0,s.defaults)(o.DEFAULT_SETTINGS,t),a=(0,s.asArray)(e.querySelectorAll(i.rowTags)),l=(0,o.toResultsWithRegExp)(i.results),u=l.length,g={},c=void 0,f=void 0;return a.forEach(function(e,t){if(!(t<i.startingRow)){var a=(0,s.asArray)(e.querySelectorAll(i.cellTags)),l=-1;if(!a.length||!a[i.placeColumn])return void n(e,l);var u=parseInt(a[i.placeColumn].textContent,10),p={tournamentPlace:-1,row:e,games:{},opponents:[]};if(e.hasAttribute(o.DOM_ATTRIBUTES.PLAYER_PLACEMENT))l=Number(e.getAttribute(o.DOM_ATTRIBUTES.PLAYER_PLACEMENT));else{if(f)l=f+1;else{if(isNaN(u))return void n(e,l);l=u||1}u?u<=c&&(u=c):u=c?c:1,n(e,l)}l!=-1&&(r(p,a),p.tournamentPlace=u,p.opponents.sort(function(e,t){return e>t?1:-1}),g[l]=p,c=u,f=l)}}),g}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=i;var s=e("./utils"),o=e("./settings")},{"./settings":5,"./utils":6}],4:[function(e,t,r){"use strict";function n(e,t){var r=document.createElement("table");if(!e)return r;var n=(0,s.defaults)(i.DEFAULT_SETTINGS,t),o=e.replace(/<br[^>]*>/gi,"\n").replace(/<\/?code[^>]*>/gi,"").split(/\r\n|\n/);if(o.length<=2&&!o[0]&&!o[1])return r;var a=(0,i.toResultsWithRegExp)(n.results),l=a.length,u=o.map(function(e){return e.replace(/([0-9]+)\s(dan|kyu)/i,"$1_$2").split(new RegExp(n.cellSeparator)).filter(function(e){return e.length>0})}).filter(function(e){return e.length>0&&0!==e[0].indexOf(";")}),g=u.reduce(function(e,t){return Math.max(e,t.length)},0),c=n.joinNames?-1:0,f=n.placeColumn+1,p=null;"string"==typeof n.roundsColumns&&(p=n.roundsColumns.split(",").map(Number));var h=void 0;return u.forEach(function(e,t){var s=document.createElement("tr"),o=e.length;if(o){if(t<n.startingRow||o<g+c){var u=document.createElement("td");u.setAttribute("colspan",g+c),u.textContent=e.join(" "),s.setAttribute(i.DOM_ATTRIBUTES.PLAYER_PLACEMENT,-1),s.appendChild(u)}else{var d=parseInt(e[n.placeColumn],10);isNaN(d)&&!h?e.forEach(function(e){var t=document.createElement("td");t.textContent=e,s.setAttribute(i.DOM_ATTRIBUTES.PLAYER_PLACEMENT,-1),s.appendChild(t)}):!function(){s.setAttribute(i.DOM_ATTRIBUTES.PLAYER_PLACEMENT,h||d);var t=[];n.joinNames&&e.splice(f,2,e[f]+"  "+e[f+1]),e.forEach(function(e,r){var n=document.createElement("td");if(n.textContent=e.replace(/_/," "),!p||p.indexOf(r)>=0)for(var o=0;o<l;o++){var u=e.match(a[o].regexp);if(u){var g=u[1];t.push(g),n.setAttribute(i.DOM_ATTRIBUTES.OPPONENT_PLACEMENT,g),n.setAttribute(i.DOM_ATTRIBUTES.GAME_RESULT,a[o].cls)}}s.appendChild(n)}),t.length&&s.setAttribute(i.DOM_ATTRIBUTES.OPPONENTS,t.join(",")),h?h+=1:h=2}()}r.appendChild(s)}}),r.setAttribute(i.DOM_ATTRIBUTES.RESULT_TABLE,""),r}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=n;var i=e("./settings"),s=e("./utils")},{"./settings":5,"./utils":6}],5:[function(e,t,r){"use strict";function n(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push({cls:r,regexp:new RegExp(e[r])});return t}function i(e){var t={};return o.forEach(function(r){t[r]=e.prefixCls+e[r]}),t}function s(e){var t={};return e.hasAttribute(a.SETTING_PLACE_COLUMN)&&(t.placeColumn=Number(e.getAttribute(a.SETTING_PLACE_COLUMN))),e.hasAttribute(a.SETTING_STARTING_ROW)&&(t.startingRow=Number(e.getAttribute(a.SETTING_STARTING_ROW))),e.hasAttribute(a.SETTING_ROUNDS_COLUMNS)&&(t.roundsColumns=e.getAttribute(a.SETTING_ROUNDS_COLUMNS)),e.hasAttribute(a.SETTING_REARRANGING)&&(t.rearranging="false"!==e.getAttribute(a.SETTING_REARRANGING)),e.hasAttribute(a.SETTING_HOVERING)&&(t.hovering="false"!==e.getAttribute(a.SETTING_HOVERING)),t}Object.defineProperty(r,"__esModule",{value:!0}),r.toResultsWithRegExp=n,r.toPrefixedClasses=i,r.readTableSettingsFromDOM=s;var o=(r.DEFAULT_SETTINGS={prefixCls:"go-results-",rearrangedCls:"rearranged",tableCls:"table",gameCls:"game",currentCls:"current",results:{won:"([0-9]+)\\+",lost:"([0-9]+)\\-",jigo:"([0-9]+)=",unresolved:"([0-9]+)\\?"},startingRow:0,placeColumn:0,roundsColumns:null,rowTags:"tr",cellTags:"td,th",cellSeparator:"[\t ]+",joinNames:!0,hovering:!0,rearranging:!0},["rearrangedCls","tableCls","gameCls","currentCls"]),a=r.DOM_ATTRIBUTES={RESULT_TABLE:"data-go-results",SETTING_STARTING_ROW:"data-go-starting-row",SETTING_PLACE_COLUMN:"data-go-place-column",SETTING_ROUNDS_COLUMNS:"data-go-rounds-columns",SETTING_REARRANGING:"data-go-rearranging",SETTING_HOVERING:"data-go-hovering",PLAYER_PLACEMENT:"data-go-place",OPPONENT_PLACEMENT:"data-go-opponent",OPPONENTS:"data-go-opponents",GAME_RESULT:"data-go-result"}},{}],6:[function(e,t,r){"use strict";function n(e){return Array.prototype.slice.call(e)}function i(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var i=r.filter(function(e){return"object"===("undefined"==typeof e?"undefined":o(e))}).reverse(),s=i.length,a={};e:for(var l in e){for(var u=0;u<s;u++)if(i[u].hasOwnProperty(l)){a[l]=i[u][l];continue e}a[l]=e[l]}return a}function s(){for(var e={},t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return r.forEach(function(t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}),e}Object.defineProperty(r,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};r.asArray=n,r.defaults=i,r.combine=s},{}],7:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(this instanceof i))return new i(e,t);var r=new l["default"](e,t);this.highlight=function(e,t,n){"object"===("undefined"==typeof e?"undefined":o(e))?r.highlight(e):("boolean"==typeof t&&(n=t,t=null),r.highlight({player:e,rearrange:n,games:t}))},this.configure=function(e){r.configure(e)},this.opponents=function(e){var t=r.map[e];return t?t.opponents.slice():[]},Object.defineProperties(this,{element:s(function(){return r.element}),isHighlighting:s(function(){return r.isHighlighting}),isRearranged:s(function(){return r.isRearranged}),player:s(function(){return r.current||null}),players:s(function(){return r.players.length}),games:s(function(){return r.games}),configuration:s(function(){var e=r.settings.results,t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return{startingRow:r.settings.startingRow,placeColumn:r.settings.placeColumn,roundsColumns:r.settings.roundsColumns,prefixCls:r.settings.prefixCls,rearrangedCls:r.settings.rearrangedCls,tableCls:r.settings.tableCls,gameCls:r.settings.gameCls,currentCls:r.settings.currentCls,rowTags:r.settings.rowTags,cellTags:r.settings.cellTags,cellSeparator:r.settings.cellSeparator,joinNames:r.settings.joinNames,results:t}}),rearranging:{set:function(e){!e&&r.isRearranged&&r.highlight(null),r.settings.rearranging=!!e},get:function(){return r.settings.rearranging},configurable:!1,enumerable:!0},hovering:{set:function(e){return r.settings.hovering=!!e},get:function(){return r.settings.hovering},configurable:!1,enumerable:!0}}),r.element.goResultsHighlighter=this}function s(e){return{get:e,enumerable:!0,configurable:!1}}Object.defineProperty(r,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},a=e("./highlighter"),l=n(a);r["default"]=i},{"./highlighter":2}],8:[function(e,t,r){!function(){var e=document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css";var r=".go-results-rearranged{color:#dddddd !important;cursor:pointer !important}.go-results-current{background-color:#d2d2d2 !important;color:#000000 !important;cursor:pointer !important}.go-results-current .go-results-game{background-color:#a7a7a7 !important}.go-results-won{background-color:#799B29 !important;color:#000000 !important}.go-results-won .go-results-game{background-color:#5A6A2C !important;color:#ffffff !important}.go-results-lost{background-color:#D97962 !important;color:#000000 !important}.go-results-lost .go-results-game{background-color:#A5422B !important;color:#ffffff !important}.go-results-jigo{background-color:#D7C3D1 !important;color:#000000 !important}.go-results-jigo .go-results-game{background-color:#9E7593 !important}.go-results-unresolved{background-color:#CBDCE5 !important;color:#000000 !important}.go-results-unresolved .go-results-game{background-color:#7D9CAD !important}";t.styleSheet?t.styleSheet.cssText=r:t.appendChild(document.createTextNode(r)),e.appendChild(t)}()},{}]},{},[1]);