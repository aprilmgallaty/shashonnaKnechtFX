<?php 
/**
 * Footer template - this file content is displayed on every page after the main content.
 */
?>

<div id="footer">
<div class="footer-spacer alignleft"></div>
<?php 
//PRINT THE SOCIABLE ICONS
if(get_opt('_show_footer_icons')=='on'){
	$icon_links=explode(PEXETO_SEPARATOR, get_option('_icon_links'));
	$icon_imgs=explode(PEXETO_SEPARATOR, get_option('_icon_urls'));
	$icon_titles=explode(PEXETO_SEPARATOR, get_option('_icon_titles'));
	array_pop($icon_links);
	array_pop($icon_imgs);
	array_pop($icon_titles);
	?>
	<div id="footer-social-icons"><ul>
	<?php for($i=0; $i<sizeof($icon_links); $i++){
	$title=$icon_titles[$i]?' title="'.$icon_titles[$i].'"':'';
		?>
	<li><a href="<?php echo $icon_links[$i];?>" target="_blank" <?php echo $title; ?>><div><img src="<?php echo $icon_imgs[$i]; ?>" alt="" /></div></a></li>
	<?php } ?>
	</ul></div>
	<?php 
}
?>
<div class="footer-spacer alignright"></div>
<span class="copyrights"><?php echo pex_text('_copyright_text'); ?> | Website by <a href="http://www.gallaty.com/" target="_blank">Gallaty Designs</a> | <b>Expression</b> theme by <a href="http://themeforest.net/item/expression-photography-responsive-wordpress-theme/2855595" target="_blank">Pexeto</a></span>

</div> <!-- end #footer-->
</div> <!-- end #main-container -->


<!-- FOOTER ENDS -->

<?php wp_footer(); ?>
</body>
</html>
