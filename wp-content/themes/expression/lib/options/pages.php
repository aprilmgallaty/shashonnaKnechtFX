<?php
global $pexeto_data;

array_unshift($pexeto_categories, array('id'=>-1, 'name'=>'All Categories'));

//load the porftfolio categeories
$portf_taxonomies=get_terms('portfolio_category');
$portf_categories=array(array('id'=>'hide','name'=>'Hide'), (array('id'=>'disabled','name'=>'Show:', 'class'=>'caption')), array('id'=>'-1', 'name'=>'All Categories'));
foreach($portf_taxonomies as $taxonomy){
	$portf_categories[]=array("name"=>$taxonomy->name, "id"=>$taxonomy->term_id);
}

$pexeto_pages_options= array( array(
"name" => "Page Settings",
"type" => "title",
"img" => PEXETO_IMAGES_URL."icon_home.png"
),

array(
"type" => "open",
"subtitles"=>array(array("id"=>"blog", "name"=>"Blog"),array("id"=>"contact", "name"=>"Contact"))
),

/* ------------------------------------------------------------------------*
 * BLOG PAGE SETTINGS
 * ------------------------------------------------------------------------*/

array(
"type" => "subtitle",
"id"=>'blog'
),



array(
"name" => "Page Layout",
"id" => PEXETO_SHORTNAME."_blog_layout",
"type" => "select",
"options" => array(array('id'=>'right','name'=>'Right Sidebar'), array('id'=>'left','name'=>'Left Sidebar'), array('id'=>'full','name'=>'Full width')),
"std" => 'right',
"desc" => 'This layout setting will affect the blog page, blog posts template, archives and search pages'
),

array(
"name" => "Blog sidebar",
"id" => PEXETO_SHORTNAME."_blog_sidebar",
"type" => "select",
"options" => $pexeto_data->pexeto_sidebars,
"std" => 'default',
"desc" => 'This sidebar setting will affect the blog page, blog posts template, archives and search pages'
),


array(
"name" => "Header",
"id" => PEXETO_SHORTNAME."_home_slider",
"type" => "select",
"options" => pexeto_get_created_sliders(),
"std" => 'none',
"desc" => 'If you have created additional sliders, you can select the name of the slider to be displayed
on the blog. By default the Default slider for each slider type is displayed.'
),

array(
"name" => "Static Image URL",
"id" => PEXETO_SHORTNAME."_blog_static_image",
"type" => "upload",
"desc" => 'The header image URL when "Static Header Image" selected above. Optimal image size: 980 x 370 pixels.',
),

array(
"name" => "Exclude categories from blog",
"id" => PEXETO_SHORTNAME."_exclude_cat_from_blog",
"type" => "multicheck",
"options" => $pexeto_categories,
"class"=>"exclude",
"desc" => "You can select which categories not to be shown on the blog"),

array(
"name" => "Number of posts per page",
"id" => PEXETO_SHORTNAME."_post_per_page_on_blog",
"type" => "text",
"std" => "5"
),


array(
"name" => "Show sections from post info",
"id" => PEXETO_SHORTNAME."_exclude_post_sections",
"type" => "multicheck",
"options" => array(array("id"=>"date", "name"=>"Post Date"), array("id"=>"author", "name"=>"Post Author"), array("id"=>"category", "name"=>"Post Category"), array("id"=>"comments", "name"=>"Comment Number")),
"class"=>"exclude",
"desc" => "You can select which sections from the post info to be dispplayed.",
"std" => "")
,

array(
"name" => "Show post summary as",
"id" => PEXETO_SHORTNAME."_post_summary",
"type" => "select",
"options" => array(array('id'=>'readmore','name'=>"Separated with 'More' tag"), array('id'=>'excerpt','name'=>"Excerpt")),
"std" => 'readmore',
"desc" => "This is the way the summary is displayed. Using the 'More' tag is more flexible than using the excerpt. With this
option selected, only the text that is displayed before the 'More' tag will be displayed as summary. 
You can insert a 'More' tag by using the 'Insert More tag' button that is located above the main content area.
<br /><br />With the Excerpt option
selected, only the first several words of the post will be displayed as summary."
),

array(
"type" => "close"),


/* ------------------------------------------------------------------------*
 * CONTACT PAGE SETTINGS
 * ------------------------------------------------------------------------*/

array(
"type" => "subtitle",
"id"=>'contact'
),

array(
"name" => "Email to which to send contact form message",
"id" => PEXETO_SHORTNAME."_email",
"type" => "text"),

array(
"name" => "Name text",
"id" => PEXETO_SHORTNAME."_name_text",
"type" => "text",
"std" => "Name"
),

array(
"name" => "Your e-mail text",
"id" => PEXETO_SHORTNAME."_your_email_text",
"type" => "text",
"std" => "Your e-mail"
),

array(
"name" => "Your message text",
"id" => PEXETO_SHORTNAME."_question_text",
"type" => "text",
"std" => "Your message"
),

array(
"name" => "Send text",
"id" => PEXETO_SHORTNAME."_send_text",
"type" => "text",
"std" => "Send"
),

array(
"name" => "Message sent text",
"id" => PEXETO_SHORTNAME."_message_sent_text",
"type" => "text",
"std" => "Message sent"
),

array(
"name" => "Validation error message",
"id" => PEXETO_SHORTNAME."_contact_error",
"type" => "text",
"std" => "Please fill in all the fields correctly."
),

array(
"name" => "A message from text",
"id" => PEXETO_SHORTNAME."_message_from_text",
"type" => "text",
"std" => "A message from",
"desc" => "This is the subject of the message you will receive from the contact form. 
The name of the sender is appended to it."
),

array(
"name" => "From text",
"id" => PEXETO_SHORTNAME."_from_text",
"type" => "text",
"std" => "From"
),

array(
"name" => "Message text",
"id" => PEXETO_SHORTNAME."_message_text",
"type" => "text",
"std" => "Message"
),

array(
"type" => "close"),


array(
"type" => "close"));

pexeto_add_options($pexeto_pages_options);