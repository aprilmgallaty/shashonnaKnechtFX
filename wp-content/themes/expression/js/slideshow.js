 // alert('slideshow');


 /**
  * This is a slider with small thumbnail previews. When the smaller thumbnail is clicked,
  * a bigger preview image fades in. Also there is a pagination included for the thumbnails
  * so that when there are more of them included, they are separated by pages and users can
  * navigate through them using navigation arrows.
  *
  * @author Pexeto
  * http://pexeto.com
  */

 (function ($) {
 	$.fn.pexetoSlideshow = function (options) {
 		var defaults = {
 			interval: 4000,
 			//the interval between changing the images when autoplay is turned on (in miliseconds)
 			autoplay: true,
 			//if set to false, images won't be changed automatically, only users will be able to do it
 			imgPerScroll: 4,
 			//the number of small thumbnail images per scroll (page)
 			thumbContainerId: 'slider-navigation',
 			//the ID of the div that will contain the small thumbnails
 			thumbContParentId: 'slider-navigation-container',
 			thumbWrapperSel: '.thumbnail-wrapper',
 			scrollSpeed: 700,
 			//the speed of the thumbnail scroll (in miliseconds)
 			pauseInterval: 5000,
 			//the pause interval (in miliseconds)- when an user clicks on an image or arrow, the autoplay pauses for this interval of time
 			pauseOnHover: true,
 			closedClass: "fullscreen-exit",
 			toggleFullscreenText: "Toggle Fullscreen",
 			descriptionClass: "full-slider-desc",
 			fullwidth: true
 		};

 		options = $.extend(defaults, options);
 		var api, timer = -1,
 			images = [],
 			current, root, thumbContainer = $('#' + options.thumbContainerId),
 			thumbContainerParent = $('#' + options.thumbContParentId),
 			containerNum = 0,
 			inAnimation = false,
 			windowFocus = true,
 			hideButton = null,
 			navHidden = false,
 			navInAnimation = false,
 			header = $('#header'),
 			footer = $('#footer'),
 			headerHeight = header.outerHeight() || 65,
 			footerHeight = footer.outerHeight() || 47,
 			currentHeight = 0,
 			isIE8 = $.browser.msie && parseInt($.browser.version, 10) === 8,
 			isMobile = PEXETO.checkIfMobile(),
 			iFullscreen = false
 			descEl = null;



 		root = $(this);
 		current = root.find('img:first');


 		/**
 		 * Inits the slider.
 		 */

 		function init() {
 			if (root.find('img').length > 0) {

 				root.pexetoResizableImg({
 					fullwidth: options.fullwidth,
 					subtractElements: [{
 						el: header,
 						position: "top"
 					}, {
 						el: footer,
 						position: "bottom"
 					}],
 					fullscreen: navHidden
 				});

 				//add the description
 				descEl = $('<div />', {"class":options.descriptionClass}).insertAfter(root);

 				thumbContainer.css({
 					visibility: 'visible'
 				});

 				root.find('.loading').hide();

 				getImages();
 				printScrollable();


 				$('.right').click(function () {
 					api.next(500);
 				});

 				//set the timer
 				$(window).one("load", function () {
 					if (options.autoplay) {
 						setTimer();
 					}
 				});

 				if (options.autoplay) {
 					setWindowEvents();
 				}

 				setHidingFunctionality();

 				$(window).on("resize", doOnResize);

 				setThumbHover();

 				if(PEXETO.checkIfMobile() && PEXETO.mobileType==="iphone"){
			  		$(window).on("orientationchange", function(){
			  			if ((window.orientation === -90 || window.orientation === 90) && !navHidden){
			  				iFullscreen = true;
			  				hideNavigation();
			  			}else if(window.orientation === 0 && iFullscreen && navHidden){
			  				showNavigation();
			  				iFullscreen = false;
			  			}
			  		});

			  		if((window.orientation === -90 || window.orientation === 90) && !navHidden){
						hideNavigation();
						iFullscreen = true;
					}
			  	}

 			}


 		}

 		function setHidingFunctionality() {
 			hideButton = $('<div class="fullscreen-btn" title="'+options.toggleFullscreenText+'"></div>');
 			 header.append(hideButton);
 			//hideButton.appendTo(root);

 			hideButton.click(function () {
 				if (!navInAnimation) {
 					iFullscreen = false;
 					if (navHidden) {
 						showNavigation();
 					} else {
 						hideNavigation();
 					}
 				}
 			});
 		}

 		function showNavigation() {
 			navInAnimation = true;
 			hideButton.removeClass(options.closedClass).find("span").text(options.hideText);
 			root.trigger("fullscreen", [false])
 				.trigger("imgRefresh", [{animate:true}]);
 				

 			footer.animate({
 				height: "show",
 				opacity: 1
 			});

 			//move the thumbnail container
 			thumbContainerParent.animate({
 				bottom: footerHeight,
 				opacity:1
 			});

 			//move the description
 			descEl.animate({bottom:"+="+footerHeight});

 			if(isIE8){
 				thumbContainer.fadeIn();
 			}	
 			header.animate({
 				marginTop: 0
 			}, function () {
 				navInAnimation = false;
 				navHidden = false;
 			});
 		}

 		function hideNavigation() {
 			headerHeight = !isIE8 ? header.outerHeight() : header.outerHeight()-1;
 			footerHeight = footer.outerHeight();
 			currentHeight = 0;
 			navInAnimation = true;
 			hideButton.addClass(options.closedClass).find("span").text(options.showText);
 			root.trigger("fullscreen", [true])
 				.trigger("imgRefresh", [{animate:true}]);

 			//move the footer
 			footer.animate({
 				height: "hide",
 				opacity: 0
 			});

 			//move the thumbnail container
 			thumbContainerParent.animate({
 				bottom: 0
 			});

 			//move the description
 			descEl.animate({bottom:"-="+footerHeight});

 			if(!isMobile){
 				thumbContainerParent.animate({
	 				opacity: 0
	 			});
	 			if(isIE8){
 					thumbContainer.fadeOut();
 				}	
 			}
 			header.animate({
 				marginTop: -headerHeight
 			}, function () {
 				navInAnimation = false;
 				navHidden = true;
 			});


 		}

 		function setThumbHover(){
 			if(!isMobile){
	 			thumbContainerParent.on("mouseenter", function(){
	 				if(navHidden){
	 					$(this).stop().animate({opacity:1});
	 					if(isIE8){
		 					thumbContainer.fadeIn();
		 				}	
	 				}
	 			}).on("mouseleave", function(){
	 				if(navHidden){
	 					$(this).stop().animate({opacity:0});
	 					if(isIE8){
		 					thumbContainer.fadeOut();
		 				}
	 				}
	 			});
	 		}
 		}

 		/**
 		 * Inserts the bigger images into an array for further use.
 		 */

 		function getImages() {
 			root.find('img').each(function (i) {
 				var img = $(this).data('index', i);
 				images[i] = {
 					img: img
 				};

 				(function (i) {
 					img.onPexetoImagesLoaded({
 						callback: function () {
 							$(this).hide().css({
 								visibility: "visible"
 							});
 							images[i].imgLoaded = true;
 							if (images[i].thumbLoaded) {
 								showThumbnail(i);
 							}
 						}
 					});
 				})(i);
 			});
 		}

 		function showThumbnail(i) {
 			if (images[i].imgLoaded && images[i].thumbLoaded) {
 				images[i].thumb.animate({
 					opacity: 1
 				}, 800).parent().css({
 					backgroundImage: 'none'
 				});
 				if (i === 0) {
 					images[0].img.toggleClass('current').fadeIn(1100);
 					root.removeClass("loading");
 					if(images[0].img.attr("alt")){
 						descEl.html('<span>'+images[0].img.attr("alt")+'</span>').fadeIn();
 					}
 				}
 			}
 		}

 		/**
 		 * Prints the thumbnail container.
 		 */

 		function printScrollable() {
 			thumbContainer.find(options.thumbWrapperSel+":first").addClass('active');

 			//display navigation arrows if there are more than one scrollable page
 			containerNum = thumbContainer.find('div.items div').not(options.thumbWrapperSel).length;
 			if (containerNum > 1) {
 				$('<a class="prev browse" id="left-arrow"></a><a class="next browse" id="right-arrow"></a>').insertBefore(thumbContainer);
 			}

 			//enable the scrollable plugin
 			var scrollable = PEXETO.setScrollable();
 			api = scrollable.data("scrollable");

 			setClickHandlers();
 		}

 		/**
 		 * Set click event event handlers for the thumbnail images and navigation arrows.
 		 */

 		function setClickHandlers() {
 			thumbContainer.find('img').each(function (i) {
 				var img = $(this);
 				images[i].thumb = $(this);

 				img.click(function () {
 					if (current.data('index') !== i && !inAnimation && images[i].imgLoaded && images[i].thumbLoaded) {
 						showCurrent(images[i].img);
 						$(options.thumbWrapperSel).removeClass("active");
 						img.parent(options.thumbWrapperSel).addClass("active");
 						pause();
 					}
 				}).hover(function () {
 					$(this).css({
 						cursor: 'pointer'
 					});
 				});

 				(function (i) {
 					img.onPexetoImagesLoaded({
 						callback: function () {
 							images[i].thumbLoaded = true;
 							if (images[i].imgLoaded) {
 								showThumbnail(i);
 							}
 						}
 					});
 				})(i);
 			});

 			//pause the autoplay on arrow click
 			thumbContainer.siblings('.browse').click(function () {
 				pause();
 			}).mouseover(function () {
 				$(this).css({
 					cursor: 'pointer'
 				});
 			});

 			$('#left-arrow').mousedown(function () {
 				$(this).animate({
 					marginLeft: -3
 				}, 100);
 			}).mouseup(function () {
 				$(this).animate({
 					marginLeft: 0
 				}, 100);
 			});

 			$('#right-arrow').mousedown(function () {
 				$(this).animate({
 					marginRight: -3
 				}, 100);
 			}).mouseup(function () {
 				$(this).animate({
 					marginRight: 0
 				}, 100);
 			});
 		}

 		function setWindowEvents() {
 			$(window).focus(function () {
 				windowFocus = true;
 				if (timer === -1) {
 					setTimer();
 				}
 			});

 			$(window).blur(function () {
 				windowFocus = false;
 				if (timer !== -1) {
 					stopSlider();
 				}
 			});
 		}

 		function doOnResize() {
 			var prevHeight = footerHeight;
 			headerHeight = header.outerHeight() || 65;
 			footerHeight = footer.outerHeight() || 47;

 			if(navHidden){
 				header.css({marginTop:-headerHeight});
 			}
 		}

 		/**
 		 * Pauses the autoplay.
 		 */

 		function pause() {
 			stopSlider();
 			setTimeout(function () {
 				setTimer();
 			}, options.pauseInterval);
 		}

 		/**
 		 * Stops the autoplay.
 		 */

 		function stopSlider() {
 			window.clearInterval(timer);
 			timer = -1;
 		}

 		/**
 		 * Shows the image that has been selected.
 		 * @param the image object to display
 		 */

 		function showCurrent(img) {
 			inAnimation = true;
 			img.toggleClass('current').fadeIn(600, function () {
 				var title = img.attr('title');
 				inAnimation = false;
 			});

 			current.fadeOut(function () {
 				current.removeClass('current');
 			});
 			current = img;

 			//set the description
 			if(img.attr("alt")){
 				descEl.html('<span>'+img.attr("alt")+'</span>').fadeIn();
 			}else{
 				descEl.fadeOut();
 			}
 		}

 		/**
 		 * Sets the timer for autoplay.
 		 */

 		function setTimer() {
 			if (options.autoplay && timer === -1 && windowFocus) {
 				timer = window.setInterval(function () {
 					showNext();
 				}, options.interval);
 			}
 		}

 		/**
 		 * Shows the next image, used when autoplay is enabled.
 		 */

 		function showNext() {
 			var nextIndex = current.data('index') === (images.length - 1) ? 0 : Number(current.data('index')) + 1,
 				next = images[nextIndex].img,
 				nextContPosition = parseInt(nextIndex / options.imgPerScroll, 10),
 				apiIndex = api.getIndex();
 			if (nextContPosition !== apiIndex) {
 				api.seekTo(nextContPosition, options.scrollSpeed);
 			}

 			$(options.thumbWrapperSel).removeClass("active");
 			$(".items img").eq(nextIndex).parent(options.thumbWrapperSel).addClass("active");

 			showCurrent(next);

 		}


 		if (root.length > 0) {
 			init();
 		}

 	};
 }(jQuery));