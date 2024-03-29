<?php
/**
 * This is the page template for 404 Page not found response.
 */
get_header();
//get all the page data needed and set it to an object that can be used in other files
		$pex_page=new stdClass();
		$pex_page->subtitle='';
		$pex_page->slider='none';
		$pex_page->layout=get_opt('_blog_layout');
		$pex_page->sidebar=get_opt('_blog_sidebar');
		
		//include the before content template
		locate_template( array( 'includes/html-before-content.php'), true, true ); ?>
        <div class="aligncenter" id="not-found">
		<h1>404 - Not Found</h1>
		<img src="/wp-content/themes/expression/images/404image.png" alt="Not Found" title="Not Found" />
		<p>Go back <a href="/">home</a></p>
        </div>
		
<?php 
		
//include the after content template
locate_template( array( 'includes/html-after-content.php'), true, true );
get_footer();

?>

