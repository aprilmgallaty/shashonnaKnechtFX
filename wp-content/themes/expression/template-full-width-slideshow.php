<?php
/*
 Template Name: Full width slideshow
 */
get_header();

if(have_posts()){
		the_post(); 
		
	$autoplay=get_opt('_full_autoplay')=='on'?'true':'false';
	$interval=get_opt('_full_interval');
	$pauseInterval=get_opt('_full_pause');
	
		?>
		
<script type="text/javascript">
jQuery(document).ready(function($){
	$('#full-width-slider').pexetoSlideshow({thumbContainerId:'slider-navigation', autoplay:<?php echo($autoplay); ?>, interval:<?php echo($interval);?>, pauseInterval:<?php echo($pauseInterval);?>, toggleFullscreenText:'<?php echo addslashes(pex_text("_fullscreen_text")); ?>'});
});
</script>

<div id="full-width-slider" class="center loading">
    <div id="slider" class="slider-frame"> 
    <div id="slider-img-wrapper">
		<div class="loading"></div>
		
		
		<?php 
		$attachments = pexeto_get_post_images($post);
		
		foreach ( $attachments as $attachment ) { ?>
	        
	   <img src="<?php echo $attachment->guid; ?>" alt="<?php echo  htmlspecialchars($attachment->pexeto_desc); ?>" />
	   <?php } ?>
	   
	   	</div>
 	</div>
 	</div>
 	<?php if(get_opt('_bg_top_pattern')!='off'){?>
 		<div class="bg-image-pattern"></div>
 <?php }
  $count=sizeof($attachments); 
 	$nav_class=$count<=4?'no-arrows':'with-arrows'; ?>
    <div id="slider-navigation-container" class="center <?php echo $nav_class; ?>">
      <div id="slider-navigation-wrapper" class="relative">
        <div id="slider-navigation" >
      	  <div class="items">
	      	<?php 
	      	$closed=true;
	      	$key=0;
	      	foreach($attachments as $attachment){
			$imgurl=$attachment->guid;
	      		if($key%4==0){ 
	      			echo('<div>'); 
	      			$closed=false;
	      		}
	      		if(get_opt('_full_auto_resize')=='on'){
					$path=pexeto_get_resized_image($imgurl, 45, 45);
		      	}else{
					$path=$imgurl;
		      	}
		      	echo('<div class="thumbnail-wrapper"><img src="'.$path.'" alt="" /></div>');
				if(($key+1)%4==0){
					echo('</div>');
					$closed=true;
				}
				$key++;
			}
			if(!$closed){
				echo('</div>');
			}
	      	?>
        </div>
      </div>
    </div>
  </div>
<?php }

get_footer();
?>

