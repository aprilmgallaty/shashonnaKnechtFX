<?php
/**
 * This file contain some general functions:
 * -enqueuing JS files
 * -set the default image attachment sizes
 * -register navigation menus function
 *
 * @author Pexeto
 */


/**
 * ADD THE ACTIONS
 */
add_action('init', 'pexeto_register_menus' );
add_action('init', 'pexeto_register_additional_scripts');
add_action('wp_footer', 'pexeto_print_additional_scripts');
add_action('after_setup_theme', 'pexeto_set_image_sizes');

add_theme_support('menus');
add_theme_support('automatic-feed-links');

/* ------------------------------------------------------------------------*
 * LOCALE AND TRANSLATION
 * ------------------------------------------------------------------------*/

load_theme_textdomain( 'pexeto', get_template_directory() . '/lang' );


/* ------------------------------------------------------------------------*
 * SET THE THUMBNAILS
 * ------------------------------------------------------------------------*/

if(!function_exists("pexeto_set_image_sizes")){
	function pexeto_set_image_sizes(){
		if (function_exists('add_theme_support')) {
			global $pexeto_data, $pexeto_content_sizes;
			add_theme_support( 'post-thumbnails' );
			add_image_size('post_box_img', $pexeto_content_sizes['content'], 370, true);
			add_image_size('post_box_img_full', $pexeto_content_sizes['fullwidth'], 390, true);
			add_image_size('static-header-img', $pexeto_content_sizes['container'], 400, true);
		}
	}
}


/**
 * Register the main menu for the theme.
 */
if(!function_exists("pexeto_register_menus")){
	function pexeto_register_menus() {
		register_nav_menus(
		array( 'pexeto_main_menu' => __( PEXETO_THEMENAME.' Theme Main Menu')));
	}
}

/**
 * Displays some directions in the main menu section when a menu has not be created and set.
 */
if(!function_exists("pexeto_no_menu")){
	function pexeto_no_menu(){
		echo 'Go to Appearance &raquo; Menus to create and set a menu';
	}
}

/**
 * Registers all the additional scripts that may be used later in the theme.
 */
if(!function_exists("pexeto_register_additional_scripts")){
	function pexeto_register_additional_scripts() {
	    wp_register_script('pexeto-nivo-slider', PEXETO_FRONT_SCRIPT_URL.'jquery.nivo.slider.pack.js', array('jquery'), false, true);
	}
}

/**
 * Prints all the scripts that have been added to the global $pexeto_scripts_to_print variable.
 */
if(!function_exists("pexeto_print_additional_scripts")){
	function pexeto_print_additional_scripts() {
	    global $pexeto_scripts_to_print; 
	    foreach($pexeto_scripts_to_print as $script){
	    	wp_print_scripts($script);
	    }
	}
}
