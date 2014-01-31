<?php
/*
 Template Name: Portfolio Grid Gallery
 Displays the portfolio items in a grid, separated by pages. The items can be also
 filtered by a category.
 */
get_header();


if(have_posts()){
	while(have_posts()){
		the_post();
		
		//get all the page meta data (settings) needed (function located in lib/functions/meta.php)
		$page_settings=pexeto_get_post_meta($post->ID, array('show_filter', 'post_category', 'post_number', 'slider',
		'order', 'image_width', 'image_height'));
		
		//create a data object that will be used globally by the other files that are included
		$pex_page=new stdClass();
		$pex_page->layout='grid-full';
		$pex_page->show_title='off';
		$pex_page->slider='none';

		$page_settings['page']=true;


		//include the before content template
		locate_template( array( 'includes/html-before-content.php'), true, true );
		wp_reset_postdata();
	}
}

locate_template( array( 'includes/gallery-load.php'), true, false );

//include the after content template
locate_template( array( 'includes/html-after-content.php'), true, true );

get_footer();
?>
