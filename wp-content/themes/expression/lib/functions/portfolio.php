<?php
/**
 * This file contains all the portfolio functionality.
 *
 * @author Pexeto
 */

/**
 * ADD THE ACTIONS
 */
add_action('init', 'pexeto_register_portfolio_category');  
add_action('init', 'pexeto_register_portfolio_post_type'); 
add_action('manage_posts_custom_column',  'portfolio_show_columns', 10, 2); 


add_filter('manage_edit-portfolio_columns', 'portfolio_columns');



/**
 * Registers the portfolio category taxonomy.
 */
if(!function_exists("pexeto_register_portfolio_category")){
	function pexeto_register_portfolio_category(){

		register_taxonomy("portfolio_category",
		array(PEXETO_PORTFOLIO_POST_TYPE),
		array(	"hierarchical" => true,
				"label" => "Portfolio Categories", 
				"singular_label" => "Portfolio Categories", 
				"rewrite" => true,
				"query_var" => true
		));
	}
}

/**
 * Registers the portfolio custom type.
 */
if(!function_exists("pexeto_register_portfolio_post_type")){
	function pexeto_register_portfolio_post_type() {

		//the labels that will be used for the portfolio items
		$labels = array(
			    'name' => _x('Portfolio', 'portfolio name', 'pexeto'),
			    'singular_name' => _x('Portfolio Item', 'portfolio type singular name', 'pexeto'),
			    'add_new' => _x('Add New', 'portfolio', 'pexeto'),
			    'add_new_item' => __('Add New Item', 'pexeto'),
			    'edit_item' => __('Edit Item', 'pexeto'),
			    'new_item' => __('New Portfolio Item', 'pexeto'),
			    'view_item' => __('View Item', 'pexeto'),
			    'search_items' => __('Search Portfolio Items', 'pexeto'),
			    'not_found' =>  __('No portfolio items found', 'pexeto'),
			    'not_found_in_trash' => __('No portfolio items found in Trash', 'pexeto'), 
			    'parent_item_colon' => ''
			    );

			    //register the custom post type
			    register_post_type( PEXETO_PORTFOLIO_POST_TYPE,
			    array( 'labels' => $labels,
		         'public' => true,  
		         'show_ui' => true,  
		         'capability_type' => 'post',  
		         'hierarchical' => false,  
				 'rewrite' => array('slug'=>'portfolio'),
				 'taxonomies' => array('portfolio_category'),
		         'supports' => array('title', 'editor', 'thumbnail', 'comments', 'page-attributes') ) );
	}
}

if(!function_exists("portfolio_columns")){
	function portfolio_columns($columns) {
		$columns['category'] = 'Portfolio Category';
		$columns['featured'] = 'Featured Image';
		return $columns;
	}
}

/**
 * Add category column to the portfolio items page
 * @param $name
 */
if(!function_exists("portfolio_show_columns")){
	function portfolio_show_columns($name, $id) {
		global $post;
		switch ($name) {
			case 'category':
				$cats = get_the_term_list( $post->ID, 'portfolio_category', '', ', ', '' );
				echo $cats;
				break;
			case 'featured' :
				if (has_post_thumbnail($id)) {
					$preview_arr = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), 'single-post-thumbnail' ); 
					$preview = pexeto_get_resized_image($preview_arr[0], 80, 60, get_post_meta($post->ID, 'crop_value', true)); ?>
					<img src="<?php echo $preview; ?>" style="display:block; border:3px solid #ccc; margin-bottom:5px;"/>
					<?php
				}	
			break;
		}
	}
}


/**
 * Gets a list of custom taxomomies by slug
 * @param $term_id the slug
 */
if(!function_exists("pexeto_get_taxonomy_slug")){
	function pexeto_get_taxonomy_slug($term_id){
		global $wpdb;

		$res = $wpdb->get_results($wpdb->prepare("SELECT slug FROM $wpdb->terms WHERE term_id=%s LIMIT 1;", $term_id));
		$res=$res[0];
		return $res->slug;
	}
}

if(!function_exists("pexeto_get_items")){
	function pexeto_get_items($args){
		$posts = get_posts($args);
		$res = array();
		foreach ($posts as $p) {
			$action = get_post_meta($p->ID, 'action_value', true);
			if($action == 'slider_full_height' || $action == 'slider_full_width'){
				$new_post = array("slug"=>$p->post_name);
				//set the category
				$terms=wp_get_post_terms($p->ID, 'portfolio_category');
				$term_ids=array();
				foreach($terms as $term){
					$term_ids[]=intval($term->term_id);
				}
				$new_post['cat'] = $term_ids;
				$res[]=$new_post;
			}
		}

		return $res;
	}
}

if(!function_exists("pexeto_get_portfolio_preview_img")){
	function pexeto_get_portfolio_preview_img($post){
		$preview = '';
		if (has_post_thumbnail($post->ID)) {
			$preview = pexeto_get_featured_image_url($post->ID);
		}else{
			$attachments = pexeto_get_post_images($post);
			if(sizeof($attachments)>0){
				$preview = array_shift(array_values($attachments))->guid;
			}
		}

		return $preview;
	}
}

if(!function_exists("pexeto_get_image_number")){
	function pexeto_get_image_number($id){
		$attachments = pexeto_get_portfolio_attachments($id);
		return sizeof($attachments);
	}
}

if(!function_exists("pexeto_get_portfolio_attachments")){
	function pexeto_get_portfolio_attachments($id){
		return get_children( array('order'=> 'ASC', 'orderby'=>'menu_order', 'post_parent' => $id, 'post_type' => 'attachment', 'post_mime_type' =>'image') );
	}
}

if(!function_exists("pexeto_get_attachment_thumb_html")){
	function pexeto_get_attachment_thumb_html($id){
		$attachments = pexeto_get_portfolio_attachments($id);
		$featuredImg = pexeto_get_featured_image_url($id);
		$html = '';
		foreach ( $attachments as $attachment ) {
			$thumb = wp_get_attachment_image_src($attachment->ID);
			$featured = $attachment->guid==$featuredImg?'class="featured"':'';
			$html.='<img src="'.$thumb[0].'" '.$featured.' />';
	    }
	    return $html;
	}
}
