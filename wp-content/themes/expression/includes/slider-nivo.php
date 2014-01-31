
<div id="slider-container" class="center">

<?php 
$width = 980;
$height = get_opt('_nivo_height');
$height = is_numeric($height)?intval($height):400;
?>

<div class="slider-frame">
<?php 


global $slider_data;
$posts=$slider_data['posts'];
$nivo_images = array();

foreach($posts as $key=>$post){

	$link=get_post_meta($post->ID, PEXETO_CUSTOM_PREFIX.'image_link', true);
	$description=get_post_meta($post->ID, PEXETO_CUSTOM_PREFIX.'description', true);
	$imgurl=get_post_meta($post->ID, PEXETO_CUSTOM_PREFIX.'image_url', true);
	if(get_opt('_nivo_auto_resize')=='true'||get_opt('_nivo_auto_resize')=='on'){
		$imgurl=pexeto_get_resized_image($imgurl, $width, $height);
	}

	$nivo_images[] = array("img"=>$imgurl, "desc" => $description, "link" => $link);
}
echo pexeto_get_nivo_html($nivo_images, $post->ID, false);
?>
</div>
</div>

