<?php
/**
 * Single Portfolio Template - This is the template for the single portfolio item content.
 */
get_header();

if(have_posts()){
	while(have_posts()){
		the_post();
		//get all the page data needed and set it to an object that can be used in other files
		$pex_page=new stdClass();
		$page_settings=pexeto_get_post_meta($post->ID, array('layout','show_title','sidebar', 'portfolio_preview', 'action'));
		$pex_page->slider='none';
		$pex_page->sidebar=$page_settings['sidebar'];
		$single_slider=false;
		if($page_settings['action']=='slider_full_height' || $page_settings['action']=='slider_full_width'){
			$pex_page->layout='grid-full';
			$single_slider=true;
		}else{
			$pex_page->layout=$page_settings['layout'];
		}
		$page_settings['page']=false;
		
		//include the before content template
		locate_template( array( 'includes/html-before-content.php'), true, true ); 
		$custom_link = get_post_meta($post->ID, 'custom_value', true);

		if(!$single_slider){
			//PRINT A STANDARD LAYOUT PAGE WITH CONTENT
			?>
		  	<h1 class="page-heading"><?php the_title(); ?></h1>
		  	
		  	<?php
			if($page_settings['action']=='standard' || $page_settings['action']=='custom'){ 
				//PRINT the FEATURED IMAGE
				$link = ($page_settings['action']=='custom' && $custom_link) ? $custom_link : null;
				$img_id=$pex_page->layout=='full'?'post_box_img_full':'post_box_img';
				if($link){
					?><a href="<?php echo $link; ?>"><?php
				}
				the_post_thumbnail($img_id);
				if($link){
					?></a><?php
				}
				?>
			<?php }elseif($page_settings['action']=='video'){ 
				//PRINT A VIDEO
				?>
				<div class="post-video-wrapper">
					<div class="post-video">
					<?php $video_url = $custom_link;
					if($video_url){
						global $pexeto_content_sizes;
						$width=$pex_page->layout=='full'?'fullwidth':'content';
						$content_size = $pexeto_content_sizes[$width];
						pexeto_print_video($video_url, $content_size);
					}
					?></div>
				</div>
			<?php }
			the_content();
			
			if(get_opt('_portfolio_comments')=='on'){  
				comments_template();  
			} 
		}else{
			//PRINT A PORTFOLIO ITEM SLIDER
			locate_template( array( 'includes/gallery-load.php'), true, false );
	
		}
		
		

	}
}

	 
//include the after content template
locate_template( array( 'includes/html-after-content.php'), true, true );

get_footer();
?>

