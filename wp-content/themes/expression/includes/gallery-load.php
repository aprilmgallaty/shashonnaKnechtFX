
<?php
global $page_settings;
$gallery_class=(isset($page_settings['show_filter']) && $page_settings['show_filter']!='false')?'with-filter':'no-filter';
?>
<div id="grid-gallery-wrapper" class="loading <?php echo $gallery_class; ?>">
<div id="gallery-container">

<?php 
//SHARING BUTTONS SCRIPTS
$exclude_sharing = explode(",", get_opt('_share_buttons'));
if(!in_array("facebook", $exclude_sharing)){
	$pexeto_scripts_to_print[]='pexeto-facebook';
}


//generate the categories in JSON format
if($page_settings['page']==true && $page_settings['show_filter']!='false'){
	$args=array("hide_empty"=>false, "hierarchical"=>true);
	if($page_settings['post_category']!='-1'){
		$args['parent']=$page_settings['post_category'];
	}
	$cats=get_terms('portfolio_category', $args);
	$cat_arr=array();
	foreach($cats as $cat){
		$cat_arr[]=array("id"=>$cat->term_id, "name"=>$cat->name);
	}
	$cats_to_json = json_encode($cat_arr);
}else{
	$cats_to_json='[]';
}

$show_preview = get_opt('_slider_preview')=="off"?"false":"true";
$category = isset($page_settings['post_category'])? $page_settings['post_category']:"-1";

?>
</div>
</div>

<script type="text/javascript">
jQuery(document).ready(function($){
	var additionalOpts = {},
		args = {
			ajaxUrl:"<?php echo admin_url( 'admin-ajax.php' ); ?>",
			excludeSharing:<?php echo json_encode($exclude_sharing); ?>,
			showThumbPreview:<?php echo $show_preview; ?>,
			category:<?php echo $category; ?>,
			additionalButtons:"<?php echo str_replace("\r\n", "", addcslashes(get_opt('_additional_share_buttons'),'"/\'')) ; ?>",
			texts:{
				allText:"<?php echo addslashes(pex_text("_all_text")); ?>",
				viewGalleryText:"<?php echo addslashes(pex_text("_view_gallery_text")); ?>",
				loadMoreText:"<?php echo addslashes(pex_text("_load_more_text")); ?>",
				closeText:"<?php echo addslashes(pex_text("_close_text")); ?>",
				fullscreenText:"<?php echo addslashes(pex_text("_fullscreen_text")); ?>",
				shareText:"<?php echo addslashes(pex_text("_share_text")); ?>",
				gplusLang:"<?php echo get_opt("_gplus_lang"); ?>",
				twitterText:"<?php echo addslashes(pex_text("_twitter_text")); ?>",
				prevProjectText: "<?php echo addslashes(pex_text("_prev_project_text")); ?>",
				nextProjectText: "<?php echo addslashes(pex_text("_next_project_text")); ?>",
				playVideoText:"<?php echo addslashes(pex_text("_play_video_text")); ?>",
				openText:"<?php echo addslashes(pex_text("_open_text")); ?>"
			}
		};

		<?php if($page_settings['page']==true){ ?>
			//PAGE OPTIONS ONLY
			additionalOpts = {itemsPerPage:<?php echo $page_settings['post_number']; ?>, 
			showCategories:<?php echo $page_settings['show_filter']; ?>,
			imageWidth:<?php echo $page_settings['image_width']; ?>,
			imageHeight:<?php echo $page_settings['image_height']; ?>,
			categories:<?php echo $cats_to_json; ?>,
			orderBy:"<?php echo $page_settings['order']; ?>",
			itemMargin:7,
			showClose:true,
			linkProjects:true
		};
		<?php }else{ ?>
			//SINGLE ITEM OPTIONS ONLY
			additionalOpts = {
			showClose:false,
			linkProjects:false,
			itemSlug:"<?php echo $post->post_name; ?>"};
		<?php } ?>

		args = $.extend(args, additionalOpts);

		$('#grid-gallery-wrapper').pexetoGridGallery(args);
});
</script>