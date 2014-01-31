<?php

$pexeto_slider_options= array( array(
"name" => "Slider Settings",
"type" => "title",
"img" => PEXETO_IMAGES_URL."icon_slider.png"
),

array(
"type" => "open",
"subtitles"=>array(array("id"=>"gallery", "name"=>"Gallery Slider"), array("id"=>"nivo", "name"=>"Nivo"), array("id"=>"nivocontent", "name"=>"Nivo in content"), array("id"=>"fullwidth", "name"=>"Full-width slider"), array("id"=>"fullheight", "name"=>"Full-height slider"))
),

/* ------------------------------------------------------------------------*
 * GALLERY SLIDER SETTINGS
 * ------------------------------------------------------------------------*/

array(
"type" => "subtitle",
"id"=>'gallery'
),

array(
"name" => "Show sharing buttons on slider",
"id" => PEXETO_SHORTNAME."_share_buttons",
"type" => "multicheck",
"options" => array(array("id"=>"facebook", "name"=>"Facebook"), array("id"=>"twitter", "name"=>"Twitter"), array("id"=>"gplus", "name"=>"Google+"), array("id"=>"pinterest", "name"=>"Pinterest")),
"class"=>"exclude",
"desc" => "You can select which sharing buttons to be displayed on the item slider. If you would like to add additional buttons, you can do it in the \"Additional Buttons Code\" and \"Additional Buttons Scripts\" fields below",
"std" => "")
,

array(
"name" => "Additional Buttons Code",
"id" => PEXETO_SHORTNAME."_additional_share_buttons",
"type" => "textarea",
"desc" => "If you would like to insert additional buttons to the default ones, you can insert the embed buttons code here. If you want every button to be inserted on a new line, surround the button code by the HTML \"li\" tags, like this:<br/> &lt;li&gt; CODE GOES HERE &lt;/li&gt;"
),

array(
"name" => "Google+ button language code",
"id" => PEXETO_SHORTNAME."_gplus_lang",
"type" => "text",
"desc" => 'The language code of the text that will be related with the Google+ button functionality. You can get the list with all available language codes here: https://developers.google.com/+/plugins/+1button/#available-languages',
"std" => "en-US"
),

array(
"name" => "Twitter share text",
"id" => PEXETO_SHORTNAME."_twitter_text",
"type" => "text",
"std" => "Check this out"
),

array(
"name" => "Show thumbnail preview",
"id" => PEXETO_SHORTNAME."_slider_preview",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If enabled, a small thumbnail preview will be displayed when hovering the previous/next arrows.'
),


array(
"type" => "close"),


/* ------------------------------------------------------------------------*
 * NIVO SLIDER
 * ------------------------------------------------------------------------*/

array(
"type" => "subtitle",
"id"=>'nivo'
),


array(
"name" => "Automatic image resizing",
"id" => PEXETO_SHORTNAME."_nivo_auto_resize",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If enabled, the images will be resized automatically.'
),

array(
"name" => "Default slider height",
"id" => PEXETO_SHORTNAME."_nivo_height",
"type" => "text",
"desc" => "The default image height for the slider, when automatic image resizing is enabled in the field above",
"std" => "400"
),

array(
"name" => "Show navigation",
"id" => PEXETO_SHORTNAME."_exclude_nivo_navigation",
"type" => "multicheck",
"options" => array(array("id"=>"arrows", "name"=>"Arrows"), array("id"=>"buttons", "name"=>"Navigation Buttons")),
"class"=>"exclude"
),

array(
"name" => "Animation Effect",
"id" => PEXETO_SHORTNAME."_nivo_animation",
"type" => "multicheck",
"options" => array(array('id'=>'fold','name'=>'Fold'),array('id'=>'fade','name'=>'Fade'),
array('id'=>'sliceDownRight','name'=>'Slice Down'),array('id'=>'sliceDownLeft','name'=>'Slice Down Left'),array('id'=>'sliceUpRight','name'=>'Slice Up'),
array('id'=>'sliceUpDown','name'=>'Slice Up Down'),array('id'=>'sliceUpLeft','name'=>'Slice Up Left'),array('id'=>'sliceUpDownLeft','name'=>'Slice Up Down Left'),
array('id'=>'boxRandom','name'=>'Box Random'),array('id'=>'boxRain','name'=>'Box Rain'),array('id'=>'boxRainReverse','name'=>'Box Rain Reverse'),array('id'=>'boxRainGrow','name'=>'Box Rain Grow'),array('id'=>'boxRainGrowReverse','name'=>'Box Rain Grow Reverse')
),
"class"=>"include",
"std"=>"fold,fade,sliceDownRight,sliceDownLeft,sliceUpRight,sliceUpDown,sliceUpLeft,sliceUpDownLeft,boxRandom,boxRain,boxRainReverse,boxRainGrow,boxRainGrowReverse"
),

array(
"name" => "Number of slices",
"id" => PEXETO_SHORTNAME."_nivo_slices",
"type" => "text",
"std" => "15",
"desc" => "For slice animations only."
),

array(
"name" => "Number of box rows",
"id" => PEXETO_SHORTNAME."_nivo_rows",
"type" => "text",
"std" => "4",
"desc" => "For box animations only."
),

array(
"name" => "Number of box columns",
"id" => PEXETO_SHORTNAME."_nivo_columns",
"type" => "text",
"std" => "8",
"desc" => "For box animations only."
),

array(
"name" => "Animation Speed",
"id" => PEXETO_SHORTNAME."_nivo_speed",
"type" => "text",
"std" => "800",
"desc" => "The animation speed in miliseconds"
),

array(
"name" => "Pause interval",
"id" => PEXETO_SHORTNAME."_nivo_interval",
"type" => "text",
"std" => "3000",
"desc" => "The time interval between image changes in miliseconds"
),

array(
"name" => "Autoplay",
"id" => PEXETO_SHORTNAME."_nivo_autoplay",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If enabled, the images will rotate automatically'
),

array(
"name" => "Pause on hover",
"id" => PEXETO_SHORTNAME."_nivo_pause_hover",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If enabled, when the user hovers the image, the automatic rotation will pause.'
),


array(
"type" => "close"),

/* ------------------------------------------------------------------------*
 * NIVO SLIDER IN CONTENT
 * ------------------------------------------------------------------------*/

array(
"type" => "subtitle",
"id"=>'nivocontent'
),


array(
"name" => "Automatic image resizing",
"id" => PEXETO_SHORTNAME."_nivo_auto_resize_content",
"type" => "checkbox",
"std" => 'off',
"desc" => 'If enabled, the images will be resized automatically.'
),

array(
"name" => "Default slider height",
"id" => PEXETO_SHORTNAME."_nivo_height_content",
"type" => "text",
"desc" => "The default image height for the slider, when automatic image resizing is enabled in the field above",
"std" => "350"
),

array(
"name" => "Show navigation",
"id" => PEXETO_SHORTNAME."_exclude_nivo_navigation_content",
"type" => "multicheck",
"options" => array(array("id"=>"arrows", "name"=>"Arrows"), array("id"=>"buttons", "name"=>"Navigation Buttons")),
"class"=>"exclude"
),

array(
"name" => "Animation Effect",
"id" => PEXETO_SHORTNAME."_nivo_animation_content",
"type" => "multicheck",
"options" => array(array('id'=>'fold','name'=>'Fold'),array('id'=>'fade','name'=>'Fade'),
array('id'=>'sliceDownRight','name'=>'Slice Down'),array('id'=>'sliceDownLeft','name'=>'Slice Down Left'),array('id'=>'sliceUpRight','name'=>'Slice Up'),
array('id'=>'sliceUpDown','name'=>'Slice Up Down'),array('id'=>'sliceUpLeft','name'=>'Slice Up Left'),array('id'=>'sliceUpDownLeft','name'=>'Slice Up Down Left'),
array('id'=>'boxRandom','name'=>'Box Random'),array('id'=>'boxRain','name'=>'Box Rain'),array('id'=>'boxRainReverse','name'=>'Box Rain Reverse'),array('id'=>'boxRainGrow','name'=>'Box Rain Grow'),array('id'=>'boxRainGrowReverse','name'=>'Box Rain Grow Reverse')
),
"class"=>"include",
"std"=>"fold,fade,sliceDownRight,sliceDownLeft,sliceUpRight,sliceUpDown,sliceUpLeft,sliceUpDownLeft,boxRandom,boxRain,boxRainReverse,boxRainGrow,boxRainGrowReverse"
),

array(
"name" => "Number of slices",
"id" => PEXETO_SHORTNAME."_nivo_slices_content",
"type" => "text",
"std" => "15",
"desc" => "For slice animations only."
),

array(
"name" => "Number of box rows",
"id" => PEXETO_SHORTNAME."_nivo_rows_content",
"type" => "text",
"std" => "4",
"desc" => "For box animations only."
),

array(
"name" => "Number of box columns",
"id" => PEXETO_SHORTNAME."_nivo_columns_content",
"type" => "text",
"std" => "8",
"desc" => "For box animations only."
),

array(
"name" => "Animation Speed",
"id" => PEXETO_SHORTNAME."_nivo_speed_content",
"type" => "text",
"std" => "800",
"desc" => "The animation speed in miliseconds"
),

array(
"name" => "Pause interval",
"id" => PEXETO_SHORTNAME."_nivo_interval_content",
"type" => "text",
"std" => "3000",
"desc" => "The time interval between image changes in miliseconds"
),

array(
"name" => "Autoplay",
"id" => PEXETO_SHORTNAME."_nivo_autoplay_content",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If enabled, the images will rotate automatically'
),

array(
"name" => "Pause on hover",
"id" => PEXETO_SHORTNAME."_nivo_pause_hover_content",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If enabled, when the user hovers the image, the automatic rotation will pause.'
),


array(
"type" => "close"),

/* ------------------------------------------------------------------------*
 * FULL WIDTH SLIDER
 * ------------------------------------------------------------------------*/

array(
"type" => "subtitle",
"id"=>'fullwidth'
),

array(
"name" => "Automatic thumbnail image resizing",
"id" => PEXETO_SHORTNAME."_full_auto_resize",
"type" => "checkbox",
"std" => 'off',
"desc" => 'If ON selected, the small thumbnail images will be resized automatically.'
),

array(
"name" => "Autoplay",
"id" => PEXETO_SHORTNAME."_full_autoplay",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If ON selected, the images will rotate automatically'
),

array(
"name" => "Rotate Interval",
"id" => PEXETO_SHORTNAME."_full_interval",
"type" => "text",
"desc" => "The interval between changing the images when autoplay is enabled (in miliseconds)",
"std" => '4000'
),

array(
"name" => "Pause Interval",
"id" => PEXETO_SHORTNAME."_full_pause",
"type" => "text",
"desc" => "The pause interval (in miliseconds)- when an user clicks on an image or arrow, the autoplay pauses for this interval of time",
"std" => '5000'
),

array(
"type" => "close"),


/* ------------------------------------------------------------------------*
 * FULL HEIGHT SLIDER
 * ------------------------------------------------------------------------*/

array(
"type" => "subtitle",
"id"=>'fullheight'
),

array(
"name" => "Automatic thumbnail image resizing",
"id" => PEXETO_SHORTNAME."_fullh_auto_resize",
"type" => "checkbox",
"std" => 'off',
"desc" => 'If ON selected, the small thumbnail images will be resized automatically.'
),

array(
"name" => "Autoplay",
"id" => PEXETO_SHORTNAME."_fullh_autoplay",
"type" => "checkbox",
"std" => 'on',
"desc" => 'If ON selected, the images will rotate automatically'
),

array(
"name" => "Rotate Interval",
"id" => PEXETO_SHORTNAME."_fullh_interval",
"type" => "text",
"desc" => "The interval between changing the images when autoplay is enabled (in miliseconds)",
"std" => '4000'
),

array(
"name" => "Pause Interval",
"id" => PEXETO_SHORTNAME."_fullh_pause",
"type" => "text",
"desc" => "The pause interval (in miliseconds)- when an user clicks on an image or arrow, the autoplay pauses for this interval of time",
"std" => '5000'
),

array(
"type" => "close"),




array(
"type" => "close"));

$new_pexeto_slider_options = pexeto_add_custom_options($pexeto_slider_options);

pexeto_add_options($new_pexeto_slider_options);