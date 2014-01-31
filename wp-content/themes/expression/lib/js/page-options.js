/**
 * This file contains the main functionality that will be loaded for the theme
 * on many pages in the admin section. Author: Pexeto http://pexeto.com/
 */
(function($) {

	/**
	 * Getter and setter function for text values - checks the type of the element and if the element contains
	 * embedded text (such as a DIV element), gets/sets its inner text. If the element sets contains its value
	 * as a "value" attribute (such as an INPUT element), gets/sets its value.
	 */
	$.fn.pexval = function() {
		var elem = $(this),
		tagname=elem.get(0).tagName.toLowerCase(),
		value=arguments.length?arguments[0]:false;
		
		/**
		 * Gets the value.
		 */
		function pexGetValue(){
			if(tagname==='input'||tagname==='select'){
				return elem.val();
			}else{
				return elem.text();
			}
		}
		
		/**
		 * Sets the value.
		 */
		function pexSetValue(value){
			if(tagname==='input'||tagname==='select'){
				return elem.val(value)
			}else{
				return elem.text(value);
			}
		}
		
		if(value===false){
			//no arguments have been passed, call the getter function
			return pexGetValue();
		}else{
			//there is at least one argument passed, call the setter function
			return pexSetValue(value);
		}
	};

	pexetoPageOptions = {

		/**
		 * Inits all the functions needed.
		 */
		init : function() {
			this.setColorPickerFunc();
			this.loadUploadFunctionality();
		},

		/**
		 * Loads the color picker functionality to all the inputs with class
		 * "color".
		 */
		setColorPickerFunc : function() {
			// set the colorpciker to be opened when the input has been clicked
			var colorInputs = $('input.color');
			if (colorInputs.length) {
				colorInputs.ColorPicker( {
					onSubmit : function(hsb, hex, rgb, el) {
						$(el).val('#' + hex);
						$(el).ColorPickerHide();
					},
					onBeforeShow : function() {
						$(this).ColorPickerSetColor(this.value);
					}
				});
			}

		},

		imageLayoutSelector : function($elem, $cols, $rows) {
			var max = 5,
				selClass = "selected",
				$trs = null,
				$tds = null,
				defCols = parseInt($cols.val(), 10),
				defRows = parseInt($rows.val(), 10),
				tmpCols = defCols,
				tmpRows = defRows,

				buildTable = function(){
					var html ='<table>';
					for(var i=0; i<max; i++){
						html+='<tr>';
						for(var j=0; j<max; j++){
							html+='<td></td>';
						}
						html+='</tr>';
					}
					html+='</table>';
					$elem.append(html);

					$trs = $elem.find('tr');
					$tds = $elem.find('td');
				},

				setSelected = function(cols, rows){
					$tds.removeClass(selClass);
					$elem.find('tr:lt('+rows+')').each(function(){
						$(this).find('td:lt('+cols+')').addClass(selClass);
					});
				};
				
			buildTable();
			setSelected(defCols, defRows);

			$trs.each(function(i){
				var $curTr = $(this);
				$curTr.find('td').each(function(j){
					var $curTd = $(this);
					(function(i, j){
						$curTd.on("mouseenter", function(){
							tmpCols = j+1;
							tmpRows = i+1;
							$cols.val(tmpCols);
							$rows.val(tmpRows);
							setSelected(tmpCols, tmpRows);
						}).on("click", function(){
							defCols = j+1;
							defRows = i+1;
							$cols.val(defCols);
							$rows.val(defRows);
						});
					})(i, j);
				});
			});

			$elem.find("table").on("mouseleave", function(){
				setSelected(defCols, defRows);
				$cols.val(defCols);
				$rows.val(defRows);
			});

			$cols.on("keyup", function(){
				var val = parseInt($cols.val(), 10) || 1;
				defCols = val;
				setSelected(defCols, defRows);
			});

			$rows.on("keyup", function(){
				var val = parseInt($rows.val(), 10) || 1;
				defRows = val;
				setSelected(defCols, defRows);
			});

			
		},

		/**
		 * Loads the Media Library functionality to an element when it is
		 * clicked.
		 */
		loadMediaImage : function($input) {
			window.send_to_editor = function(html) {
				imgurl = $("img", html).attr("src");
				$input.val(imgurl);
				tb_remove();
			}
			tb_show('Add image from Media Library',
					"media-upload.php?type=image&TB_iframe=1");
		},

		/**
		 * Calls the Upload functionality. Requirements: - button with class
		 * "pexeto-upload-btn" - input field sibling to the button with class
		 * "pexeto-upload"
		 */
		loadUploadFunctionality : function() {
			$('.pexeto-upload-btn').each(function() {
				pexetoPageOptions.loadUploader($(this));
			});
		},

		setMediaUploadFunctionality : function(postId, looadMediaWindow){

			var buttonContainer = $('#gallery-buttons'),
				loading = $('.loading-overlay:first'),
				reloadImages = function(){
				loading.show();
				$.ajax({
					data:{postId:postId, action:'pexeto_get_attachments'},
					url:ajaxurl,
					dataType:'html',
					type:'GET'
				}).done(function(res){
					if(res){
						var galleryContainer = $('#gallery-images'),
							contHeight = galleryContainer.outerHeight();
						galleryContainer.css({minHeight:contHeight}).html(res).css({minHeight:0});
						loading.hide().appendTo(galleryContainer);

						if(!buttonContainer.find('#edit-images').length){
							buttonContainer.append('<a class="button" id="edit-images">Edit images</a>');
						}
					}
				});
			};

			buttonContainer.on("click","#add-images",function(){
				if(looadMediaWindow){
					tb_show("Upload images", "media-upload.php?post_id="+postId+"&type=image&TB_iframe=true", false);  
				}else{
					$('#add-instr').dialog({dialogClass:'pexeto-dialog', 
											modal:true, 
											width:600,
											title:"Add images instructions"
										});
				}
				
			});

			buttonContainer.on("click","#edit-images",function(){
				if(looadMediaWindow){
					tb_show("Edit images", "media-upload.php?post_id="+postId+"&type=image&tab=gallery&TB_iframe=true", false);  
				}else{
					$('#edit-instr').dialog({dialogClass:'pexeto-dialog', 
											modal:true, 
											width:600,
											title:"Edit images instructions"
										});
				}
				
			});

			var old_tb_remove = tb_remove;
			tb_remove = function(){
				old_tb_remove();
				reloadImages();
			}

		},

		/**
		 * Loads the upload functionality to an element. Requirements: - input
		 * field sibling to the element with class "pexeto-upload"
		 * 
		 * @param element
		 *            the button element whose clicking event will trigger this
		 *            functionality
		 */
		loadUploader : function(element) {
			var button = element, interval, btntext, i, textContainer;
			new AjaxUpload(button, {
				action : pexetoUploadHandlerUrl,
				name : 'pexetofile',
				onSubmit : function(file, ext) {
					// change button text, when user selects file

					textContainer=element.find('span').length?element.find('span:first'):element;
					btntext = textContainer.pexval();
					
					// If you want to allow uploading only 1 file at time,
					// you can disable upload button
					this.disable();

					// Uploding -> Uploading. -> Uploading...
					interval = window.setInterval(function() {
						if (++i <= 3) {
							textContainer.pexval(textContainer.pexval() + '.');
						} else {
							textContainer.pexval(btntext);
							i = 0;
						}
					}, 200);
				},
				onComplete : function(file, response) {
					imgUrl = pexetoUploadsUrl + '/' + response;
					button.siblings('input.pexeto-upload:first').attr('value',
							imgUrl);

					textContainer.pexval(btntext);

					window.clearInterval(interval);

					// enable upload button
					this.enable();
				}
			});
		}
	};
})(jQuery);

jQuery(function() {
	pexetoPageOptions.init();
});
