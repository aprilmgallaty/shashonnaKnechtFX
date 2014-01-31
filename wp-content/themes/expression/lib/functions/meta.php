<?php
/**
 * This file contains all the functionality for the additional meta boxes for the pages and posts.
 * It contains functions for loading the meta data into arrays, displaying the meta boxes and
 * saving the meta data.
 *
 * @author Pexeto
 */

/**
 * ADD THE ACTIONS
 */
add_action('init', 'pexeto_load_meta_boxes');

add_action('add_meta_boxes', 'pexeto_portfolio_image_box');
add_action('add_meta_boxes', 'pexeto_init_meta_boxes');  

add_action('save_post', 'pexeto_save_postdata');  

/**
 * Moves the featured image box below the text editor.
 */
if(!function_exists("pexeto_portfolio_image_box")){
	function pexeto_portfolio_image_box() {
		
		
		add_meta_box('portfoliogallery', __('Add images to the item', 'pexeto'), 'pexeto_gallery_meta_box', PEXETO_PORTFOLIO_POST_TYPE, 'normal', 'high');
	}
}

if(!function_exists("pexeto_gallery_meta_box")){
function pexeto_gallery_meta_box(){
		global $post, $wp_version;

		$ver = floatval($wp_version);
		$min_ver = 3.5;
		$load_media_window = $ver < $min_ver ? "true" : "false";
		echo '<script>
		jQuery(document).ready(function($){
			pexetoPageOptions.setMediaUploadFunctionality('.$post->ID.', '.$load_media_window.');
			});</script>';
		if($ver>=$min_ver){
			echo '<div class="option-description">Note: WordPress 3.5 included a new Media management
			section which changes the way the images are added to items. Please check the
			instructions below about how to add and edit images.</div>';
		}
		echo('<p id="gallery-buttons"><a class="button-primary" id="add-images">Add Images</a>');
		if(pexeto_get_image_number($post->ID)>0 || $ver>=$min_ver){
			echo '<a class="button" id="edit-images">Edit images</a>';
		}
		echo '</p>';
		if($ver<$min_ver){
			echo '<div id="gallery-images">'.pexeto_get_attachment_thumb_html($post->ID)
			.'<div class="loading-overlay"></div></div><span class="option-description">
			Click on the "Add Images" button to add images to the item. 
			If you would like to specify a custom thumbnail image for the item, 
			click on the "Set as featured image" link of the image. Otherwise the thumbnail of the item 
			will be the first image of the image set. If you would like to reorder the images, 
			click on the "Edit Images" button and drag and drop the images on the desired position.</span>';
		}else{
			echo '
			<div id="add-instr" style="display:none;">
			<strong>Adding images</strong>
			<ol>
			<li>Click on the "Add Media" button located above the content editor
			<br/><img src="'.PEXETO_IMAGES_URL.'add-media.png" width="200" />
			</li>
			<li>Click on the "Create Gallery" tab. Upload and select the images you want to add and click on the "Create a new gallery" button
			<br/><img src="'.PEXETO_IMAGES_URL.'new-gallery.png" width="100"/>
			</li>
			<li>After you set the images in the gallery, click on the "Insert gallery" button
			<br/><img src="'.PEXETO_IMAGES_URL.'insert-gallery.png" width="100"/>
			</li>
			</ol>
			</div>
			<div id="edit-instr" style="display:none;">
			<strong>Editing images</strong>
			<ol>
			<li>Click on the gallery in the content editor and click on the "Edit Gallery" button of the
			gallery
			<br/><img src="'.PEXETO_IMAGES_URL.'edit-gallery.png" width="400" />
			</li>
			<li>Change the images in the way you like</li>
			<li>Click on the "Update Gallery" button
			<br/><img src="'.PEXETO_IMAGES_URL.'update-gallery.png" width="100"/>
			</li>
			</ol>
			</div>';
		}
		
	}
}

/**
 * Loads the meta boxes content into an array.
 */
if(!function_exists("pexeto_load_meta_boxes")){
	function pexeto_load_meta_boxes(){
		//load the porftfolio categeories
		$portf_taxonomies=get_terms('portfolio_category', array('hierarchical'=>true, 'hide_empty'=>0));
		$portf_categories=array(array('id'=>'-1', 'name'=>'All Portfolio Categories'));

		foreach($portf_taxonomies as $taxonomy){
			$portf_categories[]=array("name"=>$taxonomy->name, "id"=>$taxonomy->term_id);
		}
		$loader_portf_categories=array_merge(array(array('id'=>'hide','name'=>'Hide'), (array('id'=>'disabled','name'=>'Show:'))), $portf_categories);

		//load the post categeories
		$categories=get_categories('hide_empty=0');
		$pexeto_categories=array(array('id'=>'-1', 'name'=>'All Categories'));
		for($i=0; $i<sizeof($categories); $i++){
			$pexeto_categories[]=array('id'=>$categories[$i]->cat_ID, 'name'=>$categories[$i]->cat_name);
		}
		
		global $pexeto_data, $new_meta_boxes, $new_meta_portfolio_boxes, $new_meta_post_boxes;
		
		$sliders=pexeto_get_created_sliders();

		$gallery_post_sliders = array( array('id'=>'attachments', 'name'=>'Post attachments'));
		foreach ($sliders as $slider) {
			if(strstr($slider['id'],PEXETO_NIVOSLIDER_POSTTYPE)){
				$gallery_post_sliders[]=$slider;
			}
		}


		/* ------------------------------------------------------------------------*
		 * META BOXES FOR THE PAGES
		 * ------------------------------------------------------------------------*/

		//the meta data for posts
		$new_meta_post_boxes =
		array(

		array(
			"title" => "Video URL",
			"name" => "video",
			"type" => "text",
			"description" => 'If this is a "Video" post format, insert the video URL here.'
			),
		array(
			"title" => "Gallery post type slider - display images from:",
			"name" => "post_slider",
			"type" => "select",
			"options" => $gallery_post_sliders,
			"std" => 'attachments',
			'description' => 'Select where to load the images from when the post type is set as
			a "Gallery" post type. If you select "Post Attachments", the images uploaded from this post
			will be displayed. You can also choose a slider name created from '.PEXETO_THEMENAME.' 
			Options -> Nivo Slider section.'
			)

		);

		//the meta data for pages
		$new_meta_boxes =
		array(

		array(
			"title" => '<div class="ui-icon ui-icon-wrench"></div>General Page Settings',
			"type" => "heading"),

		array(
			"title" => "Header",
			"name" => "slider",
			"type" => "select",
			"options" => $sliders,
			"std" => 'none'
			),

			array(
			"title" => "Page Layout",
			"name" => "layout",
			"type" => "imageradio",
			"options" => array(array("img"=>PEXETO_IMAGES_URL.'layout-right-sidebar.png', "id"=>"right", "title"=>"Right Sidebar Layout"),
			array("img"=>PEXETO_IMAGES_URL.'layout-left-sidebar.png', "id"=>"left", "title"=>"Left Sidebar Layout"),
			array("img"=>PEXETO_IMAGES_URL.'layout-full-width.png', "id"=>"full", "title"=>"Full Width Layout")),
			"std" => 'right',
			"description" => 'Available for Default and Contact page templates'
			),

			array(
			"name" => "sidebar",
			"title" => "Sidebar",
			"type" => "select",
			"options" => $pexeto_data->pexeto_sidebars,
			"description" => 'You can select a sidebar for this page between the default one and another one that
			you have created. If you would like to use another sidebar, rather than the default one, you can
			create a new sidebar in "'.PEXETO_THEMENAME.' Options->Sidebars" section and after that you will be able to select the
			sidebar here.'),
			
			array(
			"name" => "show_title",
			"title" => "Display Page Title",
			"type" => "select",
			"options" => array(array("name"=>"Use Global Settings", "id"=>"global"),
			array("name"=>"Display", "id"=>"on"),
			array("name"=>"Hide", "id"=>"off")),
			"std" => 'global',
			"description" => 'Whether to display the page title or not - if "Use Global Settings" selected, the global setting selected in the
			'.PEXETO_THEMENAME.' Options &raquo; General &raquo; "Display page title on pages" field will be used.'),
			
			array(
			"title" => "Custom full width background image",
			"name" => "full_bg",
			"std" => "",
			"type" => "upload",
			"description" => 'You can globally set a full width background image in the '.PEXETO_THEMENAME.' Options &raquo; Style Settings  &raquo; 
			General section. In this field you can set a custom background image that will be displayed for this page only. <br/>
			Use the "<b>Upload Image</b>" button to upload a new image. If you would like to select an image from the Media Library,
			click on the "<b>Use Media Library</b>" button. Once you select the image, click on the "Insert into post" button.'
			),
			
			array(
			"title" => '<div class="ui-icon ui-icon-image"></div>Gallery Settings - available only for the Portfolio Grid Gallery page template',
			"type" => "heading"),

			array(
			"name" => "post_category",
			"title" => "Display portfolio items from categories",
			"type" => "select",
			"none" => true,
			"options" => $portf_categories,
			"std" => '-1',
			"description" => 'If "All Categories" selected, all the Portfolio items will be displayed. If another category is selected, only the Portfolio items that belong
			to this category or this category\'s subcategories will be displayed. By selecting different categories, you can create multiple portfolio/gallery
			pages with different items displayed.'),

			array(
			"name" => "order",
			"title" => "Portfolio item order",
			"type" => "select",
			"options" => array(array("name"=>"By Date", "id"=>"date"),
			array("name"=>"By Custom Order", "id"=>"custom")),
			"std" => 'date',
			"description" => 'If you select "By Date" the last created item will be displayed first. If you select by "By Custom Order"
			you will have to set the order field of each of the items - the items with the smaller order number will be displayed first.'),


			array(
			"name" => "show_filter",
			"title" => "Show portfolio category filter",
			"type" => "select",
			"options" => array(array("name"=>"Show", "id"=>"true"),
			array("name"=>"Hide", "id"=>"false")),
			"std" => 'true',
			"description" => 'If "Show" selected, a category filter will be displayed above the portfolio items'),


			array(
			"title" => "Number of portfolio items to show per load",
			"name" => "post_number",
			"std" => "10",
			"type" => "text"
			),
			
			array(
			"name" => "image_width",
			"title" => "Base Image width",
			"type" => "text",
			"std" => '300',
			"description" => 'The base image width in the grid gallery for the smaller image - the bigger image sizes will be calculated based on this width (only for the Grid Gallery template)'
			),
			
			array(
			"name" => "image_height",
			"title" => "Base Image height",
			"type" => "text",
			"std" => '186',
			"description" => 'The base image height in the grid gallery for the smaller image - the bigger image sizes will be calculated based on this height (only for the Grid Gallery template)'
			)
			
			);



			/* ------------------------------------------------------------------------*
			 * META BOXES FOR THE PORTFOLIO POSTS
			 * ------------------------------------------------------------------------*/

			$new_meta_portfolio_boxes =
			array(

			array(
			"title" => "Item Type",
			"name" => "action",
			"type" => "select",
			"options" => array(
			array("name"=>"Full-height Slider", "id"=>"slider_full_height"),
			array("name"=>"Full-width Slider", "id"=>"slider_full_width"),
			array("name"=>"Lightbox Gallery", "id"=>"lightbox"),
			array("name"=>"Standard page", "id"=>"standard"),
			array("name"=>"Video Item", "id"=>"video"),
			array("name"=>"Custom link", "id"=>"custom")),
			"std" => "slider_full_height",
			"description" => "Select the type of the portfolio item. The click action in the Grid Gallery page will depend on the type you select."
			),
			
			array(
			"title" => "Custom Link/Video URL",
			"name" => "custom",
			"std" => "",
			"type" => "text",
			"description" => 'If "Video Item" is selected as "Item type", you can insert a video URL here. If "Custom link" selected above, 
			you can insert the custom URL.'
			),
			
			array(
			"title" => "Video Description",
			"name" => "description",
			"std" => "",
			"type" => "textarea",
			"description" => 'If "Video Item" is selected as "Item type", you can insert a description in this field that will be displayed below the image/video in lightbox.'
			),


			array(
			"title" => '<div class="ui-icon ui-icon-image"></div>Grid Gallery items settings only',
			"type" => "heading"),
			
			array(
			"title" => "Image Layout - number of columns and rows to allocate",
			"name" => "img_layout",
			"class" => "layout",
			"type" => "multiple-text",
			"std" => "1",
			"elements" => array( array(
				"title" => "Columns",
				"name" => "img_columns",
				"type" => "text",
				"std" => "1"
				),

				array(
				"title" => "Rows",
				"name" => "img_rows",
				"type" => "text",
				"std" => "1"
				)),
			"description" => 'The base image(column/row) size can be set in the edit options of the gallery page. This value sets how many columns and rows the image should allocate.'
			),

				array(
			"title" => "Crop thumbnail image from",
			"name" => "crop",
			"type" => "imageradio",
			"options" => array(array("img"=>PEXETO_IMAGES_URL.'crop-c.png', "id"=>"c", "title"=>"Center"),
			array("img"=>PEXETO_IMAGES_URL.'crop-t.png', "id"=>"t", "title"=>"Top"),
			array("img"=>PEXETO_IMAGES_URL.'crop-b.png', "id"=>"b", "title"=>"Bottom"),
			array("img"=>PEXETO_IMAGES_URL.'crop-l.png', "id"=>"l", "title"=>"Left"),
			array("img"=>PEXETO_IMAGES_URL.'crop-r.png', "id"=>"r", "title"=>"Right")
			),
			"std" => "c",
			"description" => 'This option is available when the thumbnail will be automatically generated from the preview image (when the "Thumbnail URL" field above is empty)- you can see above how the cropping settings will affect both portrait and landscape oriented images.
			'
			),

			array(
			"title" => "Custom Thumbnail URL",
			"name" => "thumbnail",
			"std" => "",
			"type" => "upload",
			"description" => 'By default the theme will generate automatically the thumbnail image for the item from
			the image you set as featured (or if a featured image is not set, the first image from the uploaded images). However, if you prefer to manually set
			this thumbnail image, you can set its URL in this field.<br />
			Use the "<b>Upload Image</b>" button to upload a new image. If you would like to select an image from the Media Library,
			click on the "<b>Use Media Library</b>" button. Once you select the image, click on the "Insert into post" button.'
			),

			array(
			"title" => '<div class="ui-icon ui-icon-image"></div>Standard page item type settings',
			"type" => "heading"),

				array(
			"name" => "layout",
			"title" => "Layout",
			"type" => "select",
			"class" => "two-columns",
			"options" => array(array("name"=>"Right sidebar", "id"=>"right"),
			array("name"=>"Left sidebar", "id"=>"left"),
			array("name"=>"Full-width", "id"=>"full")),
			"std" => 'right',
			"description" => 'This is the layout of the single item page - this option will affect the single item page when the item type is one of the following: "Standard Page", "Video Item" or "Lightbox Gallery"'),
			
				array(
			"name" => "sidebar",
			"class" => "two-columns last",
			"title" => "Sidebar",
			"type" => "select",
			"options" => $pexeto_data->pexeto_sidebars,
			"description" => 'The sidebar of the single item page - this option will affect the single item page when the item type is one of the following: "Standard Page", "Video Item" or "Lightbox Gallery"'),

	);

	}
}


if(!function_exists("pexeto_get_posttype_meta_boxes")){
	function pexeto_get_posttype_meta_boxes($post_type){
		$meta_boxes = null;
		switch ($post_type) {
			case 'page':
				global $new_meta_boxes;
				$meta_boxes = $new_meta_boxes;
				break;
			case 'post':
				global $new_meta_post_boxes;
				$meta_boxes = $new_meta_post_boxes;
				break;
			case PEXETO_PORTFOLIO_POST_TYPE:
				global $new_meta_portfolio_boxes;
				$meta_boxes = $new_meta_portfolio_boxes;
				break;	
		}
		return $meta_boxes;
	}
}


/**
 * Creates a page meta box.
 */
if(!function_exists("pexeto_init_meta_boxes")){
	function pexeto_init_meta_boxes() {
		global $post;
		$post_type = $post->post_type;
		$allowed_types = array("post", "page", PEXETO_PORTFOLIO_POST_TYPE);
		if(in_array($post_type, $allowed_types)){
			add_meta_box( 'new-meta-'.$post_type.'-boxes', '<div class="icon-small"></div> '.PEXETO_THEMENAME.' '.$post_type.' SETTINGS', 'pexeto_add_meta_boxes', $post_type, 'normal', 'high' );
		}
	}
}


/**
 * Calls the print method for the relevant post type meta boxes.
 */
if(!function_exists("pexeto_add_meta_boxes")){
	function pexeto_add_meta_boxes() {
		global $post;
		$post_type = $post->post_type;
		$meta_boxes = pexeto_get_posttype_meta_boxes($post_type);
		

		if($meta_boxes!=null){
			foreach($meta_boxes as $meta_box) {
				print_meta_box($meta_box, $post);
			}
		}
	}
}


/**
 * Prints the meta box
 * @param $meta_box the meta box to be printed
 * @param $post the post to contain the meta box
 */
if(!function_exists("print_meta_box")){
	function print_meta_box($meta_box, $post){
		$meta_box_value = "";
		if(isset($meta_box['name'])){
			$meta_box_value = get_post_meta($post->ID, $meta_box['name'].'_value', true);
		}

		if($meta_box_value == "" && isset($meta_box['std'])){
			$meta_box_value = $meta_box['std'];
		}

		if($meta_box['type']!='heading'){
			$box_class = isset($meta_box['class'])?' '.$meta_box['class']:'';
			echo '<div class="option-container'.$box_class.'">';
			echo'<input type="hidden" name="'.$meta_box['name'].'_noncename" id="'.$meta_box['name'].'_noncename" value="'.wp_create_nonce( plugin_basename(__FILE__) ).'" />';
			echo'<h4 class="page-option-title">'.$meta_box['title'].'</h4>';
		}

		switch($meta_box['type']){
			case 'heading':
				echo'<div class="option-heading"><h4>'.$meta_box['title'].'</h4></div>';
				break;
			case 'text':
				echo'<input type="text" name="'.$meta_box['name'].'_value" value="'.$meta_box_value.'" class="option-input"/><br />';
				break;
			case 'upload':
				echo'<input type="text" name="'.$meta_box['name'].'_value" value="'.$meta_box_value.'" id="pexeto-'.$meta_box['name'].'" class="option-input upload pexeto-upload"/>';
				echo '<input type="button" id="pexeto-'.$meta_box['name'].'_button" class="button pexeto-upload-btn" value="Upload Image" />';
				echo '<input type="button" id="pex-media" class="button-secondary" value="Use Media Library" onclick="pexetoPageOptions.loadMediaImage(jQuery(\'#pexeto-'.$meta_box['name'].'\'));"/>';
				break;
			case 'textarea':
				echo'<textarea name="'.$meta_box['name'].'_value" class="option-textarea" />'.$meta_box_value.'</textarea><br />';
				break;
			case 'imageradio':
				if(sizeof($meta_box['options'])>0){
					foreach ($meta_box['options'] as $option) { 
						$checked= $meta_box_value == $option['id']?'checked="checked"':'';
						echo '<div class="imageradio"><input type="radio" name="'.$meta_box['name'].'_value" value="'.$option['id'].'" '.$checked.'/><img src="'.$option['img'].'" title="'.$option['title'].'"/></div>';
					}
				}
				break;
			case 'select':
				echo '<select name="'.$meta_box['name'].'_value" id="'.$meta_box['name'].'_value">';

					
				if(sizeof($meta_box['options'])>0){
					foreach ($meta_box['options'] as $option) { ?>
						<option
						<?php if ( $meta_box_value == $option['id']) {
							echo ' selected="selected"';
						}
						if ($option['id']=='disabled') {
							echo ' disabled="disabled"';
						}

						if (isset($option['class'])) {
							echo ' class="'.$option['class'].'"';
						}
						?>
							value="<?php echo($option['id']);?>"><?php echo $option['name']; ?></option>
						<?php

					}
				}
				echo '</select>';
				break;
				case 'multiple-text':
				foreach ($meta_box['elements'] as $el) {
					$el_value = get_post_meta($post->ID, $el['name'].'_value', true);
					if($el_value == "")
					$el_value = $el['std'];
					echo $el['title'].' <input type="text" name="'.$el['name'].'_value" value="'.$el_value.'" id="'.$el['name'].'" class="option-input small-input"/>';
				}

				if($meta_box['class']=='layout'){
					echo '<div id="item-layout"></div>
					<script type="text/javascript">
						jQuery(document).ready(function($){
							pexetoPageOptions.imageLayoutSelector($("#item-layout"), $("#'.$meta_box['elements'][0]["name"].'"), $("#'.$meta_box['elements'][1]["name"].'"));
						});
					</script>
					';
				}
				
				break;
		}


		if($meta_box['type']!='heading'){
			echo'<span class="option-description">';
			if(isset($meta_box['description'])){
				echo $meta_box['description'];
			}
			echo '</span></div>';
			if(strstr($box_class,'last')){
				echo '<div class="clear"></div>';
			}
		}
	}
}


/**
 * Saves the meta box content of the post
 * @param $post_id the ID of the page that contains the meta box
 */
if(!function_exists("pexeto_save_postdata")){
	function pexeto_save_postdata( $post_id ) {
		global $post;
		if(isset($post)){
			$post_type = $post->post_type;
			$meta_boxes = pexeto_get_posttype_meta_boxes($post_type);

			if($meta_boxes!=null){
				pexeto_save_meta_data($meta_boxes, $post_id);
			}
		}
	}
}

/**
 * Saves the post meta for all types of posts.
 * @param $new_meta_boxes the meta data array
 * @param $post_id the ID of the post
 */
if(!function_exists("pexeto_save_meta_data")){
	function pexeto_save_meta_data($new_meta_boxes, $post_id){
		foreach($new_meta_boxes as $meta_box) {

			if($meta_box['type']!='heading'){
				// Verify
				if ( !wp_verify_nonce( $_POST[$meta_box['name'].'_noncename'], plugin_basename(__FILE__) )) {
					return $post_id;
				}

				if ( 'page' == $_POST['post_type'] ) {
					if ( !current_user_can( 'edit_page', $post_id ))
					return $post_id;
				} else {
					if ( !current_user_can( 'edit_post', $post_id ))
					return $post_id;
				}

				$meta_name = $meta_box['name'].'_value';
				$data = isset($_POST[$meta_box['name'].'_value']) ? $_POST[$meta_box['name'].'_value'] : null;

				if($meta_box['type']!='multiple-text' && $data){
					pexeto_update_single_meta($post_id, $meta_name, $data);
				}elseif(isset($meta_box['elements'])){
					foreach ($meta_box['elements'] as $el) {
						pexeto_update_single_meta($post_id, $el['name'].'_value', $_POST[$el['name'].'_value']);
					}
				}
				
			}
		}
	}
}

if(!function_exists("pexeto_update_single_meta")){
	function pexeto_update_single_meta($post_id, $meta_name, $data){
		if(get_post_meta($post_id, $meta_name) == "")
		add_post_meta($post_id, $meta_name, $data, true);
		elseif($data != get_post_meta($post_id, $meta_name, true))
		update_post_meta($post_id, $meta_name, $data);
		elseif($data == "")
		delete_post_meta($post_id, $meta_name, get_post_meta($post_id, $meta_name, true));
	}
}

/* ------------------------------------------------------------------------*
 * HELPER META FUNCTIONS
 * ------------------------------------------------------------------------*/

/**
 * Returns the default value of a meta box.
 * @param $meta_array the array of meta boxes to search within
 * @param $name the name (ID) of the meta box
 */
if(!function_exists("pexeto_get_meta_std_value")){
	function pexeto_get_meta_std_value($meta_array, $name){
		foreach($meta_array as $meta_item){
			if(isset($meta_item["name"]) && $meta_item["name"]==$name){
				return $meta_item["std"];
			}
		}
		return '';
	}
}

/**
 * Returns the saved meta data for a page of each of the given keys.
 * @param int $page_id the ID of the page to retrieve the meta data
 * @param array $keys an array containing all the keys whose values will be retrieved
 */
if(!function_exists("pexeto_get_post_meta")){
	function pexeto_get_post_meta($page_id, $keys){
		global $new_meta_boxes;
		
		$res=array();
		foreach($keys as $key){
			$meta=get_post_meta($page_id, $key.'_value', true);
			if($meta!=''){
				$res[$key]=$meta;
			}else{
				//if the value is not saved, get the default value from the array
				$res[$key]=pexeto_get_meta_std_value($new_meta_boxes, $key);
			}
		}
		return $res;
	}
}
