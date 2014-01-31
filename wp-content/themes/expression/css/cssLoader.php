<?php header("Content-type: text/css; charset: UTF-8"); 

require_once( '../../../../wp-load.php' );

$css='';
$option_keys = array("skin" , "custom_color" , "pattern" , "custom_pattern" , "body_color" , "body_bg" , "custom_body_bg" , "body_text_size" , "logo_image" , "retina_logo_image" , "logo_width" , 
	"logo_height" , "link_color" , "heading_color" , "menu_link_color" , "elements_color" , "boxes_color" , "subtitle_color" , "comments_bg" , "footer_bg" , "footer_text_color" ,
	"heading_font_family" , "body_font_family", "header_bg_color", "footer_bg_color", "dropdown_color", "content_bg", "border_color", "secondary_color");

foreach ($option_keys as $key) {
	$pexeto_css[$key] = get_opt('_'.$key);
}

$pexeto_main_color=$pexeto_css['custom_color']==''?$pexeto_css['skin']:$pexeto_css['custom_color'];

/**--------------------------------------------------------------------*
 * SET THE BACKGROUND COLOR AND PATTERN
 *---------------------------------------------------------------------*/

if($pexeto_css['custom_pattern']!='' || ($pexeto_css['pattern']!='' && $pexeto_css['pattern']!='none')){
	if($pexeto_css['custom_pattern']!=''){
	$bg=$pexeto_css['custom_pattern'];
	}else{
	$bg=get_bloginfo('template_url').'/images/patterns/'.$pexeto_css['pattern'];
	}
	$css.= 'body{background-image:url('.$bg.');}';
}

$bgcolor=$pexeto_css['custom_body_bg']?$pexeto_css['custom_body_bg']:$pexeto_css['body_bg'];
if($bgcolor!=''){
	$css.= 'body {background-color:#'.$bgcolor.';}';
}

if($pexeto_css['body_text_size']!=''){
	$css.= 'body, .sidebar,#footer ul li a,#footer{font-size:'.$pexeto_css['body_text_size'].'px;}';
}

/**--------------------------------------------------------------------*
 * SET THE LOGO
 *---------------------------------------------------------------------*/

$logo_width = 143;
$logo_height = 28;


if($pexeto_css['logo_image']!=''){
	$css.= "#logo-container a{background:url('".$pexeto_css['logo_image']."');}";
}

if($pexeto_css['logo_width']!=''){
	$logo_width = $pexeto_css['logo_width'];
	$css.= '#logo-container, #logo-container a{width:'.$pexeto_css['logo_width'].'px; }';
}


if($pexeto_css['logo_height']!=''){
	$logo_height = $pexeto_css['logo_height'];
	$css.= '#logo-container, #logo-container a{height:'.$pexeto_css['logo_height'].'px;}';
}

if($pexeto_css['logo_width']!=''){
	$css.= '#logo-container a{background-size:'.$pexeto_css['logo_width'].'px auto;}';
}

//retina display logo
if($pexeto_css['retina_logo_image']){

	$css.= '@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5) {
	#logo-container a {
	    background: url("'.$pexeto_css['retina_logo_image'].'") no-repeat scroll 0 0 transparent;
	    background-size: '.$logo_width.'px '.$logo_height.'px;
	}}';
}

/**--------------------------------------------------------------------*
 * BACKGROUND OPTIONS
 *---------------------------------------------------------------------*/

if($pexeto_css['header_bg_color']){
	$css.= '#header, #menu ul ul li{background:#'.$pexeto_css['header_bg_color'].';}';
}

if($pexeto_css['footer_bg_color']){
	$css.= '#footer, .preview-content, .item-share, .item-count{background:#'.$pexeto_css['footer_bg_color'].';}';
}


if($pexeto_css['elements_color']!=''){
	$css.= '.button, .item-num, #submit, input[type=submit], td#today, table#wp-calendar td:hover, table#wp-calendar td#today, table#wp-calendar td:hover a, table#wp-calendar td#today a{background-color:#'.$pexeto_css['elements_color'].';}';
}


if($pexeto_css['dropdown_color']!=''){
	$css.= '#menu ul ul li a:hover, #menu ul ul li.current-menu-item a{background-color:#'.$pexeto_css['dropdown_color'].';}';
}


if($pexeto_css['content_bg']!=''){
	$css.= '#content-container, #accordion .pane, input[type="text"], textarea, .post-date{background-color:#'.$pexeto_css['content_bg'].';}';
}

if($pexeto_css['border_color']!=''){
	$css.= '.sidebar-box h4,.page-wraper .post-content-content, .double-line, h1.page-heading {box-shadow:0 4px 0 #'.$pexeto_css['border_color'].'; border-color:#'.$pexeto_css['border_color'].';}';
	$css.= '#comments {box-shadow:0 4px 0 #'.$pexeto_css['border_color'].' inset; border-color:#'.$pexeto_css['border_color'].';}';
	$css.= '.post-date span.month, .post-date, .gallery a, .wp-caption, img.img-frame, .coment-box, .bypostauthor .coment-box, .coment-box img, #accordion .pane, #accordion h2,.tabs li a, table, table td, table th, .panes, input[type="text"], textarea, #sidebar .widget_categories ul li a, blockquote p, hr, #sidebar .widget_nav_menu ul li a, #sidebar .widget_archive ul li a, #sidebar .widget_links ul li a, #sidebar .widget_recent_entries ul li a {border-color:#'.$pexeto_css['border_color'].';}';
	$css.= '#sidebar-projects a, .gallery a, .wp-caption, img.img-frame, .coment-box img{background-color:#'.$pexeto_css['border_color'].';}';
}

if($pexeto_css['secondary_color']!=''){
	$css.= '.item-share:hover, .post-date span.month, .coment-box, .bypostauthor .coment-box, .tabs li a, table td:hover, .panes, #accordion h2, #accordion h2.current, table th, #sidebar ul li.current_page_item a, #sidebar ul li.current_menu_item a, #sidebar ul li.current_page_parent a, #sidebar ul li.current-cat a, #sidebar .widget_categories ul li a:hover, #sidebar .widget_nav_menu ul li a:hover, #sidebar .widget_archive ul li a:hover, #sidebar .widget_links ul li a:hover, #sidebar .widget_recent_entries ul li a:hover, #content-container .wp-pagenavi span.current, #content-container .wp-pagenavi a.page:hover, #content-container .wp-pagenavi a.nextpostslink:hover, #content-container .wp-pagenavi a.previouspostslink:hover{background-color:#'.$pexeto_css['secondary_color'].';}';
}

/**--------------------------------------------------------------------*
 * TEXT COLORS
 *---------------------------------------------------------------------*/

if($pexeto_css['body_color']!=''){
	$css.= 'body, .post-date span.year, input[type="text"], textarea, .item-share, .item-count, .item-desc, .sidebar-box ul li a,#portfolio-big-pagination a,.sidebar-box h4, #slider, .no-caps, .post-date h4, .post-date span, #sidebar .widget_categories ul li a, #sidebar .widget_nav_menu ul li a, blockquote, #content-container .wp-pagenavi a, #content-container .wp-pagenavi span.pages, #content-container .wp-pagenavi span.current, #content-container .wp-pagenavi span.extend {color:#'.$pexeto_css['body_color'].';}';
}

if($pexeto_css['link_color']!=''){
	$css.= 'a,.post-info, .post-info a, #main-container .sidebar-box ul li a{color:#'.$pexeto_css['link_color'].';}';
}

if($pexeto_css['heading_color']!=''){
	$css.= 'h1,h2,h3,h4,h5,h6,h1.page-heading,.sidebar-box h4,.post h1, h2.post-title a, .content-box h2, #portfolio-categories ul li, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, .services-box h4, #intro h1, #page-title h1, .item-desc h4 a, .item-desc h4, .sidebar-post-wrapper h6 a, table th, .tabs a, .post-title a:hover{color:#'.$pexeto_css['heading_color'].';}';
}

if($pexeto_css['menu_link_color']!=''){
	$css.= '#menu ul li a, #menu ul ul li a, #menu ul ul li a:hover, #site-description, #menu ul ul li.current-menu-item a{color:#'.$pexeto_css['menu_link_color'].'; text-shadow:none;}';
}

if($pexeto_css['footer_text_color']!=''){
	$css.= '#footer,#footer ul li a,#footer ul li a:hover,#footer h4, .copyrights{color:#'.$pexeto_css['footer_text_color'].';}';
}


/**--------------------------------------------------------------------*
 * FONTS
 *---------------------------------------------------------------------*/
if($pexeto_css['heading_font_family']!=''){
	$css.= 'h1,h2,h3,h4,h5,h6{font-family:'.$pexeto_css['heading_font_family'].';}';
}

if($pexeto_css['body_font_family']!=''){
	$css.= 'body{font-family:'.$pexeto_css['body_font_family'].';}';
}



/**--------------------------------------------------------------------*
 * ADDITIONAL STYLES
 *---------------------------------------------------------------------*/

if(get_opt('_additional_styles')!=''){
	$css.=(get_opt('_additional_styles'));
}

echo $css;
?>