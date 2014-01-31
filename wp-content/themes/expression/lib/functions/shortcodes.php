<?php
/**
 * This file contains all the shortcodes and TinyMCE formatting buttons functionality.
 *
 * @author Pexeto
 */



/* ------------------------------------------------------------------------*
 * TABS
 * ------------------------------------------------------------------------*/

if(!function_exists("show_tabs")){
	function show_tabs($atts, $content = null) {
		extract(shortcode_atts(array(
			"titles" => '',
			"width" => 'medium'
		), $atts));
		$titlearr=explode(',',$titles);
		$html='<div class="tabs-container"><ul class="tabs ">';
		if($width=='small'){
			$wclass='w1';
		}elseif($width=='big'){
			$wclass='w3';
		}else{
			$wclass='w2';
		}
		foreach($titlearr as $title){
			$html.='<li class="'.$wclass.'"><a href="#">'.$title.'</a></li>';
		}
		$html.='</ul><div class="panes">'.do_shortcode($content).'</div></div>';
		return $html;
	}
}
add_shortcode('tabs', 'show_tabs');


if(!function_exists("show_pane")){
	function show_pane($atts, $content = null) {
		return '<div>'.do_shortcode($content).'</div>';
	}
}
add_shortcode('pane', 'show_pane');

if(!function_exists("show_accordion")){
	function show_accordion($atts, $content = null) {
		return '<div class="accordion-container"><div id="accordion">'.do_shortcode($content).'</div></div>';
	}
}
add_shortcode('accordion', 'show_accordion');

if(!function_exists("show_apane")){
	function show_apane($atts, $content = null) {
		extract(shortcode_atts(array(
			"title" => ''
			), $atts));
			return '<h2>'.$title.'</h2><div class="pane">'.do_shortcode($content).'</div>';
	}
}
add_shortcode('apane', 'show_apane');

/* ------------------------------------------------------------------------*
 * TESTIMONIALS
 * ------------------------------------------------------------------------*/

if(!function_exists("pexeto_show_testim")){
	function pexeto_show_testim($atts, $content = null) {
		extract(shortcode_atts(array(
			"name" => '',
			"img" =>'',
			"org" =>'',
			"link" =>'',
			"occup" =>''
			), $atts));
			
			$addClass=$img?'':' no-image';
			$testim='<div class="testimonial-container'.$addClass.'"><h2>'.$name.'</h2><span class="testimonials-details">'.$occup;
			if($org){
				$testim.=' / ';
				if($link) $testim.='<a href="'.$link.'">';
				$testim.=$org;
				if($link) $testim.='</a>';
			}
			$testim.='</span><div class="double-line"></div>';
			if ($img) $testim.='<img class="img-frame testimonial-img" src="'.$img.'" alt="" />';
			$testim.='<blockquote><p>'.do_shortcode($content).'</p></blockquote><div class="clear"></div></div>';
			return $testim;
	}
}
add_shortcode('pextestim', 'pexeto_show_testim');


/* ------------------------------------------------------------------------*
 * CONTENT SLIDER
 * ------------------------------------------------------------------------*/
if(!function_exists("pexeto_content_slider")){
	function pexeto_content_slider($atts, $content = null) {
		global $post;
		$pid = $post->ID;
		extract(shortcode_atts(array(
			"id" => $pid,
			"exclude" => "",
			"name" => ""
		), $atts));

		$args = array();
		if(!empty($name)){
			$term = get_term_by('name', $name, PEXETO_NIVOSLIDER_POSTTYPE.PEXETO_TERM_SUFFIX);
			$slider_id = pexeto_generate_slider_id(PEXETO_NIVOSLIDER_POSTTYPE, $term->term_id);
			$args['slider_id'] = $slider_id;
		}else{
			$args['attachment'] = true;
			if(!empty($exclude)){
				$args['exclude'] = $exclude;
			}
		}

		return pexeto_get_nivo_in_content_html($id, $args);
	}
}
add_shortcode('contentslider', 'pexeto_content_slider');

/* ------------------------------------------------------------------------*
 * CONTACT FORM
 * ------------------------------------------------------------------------*/
if(!function_exists("pexeto_contact_form")){
function pexeto_contact_form(){
		$html='<div class="widget-contact-form">
	<form action="'.get_template_directory_uri().'/includes/send-email.php" method="post" id="submit-form" class="pexeto-contact-form">
	<div class="error-box fail-message">An error occurred. Message not sent.</div>
	  <input type="text" name="name" class="required clear-on-click" id="name_text_box" value="'.pex_text('_name_text').'" />
	  <input type="text" name="email" class="required clear-on-click email" id="email_text_box" value="'.pex_text('_your_email_text').'" />
	  <textarea name="question" rows="" cols="" class="required"
	    id="question_text_area"></textarea>
	  
	  <a class="button send-button"><span>'.pex_text('_send_text').'</span></a>
	  <div class="contact-loader"></div><div class="check"></div>
	   
	</form><div class="clear"></div></div>';
		return $html;
	}
}


add_shortcode('contactform', 'pexeto_contact_form');


/* ------------------------------------------------------------------------*
 * ADD CUSTOM FORMATTING BUTTONS
 * ------------------------------------------------------------------------*/

global $pexeto_buttons;
$pexeto_styling_buttons=array("pexetotitle", "pexetohighlight1", "pexetohighlight2", "pexetodropcaps", "|", "pexetolistcheck", "pexetoliststar",
"pexetolistarrow", "pexetolistarrow2", "pexetolistarrow4", "pexetolistplus", "|", "pexetolinebreak", 
"pexetoframe", "pexetolightbox", "|", "pexetobutton", "pexetoinfoboxes");
$pexeto_content_buttons=array("pexetotwocolumns", "pexetothreecolumns", "pexetofourcolumns", "|", "pexetoyoutube", "pexetovimeo", "pexetoflash", "|", "pexetotestimonials");

if(!function_exists("add_pexeto_buttons")){
	function add_pexeto_buttons() {
		if ( get_user_option('rich_editing') == 'true') {
			add_filter('mce_external_plugins', 'pexeto_add_btn_tinymce_plugin');
			add_filter('mce_buttons_3', 'pexeto_register_styling_buttons');
			add_filter('mce_buttons_4', 'pexeto_register_content_buttons');
		}
	}
}

add_action('init', 'add_pexeto_buttons');


/**
 * Register the buttons
 * @param $buttons
 */
if(!function_exists("pexeto_register_styling_buttons")){
	function pexeto_register_styling_buttons($buttons) {
		global $pexeto_styling_buttons;

		array_push($buttons, implode(',',$pexeto_styling_buttons));
		return $buttons;
	}
}

/**
 * Add the buttons
 * @param $plugin_array
 */
if(!function_exists("pexeto_add_btn_tinymce_plugin")){
	function pexeto_add_btn_tinymce_plugin($plugin_array) {
		global $pexeto_styling_buttons, $pexeto_content_buttons;
		$merged_buttons=array_merge($pexeto_styling_buttons, $pexeto_content_buttons);
		foreach($merged_buttons as $btn){
			$plugin_array[$btn] = PEXETO_LIB_URL.'formatting-buttons/editor-plugin.js';
		}
		return $plugin_array;
	}
}

/**
 * Register the buttons
 * @param $buttons
 */
if(!function_exists("pexeto_register_content_buttons")){
	function pexeto_register_content_buttons($buttons) {
		global $pexeto_content_buttons;

		array_push($buttons, implode(',',$pexeto_content_buttons));
		return $buttons;
	}
}

