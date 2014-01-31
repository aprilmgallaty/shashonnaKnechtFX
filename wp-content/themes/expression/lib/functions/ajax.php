<?php
/**
 * This file contains AJAX request function handlers.
 */

add_action('wp_ajax_pexeto_get_portfolio_items', 'pexeto_get_portfolio_items');
add_action('wp_ajax_nopriv_pexeto_get_portfolio_items', 'pexeto_get_portfolio_items');

add_action('wp_ajax_pexeto_get_portfolio_content', 'pexeto_get_portfolio_content');
add_action('wp_ajax_nopriv_pexeto_get_portfolio_content', 'pexeto_get_portfolio_content');

add_action('wp_ajax_pexeto_get_attachments', 'pexeto_get_attachments');

add_action('wp_ajax_pexeto_send_email', 'pexeto_send_email');
add_action('wp_ajax_nopriv_pexeto_send_email', 'pexeto_send_email');


/***********************************************************************************************************
 *   PORTFOLIO / GALLERY FUNCTIONS
 ***********************************************************************************************************/

/**
 * Returns the portfolio items in JSON format. The following options can be added in the GET request:
 * - number : the number of items to display
 * - cat : the category ID to display, if -1 returns the items from all the categories
 * - offset : the offset of the first element 
 * - imgwidth : the width of the image to be displayed
 * - orderby : the way the items will be ordered - available options "date" and "custom"
 */
if(!function_exists("pexeto_get_portfolio_items")){
	function pexeto_get_portfolio_items(){
		if(isset($_GET['number']) && isset($_GET['cat']) && isset($_GET['offset']) && isset($_GET['imgwidth']) && isset($_GET['imgheight'])){
			$args=array('post_type'=>PEXETO_PORTFOLIO_POST_TYPE, 'numberposts'=>$_GET['number'], 'offset'=>$_GET['offset']);
			$cat=$_GET['cat'];
			$margin = isset($_GET['itemMargin'])?$_GET['itemMargin']:0;
			if($cat!=-1){
				$args['portfolio_category']=get_term($cat, 'portfolio_category')->slug;
			}
			if(isset($_GET['orderby']) && $_GET['orderby']=='custom'){
				$args['orderby'] = 'menu_order';
				$args['order'] = 'asc';
			}
			$posts = get_posts($args);
			$new_posts=array();
			foreach($posts as $post){
				$post_id=$post->ID;
				$new_post = array();
				$new_post['id'] = $post->ID;
				$new_post['title'] = $post->post_title;
				//set the image
				$thumbnail = get_post_meta($post->ID, 'thumbnail_value', true);
				$preview = pexeto_get_portfolio_preview_img($post);

				$new_post['pr'] = $preview;
				
				//set the image size
				$columns = intval(get_post_meta($post->ID, 'img_columns_value', true));
				$rows = intval(get_post_meta($post->ID, 'img_rows_value', true));
				if(!$columns) $columns = 1;
				if(!$rows) $rows = 1;

				$img_width = $columns==1?$_GET['imgwidth'] : $columns * ($_GET['imgwidth']+$margin) - $margin ;
				$img_height = $_GET['imgheight'];
				if($img_height=="auto"){
					$img_height="";
				}elseif($rows!=1){
					$img_height = $rows * ($_GET['imgheight']+$margin) - $margin;
				}

				$new_post['col'] = $columns;
				$new_post['row'] = $rows;


				if(!$thumbnail){
					$thumbnail = pexeto_get_resized_image($preview, $img_width, $img_height, get_post_meta($post->ID, 'crop_value', true));
				}
				$new_post['image'] = $thumbnail;
				
				$description = get_post_meta($post->ID, 'description_value', true);
				if($description){
					$new_post['desc']=esc_attr($description);
				}


				//set the category
				$terms=wp_get_post_terms($post->ID, 'portfolio_category');
				$term_names=array();
				foreach($terms as $term){
					$term_names[]=$term->name;
				}
				if(sizeof($terms)>0){
					$new_post['cat'] = implode(' / ',$term_names);
				}

				$new_post['slug'] = $post->post_name;

				//set the link
				$action=get_post_meta($post->ID, 'action_value', true);
				switch($action){
					case 'slider_full_height': $new_post['link']=get_permalink($post_id); $new_post['fullwidth']=false; $new_post['slider']=true; break;
					case 'slider_full_width': $new_post['link']=get_permalink($post_id); $new_post['fullwidth']=true; $new_post['slider']=true; break;
					case 'standard': $new_post['link']=get_permalink($post_id); break;
					case 'custom': $new_post['link']=get_post_meta($post_id, 'custom_value', true); break;
					case 'video': $new_post['link']=get_post_meta($post_id, 'custom_value', true); $new_post['lightbox']=true; $new_post['video']=true; break;
					case 'lightbox' : $new_post['link']=$preview; $new_post['lightbox']=true; break;
				}

				if((isset($new_post['slider']) && $new_post['slider']==true) || (isset($new_post['lightbox']) && !isset($new_post['video']))){
					$attachments = pexeto_get_post_images($post);
					$new_post['imgnum'] = sizeof($attachments);
				}
				
				$new_posts[]=$new_post;
			}
			
			//check if there are more posts to load
			$args['offset']=($_GET['offset']+$_GET['number']);
			$more_posts = get_posts($args);
			$more = sizeof($more_posts)>0?true:false;
			
			$res_arr=array('items'=>$new_posts, 'more'=>$more);

			if(isset($_GET['itemsMap']) && $_GET['itemsMap']=="true"){
				$args['numberposts']=wp_count_posts(PEXETO_PORTFOLIO_POST_TYPE)->publish;
				$args['offset']=0;
				$res_arr['itemsMap'] = pexeto_get_items($args);
			}

			$res = json_encode($res_arr);

			echo($res);
			die();
		}
	}
}


/**
 * Returns the content and images attached to a portfolio item to an AJAX request in JSON format. If the item has been set
 * to hide the description, it would return the images only. The images are returned in an array - the first image is the
 * preview image of the item (if it is set) and after that are added the image attachments.
 * The following options can be set to the GET request:
 * - itemslug - the slug of the portfolio item whose data will be retrieved
 */
if(!function_exists("pexeto_get_portfolio_content")){
	function pexeto_get_portfolio_content(){
		if(isset($_GET['itemslug'])){
			$slug = $_GET['itemslug'];
			$posts = get_posts(array('name'=>$slug, 'post_type' => PEXETO_PORTFOLIO_POST_TYPE));

			if(sizeof($posts)==0){
				$res = array("failed"=>true);
				echo json_encode($res);
				die();
			}
			$post = $posts[0];

			$res_arr = array();
			
			$res_arr['title']=$post->post_title;
			$res_arr['slug']=$post->post_name;

			$res_arr['link'] = get_permalink($post->ID);

			if(get_post_meta($post->ID, 'action_value', true)=='slider_full_width'){
				$res_arr['fullwidth']=true;
			}else{
				$res_arr['fullwidth']=false;
			}

			
			//get the post images
		   	$images = array();
		   	$show_preview = get_opt('_slider_preview')=='off'?false:true;

		   	
		   	//get the gallery images (attachments)
		   	$attachments = pexeto_get_post_images($post);
			foreach ( $attachments as $attachment ) {
				$img_array = array('img'=>$attachment->guid, 'desc'=>$attachment->pexeto_desc);
				if($show_preview){
					$thumb = wp_get_attachment_image_src($attachment->ID, 'thumbnail');
					$img_array['thumb'] = $thumb[0];
					// $img_array['thumb'] = pexeto_get_resized_image($attachment->guid, 100, 100);
				}
		         $images[]=$img_array;
		    }
		    
		   	$res_arr['images']=$images;

			if(isset($_GET['itemsMap']) && $_GET['itemsMap']=="true"){
				//load all items into an array, so they can be used for previous/next project linking
				$args = array('post_type' => PEXETO_PORTFOLIO_POST_TYPE, 'showposts'=>-1);
				if(isset($_GET['cat']) && $_GET['cat']!=-1){
					$args['portfolio_category']=get_term($_GET['cat'], 'portfolio_category')->slug;
				}
				if(isset($_GET['orderby']) && $_GET['orderby']=='custom'){
					$args['orderby'] = 'menu_order';
					$args['order'] = 'asc';
				}
				$res_arr['itemsMap'] = pexeto_get_items($args);
			}

			$res = json_encode($res_arr);
			echo($res);
			die();
		}
	}
}

if(!function_exists("pexeto_get_attachments")){
	function pexeto_get_attachments(){
		if(isset($_GET['postId'])){
			echo pexeto_get_attachment_thumb_html($_GET['postId']);
			die();
		}
	}
}


/***********************************************************************************************************
 *   SEND EMAIL
 ***********************************************************************************************************/

if(!function_exists("pexeto_send_email")){
	function pexeto_send_email(){
		$res = array();

		if(isset($_POST["name"]) && $_POST["name"] && isset($_POST["email"]) && $_POST["email"] && isset($_POST["question"]) && $_POST["question"]){
			$name=urldecode(stripcslashes($_POST["name"]));
			$subject = get_opt("_message_from_text")." ".$name;
			
			$notes = urldecode(stripcslashes($_POST["question"]));
			$from = $_POST["email"];
			
			
			$message = get_opt("_from_text").": $from
			".get_opt("_message_text").": $notes \r\n";
			
			
			$emailToSend=get_opt('_email');
			$headers = 'From: '.$name.' <'.$from.'>' . "\r\n";
			$mail_res=wp_mail($emailToSend, $subject, $message, $headers);
			$res['success']=$mail_res;

		}
		

		$json_res = json_encode($res);
		echo($json_res);
		die();
	}
}