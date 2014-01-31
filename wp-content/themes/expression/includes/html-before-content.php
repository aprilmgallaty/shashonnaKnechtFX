<?php
global $pex_page,$slider_data;

//set the layout variables
$layoutclass='layout-'.$pex_page->layout;

$content_id='content';
if($pex_page->layout=='full'){
	$content_id='full-width';
}
?>

<?php
if(isset($pex_page->slider) && $pex_page->slider!='none' && $pex_page->slider!=''){
	if($pex_page->slider=='static'){
		//this is static image
		locate_template( array( 'includes/static-header.php'), true, true );
	}else{
		//this is a slider
		$slider_data=pexeto_get_slider_data($pex_page->slider);
		locate_template( array( 'includes/'.$slider_data['filename']), true, true );
	}
}

$container_id=$pex_page->layout=='grid-full'?'full-content-container':'content-container';
?>

<div id="<?php echo $container_id; ?>" class="<?php echo $layoutclass; ?>">
<?php if($pex_page->layout!='grid-full'){ ?>
<div id="<?php echo $content_id; ?>">
<?php } ?>
