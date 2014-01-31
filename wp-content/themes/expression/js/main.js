// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);

/*
 * jQuery Tools 1.2.4 - The missing UI library for the Web
 * 
 * [tabs, tooltip, overlay, scrollable]
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * File generated: Wed Aug 18 09:10:12 GMT 2010
 */
(function(c){function p(d,b,a){var e=this,l=d.add(this),h=d.find(a.tabs),i=b.jquery?b:d.children(b),j;h.length||(h=d.children());i.length||(i=d.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return e.click(n,g);if(f>n)return e.click(0,g)}if(!k.length){if(j>=0)return e;f=a.initialIndex;k=h.eq(f)}if(f===j)return e;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(e,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return e}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return e.click(j+1)},prev:function(){return e.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find("a[href^=#]").unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(e).bind(g,a[g]);e[g]=function(k){k&&c(e).bind(g,k);return e}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){e.click(f,g);return g.preventDefault()})});i.find("a[href^=#]").bind("click.T",function(f){e.click(c(this).attr("href"),f)});if(location.hash&&a.tabs==="a"&&d.find(a.tabs+location.hash).length)e.click(location.hash);
else if(a.initialIndex===0||a.initialIndex>0)e.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.4"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,b){o[d]=b}};var o={"default":function(d,b){this.getPanes().hide().eq(d).show();b.call()},fade:function(d,b){var a=this.getConf(),e=a.fadeOutSpeed,l=this.getPanes();e?l.fadeOut(e):l.hide();l.eq(d).fadeIn(a.fadeInSpeed,b)},slide:function(d,
b){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,b)},ajax:function(d,b){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(d,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(d).animate({width:m},function(){c(this).show();b.call()})});c.fn.tabs=function(d,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b=
{onBeforeClick:b};b=c.extend({},c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),d,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);
(function(f){function p(a,b,c){var h=c.relative?a.position().top:a.offset().top,e=c.relative?a.position().left:a.offset().left,i=c.position[0];h-=b.outerHeight()-c.offset[0];e+=a.outerWidth()+c.offset[1];var j=b.outerHeight()+a.outerHeight();if(i=="center")h+=j/2;if(i=="bottom")h+=j;i=c.position[1];a=b.outerWidth()+a.outerWidth();if(i=="center")e-=a/2;if(i=="left")e-=a;return{top:h,left:e}}function u(a,b){var c=this,h=a.add(c),e,i=0,j=0,m=a.attr("title"),q=a.attr("data-tooltip"),r=n[b.effect],l,s=
a.is(":input"),v=s&&a.is(":checkbox, :radio, select, :button, :submit"),t=a.attr("type"),k=b.events[t]||b.events[s?v?"widget":"input":"def"];if(!r)throw'Nonexistent effect "'+b.effect+'"';k=k.split(/,\s*/);if(k.length!=2)throw"Tooltip: bad events configuration for "+t;a.bind(k[0],function(d){clearTimeout(i);if(b.predelay)j=setTimeout(function(){c.show(d)},b.predelay);else c.show(d)}).bind(k[1],function(d){clearTimeout(j);if(b.delay)i=setTimeout(function(){c.hide(d)},b.delay);else c.hide(d)});if(m&&
b.cancelDefault){a.removeAttr("title");a.data("title",m)}f.extend(c,{show:function(d){if(!e){if(q)e=f(q);else if(m)e=f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);else if(b.tip)e=f(b.tip).eq(0);else{e=a.next();e.length||(e=a.parent().next())}if(!e.length)throw"Cannot find tooltip for "+a;}if(c.isShown())return c;e.stop(true,true);var g=p(a,e,b);d=d||f.Event();d.type="onBeforeShow";h.trigger(d,[g]);if(d.isDefaultPrevented())return c;g=p(a,e,b);e.css({position:"absolute",
top:g.top,left:g.left});l=true;r[0].call(c,function(){d.type="onShow";l="full";h.trigger(d)});g=b.events.tooltip.split(/,\s*/);e.bind(g[0],function(){clearTimeout(i);clearTimeout(j)});g[1]&&!a.is("input:not(:checkbox, :radio), textarea")&&e.bind(g[1],function(o){o.relatedTarget!=a[0]&&a.trigger(k[1].split(" ")[0])});return c},hide:function(d){if(!e||!c.isShown())return c;d=d||f.Event();d.type="onBeforeHide";h.trigger(d);if(!d.isDefaultPrevented()){l=false;n[b.effect][1].call(c,function(){d.type="onHide";
h.trigger(d)});return c}},isShown:function(d){return d?l=="full":l},getConf:function(){return b},getTip:function(){return e},getTrigger:function(){return a}});f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(d,g){f.isFunction(b[g])&&f(c).bind(g,b[g]);c[g]=function(o){f(c).bind(g,o);return c}})}f.tools=f.tools||{version:"1.2.4"};f.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:false,cancelDefault:true,
events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,b,c){n[a]=[b,c]}};var n={toggle:[function(a){var b=this.getConf(),c=this.getTip();b=b.opacity;b<1&&c.css({opacity:b});c.show();a.call()},function(a){this.getTip().hide();a.call()}],fade:[function(a){var b=this.getConf();this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,
a)}]};f.fn.tooltip=function(a){var b=this.data("tooltip");if(b)return b;a=f.extend(true,{},f.tools.tooltip.conf,a);if(typeof a.position=="string")a.position=a.position.split(/,?\s/);this.each(function(){b=new u(f(this),a);f(this).data("tooltip",b)});return a.api?b:this}})(jQuery);
(function(a){function t(d,b){var c=this,i=d.add(c),o=a(window),k,f,m,g=a.tools.expose&&(b.mask||b.expose),n=Math.random().toString().slice(10);if(g){if(typeof g=="string")g={color:g};g.closeOnClick=g.closeOnEsc=false}var p=b.target||d.attr("rel");f=p?a(p):d;if(!f.length)throw"Could not find Overlay: "+p;d&&d.index(f)==-1&&d.click(function(e){c.load(e);return e.preventDefault()});a.extend(c,{load:function(e){if(c.isOpened())return c;var h=q[b.effect];if(!h)throw'Overlay: cannot find effect : "'+b.effect+
'"';b.oneInstance&&a.each(s,function(){this.close(e)});e=e||a.Event();e.type="onBeforeLoad";i.trigger(e);if(e.isDefaultPrevented())return c;m=true;g&&a(f).expose(g);var j=b.top,r=b.left,u=f.outerWidth({margin:true}),v=f.outerHeight({margin:true});if(typeof j=="string")j=j=="center"?Math.max((o.height()-v)/2,0):parseInt(j,10)/100*o.height();if(r=="center")r=Math.max((o.width()-u)/2,0);h[0].call(c,{top:j,left:r},function(){if(m){e.type="onLoad";i.trigger(e)}});g&&b.closeOnClick&&a.mask.getMask().one("click",
c.close);b.closeOnClick&&a(document).bind("click."+n,function(l){a(l.target).parents(f).length||c.close(l)});b.closeOnEsc&&a(document).bind("keydown."+n,function(l){l.keyCode==27&&c.close(l)});return c},close:function(e){if(!c.isOpened())return c;e=e||a.Event();e.type="onBeforeClose";i.trigger(e);if(!e.isDefaultPrevented()){m=false;q[b.effect][1].call(c,function(){e.type="onClose";i.trigger(e)});a(document).unbind("click."+n).unbind("keydown."+n);g&&a.mask.close();return c}},getOverlay:function(){return f},
getTrigger:function(){return d},getClosers:function(){return k},isOpened:function(){return m},getConf:function(){return b}});a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(e,h){a.isFunction(b[h])&&a(c).bind(h,b[h]);c[h]=function(j){a(c).bind(h,j);return c}});k=f.find(b.close||".close");if(!k.length&&!b.close){k=a('<a class="close"></a>');f.prepend(k)}k.click(function(e){c.close(e)});b.load&&c.load()}a.tools=a.tools||{version:"1.2.4"};a.tools.overlay={addEffect:function(d,
b,c){q[d]=[b,c]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var s=[],q={};a.tools.overlay.addEffect("default",function(d,b){var c=this.getConf(),i=a(window);if(!c.fixed){d.top+=i.scrollTop();d.left+=i.scrollLeft()}d.position=c.fixed?"fixed":"absolute";this.getOverlay().css(d).fadeIn(c.speed,b)},function(d){this.getOverlay().fadeOut(this.getConf().closeSpeed,
d)});a.fn.overlay=function(d){var b=this.data("overlay");if(b)return b;if(a.isFunction(d))d={onBeforeLoad:d};d=a.extend(true,{},a.tools.overlay.conf,d);this.each(function(){b=new t(a(this),d);s.push(b);a(this).data("overlay",b)});return d.api?b:this}})(jQuery);
(function(e){function n(f,c){var a=e(c);return a.length<2?a:f.parent().find(c)}function t(f,c){var a=this,l=f.add(a),g=f.children(),k=0,m=c.vertical;j||(j=a);if(g.length>1)g=e(c.items,f);e.extend(a,{getConf:function(){return c},getIndex:function(){return k},getSize:function(){return a.getItems().size()},getNaviButtons:function(){return o.add(p)},getRoot:function(){return f},getItemWrap:function(){return g},getItems:function(){return g.children(c.item).not("."+c.clonedClass)},move:function(b,d){return a.seekTo(k+
b,d)},next:function(b){return a.move(1,b)},prev:function(b){return a.move(-1,b)},begin:function(b){return a.seekTo(0,b)},end:function(b){return a.seekTo(a.getSize()-1,b)},focus:function(){return j=a},addItem:function(b){b=e(b);if(c.circular){g.children("."+c.clonedClass+":last").before(b);g.children("."+c.clonedClass+":first").replaceWith(b.clone().addClass(c.clonedClass))}else g.append(b);l.trigger("onAddItem",[b]);return a},seekTo:function(b,d,h){b.jquery||(b*=1);if(c.circular&&b===0&&k==-1&&d!==
0)return a;if(!c.circular&&b<0||b>a.getSize()||b<-1)return a;var i=b;if(b.jquery)b=a.getItems().index(b);else i=a.getItems().eq(b);var q=e.Event("onBeforeSeek");if(!h){l.trigger(q,[b,d]);if(q.isDefaultPrevented()||!i.length)return a}i=m?{top:-i.position().top}:{left:-i.position().left};k=b;j=a;if(d===undefined)d=c.speed;g.animate(i,d,c.easing,h||function(){l.trigger("onSeek",[b])});return a}});e.each(["onBeforeSeek","onSeek","onAddItem"],function(b,d){e.isFunction(c[d])&&e(a).bind(d,c[d]);a[d]=function(h){e(a).bind(d,
h);return a}});if(c.circular){var r=a.getItems().slice(-1).clone().prependTo(g),s=a.getItems().eq(1).clone().appendTo(g);r.add(s).addClass(c.clonedClass);a.onBeforeSeek(function(b,d,h){if(!b.isDefaultPrevented())if(d==-1){a.seekTo(r,h,function(){a.end(0)});return b.preventDefault()}else d==a.getSize()&&a.seekTo(s,h,function(){a.begin(0)})});a.seekTo(0,0,function(){})}var o=n(f,c.prev).click(function(){a.prev()}),p=n(f,c.next).click(function(){a.next()});!c.circular&&a.getSize()>1&&a.onBeforeSeek(function(b,
d){setTimeout(function(){if(!b.isDefaultPrevented()){o.toggleClass(c.disabledClass,d<=0);p.toggleClass(c.disabledClass,d>=a.getSize()-1)}},1)});c.mousewheel&&e.fn.mousewheel&&f.mousewheel(function(b,d){if(c.mousewheel){a.move(d<0?1:-1,c.wheelSpeed||50);return false}});c.keyboard&&e(document).bind("keydown.scrollable",function(b){if(!(!c.keyboard||b.altKey||b.ctrlKey||e(b.target).is(":input")))if(!(c.keyboard!="static"&&j!=a)){var d=b.keyCode;if(m&&(d==38||d==40)){a.move(d==38?-1:1);return b.preventDefault()}if(!m&&
(d==37||d==39)){a.move(d==37?-1:1);return b.preventDefault()}}});c.initialIndex&&a.seekTo(c.initialIndex,0,function(){})}e.tools=e.tools||{version:"1.2.4"};e.tools.scrollable={conf:{activeClass:"active",circular:false,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:true,mousewheel:false,next:".next",prev:".prev",speed:400,vertical:false,wheelSpeed:0}};var j;e.fn.scrollable=function(f){var c=this.data("scrollable");if(c)return c;f=e.extend({},
e.tools.scrollable.conf,f);this.each(function(){c=new t(e(this),f);e(this).data("scrollable",c)});return f.api?c:this}})(jQuery);

/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);



/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d)},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(x,t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(x,t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(x,t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(x,t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(x,t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b},easeInCirc:function(x,t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b},easeInBack:function(x,t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(x,t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2){return jQuery.easing.easeInBounce(x,t*2,0,c,d)*0.5+b}return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*0.5+c*0.5+b}});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *


/* ------------------------------------------------------------------------
Class: prettyPhoto
Use: Lightbox clone for jQuery
Author: Stephane Caron (http://www.no-margin-for-errors.com)
Version: 3.1.3
------------------------------------------------------------------------- */
(function($){$.prettyPhoto={version:"3.1.4"};$.fn.prettyPhoto=function(pp_settings){pp_settings=jQuery.extend({hook:"rel",animation_speed:"fast",ajaxcallback:function(){},slideshow:5000,autoplay_slideshow:false,opacity:0.8,show_title:true,allow_resize:true,allow_expand:true,default_width:500,default_height:344,counter_separator_label:"/",theme:"pp_default",horizontal_padding:20,hideflash:false,wmode:"opaque",autoplay:true,modal:false,deeplinking:true,overlay_gallery:true,overlay_gallery_max:30,keyboard_shortcuts:true,changepicturecallback:function(){},callback:function(){},ie6_fallback:true,markup:'<div class="pp_pic_holder"> 						<div class="ppt">&nbsp;</div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',gallery_markup:'<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',image_markup:'<img id="fullResImage" src="{path}" />',flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',iframe_markup:'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',inline_markup:'<div class="pp_inline">{content}</div>',custom_markup:"",social_tools:'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"><\/script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'},pp_settings);var matchedObjects=this,percentBased=false,pp_dimensions,pp_open,pp_contentHeight,pp_contentWidth,pp_containerHeight,pp_containerWidth,windowHeight=$(window).height(),windowWidth=$(window).width(),pp_slideshow;doresize=true,scroll_pos=_get_scroll();$(window).unbind("resize.prettyphoto").bind("resize.prettyphoto",function(){_center_overlay();_resize_overlay()});if(pp_settings.keyboard_shortcuts){$(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto",function(e){if(typeof $pp_pic_holder!="undefined"){if($pp_pic_holder.is(":visible")){switch(e.keyCode){case 37:$.prettyPhoto.changePage("previous");e.preventDefault();break;case 39:$.prettyPhoto.changePage("next");e.preventDefault();break;case 27:if(!settings.modal){$.prettyPhoto.close()}e.preventDefault();break}}}})}$.prettyPhoto.initialize=function(){settings=pp_settings;if(settings.theme=="pp_default"){settings.horizontal_padding=16}if(settings.ie6_fallback&&$.browser.msie&&parseInt($.browser.version)==6){settings.theme="light_square"}theRel=$(this).attr(settings.hook);galleryRegExp=/\[(?:.*)\]/;isSet=(galleryRegExp.exec(theRel))?true:false;pp_images=(isSet)?jQuery.map(matchedObjects,function(n,i){if($(n).attr(settings.hook).indexOf(theRel)!=-1){return $(n).attr("href")}}):$.makeArray($(this).attr("href"));pp_titles=(isSet)?jQuery.map(matchedObjects,function(n,i){if($(n).attr(settings.hook).indexOf(theRel)!=-1){return($(n).find("img").attr("alt"))?$(n).find("img").attr("alt"):""}}):$.makeArray($(this).find("img").attr("alt"));pp_descriptions=(isSet)?jQuery.map(matchedObjects,function(n,i){if($(n).attr(settings.hook).indexOf(theRel)!=-1){return($(n).attr("title"))?$(n).attr("title"):""}}):$.makeArray($(this).attr("title"));if(pp_images.length>settings.overlay_gallery_max){settings.overlay_gallery=false}set_position=jQuery.inArray($(this).attr("href"),pp_images);rel_index=(isSet)?set_position:$("a["+settings.hook+"^='"+theRel+"']").index($(this));_build_overlay(this);if(settings.allow_resize){$(window).bind("scroll.prettyphoto",function(){_center_overlay()})}$.prettyPhoto.open();return false};$.prettyPhoto.open=function(event){if(typeof settings=="undefined"){settings=pp_settings;if($.browser.msie&&$.browser.version==6){settings.theme="light_square"}pp_images=$.makeArray(arguments[0]);pp_titles=(arguments[1])?$.makeArray(arguments[1]):$.makeArray("");pp_descriptions=(arguments[2])?$.makeArray(arguments[2]):$.makeArray("");isSet=(pp_images.length>1)?true:false;set_position=(arguments[3])?arguments[3]:0;_build_overlay(event.target)}if($.browser.msie&&$.browser.version==6){$("select").css("visibility","hidden")}if(settings.hideflash){$("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","hidden")}_checkPosition($(pp_images).size());$(".pp_loaderIcon").show();if(settings.deeplinking){setHashtag()}if(settings.social_tools){facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href));$pp_pic_holder.find(".pp_social").html(facebook_like_link)}if($ppt.is(":hidden")){$ppt.css("opacity",0).show()}$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);$pp_pic_holder.find(".currentTextHolder").text((set_position+1)+settings.counter_separator_label+$(pp_images).size());if(typeof pp_descriptions[set_position]!="undefined"&&pp_descriptions[set_position]!=""){$pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))}else{$pp_pic_holder.find(".pp_description").hide()}movie_width=(parseFloat(getParam("width",pp_images[set_position])))?getParam("width",pp_images[set_position]):settings.default_width.toString();movie_height=(parseFloat(getParam("height",pp_images[set_position])))?getParam("height",pp_images[set_position]):settings.default_height.toString();percentBased=false;if(movie_height.indexOf("%")!=-1){movie_height=parseFloat(($(window).height()*parseFloat(movie_height)/100)-150);percentBased=true}if(movie_width.indexOf("%")!=-1){movie_width=parseFloat(($(window).width()*parseFloat(movie_width)/100)-150);percentBased=true}$pp_pic_holder.fadeIn(function(){(settings.show_title&&pp_titles[set_position]!=""&&typeof pp_titles[set_position]!="undefined")?$ppt.html(unescape(pp_titles[set_position])):$ppt.html("&nbsp;");imgPreloader="";skipInjection=false;switch(_getFileType(pp_images[set_position])){case"image":imgPreloader=new Image();nextImage=new Image();if(isSet&&set_position<$(pp_images).size()-1){nextImage.src=pp_images[set_position+1]}prevImage=new Image();if(isSet&&pp_images[set_position-1]){prevImage.src=pp_images[set_position-1]}$pp_pic_holder.find("#pp_full_res")[0].innerHTML=settings.image_markup.replace(/{path}/g,pp_images[set_position]);imgPreloader.onload=function(){pp_dimensions=_fitToViewport(imgPreloader.width,imgPreloader.height);_showContent()};imgPreloader.onerror=function(){alert("Image cannot be loaded. Make sure the path is correct and image exist.");$.prettyPhoto.close()};imgPreloader.src=pp_images[set_position];break;case"youtube":pp_dimensions=_fitToViewport(movie_width,movie_height);movie_id=getParam("v",pp_images[set_position]);if(movie_id==""){movie_id=pp_images[set_position].split("youtu.be/");movie_id=movie_id[1];if(movie_id.indexOf("?")>0){movie_id=movie_id.substr(0,movie_id.indexOf("?"))}if(movie_id.indexOf("&")>0){movie_id=movie_id.substr(0,movie_id.indexOf("&"))}}movie="http://www.youtube.com/embed/"+movie_id;(getParam("rel",pp_images[set_position]))?movie+="?rel="+getParam("rel",pp_images[set_position]):movie+="?rel=1";if(settings.autoplay){movie+="&autoplay=1"}toInject=settings.iframe_markup.replace(/{width}/g,pp_dimensions.width).replace(/{height}/g,pp_dimensions.height).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case"vimeo":pp_dimensions=_fitToViewport(movie_width,movie_height);movie_id=pp_images[set_position];var regExp=/http:\/\/(www\.)?vimeo.com\/(\d+)/;var match=movie_id.match(regExp);movie="http://player.vimeo.com/video/"+match[2]+"?title=0&amp;byline=0&amp;portrait=0";if(settings.autoplay){movie+="&autoplay=1;"}vimeo_width=pp_dimensions.width+"/embed/?moog_width="+pp_dimensions.width;toInject=settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions.height).replace(/{path}/g,movie);break;case"quicktime":pp_dimensions=_fitToViewport(movie_width,movie_height);pp_dimensions.height+=15;pp_dimensions.contentHeight+=15;pp_dimensions.containerHeight+=15;toInject=settings.quicktime_markup.replace(/{width}/g,pp_dimensions.width).replace(/{height}/g,pp_dimensions.height).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);break;case"flash":pp_dimensions=_fitToViewport(movie_width,movie_height);flash_vars=pp_images[set_position];flash_vars=flash_vars.substring(pp_images[set_position].indexOf("flashvars")+10,pp_images[set_position].length);filename=pp_images[set_position];filename=filename.substring(0,filename.indexOf("?"));toInject=settings.flash_markup.replace(/{width}/g,pp_dimensions.width).replace(/{height}/g,pp_dimensions.height).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+"?"+flash_vars);break;case"iframe":pp_dimensions=_fitToViewport(movie_width,movie_height);frame_url=pp_images[set_position];frame_url=frame_url.substr(0,frame_url.indexOf("iframe")-1);toInject=settings.iframe_markup.replace(/{width}/g,pp_dimensions.width).replace(/{height}/g,pp_dimensions.height).replace(/{path}/g,frame_url);break;case"ajax":doresize=false;pp_dimensions=_fitToViewport(movie_width,movie_height);doresize=true;skipInjection=true;$.get(pp_images[set_position],function(responseHTML){toInject=settings.inline_markup.replace(/{content}/g,responseHTML);$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;_showContent()});break;case"custom":pp_dimensions=_fitToViewport(movie_width,movie_height);toInject=settings.custom_markup;break;case"inline":myClone=$(pp_images[set_position]).clone().append('<br clear="all" />').css({width:settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($("body")).show();doresize=false;pp_dimensions=_fitToViewport($(myClone).width(),$(myClone).height());doresize=true;$(myClone).remove();toInject=settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());break}if(!imgPreloader&&!skipInjection){$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;_showContent()}});return false};$.prettyPhoto.changePage=function(direction){currentGalleryPage=0;if(direction=="previous"){set_position--;if(set_position<0){set_position=$(pp_images).size()-1}}else{if(direction=="next"){set_position++;if(set_position>$(pp_images).size()-1){set_position=0}}else{set_position=direction}}rel_index=set_position;if(!doresize){doresize=true}if(settings.allow_expand){$(".pp_contract").removeClass("pp_contract").addClass("pp_expand")}_hideContent(function(){$.prettyPhoto.open()})};$.prettyPhoto.changeGalleryPage=function(direction){if(direction=="next"){currentGalleryPage++;if(currentGalleryPage>totalPage){currentGalleryPage=0}}else{if(direction=="previous"){currentGalleryPage--;if(currentGalleryPage<0){currentGalleryPage=totalPage}}else{currentGalleryPage=direction}}slide_speed=(direction=="next"||direction=="previous")?settings.animation_speed:0;slide_to=currentGalleryPage*(itemsPerPage*itemWidth);$pp_gallery.find("ul").animate({left:-slide_to},slide_speed)};$.prettyPhoto.startSlideshow=function(){if(typeof pp_slideshow=="undefined"){$pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function(){$.prettyPhoto.stopSlideshow();return false});pp_slideshow=setInterval($.prettyPhoto.startSlideshow,settings.slideshow)}else{$.prettyPhoto.changePage("next")}};$.prettyPhoto.stopSlideshow=function(){$pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function(){$.prettyPhoto.startSlideshow();return false});clearInterval(pp_slideshow);pp_slideshow=undefined};$.prettyPhoto.close=function(){if($pp_overlay.is(":animated")){return}$.prettyPhoto.stopSlideshow();$pp_pic_holder.stop().find("object,embed").css("visibility","hidden");$("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed,function(){$(this).remove()});$pp_overlay.fadeOut(settings.animation_speed,function(){if($.browser.msie&&$.browser.version==6){$("select").css("visibility","visible")}if(settings.hideflash){$("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","visible")}$(this).remove();$(window).unbind("scroll.prettyphoto");clearHashtag();settings.callback();doresize=true;pp_open=false;delete settings})};function _showContent(){$(".pp_loaderIcon").hide();projectedTop=scroll_pos.scrollTop+((windowHeight/2)-(pp_dimensions.containerHeight/2));if(projectedTop<0){projectedTop=0}$ppt.fadeTo(settings.animation_speed,1);$pp_pic_holder.find(".pp_content").animate({height:pp_dimensions.contentHeight,width:pp_dimensions.contentWidth},settings.animation_speed);$pp_pic_holder.animate({top:projectedTop,left:((windowWidth/2)-(pp_dimensions.containerWidth/2)<0)?0:(windowWidth/2)-(pp_dimensions.containerWidth/2),width:pp_dimensions.containerWidth},settings.animation_speed,function(){$pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(pp_dimensions.height).width(pp_dimensions.width);$pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);if(isSet&&_getFileType(pp_images[set_position])=="image"){$pp_pic_holder.find(".pp_hoverContainer").show()}else{$pp_pic_holder.find(".pp_hoverContainer").hide()}if(settings.allow_expand){if(pp_dimensions.resized){$("a.pp_expand,a.pp_contract").show()}else{$("a.pp_expand").hide()}}if(settings.autoplay_slideshow&&!pp_slideshow&&!pp_open){$.prettyPhoto.startSlideshow()}settings.changepicturecallback();pp_open=true});_insert_gallery();pp_settings.ajaxcallback()}function _hideContent(callback){$pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility","hidden");$pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed,function(){$(".pp_loaderIcon").show();callback()})}function _checkPosition(setCount){(setCount>1)?$(".pp_nav").show():$(".pp_nav").hide()}function _fitToViewport(width,height){resized=false;var isMobile=PEXETO.checkIfMobile(),spacing=isMobile?40:200;_getDimensions(width,height);imageWidth=width,imageHeight=height;if(((pp_containerWidth>windowWidth)||(pp_containerHeight>windowHeight))&&doresize&&settings.allow_resize&&!percentBased){resized=true,fitting=false;while(!fitting){if((pp_containerWidth>windowWidth)){imageWidth=(windowWidth-spacing);imageHeight=(height/width)*imageWidth}else{if((pp_containerHeight>windowHeight)){imageHeight=(windowHeight-spacing);imageWidth=(width/height)*imageHeight}else{fitting=true}}pp_containerHeight=imageHeight,pp_containerWidth=imageWidth}_getDimensions(imageWidth,imageHeight);if(!isMobile){if((pp_containerWidth>windowWidth)||(pp_containerHeight>windowHeight)){_fitToViewport(pp_containerWidth,pp_containerHeight)}}}return{width:Math.floor(imageWidth),height:Math.floor(imageHeight),containerHeight:Math.floor(pp_containerHeight),containerWidth:Math.floor(pp_containerWidth)+(settings.horizontal_padding*2),contentHeight:Math.floor(pp_contentHeight),contentWidth:Math.floor(pp_contentWidth),resized:resized}}function _getDimensions(width,height){width=parseFloat(width);height=parseFloat(height);$pp_details=$pp_pic_holder.find(".pp_details");$pp_details.width(width);detailsHeight=parseFloat($pp_details.css("marginTop"))+parseFloat($pp_details.css("marginBottom"));$pp_details=$pp_details.clone().addClass(settings.theme).width(width).appendTo($("body")).css({position:"absolute",top:-10000});detailsHeight+=$pp_details.height();detailsHeight=(detailsHeight<=34)?36:detailsHeight;if($.browser.msie&&$.browser.version==7){detailsHeight+=8}$pp_details.remove();$pp_title=$pp_pic_holder.find(".ppt");$pp_title.width(width);titleHeight=parseFloat($pp_title.css("marginTop"))+parseFloat($pp_title.css("marginBottom"));$pp_title=$pp_title.clone().appendTo($("body")).css({position:"absolute",top:-10000});titleHeight+=$pp_title.height();$pp_title.remove();pp_contentHeight=height+detailsHeight;pp_contentWidth=width;pp_containerHeight=pp_contentHeight+titleHeight+$pp_pic_holder.find(".pp_top").height()+$pp_pic_holder.find(".pp_bottom").height();pp_containerWidth=width}function _getFileType(itemSrc){if(itemSrc.match(/youtube\.com\/watch/i)||itemSrc.match(/youtu\.be/i)){return"youtube"}else{if(itemSrc.match(/vimeo\.com/i)){return"vimeo"}else{if(itemSrc.match(/\b.mov\b/i)){return"quicktime"}else{if(itemSrc.match(/\b.swf\b/i)){return"flash"}else{if(itemSrc.match(/\biframe=true\b/i)){return"iframe"}else{if(itemSrc.match(/\bajax=true\b/i)){return"ajax"}else{if(itemSrc.match(/\bcustom=true\b/i)){return"custom"}else{if(itemSrc.substr(0,1)=="#"){return"inline"}else{return"image"}}}}}}}}}function _center_overlay(){if(doresize&&typeof $pp_pic_holder!="undefined"){scroll_pos=_get_scroll();contentHeight=$pp_pic_holder.height(),contentwidth=$pp_pic_holder.width();projectedTop=(windowHeight/2)+scroll_pos.scrollTop-(contentHeight/2);if(projectedTop<0){projectedTop=0}if(contentHeight>windowHeight){return}$pp_pic_holder.css({top:projectedTop,left:(windowWidth/2)+scroll_pos.scrollLeft-(contentwidth/2)})}}function _get_scroll(){if(self.pageYOffset){return{scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset}}else{if(document.documentElement&&document.documentElement.scrollTop){return{scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft}}else{if(document.body){return{scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft}}}}}function _resize_overlay(){windowHeight=$(window).height(),windowWidth=$(window).width();if(typeof $pp_overlay!="undefined"){$pp_overlay.height($(document).height()).width(windowWidth)}}function _insert_gallery(){if(isSet&&settings.overlay_gallery&&_getFileType(pp_images[set_position])=="image"&&(settings.ie6_fallback&&!($.browser.msie&&parseInt($.browser.version)==6))){itemWidth=52+5;navWidth=(settings.theme=="facebook"||settings.theme=="pp_default")?50:30;itemsPerPage=Math.floor((pp_dimensions.containerWidth-100-navWidth)/itemWidth);itemsPerPage=(itemsPerPage<pp_images.length)?itemsPerPage:pp_images.length;totalPage=Math.ceil(pp_images.length/itemsPerPage)-1;if(totalPage==0){navWidth=0;$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()}else{$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()}galleryWidth=itemsPerPage*itemWidth;fullGalleryWidth=pp_images.length*itemWidth;$pp_gallery.css("margin-left",-((galleryWidth/2)+(navWidth/2))).find("div:first").width(galleryWidth+5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");goToPage=(Math.floor(set_position/itemsPerPage)<totalPage)?Math.floor(set_position/itemsPerPage):totalPage;$.prettyPhoto.changeGalleryPage(goToPage);$pp_gallery_li.filter(":eq("+set_position+")").addClass("selected")}else{$pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")}}function _build_overlay(caller){if(settings.social_tools){facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href))}settings.markup=settings.markup.replace("{pp_social}","");$("body").append(settings.markup);$pp_pic_holder=$(".pp_pic_holder"),$ppt=$(".ppt"),$pp_overlay=$("div.pp_overlay");if(isSet&&settings.overlay_gallery){currentGalleryPage=0;toInject="";for(var i=0;i<pp_images.length;i++){if(!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){classname="default";img_src=""}else{classname="";img_src=pp_images[i]}toInject+="<li class='"+classname+"'><a href='#'><img src='"+img_src+"' width='50' alt='' /></a></li>"}toInject=settings.gallery_markup.replace(/{gallery}/g,toInject);$pp_pic_holder.find("#pp_full_res").after(toInject);$pp_gallery=$(".pp_pic_holder .pp_gallery"),$pp_gallery_li=$pp_gallery.find("li");$pp_gallery.find(".pp_arrow_next").click(function(){$.prettyPhoto.changeGalleryPage("next");$.prettyPhoto.stopSlideshow();return false});$pp_gallery.find(".pp_arrow_previous").click(function(){$.prettyPhoto.changeGalleryPage("previous");$.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_content").hover(function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()},function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()});itemWidth=52+5;$pp_gallery_li.each(function(i){$(this).find("a").click(function(){$.prettyPhoto.changePage(i);$.prettyPhoto.stopSlideshow();return false})})}if(settings.slideshow){$pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');$pp_pic_holder.find(".pp_nav .pp_play").click(function(){$.prettyPhoto.startSlideshow();return false})}$pp_pic_holder.attr("class","pp_pic_holder "+settings.theme);$pp_overlay.css({opacity:0,height:$(document).height(),width:$(window).width()}).bind("click",function(){if(!settings.modal){$.prettyPhoto.close()}});$("a.pp_close").bind("click",function(){$.prettyPhoto.close();return false});if(settings.allow_expand){$("a.pp_expand").bind("click",function(e){if($(this).hasClass("pp_expand")){$(this).removeClass("pp_expand").addClass("pp_contract");doresize=false}else{$(this).removeClass("pp_contract").addClass("pp_expand");doresize=true}_hideContent(function(){$.prettyPhoto.open()});return false})}$pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click",function(){$.prettyPhoto.changePage("previous");$.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click",function(){$.prettyPhoto.changePage("next");$.prettyPhoto.stopSlideshow();return false});_center_overlay()}if(!pp_alreadyInitialized&&getHashtag()){pp_alreadyInitialized=true;hashIndex=getHashtag();hashRel=hashIndex;hashIndex=hashIndex.substring(hashIndex.indexOf("/")+1,hashIndex.length-1);hashRel=hashRel.substring(0,hashRel.indexOf("/"));setTimeout(function(){$("a["+pp_settings.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger("click")},50)}return this.unbind("click.prettyphoto").bind("click.prettyphoto",$.prettyPhoto.initialize)};function getHashtag(){url=location.href;hashtag=(url.indexOf("#prettyPhoto")!==-1)?decodeURI(url.substring(url.indexOf("#prettyPhoto")+1,url.length)):false;return hashtag}function setHashtag(){if(typeof theRel=="undefined"){return}location.hash=theRel+"/"+rel_index+"/"}function clearHashtag(){if(location.href.indexOf("#prettyPhoto")!==-1){location.hash="prettyPhoto"}}function getParam(name,url){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(url);return(results==null)?"":results[1]}})(jQuery);var pp_alreadyInitialized=false;


/**
 * Pexeto Contact Form - contains all the contact form functionality.
 * @author Pexeto
 */
(function($){
	$.fn.pexetoContactForm=function(options){
		var defaults={
			//set the default options (can be overwritten from the calling function)
			ajaxurl:'',
			invalidClass:'invalid',
			afterValidClass:'after-validation',
			
			//selectors
			submitSel:'.send-button',
			errorSel:'.error-message',
			statusSel:'.contact-status',
			sentSel:'.sent-message',
			loaderSel:'.contact-loader',
			checkSel:'.check',
			failSel:'.fail-message',
			inputWrapperSel:'.contact-input-wrapper'
		};
		
	
	var options=$.extend(defaults, options);
	options.ajaxurl=$(this).attr('action');
	
	//define some variables that will be used globally within the script
	var $root=$(this),
		$requiredFields=$root.find('input.required, textarea.required'),
		$fields=$root.find('input, textarea'),
		$errorBox=$root.find(options.errorSel),
		$sentBox=$root.find(options.sentSel),
		$loader=$root.find(options.loaderSel),
		$check=$root.find(options.checkSel),
		$failBox=$root.find(options.failSel);

	function init(){
		$fields.on("focus", doOnFieldsFocus);
		$root.find(options.submitSel).eq(0).on("click", doOnSendClicked);
	}

	function doOnSendClicked(e){
		//set the send button click handler functionality
		e.preventDefault();
		var isValid=validateForm();

		if(isValid){
			//the form is valid, send the email
			$loader.css({visibility:'visible'});
			
			var data=$root.serialize()+'&action=pexeto_send_email';
			//send the AJAX request
			$.ajax({
				url:PEXETO.ajaxurl,
				data:data,
				dataType:'json',
				type:'post',
				success:function(res){
					//reset the form
					$loader.css({visibility:'hidden'});
					if(res.success){
						$root.get(0).reset();
						hideAfterValidationErrors();
						$check.css({visibility:'visible'},200);
						$errorBox.slideUp();
						$sentBox.slideDown();
						
						setTimeout(function() {
							$sentBox.slideUp();
							$check.css({visibility:'hidden'},200);
						}, 3000);
					}else{
						showFailError();
					}
				},
				error:function(){
					$loader.css({visibility:'hidden'});
					showFailError();
				}
			});
		}
	}
	
	
	/**
	 * Validates the form input.
	 * @return true if the form is valid.
	 */
	function validateForm(){
		var isValid=true;
		
		hideValidationErrors();
		$requiredFields.each(function(){
			var $elem=$(this);
			if(!$.trim($elem.val()) || ($elem.hasClass('email') && !isValidEmail($elem.val()))){
				//this field value is not valid display an error
				showError($elem);
				isValid=false;
			}
		});
		
		if(!isValid){
			$errorBox.slideDown();
		}
		return isValid;
	}
	
	function hideValidationErrors(){
		$requiredFields.removeClass(options.invalidClass).removeClass(options.afterValidClass);
	}
	
	function hideAfterValidationErrors(){
		$requiredFields.each(function(){
			var $wrapper=$(this).parents(options.inputWrapperSel).eq(0),
			$errorElem=$wrapper.length?$wrapper:$(this);
			$errorElem.removeClass(options.afterValidClass);
		});
	}
	
	function showError($elem){
		var $wrapper=$elem.parents(options.inputWrapperSel).eq(0),
		$errorElem=$wrapper.length?$wrapper:$elem;
		$errorElem.addClass(options.invalidClass);
	}
	
	function showFailError(){
		$failBox.slideDown();
		setTimeout(function() {
			$failBox.slideUp();
		}, 5000);
	}
	
	function doOnFieldsFocus(){
		var $wrapper=$(this).parents(options.inputWrapperSel).eq(0),
			$errorElem=$wrapper.length?$wrapper:$(this);
		if($errorElem.hasClass(options.invalidClass)){
			$errorElem.addClass(options.afterValidClass);
		}
		$errorElem.removeClass(options.invalidClass);
	}
	
	
	/**
	 * Checks if an email address is a valid one.
	 * 
	 * @param email
	 *            the email address to validate
	 * @return true if the address is a valid one
	 */
	function isValidEmail(email) {
		var pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return pattern.test(email);
	}
	
	if($root.length){
		init();
	}
	
	};
}(jQuery));

/**
 * Define a placeholder check to jQuery.support
 * code adapted from: http://diveintohtml5.org/detect.html#input-placeholder
 */
jQuery.support.placeholder = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
})();


/**
 * Makes a fullscreen image resizable to fit the window size. It can be full-width - it would fill the whole window width
 * and the height will be changed according to the original image ratio, or it can be full-height - it will be displayed in the 
 * height of the window and the width will be changed according to the image ratio.
 * 
 * Example usage: $('.test').pexetoResizableImg();
 * 
 * @author Pexeto
 */
(function ($) {
	var pid = 0;
	$.fn.pexetoResizableImg = function (options) {
		var defaults = {
			fullwidth: true,
			fullscreen: false,
			resizeParent: false,
			// whether to resize the wrapping parent
			imgSelector: "",
			//sets a selector of a parent of the images to be resized (for example if it is set to .img-container, will resize the images that have a parent .img-container), if empty will resize all the images
			subtractElements: [] //the elements whose height should be substracted from the window height
		},
			o = $.extend(defaults, options),
			$root = $(this),
			images = [],
			currentHeight = 0,
			fullscreen = false,
			repositionImage = null,
			eventNs = "resizable" + pid; //set a different namespace for each plugin initialization
		/**
		 * Contains the main plugin functionality - once all the images are loaded, calls the callback function.
		 */

		function init() {
			pid+=1;
			fullscreen = o.fullscreen;

			repositionImage = o.fullwidth ?
			function (val, animate) {
				resizeImage(val, animate);
			} : function (val, animate) {
				centerImage(val, animate);
			};

			setContainerHeight(false);
			resizeImages();

			$root.on("imgRefresh." + eventNs, function (e, opt) {
				var animate = (opt !== undefined && opt.animate);
				setContainerHeight(animate);
				getImages().each(function (i) {
					repositionImage($(this), animate);
				});
			}).on("fullscreen." + eventNs, function (event, param) {
				fullscreen = param;
			}).on("destroy." + eventNs, destroy);

			$(window).on("resize." + eventNs + " orientationchange." + eventNs, function (e) {
				setContainerHeight(false);
				getImages().each(function (i) {
					repositionImage($(this), false);
				});
			});
		}

		/**
		 * Returns all the images in the element that should be resized.
		 */

		function getImages() {
			var selector = "img";
			if (o.imgSelector) {
				selector = o.imgSelector + " " + selector;
			}
			return $root.find(selector);
		}

		/**
		 * Resizes all the images in the container.
		 */

		function resizeImages() {
			getImages().each(function (i) {

				if (o.imgLoaded) {
					//the images have been already loaded
					repositionImage($(this), false);
				} else {
					//the images may not be loaded yet, bind a load event handler
					$(this).onPexetoImagesLoaded({
						callback: function () {
							//resize the image to fit the window for full width layout
							repositionImage($(this), false);
						}
					});
				}

			});

		}

		/**
		 * Sets the height of the parent container.
		 */

		function setContainerHeight(animate) {
			var windowHeight = $(window).height(),
				h = 0,
				i = o.subtractElements.length,
				setObj;

			if (!fullscreen) {
				while (i--) {
					h += o.subtractElements[i].el.outerHeight();
				}
			}

			currentHeight = windowHeight - h;
			setObj = {
				height: currentHeight
			};

			if (animate) {
				$root.animate(setObj);
			} else {
				$root.css(setObj);
			}

			if (o.resizeParent) {
				if (animate) {
					$root.parent().animate(setObj);
				} else {
					$root.parent().css(setObj);
				}
			}

		}

		/**
		 * Resizes a fullwidth image according to the window size.
		 */

		function resizeImage($img, animate) {
			var winw = $(window).width(),
				imgSize = PEXETO.helper.getNaturalImgSize($img),
				imgw = imgSize.width,
				imgh = imgSize.height,
				args = {},
				left = 0;
			displayHeight = Math.round(winw * imgh / imgw);

			if (displayHeight < currentHeight) {
				left = getImgLeftPosition($img);
				args = {
					width: ((currentHeight * imgw) / imgh),
					height: "auto",
					left: left
				};
			} else {
				args = {
					width: "100%",
					height: "auto",
					left: 0
				};
			}

			if (animate) {
				$img.animate(args);
			} else {
				$img.css(args);
			}
		}

		/**
		 * Centers an image according its size and the current window size.
		 */

		function centerImage($img, animate) {
			var left = getImgLeftPosition($img);
			if (animate) {
				$img.animate({
					left: left
				});
			} else {
				$img.css({
					left: left
				});
			}

		}

		/**
		 * Calculates the image left position to center the image.
		 */

		function getImgLeftPosition($img) {
			var windowWidth = $(window).width(),
				imgSize = PEXETO.helper.getNaturalImgSize($img),
				imgw = imgSize.width,
				imgh = imgSize.height,
				displayWidth = Math.round(imgw * currentHeight / imgh),
				left = displayWidth > windowWidth ? -(displayWidth - windowWidth) / 2 : 0;
			return left;
		}

		/**
		 * Unbinds the attached events.
		 */

		function destroy() {
			$(window).off("." + eventNs);
			$root.off("." + eventNs);
		}

		init();

		return $(this);
	};
}(jQuery));


/**
 * Calls a callback function when all the images from a collection have been loaded.
 * A "callback" parameter should be added - the function to be called when all the images are loaded.
 * Dependencies: jQuery (http://jquery.com/)
 * 
 * Example usage: $('.test img').onPexetoImagesLoaded({callback:showImages});
 * 
 * @author Pexeto
 */
(function($){
	$.fn.onPexetoImagesLoaded = function (options) {
		var defaults = {},
			o = $.extend(defaults, options), 
			$images = $(this), 
			ie = $.browser.msie;
		
		

		/**
		 * Contains the main plugin functionality - once all the images are loaded, calls the callback function.
		 */
		function init() {
			var imagesNum = $images.length, imgLoaded = 0;

			$images.each(function() {
				
				$(this).load(function(e) {
					e.stopPropagation();
					imgLoaded++;
					if (imgLoaded === imagesNum) {
						o.callback.call(this);
					}
				});

				if (this.complete || (ie && this.width)) {
					$(this).trigger('load');
				}
			});
		}
		
		init();
	};
}(jQuery));


/**
 * This file contains the functionality for initializing all the scripts in the
 * site and also there are some main initial settings included here, such as
 * setting rounded corners automatically, setting the Twitter functionality,
 * etc.
 * 
 * @author Pexeto
 */

var PEXETO;

(function($){
PEXETO = {
	enableCufon:'off',
	ajaxurl:'',
	lightboxStyle:'light_rounded',
	initSite : function() {
	
		// sets the lightbox
		$('.gallery').each(function(i){
			$(this).find("a").each(function(){
				$(this).attr("rel", "lightbox[group-"+i+"]");
			});
		});
		
		$(".gallery a").each(function(){
			var title = $(this).attr("title"),
				$descEl = $(this).parents("dl:first").find(".gallery-caption"),
				desc = "";
			$(this).append('<div class="qg-overlay"><div class="qg-title">'+title+'</div></div>');
			if($descEl.length){
				desc = $descEl.html();
				$descEl.remove();
			}
			$(this).attr("title", desc);
		});
		
		//set the hover animation to the gallery images
		$('#content-container').delegate('.gallery a, a.lightbox-image', 'mouseenter', this.doOnImageMouseenter);
		$('#content-container').delegate('.gallery a, a.lightbox-image', 'mouseleave', this.doOnImageMouseleave);
		
		//initialize the lightbox
		this.setLightbox($("a[rel^='lightbox'],a[rel^='lightbox[group]']"));
		
		//set the tabs functionality
		$("ul.tabs").tabs("div.panes > div");
		
		//set the accordion functionality
		$('.accordion-container').each(function(){
			$(this).tabs($(this).find('div.pane'), {tabs: 'h2', effect: 'slide', initialIndex: null});
		});
		
		//init the contact form functionality
		$('.pexeto-contact-form').each(function(){
			$(this).pexetoContactForm();
		});
		
		$('#main-container').delegate('.hover', 'mouseover', function(){
			$(this).css({cursor:'pointer'});
		});
		
		$('.latest-projects-container').each(function(){
			$(this).pexetoItemSlider();
		});
		
		//SET THE SEARCH BUTTON CLICK HANDLER
		$('#search_button').click(function(event){
			event.preventDefault();
			$('#searchform').submit();
		});
		
		this.setSearchTextFunctionality();
		
		//set the hover animation of the images within anchors
		$('a img').not('#footer a img, .nohover, .gallery a img, #header-social-icons a img').hover(function(){
			$(this).stop().animate({opacity:0.9}, 300);
		},function(){
			$(this).stop().animate({opacity:1}, 300);
		});
		
		//add a slash between the items in the footer menu
		$('#footer-menu ul li').not(':last').append('/');
		
		//set the functionality to clear the default input values on click
		$('.clear-on-click').click(function(){
			var value= $(this).val(),
				def = $(this).data('default')||'';
			if(!def || (def===value)){
				$(this).data('default', $(this).val());
				$(this).val('');
			}
		}).focusout(function(){
			var def = $(this).data('default');
			if(!$(this).val() && def){
				$(this).val(def);
			}
		});
		
		this.setDropDown();
		this.loadCufon();
		
		this.checkIfMobile();
		
		//wrap the sidebar categories widget number of posts text node within a span
		var catSpans=$('li.cat-item, .widget_archive li').contents().filter(function() {
		    return this.nodeType == 3;
		});
		if(catSpans.length){
			catSpans.wrap($('<span />', {'class':'cat-number'}));
		}
		
		if(this.disableRightClick){
			this.disableRightClicking();
		}

	},
	
	/**
	 * Set the resizing functionality for the full screen background image
	 */
	setResizingBg:function(){
		var $bgImg=$('.bg-image:first'),
			setImageSize = function(){
				var windowWidth=$(window).width(),
					windowHeight=$(window).height(),
					aspectRatio = $bgImg.width()/$bgImg.height();
				
				if ((windowWidth / windowHeight) < aspectRatio) {
					var newRatio = windowHeight / $bgImg.height();
					$bgImg.css({
						height : '100%',
						width : 'auto',
						minWidth : 0,
						minHeight : 0,
						marginLeft : -($bgImg.width() * newRatio - windowWidth) / 2
					});
				} else {
					$bgImg.css( {
						height : 'auto',
						width : '100%',
						minWidth : 0,
						minHeight : 0,
						marginLeft : 0
					});
				}
		};

		$bgImg.onPexetoImagesLoaded({callback:function(){
				setImageSize();
				$bgImg.css({visibility:"visible", opacity:0}).animate({opacity:1});
			}
		});
		
		$(window).bind("resize load", setImageSize);
		
	},
	
	disableRightClicking:function(){
		$(document).bind('contextmenu', function(e) {
			if(PEXETO.rightClickMessage){
				alert(PEXETO.rightClickMessage);
			}
			return false;
		});
	},
	
	doOnImageMouseenter:function(){
		PEXETO.elemFadeIn($(this).find('.qg-overlay'));
		PEXETO.elemFadeOut($(this).find('img'), 0.8);
	},
	
	doOnImageMouseleave:function(){
		PEXETO.elemFadeOut($(this).find('.qg-overlay'), 0);
		PEXETO.elemFadeIn($(this).find('img'));
	},
	
	/**
	 * Fades an element in.
	 * @param $elem the element to be faded
	 */
	elemFadeIn:function($elem){
		$elem.stop().animate({opacity:1}, function(){
			$elem.animate({opacity:1}, 0);	
		});
	},
	
	/**
	 * Fades an elemen out to a selected opacity.
	 * @param $elem the element to be faded
	 * @param opacity the opacity to be faded to
	 */
	elemFadeOut:function($elem, opacity){
		$elem.stop().animate({opacity:opacity}, function(){
			$elem.animate({opacity:opacity}, 0);	
		});
	},
	
	/**
	 * JavaScript templating function
	 * http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
	 */
	template:function(s,d){
		 for(var p in d)
		   s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
		 return s;
	},
	
	setLightbox:function(elem){
		var defaults = {animation_speed:'normal', theme:PEXETO.lightboxStyle, overlay_gallery: false, slideshow:false, social_tools:''},
		options = jQuery.extend(defaults, PEXETO.lightboxOptions);
		elem.prettyPhoto(options);
	},
	
	loadCufon:function(){
		if(this.enableCufon==='on'){
			Cufon.replace('h1,h2,h3,h4,h5,h6,#portfolio-big-pagination,a.button span,.intro-text, a.button-small span,.drop-caps,h1.page-heading');
		}
	},
	
	checkIfMobile : function(){
		if(typeof PEXETO.isMobile !== "undefined"){
			return PEXETO.isMobile;
		}
		var userAgent=navigator.userAgent.toLowerCase(),
			devices = [
				{"class": "iphone", regex:/iphone/},
				{"class": "ipad", regex:/ipad/},
				{"class": "ipod", regex:/ipod/},
				{"class": "android", regex:/android/},
				{"class": "bb", regex:/blackberry/},
				{"class": "iemobile", regex:/iemobile/}
			],
			i, len;

		PEXETO.isMobile = false;
		for(i=0, len = devices.length; i<len; i+=1){
			if(devices[i].regex.test(userAgent)){
				$("body").addClass(devices[i]["class"]+" mobile");
				PEXETO.isMobile = true;
				PEXETO.mobileType = devices[i]["class"];
				return true;
			}
		}

		return false;
	},
	
	/**
	 * Sets a "placeholder" like functionality for the browsers that don't support input placeholders.
	 */
	setSearchTextFunctionality:function(){
		if(!$.support.placeholder){
			$('.search-input').each(function(){
				$(this).attr('value', $(this).attr('placeholder'));
			}).click(function(){
				$(this).attr('value','');
			});
		}
	},
	
	setScrollable:function(){
		return $('#slider-navigation').scrollable();
	},
	
	/**
	 * Adds the drop down menu functionality.
	 */
	setDropDown:function(){
		var logoDifference = $('#logo-container').height() - 28, //the size difference between the default logo height and the custom logo height set
			padding=21+logoDifference,
			defaultOffset = parseInt($('#navigation-container').css("marginTop"), 10),  //default menu top offset
			top=17,
			onMenuMouseover=function(){
				var $el = $(this),
					$ul = $el.find('ul:first'),
					left = $el.width(),
					parentUlNum = $ul.parents('ul').length,
					elWidth = $el.width(),
					ulWidth = $ul.width(),
					winWidth = $(window).width(),
					elOffset = $el.offset().left;


				$el.addClass('hovered');
				if(parentUlNum > 1 && (elWidth+ulWidth+elOffset>winWidth)){
					//if the drop down ul goes beyound the screen, move it on the left side
					$ul.css({left:-elWidth});
				}else if(parentUlNum===1){
					if(ulWidth+elOffset>winWidth){
						$ul.css({left:(winWidth-3-(ulWidth+elOffset))});
					}else{
						$ul.css({left:0});
					}
				}

				if(parentUlNum===1){
					if($('#navigation-container').offset().top > defaultOffset){
						//the logo and the menu cannot be located on the same line, the menu is positioned below the logo, so do not set the additional top padding
						$ul.data("padding", padding-logoDifference);
					}else{
						$ul.data("padding", padding);
					}
				}
					
				
				$ul.stop().css({height:'auto', paddingTop:0, top:($ul.data("padding")+$ul.data('top'))}).slideToggle(200, function()
				{
					$ul.css({overflow:"visible", visibility:'visible', paddingTop:$ul.data("padding"), top:$ul.data('top')});

				});
			},
			onMenuMouseout=function(){
				var $el = $(this),
				$ul = $el.find('ul:first');
				$el.removeClass('hovered');
				
				$ul.stop().css({paddingTop:0, top:($ul.data('padding')+$ul.data('top'))}).slideToggle(200, function()
				{	
					$ul.css({overflow:"hidden", display:"none"});
				});
			};

			$("#menu ul ul").data('padding', padding).data('top', top);
			$("#menu ul ul ul").data('padding', 0).data('top', 0);
		
			$("#menu ul li").has("ul").each(function(){
				var $el = $(this);
				$el.hoverIntent(onMenuMouseover, onMenuMouseout)
					.append('<span class="drop-arrow"></span>');
				
			});
		
		//SET THE SMALL RESOLUTION MENU
		
		$("#small-res-menu-button").on("click", function(){
			$("#small-res-menu").slideToggle();
			$(this).toggleClass("active");
		});
	},

	
	/**
	 * Loads the Nivo image slider.
	 */
	 //effect, showButtons, showArrows, slices, speed, interval, pauseOnHover, autoplay, columns, rows
	loadNivoSlider : function(obj, options) {
		// obj.find('img:first').css({visibility:"visible"});
		// loads the Nivo slider	
		var loadSlider = function(){
			obj.nivoSlider( {
				effect : options.animation, // Specify sets like:
				// 'fold,fade,sliceDown'
				slices : options.slices, //For slice animations
				boxCols: options.columns, // For box animations
			    boxRows: options.rows, // For box animations
				animSpeed : options.speed,
				pauseTime : options.interval,
				startSlide : 0, // Set starting Slide (0 index)
				directionNav : options.arrows, // Next & Prev
				directionNavHide : true, // Only show on hover
				controlNav : options.buttons, // 1,2,3...
				controlNavThumbs : false, // Use thumbnails for
				// Control
				// Nav
				controlNavThumbsFromRel : false, // Use image rel for
				// thumbs
				keyboardNav : true, // Use left & right arrows
				pauseOnHover : options.pauseOnHover, // Stop animation while hovering
				manualAdvance : !options.autoplay, // Force manual transitions
				captionOpacity : 0.8, // Universal caption opacity
				beforeChange : function() {
				},
				afterChange : function() {
				},
				slideshowEnd : function() {
				} // Triggers after all slides have been shown
			}).css({minHeight:0});

			// remove numbers from navigation
				$('.nivo-controlNav a').html('');
				$('.nivo-directionNav a').html('');
			};

			if(!$.browser.msie){
				//load the slider once the images get loaded
				obj.find('img').onPexetoImagesLoaded({callback:loadSlider});
			}else{
				loadSlider();
			}

	},

	helper : {
		/**
		 * Returns the natural size of an image. If the image supports the naturalWidth and naturalHeight properties, the function will use them, otherwise it will use the standard width and height properties.
		 * @param $img the image whose size to retrieve'
		 * @return an object literal containing width and height of the image
		 */
		getNaturalImgSize:function($img){
			var img = $img.get(0);
			if(img.naturalWidth && img.naturalHeight){
				return {width:img.naturalWidth, height:img.naturalHeight};
			}else{
				return {width:$img.width(), height:$img.height()};
			}
		}
	},

	url : {
		getUrlParameters:function(){
		    var vars = {};
		    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		        vars[key] = value;
		    });
		    return vars;
		},
		addUrlParameter:function(url, param){
		    url += (url.split('?')[1] ? '&':'?') + param;
		    return url;
		}

	}
};
}(jQuery));

