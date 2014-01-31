// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
 
  this.jrtmpl = function tmpl(str, data){
	// Figure out if we're getting a template, or if we need to
	// load the template - and be sure to cache the result.
	var fn = !/\W/.test(str) ?
	  cache[str] = cache[str] ||
		tmpl(document.getElementById(str).innerHTML) :
	 
	  // Generate a reusable function that will serve as a template
	  // generator (and which will be cached).
	  new Function("obj",
		"var p=[],print=function(){p.push.apply(p,arguments);};" +
	   
		// Introduce the data as local variables using with(){}
		"with(obj){p.push('" +
	   
		// Convert the template into pure JavaScript
		str
		  .replace(/[\r\t\n]/g, " ")
		  .split("<%").join("\t")
		  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
		  .replace(/\t=(.*?)%>/g, "',$1,'")
		  .split("\t").join("');")
		  .split("%>").join("p.push('")
		  .split("\r").join("\\'")
	  + "');}return p.join('');");
   
	// Provide some basic currying to the user
	return data ? fn( data ) : fn;
  };
})();

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
* Licensed under the MIT License (LICENSE.txt).
*
* Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
* Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
* Thanks to: Seamus Leahy for adding deltaX and deltaY
*
* Version: 3.0.6
*
* Requires: 1.2.2+
*/

(function(d){var b=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks){for(var a=b.length;a;){d.event.fixHooks[b[--a]]=d.event.mouseHooks}}d.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var e=b.length;e;){this.addEventListener(b[--e],c,false)}}else{this.onmousewheel=c}},teardown:function(){if(this.removeEventListener){for(var e=b.length;e;){this.removeEventListener(b[--e],c,false)}}else{this.onmousewheel=null}}};d.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}});function c(j){var h=j||window.event,g=[].slice.call(arguments,1),k=0,i=true,f=0,e=0;j=d.event.fix(h);j.type="mousewheel";if(h.wheelDelta){k=h.wheelDelta/120}if(h.detail){k=-h.detail/3}e=k;if(h.axis!==undefined&&h.axis===h.HORIZONTAL_AXIS){e=0;f=-1*k}if(h.wheelDeltaY!==undefined){e=h.wheelDeltaY/120}if(h.wheelDeltaX!==undefined){f=-1*h.wheelDeltaX/120}g.unshift(j,k,f,e);return(d.event.dispatch||d.event.handle).apply(this,g)}})(jQuery);



/**
 * @author trixta
 * @version 1.2
 */
(function(c){var b={pos:[-260,-260]},d=3,h=document,g=h.documentElement,e=h.body,a,i;function f(){if(this===b.elem){b.pos=[-260,-260];b.elem=false;d=3}}c.event.special.mwheelIntent={setup:function(){var j=c(this).bind("mousewheel",c.event.special.mwheelIntent.handler);if(this!==h&&this!==g&&this!==e){j.bind("mouseleave",f)}j=null;return true},teardown:function(){c(this).unbind("mousewheel",c.event.special.mwheelIntent.handler).unbind("mouseleave",f);return true},handler:function(j,k){var l=[j.clientX,j.clientY];if(this===b.elem||Math.abs(b.pos[0]-l[0])>d||Math.abs(b.pos[1]-l[1])>d){b.elem=this;b.pos=l;d=250;clearTimeout(i);i=setTimeout(function(){d=10},200);clearTimeout(a);a=setTimeout(function(){d=3},1500);j=c.extend({},j,{type:"mwheelIntent"});return c.event.handle.apply(this,arguments)}}};c.fn.extend({mwheelIntent:function(j){return j?this.bind("mwheelIntent",j):this.trigger("mwheelIntent")},unmwheelIntent:function(j){return this.unbind("mwheelIntent",j)}});c(function(){e=h.body;c(h).bind("mwheelIntent.mwheelIntentDefault",c.noop)})})(jQuery);

/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);

/*!
 * jQuery imagesLoaded plugin v1.0.4
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

(function(a,b){a.fn.imagesLoaded=function(i){var g=this,e=g.find("img").add(g.filter("img")),c=e.length,h="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";function f(){i.call(g,e)}function d(j){if(--c<=0&&j.target.src!==h){setTimeout(f);e.unbind("load error",d)}}if(!c){f()}e.bind("load error",d).each(function(){if(this.complete||this.complete===b){var j=this.src;this.src=h;this.src=j}});return g}})(jQuery);

/*
 * Special event for image load events
 * Needed because some browsers does not trigger the event on cached images.

 * MIT License
 * Paul Irish     | @paul_irish | www.paulirish.com

 * Andree Hansson | @peolanha   | www.andreehansson.se
 * 2010.
 *
 * Usage:
 * $(images).bind('load', function (e) {
 *   // Do stuff on load
 * });
 * 
 * Note that you can bind the 'error' event on data uri images, this will trigger when
 * data uri images isn't supported.
 * 
 * Tested in:
 * FF 3+
 * IE 6-8
 * Chromium 5-6
 * Opera 9-10
 */


(function($){

	PEXETO.share = {

		facebook:function(url){
			return '<iframe src="//www.facebook.com/plugins/like.php?href='+encodeURIComponent(url)+'&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe>'; 
		},
		gplus:function(url, lang){
			return '<div class="g-plusone" data-size="medium" data-href="'+url+'"></div>\
					<script type="text/javascript" >\
					window.___gcfg = {lang: "'+lang+'"};\
					  (function() {\
						var po = document.createElement("script"); po.type = "text/javascript"; po.async = true;\
						po.src = "https://apis.google.com/js/plusone.js";\
						var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);\
					  })();\
					</script>'
		},
		twitter:function(url, text){
			return '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="https://platform.twitter.com/widgets/tweet_button.html?url='+encodeURIComponent(url)+'&counturl='+encodeURIComponent(url)+'&text='+encodeURIComponent(text)+'" style="width:130px; height:20px;"></iframe>'
		},
		pinterest:function(url, image, title){
			return '<a href="http://pinterest.com/pin/create/button/?url='+encodeURIComponent(url)+'&media='+encodeURIComponent(image)+'&description='+encodeURIComponent(title)+'" class="pin-it-button" count-layout="horizontal"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a><script type="text/javascript" src="//assets.pinterest.com/js/pinit.js"></script>';
		}
	};

})(jQuery);

/**
 * Rotation script.
 * code from http://javascriptisawesome.blogspot.com.au/2011/09/jquery-css-rotate-and-animate-rotation.html
 */
(function($){
 var _e = document.createElement("canvas").width
 $.fn.cssrotate = function(d) {  
	return this.css({
  '-moz-transform':'rotate('+d+'deg)',
  '-webkit-transform':'rotate('+d+'deg)',
  '-o-transform':'rotate('+d+'deg)',
  '-ms-transform':'rotate('+d+'deg)'
 }).prop("rotate", _e ? d : null)
 }; 
 var $_fx_step_default = $.fx.step._default;
 $.fx.step._default = function (fx) {
 if(fx.prop != "rotate")return $_fx_step_default(fx);
 if(typeof fx.elem.rotate == "undefined")fx.start = fx.elem.rotate = 0;
 $(fx.elem).cssrotate(fx.now)
 }; 
})(jQuery);

/**
 * Fullscreen slider of images. Displays the images in full-width or full-height size of the window, with the following functionality enabled:
 * - previous/next arrows for navigation
 * - thumbnail tooltips for image preview on previous and next arrows
 * - fullscreen button for displaying the image on the fullscreen without the additional elements such as header and footer
 * - sharing functionality
 * - close button
 * - description for each image
 * - image counter 
 * 
 * Dependencies:
 * - imagesLoaded - Paul Irish
 * - mousewheel - Brandon Aaron (http://brandonaaron.net)
 * - mwheelintent - http://www.protofunc.com/scripts/jquery/mwheelIntent/
 * - jrtmpl - John Resig templating code
 * - PEXETO.share - builds the sharing buttons code
 * - touchwipe - Andreas Waltl (http://www.netcu.de)
 * - Rotation script - http://javascriptisawesome.blogspot.com.au/2011/09/jquery-css-rotate-and-animate-rotation.html
 *
 * Events triggered on the root object
 * - sliderImgLoaded - fired when the first image in the slider has been loaded and the slider is initialized
 * - fullscreen - fired when the fullscreen mode is changed
 * - nextItem - fired when the "Next Project" link was clicked (the initializator object should take care of showing the next item)
 * - prevItem - fired when the "Previous Project" link was clicked (the initializator object should take care of showing the previous item)
 * - imgRefresh - fired when something related with the image size and positioning is changed
 * - closeSlider - fired when the close button is clicked (the initializator object should take care of hiding the slider )
 * 
 * @author Pexeto
 * http://pexeto.com 
 */
(function( $ ) {
	var sliderIndex = 0;
	$.fn.pexetoFullscreenSlider = function( options ){
		
		var defaults={
			easing              : "easeOutElastic",
			animationSpeed      : 400,
			showThumbPreview    : true,
			fullscreen          : false,  //boolean setting the default fullscreen state (true if fullscreen)
			showClose           : true,   //boolean setting whether to show the Close button or not
			subtractElements    : [],     //array of jQuery objects whose height will be subtracted from the window height to set the image in full height (e.g. header, footer)
			loadPortions        : 5,      //number of images to load on portions

			//selectors and classes
			leftArrowId         : "preview-left-arrow",
			rightArrowId        : "preview-right-arrow",
			arrowsClass         : "preview-arrows",
			sliderImagesClass   : "slider-images",
			previewContentClass : "preview-content",
			imgWrapperClass     : "slider-img-wrapper",
			loadingClass        : "slider-loading",
			descriptionClass    : "item-desc",
			shareClass          : "item-share",
			countClass          : "item-count",
			closeClass          : "close-btn",
			fullsceenClass      : "fullscreen-btn",
			shareId             : "share-container",
			sharePointerClass   : "share-pointer",
			disabledArrowClass  : "disabled"
		},
		//define some helper variables that will be used globally by the plugin
		o = $.extend(defaults, options),
			$root             = $(this),
			item              = o.item,
			images            = item.images,
			imgNum            = images.length,
			$larrow           = null,
			$rarrow           = null,
			$larrowDiv        = null,
			$rarrowDiv        = null,
			$imageContainer   = null,
			$previewContent   = null,
			$descContainer    = null,
			$shareButton      = null,
			$shareContainer   = null,
			$countContainer   = null,
			$closeBtn         = null,
			$fullscreenBtn    = null,
			$lpreview         = null,
			$rpreview         = null,
			current           = 0,
			fullscreen        = false,
			inScreenAnimation = false,
			inAnimation       = false,
			pendingImg        = -1,
			shareShow         = false,
			isIE8             = $.browser.msie && parseInt($.browser.version, 10) === 8,
			isIdevice         =(navigator.platform === 'iPad' || navigator.platform === 'iPhone' || navigator.platform === 'iPod')?true:false,
			resizeArgs        = {fullwidth:item.fullwidth, subtractElements:o.subtractElements, resizeParent:!isIdevice, imgLoaded:true, fullscreen:o.fullscreen, imgSelector:"."+o.imgWrapperClass},
			$nextTooltip      = null,
			$prevTooltip      = null,
			rRotated          = false, //right arrow rotated
			lRotated          = false, //left arrow rotated
			sharingButtons    = [
				{name:"facebook", arg:[item.link]},
				{name:"twitter", arg:[item.link, o.texts.twitterText]},
				{name:"gplus", arg:[item.link, o.texts.gplusLang]},
				{name:"pinterest", arg:[item.link, item.images[0].img, item.title]}
			],
			showShare         = (o.excludeSharing.length===sharingButtons.length && !o.additionalButtons)?false:true,
			//TEMPLATES
			tmpl              = {
				previewContent : '<% if(showShare){ %><div class="'+o.shareClass+'">'+o.texts.shareText+'</div><% } %><div class="'+o.countClass+'"></div><div class="preview-description"><div class="item-title"><%= title %></div><div class="'+o.descriptionClass+'"></div></div>',

				shareContent: '<div id="'+o.shareId+'"><ul></ul><div class="'+o.sharePointerClass+'"></div></div>'
			},
			eventNs           = "fs"+sliderIndex,
			lastLoaded        = 0,
			iFullscreen       = false;

		/**
		 * Inits the main functionality - calls the initialization functions.
		 */
		function init() {
			sliderIndex++;

			var parentClass = item.fullwidth ? "full-width" : "full-height",
				removeClass = item.fullwidth ? "full-height" : "full-width";
			if(!o.showClose){
				parentClass+=' no-close';
			}
			$root.removeClass(removeClass).addClass(parentClass);
			if (o.fullscreen) {
				fullscreen = true;
			}

			buildMarkup();

			addNavigation();
			loadSlider();
			loadNextImages();
			bindEventHandlers();

		}

		/**
		 * Loads the slider once all the images are loaded.
		 */
		function loadSlider() {
			$imageContainer.imagesLoaded(function () {
				resizeArgs.subtractElements.push({
					el: $previewContent,
					position: "Bottom"
				});
				if (o.fullscreen) {
					setOuterElementsPosition(false);
				}
				setDescription(0);
				setCounter(0);
				 $root.trigger("sliderImgLoaded").pexetoResizableImg(resizeArgs);
				$previewContent.css({
					bottom: 0
				});
				refreshArrowState(false);
			});
		}

		/**
		 * Loads all the images:
		 * - creates an image element
		 * - binds on images loaded event
		 */
		function loadNextImages() {
			var i, image, thumb,
				len = (lastLoaded+o.loadPortions>=imgNum)?(imgNum-1):(lastLoaded+o.loadPortions);
			for (i = lastLoaded+1; i <= len; i += 1) {
				if(!images[i].loaded){
					image = new Image();
					thumb = null;
					image.setAttribute("src", images[i].img);

					//preload the thumbnail preview images
					if (o.showThumbPreview) {
						thumb = new Image();
						thumb.src = images[i].thumb;
					}

					(function (i) {
						images[i].el = $('<div/>', {
							"class": o.imgWrapperClass
						}).append(image).imagesLoaded(function () {
							images[i].loaded = true;
							if (pendingImg === i) {
								//image has been selected to show, but wasn't loaded yet
								pendingImg = -1;
								hideLoading();
								showImage(true);
							}
						});
					})(i);
				}
			}

			lastLoaded = len;
		}

		/**
		 * Binds event handlers to the elements/
		 */
		function bindEventHandlers() {
			//MAIN ROOT EVENTS
			$root.on("sliderVisible."+eventNs, function (e, args) {
				//when the slider is visible, show the elements
				$larrow.fadeIn();
				$rarrow.fadeIn();
				$previewContent.css({
					bottom: 0
				});

				if(PEXETO.checkIfMobile() && PEXETO.mobileType==="iphone" && (window.orientation === -90 || window.orientation === 90) && !fullscreen){
					doOnToggleFullscreen();
					iFullscreen = true;
				}
			}).on("hide."+eventNs, hideElements)
			  .on("destroy."+eventNs, destroy);

			//BUTTONS EVENTS
			if (showShare) {
				$shareButton.click(doOnShareClicked);
			}
			if (o.showClose) {
				$closeBtn.on("click", doOnClose);
			}
			$fullscreenBtn.on("click", function(){
				iFullscreen = false;
				doOnToggleFullscreen();
			});


			//NAVIGATION EVENTS
			$larrow.on("click", doOnPreviousClicked).on("mouseenter", function () {
				doOnArrowMouseEnter(false);
			}).on("mouseleave", function () {
				doOnArrowMouseLeave(false);
			});
			$rarrow.on("click", doOnNextClicked).on("mouseenter", function () {
				doOnArrowMouseEnter(true);
			}).on("mouseleave", function () {
				doOnArrowMouseLeave(true);
			});

			$root.touchwipe({
				wipeLeft: doOnNextClicked,
				wipeRight: doOnPreviousClicked
			});

			$imageContainer.on("mousewheel", function (e, delta) {
				e.preventDefault();
				if (delta < 0) {
					doOnNextClicked();
				} else {
					doOnPreviousClicked();
				}
			});

			$(window).on("keydown."+eventNs, function(e){
		  		if(e.which===37){
		  			doOnPreviousClicked();
		  		}else if(e.which===39){
		  			doOnNextClicked();
		  		}
		  	});

			if(o.showClose){
				$(window).on("popstate."+eventNs, doOnClose);
			}
		  
		  	if(PEXETO.checkIfMobile() && PEXETO.mobileType==="iphone"){
		  		$(window).on("orientationchange."+eventNs, function(){
		  			if ((window.orientation === -90 || window.orientation === 90) && !fullscreen){
		  				iFullscreen = true;
		  				doOnToggleFullscreen();
		  			}else if(window.orientation === 0 && iFullscreen && fullscreen){
		  				doOnToggleFullscreen();
		  				iFullscreen = false;
		  			}
		  		});
		  	}
		}



		/***************************************************************************************************************
		 * ELEMENT RENDERING FUNCTIONS
		 ***************************************************************************************************************/

		/**
		 * Builds the main slider markup.
		 */
		function buildMarkup() {
			var $wrapDiv, img, addClass;

			$imageContainer = $('<div />', {
				"class": o.sliderImagesClass
			}).appendTo($root);
			//add the first image
			$wrapDiv = $('<div/>', {
				"class": o.imgWrapperClass
			});
			img = new Image();
			img.setAttribute("src", images[0].img);
			images[0].el = $wrapDiv;

			$wrapDiv.append(img);
			$imageContainer.append($wrapDiv);

			//generate the content elements
			$previewContent = $('<div />', {
				"class": o.previewContentClass
			}).appendTo($root);
			$previewContent.append(jrtmpl(tmpl.previewContent, {
				cat: (item.cat || ''),
				title: item.title,
				content: item.content,
				showShare: showShare
			}));
			$descContainer = $previewContent.find("." + o.descriptionClass + ":first");

			//sharing functionality
			if (showShare) {
				$shareButton = $previewContent.find("." + o.shareClass + ":first");
				$previewContent.append(jrtmpl(tmpl.shareContent));
				$shareContainer = $('#' + o.shareId, $previewContent);
				addSociableLinks();
			}
			$countContainer = $previewContent.find("." + o.countClass + ":first");

			//buttons functionality
			if (o.showClose) {
				$closeBtn = $('<div />', {
					"class": o.closeClass,
					"title": o.texts.closeText
				}).appendTo($root);
			}
			addClass = o.fullscreen ? " fullscreen-exit" : "";
			$fullscreenBtn = $('<div />', {
				"class": o.fullsceenClass + addClass,
				"title": o.texts.fullscreenText
			}).appendTo($root);

			$root.append($('<div />', {
				"class": "clear"
			}));
		}

		/**
		 * Adds the sociable buttons to the share container.
		 */
		function addSociableLinks() {
			var $shareUl = $shareContainer.find('ul:first'),
				i, len, sfn;
			for (i = 0, len = sharingButtons.length; i < len; i += 1) {
				sfn = PEXETO.share[sharingButtons[i].name];
				if ($.inArray(sharingButtons[i].name, o.excludeSharing) === -1) {
					if (sfn && typeof sfn === "function") {
						$shareUl.append('<li>' + sfn.apply(null, sharingButtons[i].arg) + '</li>');
					}
				}
			}

			if (o.additionalButtons) {
				$shareUl.append(o.additionalButtons);
			}
		}

		/**
		 * Adds the navigation elements
		 */
		function addNavigation() {
			var prevText = o.texts.prevProjectText.replace(" ", "<br/>"),
				nextText = o.texts.nextProjectText.replace(" ", "<br/>");

			//previous/next arrows
			$larrow = $('<div class="' + o.arrowsClass + '" id="' + o.leftArrowId + '"><div class="arrow"></div></div>').appendTo($root);
			$rarrow = $('<div class="' + o.arrowsClass + '" id="' + o.rightArrowId + '"><div class="arrow"></div></div>').appendTo($root);
			$larrowDiv = $larrow.find("div:first");
			$rarrowDiv = $rarrow.find("div:first");

			//previous project/next project tooltips
			if (o.linkProjects) {
				$nextTooltip = $('<div class="next-bubble"><span>' + nextText + '</span></div>').appendTo($rarrow);
				$prevTooltip = $('<div class="prev-bubble"><span>' + prevText + '</span></div>').appendTo($larrow);
			}
			//previous image/next image preview tooltips
			if (o.showThumbPreview) {
				$lpreview = $("<div />", {
					"class": "circle circle-preview prev-preview"
				}).appendTo($larrow);
				$rpreview = $("<div />", {
					"class": "circle circle-preview next-preview"
				}).appendTo($rarrow);
				refreshPreviewImages(0);
			}
		}


		/***************************************************************************************************************
		 * EVENT HANDLER FUNCTIONS
		 ***************************************************************************************************************/

		/**
		 * On previous arrow click event handler. Shows the previous image if there is one or shows the "previous project" tooltip.
		 */
		function doOnPreviousClicked() {
			if (!inAnimation) {
				if (current !== 0) {
					//show previous image
					showImage(false);
				} else {
					//it's the first item, snow the previous project link
					if (o.linkProjects && item.prevItem) {
						showLoading();
						$root.trigger("prevItem");
					}
				}
			}
		}

		/**
		 * On next arrow click event handler. Shows the next image if there is one or shows the "next project" tooltip.
		 */
		function doOnNextClicked() {
			if (!inAnimation) {
				if ((current + 1) < imgNum) {
					//show next image
					if (images[current + 1].loaded) {
						showImage(true);
					} else {
						pendingImg = current + 1;
						showLoading();
					}
					if(current+1 === lastLoaded && lastLoaded+1 < imgNum){
						loadNextImages();
					}
				} else {
					//it's the last item, show the next project link
					if (o.linkProjects && item.nextItem) {
						showLoading();
						$root.trigger("nextItem");
					}
				}
			}
		}

		/**
		 * On share link click event handler. Shows/hides the sharing buttons container.
		 */
		function doOnShareClicked() {
			if (shareShow) {
				//hide share container
				$shareContainer.animate({
					bottom: '-=20',
					opacity: 0
				}, 300, function () {
					$shareContainer.hide();
					shareShow = false;
				});
			} else {
				//show share container
				$shareContainer.show().animate({
					bottom: '+=20',
					opacity: 1
				}, 300, function () {
					shareShow = true;
				});
			}

		}

		/**
		 * On previous/next arrow mouse enter evert handler. Depending on the current state and settings shows a preview of previous/next
		 * image preview.
		 * @param next boolean - if true next arrow is hovered, if false - previous arrow is hovered
		 */
		function doOnArrowMouseEnter(next) {
			var $preview = next ? $rpreview : $lpreview,
				last = (next && current === imgNum - 1) || (!next && current === 0) ? true : false;

			if (!last) {
				//show the preview image tooltip
				$preview.stop().hide().fadeIn();
			}

			if (o.linkProjects && last && !next && item.prevItem) {
				//animate the "previous project" tooltip
				$prevTooltip.stop().fadeIn();
				$larrowDiv.stop().animate({
					rotate: 90
				}, {
					duration: 500
				});
				lRotated = true;
			}
		}

		/**
		 * On previous/next arrow mouse leave evert handler. Depending on the current state and settings hides a preview of previous/next
		 * image preview.
		 * @param next boolean - if true next arrow is hovered, if false - previous arrow is hovered
		 */
		function doOnArrowMouseLeave(next) {
			var $preview = null,
				first = (!next && current === 0) ? true : false;

			if (o.showThumbPreview) {
				//hide the preview image tooltip
				$preview = next ? $rpreview : $lpreview;
				$preview.stop().fadeOut();
			}

			if (o.linkProjects && first && item.prevItem) {
				//animate the "previous project" tooltip
				$prevTooltip.stop().show().fadeOut();
				if (lRotated) {
					$larrowDiv.stop().animate({
						rotate: 0
					}, {
						duration: 500
					});
					lRotated = false;
				}
			}
		}


		/**
		 * On fullscreen button click event handler - toggles fullscreen mode.
		 */
		function doOnToggleFullscreen() {
			if (!inScreenAnimation) {
				inScreenAnimation = true;
				fullscreen = !fullscreen;
				$fullscreenBtn.toggleClass("fullscreen-exit");

				if (!fullscreen) {
					//refresh the description and image counter
					setDescription(current);
					setCounter(current);
				}
				$root.trigger("fullscreen", [fullscreen]);
				setOuterElementsPosition(true);

				//set the root height
				var windowHeight = $(window).height(),
					h = 0,
					i = o.subtractElements.length;

				if (!fullscreen) {
					while (i--) {
						h += o.subtractElements[i].el.outerHeight();
					}
				}

				if (!isIdevice) {
					$root.parent().animate({
						height: (windowHeight - h)
					});
				}
				$root.trigger("imgRefresh", [{animate:true}]);
				$root.animate({
					height: (windowHeight - h)
				}, function () {
					inScreenAnimation = false;
				});

				return $root;
			}
		}


		/**
		 * On close button click event handler. Triggers a "closeSlider" event, if it is in fullscreen mode, first removes fullscreen mode.
		 */
		function doOnClose() {
			if (fullscreen) {
				doOnToggleFullscreen().promise().done(function () {
					$root.trigger("closeSlider");
				});
			} else {
				$root.trigger("closeSlider");
				$previewContent.fadeOut();
			}
		}


		/***************************************************************************************************************
		 * ELEMENT/STATE CHANGING FUNCTIONS
		 ***************************************************************************************************************/

		/**
		 * Displays next or previous image.
		 * @param next boolean, if true - show next image, if false - show previous image
		 */
		function showImage(next) {
			var frameWidth = $(window).width() + 10,
				mult = next ? 1 : -1; //multiplier : makes the positioning values positive or negative, depending whether to show next image or previous image
			inAnimation = true;
			setDescription(current + mult);
			setCounter(current + mult);

			images[current].el.animate({
				left: -frameWidth * mult
			}, o.animationSpeed, o.easing, function () {
				$(this).detach();
			});
			current += mult;
			if (o.showThumbPreview) {
				refreshPreviewImages(current);
			}

			refreshArrowState(true);
			
			//add the image and animate it
			images[current].el.css({
				left: frameWidth * mult
			}).appendTo($imageContainer).animate({
				left: 0
			}, o.animationSpeed, o.easing, function () {
				inAnimation = false;
			});


			$root.trigger("imgRefresh");
		}

		/**
		 * Sets the description of the image that has been selected.
		 * @param index the index of the image that is being displayed
		 */
		function setDescription(index) {
			if (!fullscreen) {
				var desc = images[index].desc ? '<span class="separator"></span>' + images[index].desc : '';
				$descContainer.html(desc);
			}

		}


		/**
		 * Refreshes the image counter.
		 * @param index the index of the currently displayed image
		 */
		function setCounter(index) {
			if (!fullscreen) {
				$countContainer.html((index + 1) + "/" + imgNum);
			}
		}

		/**
		 * Refreshes the arrows state regarding the previous/next project tooltips.
		 * @param both boolean setting whether to refresh both arrows. If false, will refresh only the "next" arrow
		 */
		function refreshArrowState(both) {
			if (current === imgNum - 1) {
				if(o.linkProjects && item.nextItem){
					//show the next project tooltip
					$nextTooltip.fadeIn();
					$rarrowDiv.animate({
						rotate: 90
					}, {
						duration: 500
					});
					rRotated = true;
				}else{
					$rarrowDiv.addClass(o.disabledArrowClass);
				}
			} else {
				if(o.linkProjects && item.nextItem){
					//hide the next project tooltip
					$nextTooltip.hide();
					if (rRotated) {
						$rarrowDiv.animate({
							rotate: 0
						}, {
							duration: 500
						});
						rRotated = false;
					}
				}else{
					$rarrowDiv.removeClass(o.disabledArrowClass);
				}
			}
			if (current === 0) {
				if(o.linkProjects && item.prevItem && both){
					//show the previous project tooltip
					$prevTooltip.fadeIn();
					$larrowDiv.animate({
						rotate: 90
					}, {
						duration: 500
					});
					lRotated = true;
				}else if(!o.linkProjects || !item.prevItem){
					$larrowDiv.addClass(o.disabledArrowClass);
				}
			} else {
				if(o.linkProjects && item.prevItem && both){
					//hide the previous project tooltip
					$prevTooltip.hide();
					if (lRotated) {
						$larrowDiv.animate({
							rotate: 0
						}, {
							duration: 500
						});
						lRotated = false;
					}
				}else{
					$larrowDiv.removeClass(o.disabledArrowClass);
				}
			}
		}

		/**
		 * Refreshes the small preview images that are displayed on arrow hover
		 * @param index - the index of the item according which the preview images should be changed
		 */
		function refreshPreviewImages(index) {
			if (index + 1 < imgNum) {
				$rpreview.html('<img src="' + images[index + 1].thumb + '" />');
			} else {
				$rpreview.stop().fadeOut();
			}

			if (index > 0) {
				$lpreview.html('<img src="' + images[index - 1].thumb + '" />');
			} else {
				$lpreview.fadeOut();
			}
		}

		/**
		 * Positions the elements around the slider according to the fullscreen mode.
		 */
		function setOuterElementsPosition(animate) {
			var i, len, args, margin, el, sub;
			for (i = 0, len = o.subtractElements.length; i < len; i += 1) {
				el = o.subtractElements[i];
				args = {};
				sub = isIE8 ? 1 : 0;
				args["margin" + o.subtractElements[i].position] = fullscreen ? (-o.subtractElements[i].el.outerHeight()) : 0;

				if(fullscreen){
					margin = el.el.outerHeight()-sub;
					args["margin" + el.position] = -margin;
					if (animate) {
						(function(el, margin){
							el.el.animate(args, function(){
								if(!isIE8){
									$(this).css({height:el.el.outerHeight(), overflow:"hidden"});
								}
							});
						}(el, margin));
					} else {
						el.el.css(args);
					}
				}else{
					if(!isIE8){
					 	el.el.css({height:"auto", overflow:"visible"});
					}
					args["margin" + el.position] = 0;
					el.el.animate(args);
				}

				
			}
		}

		/**
		 * Hides the navigation elements and buttons.
		 */
		function hideElements() {
			var elements = [$rarrow, $larrow, $closeBtn, $fullscreenBtn];
			$.each(elements, function (i, el) {
				el.hide();
			});
			$previewContent.animate({
				opacity: 0
			});
		}

		function destroy(){
			hideLoading();
			$.removeData($root.get(0));
			$root.off("."+eventNs);
			$(window).off("."+eventNs);
		}

		/**
		 * Displays a loader on the current image.
		 */
		function showLoading() {
			images[current].el.append('<div class="' + o.loadingClass + '"></div>');
		}

		/**
		 * Hides the loader on the current image.
		 */
		function hideLoading() {
			images[current].el.find("." + o.loadingClass).remove();
		}


		init();

		return $(this);
	};
}( jQuery ));



/**
 * Portfolio grid gallery - displays the portfolio items separated in a grid structure. Provides different options for the
 * gallery item clicking actions - open the image in lightbox, open a preview section with more images displayed in a slider,
 * open a custom link, etc.
 * Provides a category filter to display items by a selected category.
 * All the functionality is executed via AJAX requests, there are no page reloads.
 * 
 * Dependencies:
 * - PEXETO - for general helper functions (by Pexeto)
 * - pexetoFullscreenSlider - the horizontal slider functionality on image preview (by Pexeto)
 * - jQuery imagesLoaded plugin v1.0.4 - http://github.com/desandro/imagesloaded
 * - jQuery Masonry - http://masonry.desandro.com
 * - jrtmpl - John Resig templating code
 * 
 * @author Pexeto
 * http://pexeto.com 
 */
(function($){
	$.fn.pexetoGridGallery=function(options){
		var defaults={
			//default settings
			itemsPerPage        : 15,                   //the number of items per page
			showCategories      : true,                 //if set to false, the categories will be hidden
			easing              : 'easeOutSine',        //the animation easing
			scrollEasing        : 'easeOutExpo',        //the easing of the scrolling animation in the preview slider section
			imageWidth          : 260,                  //the default image width
			imageHeight         : 160,                  //the default image height
			itemMargin          : 7,                    //the right margin of the items (space between the items)
			category            : -1,                   //category to load by default (-1 for all categories)
			categories          : [],                   //the categories that will be displayed in the filter
			windowMargin        : 7,                    //the sum of the window marging from left and right
			orderBy             : 'date',               //the way the items should be ordered - available options: "date" and "custom"
			//texts
			texts               : {
				allText        : 'ALL',
				filterText     : 'Filter',
				loadMoreText   : 'Load More',
				closeText      : 'Close',
				fullscreenText : 'Fullscreen Mode',
				shareText      : 'Share'
			},
			//selectors and class/id names
			itemClass           : 'content-box',        //the class of the div that wraps each portfolio item data
			itemInfoClass       : 'content-box-content',
			itemTextClass       : 'content-box-text',
			loadingClass        : 'loading',
			btnLoadingClass     : 'btn-loading',
			galleryId           : 'grid-gallery',
			categoryHolderId    : 'portfolio-categories',
			selectedClass       : 'selected',
			openedClass         : 'filter-opened',
			filterBtnId         : 'filter-btn',
			galleryContainerId  : 'gallery-container',
			slideContainerId    : 'gallery-slide-container',
			previewWrapperClass : 'slider-wrapper',
			backBtnClass        : 'back-btn',
			backBtnEndClass     : 'back-btn-end',
			itemLoadingClass    : 'portfolio-loading'
		},
		//define some helper variables that will be globally used within the plugin
		o                 = $.extend(defaults, options),
		$wrapper          = $(this),
		$galleryContainer = $wrapper.find('#'+o.galleryContainerId),
		$previewWrapper   = $('<div />', {"class":o.previewWrapperClass}).appendTo($wrapper),
		$previousWrapper  = null,
		$filterBtn        = null,
		$root             = $('<div/>', {'id':o.galleryId}).appendTo($galleryContainer),
		items             = [],         //will contain all the portfolio items
		itemsMap          = [],
		cachedItems       = [],
		$moreBtn          = null,       //the "Load More" button element
		$moreBtn2         = null,       //the "Load More" button element
		$catHolder        = null,       //the category filter holder
		currentCat        = o.category, //the ID of the current selectec category
		windowWidth       = $(window).width(),  
		currentItem       = null,
		previewMode       = false,      //a boolean setting whether a preview content section is displayed
		currentXhr        = null,
		inLoading         = false,
		galleryLoaded     = false,
		isIdevice         = (navigator.platform === 'iPad' || navigator.platform === 'iPhone' || navigator.platform === 'iPod')?true:false,
		isIe              = $.browser.msie,
		isIE8             = isIe && parseInt($.browser.version, 10) === 8,
		tmpl              = {},
		nextPending       = false,     //will be set to true when next project is about to load in slider
		prevPending       = false,     //will be set to true when previous project is about to load in slider
		wrapperLoaded     = true,
		filterDisplayed   = false,     //the state of the category filter - true for displayed and false for hidden
		filterInAnimation = false,     //a boolean setting whether the filter has been currently animated
		fullscreen        = false,
		galleryUrl        = '',
		supportsHistory   = (window.history && window.history.pushState) ? true : false;

		
		/**
		 * Initializes the main functionality - calls the main functions.
		 */
		function init() {

			setTemplates();
			bindEventHandlers();

			$moreBtn = $(jrtmpl(tmpl.morebtn, {
				text: o.texts.loadMoreText
			}));

			$moreBtn2 = $(jrtmpl(tmpl.morebtn2, {
				text: o.texts.loadMoreText
			}));


			var item = null,
				itemToLoad = getItemFromHash();

			if (itemToLoad) {
				//load an item slider
				item = {
					slug: itemToLoad,
					slider: true
				};
				currentItem = item;
				loadItemContent(item);
				galleryUrl = window.location.href.split('#')[0];
			} else {
				//load the gallery
				loadGallery();
			}

		}

		/**
		 * Checks the URL hash for item slug.
		 * @return the item's slug if it exists or false if it doesn't
		 */
		function getItemFromHash() {
			var hash = location.hash.replace('#!', '');

			if (o.itemSlug) {
				return o.itemSlug;
			}
			if (hash && hash.indexOf('prettyPhoto') === -1) {
				return hash;
			}
			return false;
		}


		/**
		 * Sets the main templates for element markup generation.
		 */
		function setTemplates() {
			tmpl = {
				morebtn: '<div class="more-container"><a id="loadMore" class="button"><span><%= text %></span></a></div>',
				morebtn2: '<div class="more-container-2"><a id="loadMore2" class="button"><span><%= text %></span></a></div>',

				//CATEGORIES FILTER
				categories: '<ul>\
				<li class="' + o.selectedClass + '" data-cat="' + o.category + '">' + o.texts.allText + '</li>\
				<%  for(var i=0, len=categories.length; i<len; i++){ %>\
				<li data-cat="<%=categories[i].id%>"><span class="cat-separator">/</span><%=categories[i].name%></li>\
				<% } %></ul>',

				//ITEM IMAGE TEMPLATE
				item: '<div class="' + o.itemClass + '" style="width:<%= width %>px;">\
				<img src="<%= item.image %>" width="<%=width%>"/>\
				<div class="' + o.itemInfoClass + '"><div class="' + o.itemTextClass + '">\
				<% if(item.link){ %><a href="<%= link %>" rel="<%= rel %>" title="<%= title %>"><% } %>\
				<div class="text-wrapper">\
				<% if(item.cat){ %>\
				<h3 class="post-info"><%=item.cat%></h3>\
				<% } %>\
				<h2><%= item.title %></h2></div><div class="view-gallery">\
				<% if(item.imgnum){ %><span class="item-num"><%= item.imgnum %></span><% } %>\
				<span class="grid-gallery-icon<%= additionalClass %>"></span><span class="view-text"><%= viewText %><span class="more-arrow">&raquo;</span></span>\
				</div><% if(item.link){ %></a><% } %>\
				</div></div>\
				</div>'
			};
		}

		/**
		 * Loads the gallery - calls all the main functions to load and build the gallery.
		 */
		function loadGallery() {
			if(supportsHistory){
				galleryUrl = galleryUrl || window.location.href;
				history.pushState(null, null, galleryUrl);
			}
			if (o.showCategories) {
				displayCategoryFilter();
			}
			loadImages({});
			bindGalleryEventHandlers();

			//initialize the Masonry script to order the items one below another
			$root.masonry({
				itemSelector: '.' + o.itemClass,
				isAnimated: true,
				columnWidth: getImageWidthForScreen
			});
			galleryLoaded = true;
		}

		/**
		 * Binds event handlers for the preview slider only.
		 */
		function bindEventHandlers() {
			$wrapper.on("sliderImgLoaded", "." + o.previewWrapperClass, doOnSliderImgLoaded)
					.on("closeSlider", "." + o.previewWrapperClass, doOnCloseClicked)
					.on("nextItem", "." + o.previewWrapperClass, function() {
				doOnLoadNewItem(true);
			}).on("prevItem", "." + o.previewWrapperClass, function() {
				doOnLoadNewItem(false);
			}).on("fullscreen", "." + o.previewWrapperClass, function(e, full) {
				fullscreen = full;
			});
		}

		/**
		 * Binds event handlers to the elements in the gallery.
		 */
		function bindGalleryEventHandlers() {
			//the hover effect of the items
			$root.delegate('.' + o.itemClass, 'mouseenter', doOnItemMouseEnter);
			$root.delegate('.' + o.itemClass, 'mouseleave', doOnItemMouseLeave);

			$moreBtn.find('a').on('click', doOnMoreBtnClick);
			$moreBtn2.find('a').on('click', doOnMoreBtnClick);

			if (o.showCategories) {
				$catHolder.delegate('li', 'click', doOnCategoryClick);
			}
			$(window).on("resize", setFilterVisibility);
		}

function printItems(data) {
    var newItems = data.items,
        i, len, item, $el;
    for (i = 0, len = newItems.length; i < len; i += 1) {
        item = newItems[i];
        $el = renderItemElement(item);
        item.el = newItems.el = $el;
        items.push(item);
        if (item.slider || (item.lightbox && !item.video)) {
            bindItemClickHandler(item)
        }
        $root.append($el)
    }
    PEXETO.setLightbox($root.find("a[rel^='lightbox']"));
    if (!isIE8) {
        PEXETO.loadCufon()
    }
    $root.imagesLoaded(function () {
        var i, len, displayItem;
        removeLoading();
        $moreBtn.detach();
        $moreBtn2.detach();
        $root.masonry('reload').trigger('itemsLoaded');
        displayItem = function (i) {
            newItems[i].el.css({
                opacity: 0,
                visibility: 'visible',
                marginTop: 100
            }).animate({
                opacity: 1,
                marginTop: 0
            }, 300, o.easing, function () {
                if (i === len - 1) {
                    $root.masonry("reload");
                    if (data.more) {
                        $moreBtn.insertAfter($root);
                        $galleryContainer.prepend($moreBtn2);
                    }
                }
            })
        };
        for (i = 0, len = newItems.length; i < len; i += 1) {
            (function (i) {
                window.setTimeout(function () {
                    displayItem(i)
                }, i * 100)
            })(i)
        }
    })
}

function loadLightbox(data) {
    var titles = [],
        descs = [],
        srcs = [],
        i, len;
    for (i = 0, len = data.images.length; i < len; i += 1) {
        titles.push("");
        descs.push(data.images[i].desc);
        srcs.push(data.images[i].img)
    }
    $.prettyPhoto.open(srcs, titles, descs)
}

function initItemSlider(data) {
    var itemLinks = getItemLinks(data),
        args;
    if (itemLinks.nextItem) {
        data.nextItem = currentItem.nextItem = itemLinks.nextItem
    }
    if (itemLinks.prevItem) {
        data.prevItem = currentItem.prevItem = itemLinks.prevItem
    }
    args = {
        easing: o.scrollEasing,
        fullwidth: o.fullwidth,
        subtractElements: [{
            el: $('#header'),
            position: "Top"
        }],
        item: data,
        texts: o.texts,
        excludeSharing: o.excludeSharing,
        additionalButtons: o.additionalButtons,
        showClose: o.showClose,
        linkProjects: o.linkProjects,
        showThumbPreview: o.showThumbPreview,
        fullscreen: fullscreen
    };
    $previewWrapper.pexetoFullscreenSlider(args)
}

function filterItems(cat) {
    inLoading = true;
    $root.animate({
        opacity: 0
    }, function () {
        $root.empty().animate({
            opacity: 1
        }, 0);
        $wrapper.addClass(o.loadingClass);
        items = [];
        loadImages({
            cat: cat
        })
    })
}

function loadItemContent(item) {
    var data = {
        number: o.itemsPerPage,
        itemslug: item.slug,
        action: 'pexeto_get_portfolio_content'
    }, loadSlider = item.slider ? true : false,
        cachedItem = getCachedItem(item.slug);
    if (cachedItem) {
        doOnContentLoaded(loadSlider, cachedItem);
        return
    }
    if (!itemsMap.length) {
        data.itemsMap = "true";
        data.cat = o.category;
        data.orderby = o.orderBy
    }
    if (!currentXhr) {
        currentXhr = $.ajax({
            url: o.ajaxUrl,
            data: data,
            dataType: 'json',
            type: 'GET'
        }).done(function (data) {
            if (data && !data.failed) {
                if (data.itemsMap) {
                    itemsMap = data.itemsMap
                }
                cachedItems.push(data);
                doOnContentLoaded(loadSlider, data)
            } else {
                if (!galleryLoaded) {
                    currentXhr = null;
                    loadGallery()
                }
            }
        })
    }
}

function loadImages(options) {
    var data = {
        number: o.itemsPerPage,
        cat: o.category,
        orderby: o.orderBy,
        offset: 0,
        imgwidth: o.imageWidth,
        imgheight: o.imageHeight,
        itemMargin: o.itemMargin,
        action: 'pexeto_get_portfolio_items'
    };
    if (!itemsMap.length) {
        data.itemsMap = "true"
    }
    data = $.extend(data, options);
    if (!currentXhr) {
        currentXhr = $.ajax({
            url: o.ajaxUrl,
            data: data,
            dataType: 'json',
            type: 'GET'
        }).done(function (data) {
            if (data.itemsMap) {
                itemsMap = data.itemsMap
            }
            if (data.items.length) {
                printItems(data)
            } else {
                removeLoading()
            }
        }).always(doOnAjaxComplete)
    }
}


		/*****************************************************************************************
		 * ELEMENT RENDERING FUNCTIONS
		 ****************************************************************************************/

		/**
		 * Renders the HTML of each of the items depending on the settings.
		 * @return the item as jQuery object
		 */
		function renderItemElement(item) {
			var rel = item.video ? 'lightbox' : '',
				link = (item.slider && !supportsHistory) ? '#!' + item.slug : item.link,
				desc = item.desc || "",
				html = "",
				additionalClass = '',
				viewText = o.texts.viewGalleryText;
			if (item.video) {
				viewText = o.texts.playVideoText;
				additionalClass = " video-icon";
			} else if (!item.slider && !item.video && !item.lightbox) {
				viewText = o.texts.openText;
				additionalClass = " link-icon";
			}

			html = jrtmpl(tmpl.item, {
				item: item,
				width: o.imageWidth,
				link: link,
				rel: rel,
				title: desc,
				viewText: viewText,
				additionalClass: additionalClass
			});
			return $(html);
		}

		/**
		 * Renders the category filter element and appends it to the gallery container.
		 */
		function displayCategoryFilter() {
			var $filterContainer = $('<div id="filter-container"></div>'),
				catHtml = jrtmpl(tmpl.categories, {
					categories: o.categories
				});
			$filterBtn = $('<div />', {
				"id": o.filterBtnId,
				"html": "<span>" + o.texts.allText + "</span>"
			}).click(doOnFilterClick).appendTo($filterContainer);
			$catHolder = $('<div />', {
				"id": o.categoryHolderId,
				"html": catHtml
			}).appendTo($filterContainer);

			$galleryContainer.prepend($filterContainer);
		}
		function abortPendingRequests() {
			if (currentXhr) {
				//there is a request pending, abort it and execute this one
				currentXhr.abort();
				if (currentItem) {
					removeItemLoading(currentItem.el);
				}
			}
		}

		/*****************************************************************************************
		 * EVENT BINDING AND HANDLER FUNCTIONS
		 ****************************************************************************************/

function doOnContentLoaded(loadSlider, data) {
    if (loadSlider) {
        if (data.nextItem) {
            currentItem.nextItem = data.nextItem
        }
        if (data.prevItem) {
            currentItem.prevItem = data.prevItem
        }
        if (data.link) {
            currentItem.link = data.link
        }
        initItemSlider(data);
        previewMode = true
    } else {
        loadLightbox(data);
        removeItemLoading(currentItem.el)
    }
    doOnAjaxComplete()
}

function doOnSliderImgLoaded() {
    var marginTop;
    windowWidth = $(window).width(), sp = 600, marg = 10;
    if (!isIE8) {
        PEXETO.loadCufon()
    }
    if (nextPending) {
        marginTop = $previousWrapper.height();
        setUrl(currentItem);
        $previewWrapper.trigger("sliderVisible", [{
            staticDesc: true
        }]).animate({
            marginTop: 0
        }, sp, o.easing);
        $previousWrapper.trigger("hide").css({
            width: '100%',
            marginBottom: marg
        }).animate({
            marginTop: (-marginTop - marg)
        }, sp, o.easing, function () {
            $previousWrapper.trigger("destroy").remove();
            wrapperLoaded = true
        });
        nextPending = false
    } else if (prevPending) {
        setUrl(currentItem, {
            replace: true
        });
        marginTop = $previousWrapper.height();
        $previousWrapper.trigger("hide");
        $previewWrapper.css({
            marginTop: (-marginTop - marg),
            marginBottom: marg
        }).animate({
            marginTop: 0
        }, sp, o.easing, function () {
            $previousWrapper.trigger("destroy").remove();
            wrapperLoaded = true
        }).trigger("sliderVisible", [{
            staticDesc: true
        }]);
        prevPending = false
    } else {
        removeLoading();
        if (currentItem.el) {
            removeItemLoading(currentItem.el)
        }
        $('#footer').hide();
        setWrappersSize();
        $galleryContainer.animate({
            marginLeft: -windowWidth - 50
        }, 800, o.easing, function () {
            $(this).animate({
                height: 'hide'
            });
            $previewWrapper.trigger("sliderVisible", [{}]);
            resetWrappersSize()
        })
    }
}

function doOnItemMouseEnter() {
    elemFadeIn($(this).find('.' + o.itemTextClass), 1)
}

function doOnItemMouseLeave() {
    if (!$(this).find('.' + o.itemLoadingClass).length && !PEXETO.checkIfMobile()) {
        elemFadeOut($(this).find('.' + o.itemTextClass), 0)
    }
}

function doOnCategoryClick() {
    var that = $(this),
        cat = Number(that.data('cat')),
        catName = o.texts.allText;
    abortPendingRequests();
    if (currentCat !== cat) {
        currentCat = cat;
        filterItems(cat);
        that.addClass(o.selectedClass).siblings('.' + o.selectedClass).removeClass(o.selectedClass);
        $moreBtn.detach();
        $moreBtn2.detach();
        if (cat !== -1) {
            catName = _.find(o.categories, function (c) {
                return Number(c.id) === cat
            }).name
        }
        $filterBtn.find("span:first").html(catName);
        if ($filterBtn.css("display") !== "none") {
            $filterBtn.trigger("click")
        }
    }
}

function doOnLoadNewItem(next) {
    if (!inLoading && wrapperLoaded) {
        var slug = "";
        wrapperLoaded = false;
        inLoading = true;
        $previousWrapper = $previewWrapper;
        $previewWrapper = $('<div />', {
            "class": o.previewWrapperClass
        });
        if (next) {
            $previewWrapper.insertAfter($previousWrapper);
            nextPending = true;
            slug = currentItem.nextItem
        } else {
            $previewWrapper.insertBefore($previousWrapper);
            prevPending = true;
            slug = currentItem.prevItem
        }
        currentItem = {
            slug: slug,
            slider: true
        };
        loadItemContent(currentItem)
    }
}

function doOnFilterClick() {
    var that = $(this),
        margin = filterDisplayed ? 0 : 10;
    if (!filterInAnimation) {
        filterInAnimation = true;
        $filterBtn.parent().animate({
            marginTop: margin,
            marginBottom: margin
        });
        that.toggleClass(o.openedClass);
        $catHolder.slideToggle(200, 'linear', function () {
            filterInAnimation = false;
            filterDisplayed = !filterDisplayed
        })
    }
}

function doOnMoreBtnClick() {
    abortPendingRequests();
    $moreBtn.addClass(o.btnLoadingClass);
    $moreBtn2.addClass(o.btnLoadingClass);
    loadImages({
        offset: items.length,
        cat: currentCat
    })
}

function bindItemClickHandler(item) {
    item.el.click(function (e) {
        e.preventDefault();
        if (item.slider) {
            setUrl(item)
        }
        abortPendingRequests();
        if (!previewMode && !inLoading) {
            item.el.append('<div class="' + o.itemLoadingClass + '"></div>');
            currentItem = item;
            loadItemContent(item)
        }
    })
}

function doOnCloseClicked() {
    if (supportsHistory) {
        window.history.replaceState(null, null, galleryUrl)
    } else {
        location.hash = ''
    } if (currentItem && currentItem.el) {
        currentItem.el.find('img').trigger("mouseleave")
    }
    setWrappersSize();
    previewMode = false;
    $wrapper.css({
        height: "auto"
    });
    $('#footer').fadeIn();
    $galleryContainer.show().animate({
        marginLeft: 0,
        opacity: 1
    }, 800, o.easing, function () {
        resetWrappersSize();
        $previewWrapper.trigger("destroy").attr("style", "").empty()
    });
    if (galleryLoaded) {
        $root.masonry('reload')
    } else {
        addLoading();
        loadGallery()
    }
}

function doOnAjaxComplete() {
    inLoading = false;
    currentXhr = null
}

function setWrappersSize() {
    var winWidth = $(window).width();
    $wrapper.width(2 * winWidth);
    $previewWrapper.css({
        width: winWidth
    });
    $galleryContainer.width(winWidth)
}

function resetWrappersSize() {
    $wrapper.css({
        width: '100%'
    });
    $previewWrapper.css({
        width: '100%'
    });
    $galleryContainer.css({
        width: '100%'
    })
}

function getImageWidthForScreen(containerWidth) {
    var numColumns = 0,
        spaceLeft = 0,
        ratio = 0,
        newImgW, i, len, col, row, w, h;
    numColumns = Math.floor(containerWidth / o.imageWidth);
    spaceLeft = containerWidth - numColumns * (o.imageWidth - o.itemMargin);
    if (spaceLeft > 0) {
        newImgW = 0;
        if (!(numColumns === 1 && o.imageWidth / 2 > spaceLeft)) {
            numColumns += 1
        }
        newImgW = Math.floor(containerWidth / numColumns) - o.itemMargin;
        ratio = o.imageWidth / newImgW;
        for (i = 0, len = items.length; i < len; i += 1) {
            col = items[i].col;
            row = items[i].row;
            w = newImgW;
            h = 0;
            if (col > 1 && numColumns > 1) {
                w = (newImgW + o.itemMargin) * col - o.itemMargin
            }
            items[i].el.width(w).find("img").width(w);
            items[i].el.width(w).find(".no-color").width(w);
            if (o.imageHeight !== "auto") {
                h = numColumns === 1 ? "auto" : (Math.floor(o.imageHeight / ratio) + o.itemMargin) * row - o.itemMargin;
                items[i].el.height(h).find("img").height(h);
                items[i].el.width(w).find(".no-color").height(h)
            }
        }
    }
    return newImgW + o.itemMargin
}

function getCachedItem(slug) {
    var cachedItem = null,
        i, len;
    for (i = 0, len = cachedItems.length; i < len; i += 1) {
        if (cachedItems[i].slug === slug) {
            cachedItem = cachedItems[i];
            break
        }
    }
    return cachedItem
}

function getItemLinks(item) {
    var filtItems = [],
        itemIndex = -1,
        i, len = 0,
        res = {};
    if (currentCat !== -1) {
        filtItems = _.filter(itemsMap, function (it) {
            return _.indexOf(it.cat, currentCat) !== -1
        })
    }
    filtItems = filtItems.length ? filtItems : itemsMap;
    len = filtItems.length;
    for (i = 0; i < len; i += 1) {
        if (filtItems[i].slug === item.slug) {
            itemIndex = i;
            break
        }
    }
    if (itemIndex !== -1) {
        if (itemIndex + 1 < len) {
            res.nextItem = filtItems[itemIndex + 1].slug
        }
        if (itemIndex !== 0) {
            res.prevItem = filtItems[itemIndex - 1].slug
        }
    }
    return res
}

function setUrl(item, options) {
    if (supportsHistory) {
        history.replaceState({
            state: item.slug
        }, item.title, item.link)
    } else {
        location.hash = '!' + item.slug
    }
}

function setFilterVisibility() {
    if ($(window).width() > 490 && $catHolder) {
        $catHolder.show()
    }
}

function removeItemLoading($item) {
    $item.find('.' + o.itemLoadingClass).remove();
    $item.trigger("mouseleave")
}

function removeLoading() {
    $wrapper.removeClass(o.loadingClass);
    $moreBtn.removeClass(o.btnLoadingClass)
    $moreBtn2.removeClass(o.btnLoadingClass)
}

function addLoading() {
    $wrapper.addClass(o.loadingClass)
}

function elemFadeIn($elem, opacity) {
    opacity = opacity || 1;
    $elem.stop().animate({
        opacity: 1
    }, function () {
        $elem.animate({
            opacity: opacity
        }, 0)
    })
}

function elemFadeOut($elem, opacity) {
    $elem.stop().animate({
        opacity: opacity
    }, function () {
        $elem.animate({
            opacity: opacity
        }, 0)
    })
}


		init();
	
	};
}(jQuery));
