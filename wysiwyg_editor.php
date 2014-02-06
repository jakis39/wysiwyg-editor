<?php
	$INPUT_ID = 'example_wysiwyg_editor';
?>
<div class="wysiwyg" id="<?php echo($INPUT_ID);?>_div">
	<div class="control_bar">
		<ul class="unselectable">
			<li class="hide">
				<select id="<?php echo($INPUT_ID);?>_formatSelect" onchange="changeFormat('<?php echo($INPUT_ID);?>');">
					<option value="<p>">Paragraph</option>
					<option value="<h1>">Heading 1</option>
					<option value="<h2>">Heading 2</option>
					<option value="<h3>">Heading 3</option>
					<option value="<h4>">Heading 4</option>
				</select>
			</li>
			<li class="hide"><button class="control_button icon unselectable" id="<?php echo($INPUT_ID);?>_fore_color">&#61489;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="bold('<?php echo($INPUT_ID);?>');return false;">&#61490;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="italic('<?php echo($INPUT_ID);?>');return false;">&#61491;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="underline('<?php echo($INPUT_ID);?>');return false;">&#61645;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="strikethrough('<?php echo($INPUT_ID);?>');return false;">&#61644;</button></li>

			<li class="hide"><button class="control_button icon unselectable" onclick="leftalign('<?php echo($INPUT_ID);?>');return false;">&#61494;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="centeralign('<?php echo($INPUT_ID);?>');return false;">&#61495;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="rightalign('<?php echo($INPUT_ID);?>');return false;">&#61496;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="fullalign('<?php echo($INPUT_ID);?>');return false;">&#61497;</button></li>

			<li class="hide"><button class="control_button icon unselectable" onclick="orderedlist('<?php echo($INPUT_ID);?>');return false;">&#61643;</button></li>
			<li class="hide"><button class="control_button icon unselectable" onclick="unorderedlist('<?php echo($INPUT_ID);?>');return false;">&#61642;</button></li>

			<li class="hide"><button class="control_button icon unselectable" id="<?php echo($INPUT_ID);?>_create_link">&#61633;</button></li>
			<li class="hide"><button class="control_button icon unselectable" id="<?php echo($INPUT_ID);?>_create_img">&#61502;</button></li>
			<li class="hide"><button class="control_button icon unselectable" id="<?php echo($INPUT_ID);?>_create_table">&#61646;</button></li>
		</ul>
		<div class="float_right">
			<button class="control_button icon unselectable html_button" id="<?php echo($INPUT_ID);?>_toggle" onclick="wysiwygToggleView('<?php echo($INPUT_ID);?>');return false;">[Source]</button>
		</div>
		<div class="clear"></div>
	</div>
</div>
<span class="hidden" id="urlWidgetCode"></span>
<span class="hidden" id="colourWidgetCode"></span>
<span class="hidden" id="fileWidgetCode"></span>
<span class="hidden" id="tableWidgetCode"></span>
<script type="text/javascript">
	window.onload=function(){
		//Add the iframe to the page
		attachIframeWidgets('<?php echo($INPUT_ID);?>');
		$('#<?php echo($INPUT_ID);?>_div').append($('<iframe id="<?php echo($INPUT_ID);?>" src="about:blank" class="editor_frame" onload="wysiwygInit(\'<?php echo($INPUT_ID);?>\');"></iframe>'));
		$('#<?php echo($INPUT_ID);?>_img_upload').attr('action','_imageuploader/index.php');
		WYSIWYG_EDITOR_FILE_UPLOAD_URL=$('#<?php echo($INPUT_ID);?>_img_upload').attr('action');
	}
</script>