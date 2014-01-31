<?php
/**
 * This file contain some general helper functions
 *
 * @author Pexeto
 */

//add custom post formats support
add_theme_support( 'post-formats', array( 'gallery', 'video' ) );

/**
 * Filter the main blog page query according to the blog settings in the theme's Options page
 * @param $query the WP query object
 */
if(!function_exists("pexeto_set_blog_post_settings")){
	function pexeto_set_blog_post_settings( $query ) {
	    if ( $query->is_main_query() && is_home()) {
	    	$postsPerPage=get_opt('_post_per_page_on_blog')==''?5:get_opt('_post_per_page_on_blog');
			$excludeCat=explode(',',get_opt('_exclude_cat_from_blog'));
	        $query->set( 'category__not_in', $excludeCat );  //exclude the categories
	        $query->set( 'posts_per_page', $postsPerPage );  //set the number of posts per page
	    }
	}
}
add_action( 'pre_get_posts', 'pexeto_set_blog_post_settings' );


/**
 * Returns a text depending on the settings set. By default the theme gets uses
 * the texts set in the Translation section of the Options page. If multiple languages enabled,
 * the default language texts are used from the Translation section and the additional language
 * texts are used from the added .mo files within the lang folder.
 * @param $textid the ID of the text
 */
if(!function_exists("pex_text")){
	function pex_text($textid){

		$locale=get_locale();
		$int_enabled=get_option(PEXETO_SHORTNAME.'_enable_translation')=='on'?true:false;
		$default_locale=get_option(PEXETO_SHORTNAME.'_def_locale');

		if($int_enabled && $locale!=$default_locale){
			//use translation - extract the text from a defined .mo file
			return __($textid, 'pexeto');
		}else{
			//use the default text settings
			return stripslashes(get_option(PEXETO_SHORTNAME.$textid));
		}
	}
}

/**
 * Gets the URL for a Timthumb resized image.
 * @param $imgurl the original image URL
 * @param $width the width to which the image will be cropped
 * @param $height the height to which the image will be cropped
 * @param align align of the cropping (c=center, t=top, b=bottom, l=left, r=right)
 * @return the URL of the image resized with Timthumb
 */
if(!function_exists("pexeto_get_resized_image")){
	function pexeto_get_resized_image($imgurl, $width, $height, $align='c'){
		if(function_exists('get_blogaddress_by_id')){
			//this is a WordPress Network (multi) site
			global $blog_id;
			$imgurl=get_blogaddress_by_id(1).str_replace(get_blog_option($blog_id,'fileupload_url'),
			get_blog_option($blog_id,'upload_path'),
			$imgurl);
		}
		return get_template_directory_uri().'/lib/utils/timthumb.php?src='.$imgurl.'&h='.$height.'&w='.$width.'&zc=1&q=100&a='.$align;
	}
}

/**
 * Gets the URL of the featured image of a post.
 * @param $pid the ID of the post
 * @return the URL of the image
 */
if(!function_exists("pexeto_get_featured_image_url")){
	function pexeto_get_featured_image_url($pid){
		$attachment = wp_get_attachment_image_src( get_post_thumbnail_id( $pid ), 'single-post-thumbnail' ); 
		return $attachment[0];
	}
}

/**
 * Prints a video. For Flash videos uses the standard flash embed code and for other videos uses the WordPress embed tag.
 * @param $video_url the URL of the video
 * @param $width the width to set to the video
 */
if(!function_exists("pexeto_print_video")){
	function pexeto_print_video($video_url, $width){
		//check if it is a swf file
		if(strstr($video_url, '.swf')){
			//print embed code for swf file
			echo '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="'.$width.'" id="pexeto-flash" ALIGN=""><PARAM NAME=movie VALUE="'.$video_url.'"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#333399> <EMBED src="'.$video_url.'" quality=high bgcolor=#333399 WIDTH="'.$width.'" NAME="pexeto-flash" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED> </OBJECT>';
		}else{
			$video_html = apply_filters('the_content', '[embed width="'.$width.'"]' . $video_url . '[/embed]');
			echo $video_html;
		}
	}
}

/**
 * Prints the pagination. Checks whether the WP-Pagenavi plugin is installed and if so, calls
 * the function for pagination of this plugin. If not- shows prints the previous and next post links.
 */
if(!function_exists("print_pagination")){
	function print_pagination(){
		if(function_exists('wp_pagenavi')){
		 wp_pagenavi();
		}else{?>
	<div id="blog_nav_buttons" class="navigation">
	<div class="alignleft"><?php previous_posts_link('<span>&laquo;</span> '.pex_text('_previous_text')) ?></div>
	<div class="alignright"><?php next_posts_link(pex_text('_next_text').' <span>&raquo;</span>') ?></div>
	</div>
		<?php
		}
	}
}


/**
 * Removes an item from an array by specifying its value
 * @param $array the array from witch to remove the item
 * @param $val the value to be removed
 * @return returns the initial array without the removed item
 */
if(!function_exists("pexeto_remove_item_by_value")){
	function pexeto_remove_item_by_value($array, $val = '') {
		if (empty($array) || !is_array($array)) return false;
		if (!in_array($val, $array)) return $array;

		foreach($array as $key => $value) {
			if ($value == $val) unset($array[$key]);
		}

		return array_values($array);
	}
}


/**
 * Returns the HTML code needed for a Nivo slider in the content. Uses the image attachments of the post
 * or loads a selected slider images, depending on what value is saved to the post and what additional
 * arguments are set.
 * @param $pid the ID of the post
 * @param $args optional array containing additional arguments. If it contains "attachment" which is set
 * to true, it will load the post attachment images. Additionally, if it contains a key "exlcude" with
 * IDs of attachments separated with commas, those attachments will be excluded. Otherwise, 
 * if it contains a "slider_id" element containin an ID of existing slider it will load the slider
 * element.
 * @return the HTML code of the slider
 */
if(!function_exists("pexeto_get_nivo_in_content_html")){
	function pexeto_get_nivo_in_content_html($pid, $args=array()){
		//print the attachment images
		
		$autoresize = get_opt('_nivo_auto_resize_content')=='on'?true:false;
		$fullwidth = false;
		$images = array();
		$layout = get_post_meta($pid, "layout_value", true);
		if(!$layout){
			$layout = get_opt("_blog_layout");
		}
		if($layout=="full"){
			$fullwidth = true;
		}

		//get the image sizes
		global $pexeto_content_sizes;
		//get layout and the width
		if($fullwidth){
			$image_layout ='post_box_img_full';
			$imgwidth = $pexeto_content_sizes['fullwidth'];
		}else{
			$image_layout ='post_box_img';
			$imgwidth = $pexeto_content_sizes['content'];
		}
		//get the height
		if($autoresize){
			$imgheight = get_opt('_nivo_height_content')=='auto'?'':get_opt('_nivo_height_content');
		}

		
		if(!empty($args)){
			//arguments have been added to load the slider
			$image_source = $args['attachment'] ? 'attachments' : $args['slider_id'];
		}else{
			$image_source = get_post_meta($pid, 'post_slider_value', true);
		}

		if(!$image_source || $image_source=='attachments'){
			//load the images from the post attachments
			$attachments = pexeto_get_portfolio_attachments($pid);
			$exclude_arr= isset($args['exclude']) ? explode(",", $args['exclude']) : array();
			
			foreach ($attachments as $attachment) {
				if(!in_array(strval($attachment->ID), $exclude_arr)){
					if($autoresize){
						$preview = pexeto_get_resized_image($attachment->guid, $imgwidth, $imgheight, 'c');
					}else{
						$img = wp_get_attachment_image_src($attachment->ID, $image_layout);
						$preview = $img[0];
					}

					$desc = $attachment->post_content ? $attachment->post_content : $attachment->post_excerpt;

					$images[] = array("img"=>$preview, "link"=>null, "desc"=>$desc);
				}
			} 
		}else{
			//load the images from the selected slider
			$slider_data = pexeto_get_slider_data($image_source);
			foreach($slider_data['posts'] as $post){

				$link=get_post_meta($post->ID, PEXETO_CUSTOM_PREFIX.'image_link', true);
				$description=get_post_meta($post->ID, PEXETO_CUSTOM_PREFIX.'description', true);
				$imgurl=get_post_meta($post->ID, PEXETO_CUSTOM_PREFIX.'image_url', true);
				if($autoresize){
					$imgurl=pexeto_get_resized_image($imgurl, $imgwidth, $imgheight);
				}

				$images[] = array("img"=>$imgurl, "desc" => $description, "link" => $link);
			}
		}
		return pexeto_get_nivo_html($images, $pid);

	}
}


/**
 * Returns the general HTML code needed for a Nivo slider regardless of where it is inserted. 
 * @param images an array of images
 * @param $slider the ID of the post/slider - needed as a unique identifier
 * @param $content boolean setting whether the slider is inserted in the content (when true)
 * @return the HTML code of the slider
 */
if(!function_exists("pexeto_get_nivo_html")){
	function pexeto_get_nivo_html($images, $sliderid, $content=true){
		global $pexeto_scripts_to_print, $pexeto;
		$pexeto->nivo_id = isset($pexeto->nivo_id)? $pexeto->nivo_id+1 : 0;
		$pexeto_scripts_to_print[]='pexeto-nivo-slider';
		$html = '';
		$suffix = $content?'_content':'';

		$interval=get_opt('_nivo_interval'.$suffix);
		$animation=get_opt('_nivo_animation'.$suffix);
		$slices=get_opt('_nivo_slices'.$suffix);
		$columns=get_opt('_nivo_columns'.$suffix);
		$rows=get_opt('_nivo_rows'.$suffix);
		$speed=get_opt('_nivo_speed'.$suffix);
		$autoplay=get_opt('_nivo_autoplay'.$suffix)=='on'?'true':'false';
		$pauseOnHover=get_opt('_nivo_pause_hover'.$suffix)=='on'?'true':'false';
		$height = get_opt('_nivo_height'.$suffix);
		$height = is_numeric($height)?intval($height):400;

		$exclude_navigation=explode(',', get_opt('_exclude_nivo_navigation'.$suffix));
		$arrows=in_array('arrows', $exclude_navigation)?"false":"true";
		$buttons=in_array('buttons', $exclude_navigation)?"false":"true";
		$sliderClass=in_array('buttons', $exclude_navigation)?"":"nivo-margin";
		$html .='<script type="text/javascript">
		jQuery(function(){
			PEXETO.loadNivoSlider(jQuery("#nivo-slider-'.$pexeto->nivo_id.'"), {
				animation: "'.$animation.'" , 
				buttons: '.$buttons.', 
				arrows: '.$arrows.', 
				slices: '.$slices.', 
				speed: '.$speed.', 
				interval: '.$interval.', 
				pauseOnHover: '.$pauseOnHover.', 
				autoplay: '.$autoplay.', 
				columns: '.$columns.', 
				rows: '.$rows.'});
		});
		</script>
		<div id="nivo-slider-'.$pexeto->nivo_id.'" style="min-height:'.$height.'px;" class="nivoSlider">';

		foreach ($images as $img) {
			if($img["link"]){
			$html.='<a href="'.$img["link"].'">';
			}
			$html.='<img src="'.$img['img'].'" alt=""';
			if($img["desc"]){
				$html.=' title="'.stripslashes($img["desc"]).'"';
			}
			$html.='/>';
			if($img["link"]){
				$html.='</a>';
			}
		}
		$html.='</div>';
		return $html;
	}
}

/**
 * Returns all the saved lighbox options in the panel.
 */
if(!function_exists("pexeto_get_lightbox_options")){
	function pexeto_get_lightbox_options(){
		$opt_ids=array('theme','animation_speed','overlay_gallery', 'allow_resize');
		$res_arr=array();

		foreach ($opt_ids as $opt_id) {
			$option = get_opt($opt_id);
			if($option){
				if($option=='on'){
					$option = true;
				}elseif($option=='off'){
					$option = false;
				}
				$res_arr[$opt_id]=$option;
			}
		}

		return $res_arr;
	}
}


if(!function_exists('pexeto_get_post_images')){
	/**
	 * Loads the post images into an array. First checks for a gallery inserted
	 * in the content of the post. If there is a gallery, loads the gallery images.
	 * If there isn't a gallery, loads the post attachment images. If there aren't
	 * attachment images, loads the featured image of the post (if it set).
	 * @param  $post the post object
	 * @return array containing the attachment(image) objects
	 */
	function pexeto_get_post_images($post){
		$pattern = get_shortcode_regex();
		$ids = array();
		$images = array();
		 
		//check if there is a gallery shortcode included
		if (   preg_match_all( '/'. $pattern .'/s', $post->post_content, $matches )
	        && array_key_exists( 2, $matches )
	        && in_array( 'gallery', $matches[2] ) ){

	        $key = array_search('gallery', $matches[2]);
	        $att_text = $matches[3][$key];
	        $atts = shortcode_parse_atts( $att_text );
	        if(!empty($atts['ids'])){
	        	$ids = explode(',' , $atts['ids']);
	        }
	    }

	    $args = array(
						'post_type' => 'attachment', 
						'post_mime_type' =>'image',
						'numberposts' =>-1
	    			 );

	    if(!empty($ids)){
	    	//there is a gallery shortcode included
	    	$args['post__in'] = $ids;
	    }else{
	    	//there is no gallery shortcode included, load the item attachments
	    	$args['post_parent'] = $post->ID;
	    	$args['orderby'] = 'menu_order';
	    	$args['order'] = 'ASC';
	    }

	    $images = get_posts($args);

	    if(empty($images) && has_post_thumbnail($post->ID)){
	    	$att_id = get_post_thumbnail_id( $post->ID );
	    	$att = get_post($att_id);
	    	$images[]=$att;
	    	return $images;
	    }

	    if(!empty($ids)){
	    	//the images are added via the gallery shortcode, order them as set in their IDs attribute
	    	$ordered_images = array_fill(0, sizeof($images), null);
	
	    	foreach ($images as $img) {
	    		$index = array_search($img->ID, $ids);
	    		$ordered_images[$index] = $img;
	    	}

	    	$images = $ordered_images;

	    }

	    //set the description of the image
	    foreach ($images as &$img) {
	    	if(!empty($img->post_content)){
	    		// the descrtiption field of the image is set
	    		$img->pexeto_desc=$img->post_content;
	    	}elseif(!empty($img->post_excerpt)){
	    		// the caption field of the image is set
	    		$img->pexeto_desc=$img->post_excerpt;
	    	}else{
	    		$img->pexeto_desc='';
	    	}
	    }

	    return $images;

	}
}

if(!function_exists('pexeto_insert_gallery_into_attachment_posts')){
	/**
	 * Inserts a gallery shortcode in the beginning of each portfolio post or page which use
	 * post attachments to display different slideshows.
	 * This function is introduced after the release of WordPress 3.5 which changed the Media section
	 * of a post which no longer allows adding images as attachments and sorting them after this.
	 */
	function pexeto_insert_gallery_into_attachment_posts(){

		global $wp_version;

		$ver = floatval($wp_version);

		if(!get_option('pexeto_gallery_inserted') && $wp_version>=3.5){
			$att_posts = array();

			//get the portfolio items
			$portfolio_posts = get_posts(array(
					'post_type'=>PEXETO_PORTFOLIO_POST_TYPE,
					'numberposts' => -1	
				));

			$att_actions = array('slider_full_height', 'slider_full_width', 'lightbox');

			foreach ($portfolio_posts as $ppost) {
				if(in_array(get_post_meta($ppost->ID, 'action_value', true), $att_actions)){
					$att_posts[]=$ppost;
				}
			}

			//get the pages
			$pages = get_posts(array(
					'post_type'=>'page',
					'numberposts'=>-1
				));

			$att_templates = array('template-full-height-slideshow.php' , 'template-full-width-slideshow.php');

			foreach ($pages as $page) {
				if(in_array(get_post_meta( $page->ID, '_wp_page_template', true ) , $att_templates)){
					$att_posts[]=$page;
				}
			}

			//check for a gallery shortcode
			$pattern = get_shortcode_regex();

			foreach ($att_posts as $post) {
				if (   ! (preg_match_all( '/'. $pattern .'/s', $post->post_content, $matches )
			        && array_key_exists( 2, $matches )
			        && in_array( 'gallery', $matches[2] )) ){
					$columns = get_post_meta($post->ID, 'layout_value', true)=='full'?5:3;
					//there is no gallery shortcode, insert the shortcode into the post content
			      	$content = '[gallery link="file" columns="'.$columns.'"]'.$post->post_content;
			      	$edit_post = array();
					$edit_post['ID'] = $post->ID;
					$edit_post['post_content'] = $content;

					// update the post into the database
					wp_update_post( $edit_post );
			    }
			}

			update_option('pexeto_gallery_inserted', true);

		}
	}
}
add_action('admin_init', 'pexeto_insert_gallery_into_attachment_posts');
