var BODY=$('body');
var iframe_id;
var WYSIWYG_EDITOR_FILES_OBJECT,WYSIWYG_EDITOR_NUMBER_OF_FILES,WYSIWYG_EDITOR_FILE_UPLOAD_URL,WYSIWYG_EDITOR_PAGE_INITIALIZED=[],WYSIWYG_EDITOR_VIEW_MODE={}/*1 =TEXT; 2=HTML*/,WYSIWYG_EDITOR_SELECTION_RANGE;
var WYSIWYG_EDITOR_CSS_LINK=document.createElement("link");
	WYSIWYG_EDITOR_CSS_LINK.href="editor.css";
	WYSIWYG_EDITOR_CSS_LINK.rel="stylesheet"; 
	WYSIWYG_EDITOR_CSS_LINK.type="text/css";
	var wysiwygInit=function(iframe_id2){
		iframe_id = iframe_id2;
		var iframe=$('#'+iframe_id);
		if(WYSIWYG_EDITOR_PAGE_INITIALIZED.indexOf(iframe_id)==-1){
			WYSIWYG_EDITOR_PAGE_INITIALIZED.push(iframe_id);
			// Bind the blur of the iframe so that when it loses focus the content is updated
			var parentForm=iframe.closest('form');
			if(iframe[0].contentWindow.addEventListener){
				iframe[0].contentWindow.addEventListener('blur',function(){updateWYSIWYGInput(iframe_id);},false);
			}else if(iframe[0].contentWindow.attachEvent){
				iframe[0].contentWindow.attachEvent('onblur',function(){updateWYSIWYGInput(iframe_id);});
			}
			parentForm.bind('submit',function(){updateWYSIWYGInput(iframe_id);});
			BODY.bind('click',function(){updateWYSIWYGInput(iframe_id);});
			if(typeof iframe[0].contentWindow.document!=='undefined'&&iframe[0].contentWindow.document!=null){
		        if(typeof iframe[0].contentWindow.document.body!=='undefined'&&iframe[0].contentWindow.document.body!=null){
					iframe[0].contentWindow.document.body.contentEditable='true';
					var iViewStuff=$('#'+iframe_id/*.replace('_wysiwyg_editor','')*/).val();
					iViewStuff=iViewStuff.length==0?'<p></p>':iViewStuff;
			        iframe[0].contentWindow.document.write(urldecode(iViewStuff));
				}
		        if(typeof iframe[0].contentWindow.document.head!=='undefined'&&iframe[0].contentWindow.document.head!=null){
					iframe[0].contentWindow.document.head.appendChild(WYSIWYG_EDITOR_CSS_LINK);
				}
				iframe[0].contentWindow.document.designMode='On';
				iframe[0].contentWindow.document.execCommand("formatBlock",false,"p");
			}
			colourPopover(iframe_id);
			urlPopover(iframe_id);
			imgPopover(iframe_id);
			tablePopover(iframe_id);
			WYSIWYG_EDITOR_VIEW_MODE[iframe_id]=1;
		}
	}
	var bold=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('bold', false, null);
	}
	var italic=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('italic', false, null);
	}
	var underline=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('underline', false, null);
	}
	var strikethrough=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('strikeThrough', false, null);
	}
	var leftalign=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('justifyLeft', false, null);
	}
	var centeralign=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('justifyCenter', false, null);
	}
	var rightalign=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('justifyRight', false, null);
	}
	var fullalign=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('justifyFull', false, null);
	}
	var orderedlist=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('insertorderedlist', false, null);
	}
	var unorderedlist=function(iframe_id){
		var iframe=$('#' + iframe_id);
		iframe[0].contentWindow.document.execCommand('insertunorderedlist', false, null);
	}
	var foreColor=function(iframe_id){
		var iframe=$('#' + iframe_id);
		var testSelection;
		colour=$('#' + iframe_id + '_forecolor').val();
		if((colour != null)&&(colour != "")){
			if(iframe[0].contentWindow.getSelection){
				testSelection=iframe[0].contentWindow.getSelection();
				if(testSelection == null||testSelection == ''){
					var selectionContents=WYSIWYG_EDITOR_SELECTION_RANGE.extractContents(); 
					var div=iframe[0].contentWindow.document.createElement("span");
					div.style.color=colour;
					div.appendChild(selectionContents); 
					WYSIWYG_EDITOR_SELECTION_RANGE.insertNode(div);
					WYSIWYG_EDITOR_SELECTION_RANGE=null;
				}else{
					iframe[0].contentWindow.document.execCommand('forecolor', false, colour);
				}
			}else if(iframe[0].contentWindow.document.selection){
				// IE8
				var newHTML='<span style="color:' + colour + ';">' + WYSIWYG_EDITOR_SELECTION_RANGE.text + '</span>';
				iframe[0].contentWindow.focus();
				WYSIWYG_EDITOR_SELECTION_RANGE.pasteHTML(newHTML);
			}else{
				iframe[0].contentWindow.document.execCommand('forecolor', false, colour);
			}
			$('#' + iframe_id + '_colorwidget').addClass('hidden');
			$('#' + iframe_id + '_forecolor').val('');
		}
	}
	var createLink=function(iframe_id){
		var iframe=$('#' + iframe_id);
		var testSelection;
		url=$('#' + iframe_id + '_URL').val();
		if((url != null)&&(url != "")){
			if(iframe[0].contentWindow.getSelection){
				testSelection=iframe[0].contentWindow.getSelection();
				if(testSelection == null||testSelection == ''){
					var selectionContents=WYSIWYG_EDITOR_SELECTION_RANGE.extractContents(); 
					if(selectionContents.textContent == ''){
						selectionContents.textContent=url;
					}
					var div=iframe[0].contentWindow.document.createElement("a");
					div.href=url; 
					div.appendChild(selectionContents); 
					WYSIWYG_EDITOR_SELECTION_RANGE.insertNode(div);
					WYSIWYG_EDITOR_SELECTION_RANGE=null;
				}else{
					iframe[0].contentWindow.document.execCommand('createLink', false, url);
				}
			}else if(iframe[0].contentWindow.document.selection){
				 // IE8
				var newHTML='<a href="' + url + '">' + WYSIWYG_EDITOR_SELECTION_RANGE.text + '</a>';
				iframe[0].contentWindow.focus();
				WYSIWYG_EDITOR_SELECTION_RANGE.pasteHTML(newHTML);
			}else{
				iframe[0].contentWindow.document.execCommand('createLink', false, url);
			}			
			$('#' + iframe_id + '_urlwidget').addClass('hidden');
			$('#' + iframe_id + '_URL').val('');
		}
	}
	var createTable=function(iframe_id){
		var iframe=$('#' + iframe_id);
		var testSelection;
		rows=$('#' + iframe_id + '_table_rows').val();
		cols=$('#' + iframe_id + '_table_cols').val();
		if((rows != null)&&(rows != "")&&(cols != null)&&(cols != "")){
			if(iframe[0].contentWindow.getSelection){
				var table=iframe[0].contentWindow.document.createElement("table");
				table.border = 1;
				var tblBody=iframe[0].contentWindow.document.createElement("tbody");

				var thead=iframe[0].contentWindow.document.createElement("thead");
				for(var j=0; j<cols; j++){
					var cell = document.createElement("th");
					thead.appendChild(cell);
				}
				table.appendChild(thead);

				for(var i=0; i<rows-1; i++){
					var row=iframe[0].contentWindow.document.createElement("tr");

					for(var j=0; j<cols; j++){
						var cell = document.createElement("td");
						row.appendChild(cell);
					}
					tblBody.appendChild(row);
				}
				table.appendChild(tblBody);

				WYSIWYG_EDITOR_SELECTION_RANGE.insertNode(table);
				WYSIWYG_EDITOR_SELECTION_RANGE=null;
			}else if(iframe[0].contentWindow.document.selection){
				 // IE8
				var newHTML='<table border="1"><thead>';
				for(var j=0; j<cols; j++){
					newHTML += '<th></th>';
				}
				newHTML += '</thead>';
				for(var i=0; i<rows-1; i++){
					newHTML += '<tr>';

					for(var j=0; j<cols; j++){
						newHTML += '<td></td>';
					}
					newHTML += '</tr>';
				}
				newHTML += '</table>';

				iframe[0].contentWindow.focus();
				WYSIWYG_EDITOR_SELECTION_RANGE.pasteHTML(newHTML);
			}else{
				//iframe[0].contentWindow.document.execCommand('createLink', false, url);
			}			
			$('#' + iframe_id + '_tablewidget').addClass('hidden');
			$('#' + iframe_id + '_URL').val('');
		}
	}
	var createImg=function(iframe_id){
		/*var iframe=$('#' + iframe_id);
		$('#'+iframe_id+'_spinner_div').removeClass('hidden');
		$('#'+iframe_id+'_img_button').addClass('hidden');
		if(fileApiSupported()){
			WYSIWYG_EDITOR_FILES_OBJECT=$('#' + iframe_id + 'upload_file')[0].files;
			WYSIWYG_EDITOR_NUMBER_OF_FILES=WYSIWYG_EDITOR_FILES_OBJECT.length;
			if(WYSIWYG_EDITOR_NUMBER_OF_FILES>0){
				if(fileApiSupported()){
					var uploadOperations={'success':wysiwygImageUploadSuccess,'error':null,'progress':null,'abort':null,'validation':null,'imageAction':null,'params':iframe_id};
					performFileAction(WYSIWYG_EDITOR_FILES_OBJECT,WYSIWYG_EDITOR_FILE_UPLOAD_URL, uploadOperations);
				}else{
					$('#' + iframe_id + '_img_upload').submit();
				}
			}else{
				$('#' + iframe_id + 'upload_file').addClass('error error_background');
				$('#'+iframe_id+'_spinner_div').addClass('hidden');
				$('#'+iframe_id+'_img_button').removeClass('hidden');
			}
		}else{
			$('#' + iframe_id + '_isIE8').val('true');
			$('#' + iframe_id + '_img_upload').submit();
		}*/
	}
	var wysiwygImageUploadSuccess=function(evt,iframe_id){
		var iframe=$('#' + iframe_id);
		var img_url=evt.responseText;
		var testSelection;
		img_height=$('#' + iframe_id + '_img_height').val();
		img_width=$('#' + iframe_id + '_img_width').val();
		img_caption=$('#' + iframe_id + '_img_caption').val();
		if(iframe[0].contentWindow.getSelection){
			if(iframe[0].contentWindow.document.execCommand('insertimage', false, img_url)){
				var image=iframe.contents().find('[src="' + img_url + '"]');
				if(checkValidDim(img_height)){
					image.attr('height',img_height);
				}
				if(checkValidDim(img_width)){
					image.attr('width',img_width);
				}
				if((img_caption != null)&&(img_caption != "")){
					image.attr('alt',img_caption);
					image.attr('title',img_caption);
				}
			}else{
				testSelection=iframe[0].contentWindow.getSelection();
				if(testSelection == null|| testSelection == ''){
					var div=iframe[0].contentWindow.document.createElement("img");
					div.src=img_url; 

					if(checkValidDim(img_height))
					{
						div.height=img_height;
					}
					if(checkValidDim(img_width))
					{
						div.width=img_width;
					}
					if((img_caption != null)&&(img_caption != ""))
					{
						div.alt=img_caption;
						div.title=img_caption;
					}
					WYSIWYG_EDITOR_SELECTION_RANGE.insertNode(div);
					WYSIWYG_EDITOR_SELECTION_RANGE=null;
				}
			}
		}
		$('#'+iframe_id+'_spinner_div').addClass('hidden');
		$('#'+iframe_id+'_img_button').removeClass('hidden');
		$('#' + iframe_id + '_imgwidget').addClass('hidden');
		$('#' + iframe_id + 'upload_file').val('');
		$('#' + iframe_id + '_img_height').val('');
		$('#' + iframe_id + '_img_width').val('');
		$('#' + iframe_id + '_img_caption').val('');
		$('#' + iframe_id + 'upload_file').removeClass('error error_background');
	}
	var setIEImage=function(img_url){
		img_height=$('#' + iframe_id + '_img_height').val();
		img_width=$('#' + iframe_id + '_img_width').val();
		img_caption=$('#' + iframe_id + '_img_caption').val();
		var iframe=$('#' + iframe_id);
		if(typeof WYSIWYG_EDITOR_SELECTION_RANGE.pasteHTML !== "undefined"){
			//IE8
			var newHTML='<img src="' + img_url + '"';
			if(checkValidDim(img_height)){
				newHTML += ' height=' + img_height;
			}
			if(checkValidDim(img_width)){
				newHTML += ' width=' + img_width;
			}
			if((img_caption != null)&&(img_caption != "")){
				newHTML += ' alt="' + img_caption + '"';
				newHTML += ' title="' + img_caption + '"';
			}
			newHTML += '/>';
			iframe[0].contentWindow.focus();
			WYSIWYG_EDITOR_SELECTION_RANGE.pasteHTML(newHTML);
			WYSIWYG_EDITOR_SELECTION_RANGE=null;
		}else{
			//IE9
			var div=iframe[0].contentWindow.document.createElement("img");
			div.src=img_url; 
			if(checkValidDim(img_height)){
				div.height=img_height;
			}
			if(checkValidDim(img_width)){
				div.width=img_width;
			}
			if((img_caption != null)&&(img_caption != "")){
				div.alt=img_caption;
				div.title=img_caption;
			}
			WYSIWYG_EDITOR_SELECTION_RANGE.insertNode(div);
			WYSIWYG_EDITOR_SELECTION_RANGE=null;
		}
		$('#'+iframe_id+'_spinner_div').addClass('hidden');
		$('#'+iframe_id+'_img_button').removeClass('hidden');
		$('#' + iframe_id + '_imgwidget').addClass('hidden');
		$('#' + iframe_id + 'upload_file').val('');
		$('#' + iframe_id + '_img_height').val('');
		$('#' + iframe_id + '_img_width').val('');
		$('#' + iframe_id + '_img_caption').val('');
		$('#' + iframe_id + 'upload_file').removeClass('error error_background');
	}
	var checkValidDim=function(value){
		if((value != null)&&(value != "")){
			temp=parseInt(value);
			if($.isNumeric(temp)){
				if(temp > 0){
					return true;
				}
			}
		}
		return false;
	}
	var changeFormat=function(iframe_id){
		var iframe=$('#' + iframe_id);
		var selected=$('#' + iframe_id + '_formatSelect').val();
		iframe[0].contentWindow.document.execCommand("formatBlock",false,selected);
	}
	var wysiwygToggleView=function(iframe_id){
		var iframe=$('#' + iframe_id);
		if(WYSIWYG_EDITOR_VIEW_MODE[iframe_id] == 1){
			// Hide controls
			$('.hide').fadeOut(70);
			// Change to HTML
			var iHTML=iframe.contents().find('body').html(); 
			iframe.contents().find('body').text(iHTML);
			$('#'+iframe_id+'_toggle').html('&#60;HTML&#62;');
			WYSIWYG_EDITOR_VIEW_MODE[iframe_id]=2;
		}else{
			// Change back to text
			var iText=iframe.contents().find('body').text();
			iframe.contents().find('body').html(iText);
			// Show controls
			$('.hide').fadeIn(100);
			$('#'+iframe_id+'_toggle').html('[Source]');
			WYSIWYG_EDITOR_VIEW_MODE[iframe_id]=1;
		}
	}
	var colourPopover=function(iframe_id){
		var colourPopover=$('#' + iframe_id + '_colorwidget');
		var colourButton=$('#' + iframe_id + '_fore_color');
		var iframe=$('#' + iframe_id);
		colourPopover.bind('click',function(ev){ev.stopPropagation();});
		colourButton.bind('click',function(ev){
			var positionX=positionY=100;
			var iframe=$('#' + ev.currentTarget.id.toString().replace('_fore_color',''));
			var colourPopover=$('#' + iframe_id + '_colorwidget');
			var imagePopOver=$('#' + iframe_id + '_imgwidget');
			var urlPopOver=$('#' + iframe_id + '_urlwidget');
			colourPopover.removeClass('hidden');
			if(iframe[0].contentWindow.getSelection&&WYSIWYG_EDITOR_SELECTION_RANGE==null){
				var selection=iframe[0].contentWindow.getSelection();
				if(selection.rangeCount>0){
					WYSIWYG_EDITOR_SELECTION_RANGE=selection.getRangeAt(0);
				}else{
					WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.createRange();
					selection.addRange(WYSIWYG_EDITOR_SELECTION_RANGE);
					WYSIWYG_EDITOR_SELECTION_RANGE.setStart(selection.anchorNode, selection.anchorOffset);
					WYSIWYG_EDITOR_SELECTION_RANGE.setEnd(selection.anchorNode, selection.anchorOffset);
				}
			}else if(iframe[0].contentWindow.document.selection){
				// IE 8
				if (iframe[0].contentWindow.document.selection.type == 'None'){
                    WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.body.createTextRange();
                	WYSIWYG_EDITOR_SELECTION_RANGE.move("textedit", 1);
                }else{
                	WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.selection.createRange();
                }
			}
			positionY=colourButton.offset().top+(colourButton.height())+25;
			positionX=colourButton.offset().left+(colourButton.width()/2)-(colourPopover.width()/2)+12;
			colourPopover.css({'top':positionY+'px','left':positionX+'px'});
			var colourBox=$('#' + iframe_id + '_forecolor');
			if(typeof colourBox!=='undefined'&&colourBox!=null){
				colourBox.focus();
			}
			urlPopOver.addClass('hidden');
			imagePopOver.addClass('hidden');
			return eventNoBubble(ev);
		});
		iframe.contents().find('body').bind('click',function(){colourPopover.addClass('hidden');});
	}
	var urlPopover=function(iframe_id){
		var urlPopOver=$('#' + iframe_id + '_urlwidget');
		var urlButton=$('#' + iframe_id + '_create_link');
		var iframe=$('#' + iframe_id);
		urlPopOver.bind('click',function(ev){ev.stopPropagation();});
		urlButton.bind('click',function(ev){
			var positionX=positionY=100;
			var iframe=$('#' + ev.currentTarget.id.toString().replace('_create_link',''));
			console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
			var colourPopOver=$('#' + iframe_id + '_colorwidget');
			var imagePopOver=$('#' + iframe_id + '_imgwidget');
			var tablePopOver=$('#' + iframe_id + '_tablewidget');
			var urlPopOver=$('#' + iframe_id + '_urlwidget');
			urlPopOver.removeClass('hidden');
			if(iframe[0].contentWindow.getSelection){
				var selection=iframe[0].contentWindow.getSelection();
				if(selection.rangeCount>0){
					WYSIWYG_EDITOR_SELECTION_RANGE=selection.getRangeAt(0);
				}else{
					WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.createRange();
					selection.addRange(WYSIWYG_EDITOR_SELECTION_RANGE);
					WYSIWYG_EDITOR_SELECTION_RANGE.setStart(selection.anchorNode, selection.anchorOffset);
					WYSIWYG_EDITOR_SELECTION_RANGE.setEnd(selection.anchorNode, selection.anchorOffset);
				}
			}else if(iframe[0].contentWindow.document.selection){
				 // IE8
				if (iframe[0].contentWindow.document.selection.type == 'None'){
                    WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.body.createTextRange();
                	WYSIWYG_EDITOR_SELECTION_RANGE.move("textedit", 1);
                }else{
                	WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.selection.createRange();
                }
			}
			positionY=urlButton.offset().top+(urlButton.height())+25;
			positionX=urlButton.offset().left+(urlButton.width()/2)-(urlPopOver.width()/2)+12;
			urlPopOver.css({'top':positionY+'px','left':positionX+'px'});
			var URLBox=$('#' + iframe_id + '_URL');
			if(typeof URLBox!=='undefined'&&URLBox!=null){
				URLBox.focus();
			}
			colourPopOver.addClass('hidden');
			imagePopOver.addClass('hidden');
			tablePopOver.addClass('hidden');
			return eventNoBubble(ev);
		});
		iframe.contents().find('body').bind('click',function(){urlPopOver.addClass('hidden');});
	}
	var imgPopover=function(iframe_id){
		var imagePopOver=$('#' + iframe_id + '_imgwidget');
		var imageButton=$('#' + iframe_id + '_create_img');
		var iframe=$('#' + iframe_id);
		imagePopOver.bind('click',function(ev){ev.stopPropagation();});
		imageButton.bind('click',function(ev){
			var positionX=positionY=100;
			var iframe=$('#' + ev.currentTarget.id.toString().replace('_create_img',''));
			var colourPopOver=$('#' + iframe_id + '_colorwidget');
			var imagePopOver=$('#' + iframe_id + '_imgwidget');
			var urlPopOver=$('#' + iframe_id + '_urlwidget');
			var tablePopOver=$('#' + iframe_id + '_tablewidget');
			imagePopOver.removeClass('hidden');
			if(iframe[0].contentWindow.getSelection){
				var selection=iframe[0].contentWindow.getSelection();
				if(selection.rangeCount>0){
					WYSIWYG_EDITOR_SELECTION_RANGE=selection.getRangeAt(0);
				}else{
					WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.createRange();
					selection.addRange(WYSIWYG_EDITOR_SELECTION_RANGE);
					WYSIWYG_EDITOR_SELECTION_RANGE.setStart(selection.anchorNode, selection.anchorOffset);
					WYSIWYG_EDITOR_SELECTION_RANGE.setEnd(selection.anchorNode, selection.anchorOffset);
				}
			}else if(iframe[0].contentWindow.document.selection){
				// IE8
				if (iframe[0].contentWindow.document.selection.type == 'None'){
                    WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.body.createTextRange();
                	WYSIWYG_EDITOR_SELECTION_RANGE.move("textedit", 1);
                }else{
                	WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.selection.createRange();
                }
			}
			positionY=imageButton.offset().top+(imageButton.height())+25;
			positionX=imageButton.offset().left+(imageButton.width()/2)-(imagePopOver.width()/2)+12;
			imagePopOver.css({'top':positionY+'px','left':positionX+'px'});
			var imgBox=$('#' + iframe_id + '_imgSrc');
			if(typeof imgBox!=='undefined'&&imgBox!=null){
				imgBox.focus();
			}
			urlPopOver.addClass('hidden');
			colourPopOver.addClass('hidden');
			tablePopOver.addClass('hidden');
			return eventNoBubble(ev);
		});
		iframe.contents().find('body').bind('click',function(){imagePopOver.addClass('hidden');
		$('#' + iframe_id + 'upload_file').removeClass('error error_background');});
	}
	var tablePopover=function(iframe_id){
		var tablePopOver=$('#' + iframe_id + '_tablewidget');
		var tableButton=$('#' + iframe_id + '_create_table');
		var iframe=$('#' + iframe_id);
		tablePopOver.bind('click',function(ev){ev.stopPropagation();});
		tableButton.bind('click',function(ev){
			var positionX=positionY=100;
			var iframe=$('#' + ev.currentTarget.id.toString().replace('_create_table',''));
			var colourPopOver=$('#' + iframe_id + '_colorwidget');
			var tablePopOver=$('#' + iframe_id + '_tablewidget');
			var imgPopOver=$('#' + iframe_id + '_imgwidget');
			var urlPopOver=$('#' + iframe_id + '_urlwidget');
			tablePopOver.removeClass('hidden');
			if(iframe[0].contentWindow.getSelection){
				var selection=iframe[0].contentWindow.getSelection();
				if(selection.rangeCount > 0){
					WYSIWYG_EDITOR_SELECTION_RANGE=selection.getRangeAt(0);
				}else{
					WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.createRange();
					selection.addRange(WYSIWYG_EDITOR_SELECTION_RANGE);
					WYSIWYG_EDITOR_SELECTION_RANGE.setStart(selection.anchorNode, selection.anchorOffset);
					WYSIWYG_EDITOR_SELECTION_RANGE.setEnd(selection.anchorNode, selection.anchorOffset);
				}
			}else if(iframe[0].contentWindow.document.selection){
				 // IE8
				if (iframe[0].contentWindow.document.selection.type == 'None'){
                    WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.body.createTextRange();
                	WYSIWYG_EDITOR_SELECTION_RANGE.move("textedit", 1);
                }else{
                	WYSIWYG_EDITOR_SELECTION_RANGE=iframe[0].contentWindow.document.selection.createRange();
                }
			}
			positionY=tableButton.offset().top+(tableButton.height())+25;
			positionX=tableButton.offset().left+(tableButton.width()/2)-(tablePopOver.width()/2)+12;
			tablePopOver.css({'top':positionY+'px','left':positionX+'px'});
			var rowBox=$('#' + iframe_id + '_table_rows');
			if(typeof rowBox!=='undefined'&&rowBox!=null){
				rowBox.focus();
			}
			urlPopOver.addClass('hidden');
			colourPopOver.addClass('hidden');
			imgPopOver.addClass('hidden');
			return eventNoBubble(ev);
		});
		iframe.contents().find('body').bind('click',function(){tablePopOver.addClass('hidden');
		$('#' + iframe_id + '_table_rows').removeClass('error error_background');
		$('#' + iframe_id + '_table_cols').removeClass('error error_background');});
	}
    var updateWYSIWYGInput=function(iframe_id){
    	if(WYSIWYG_EDITOR_VIEW_MODE[iframe_id]==1){
    		$('#'+iframe_id.replace('_wysiwyg_editor','')).val($('#'+iframe_id).contents().find('body').html());
    	}else{
    		$('#'+iframe_id.replace('_wysiwyg_editor','')).val($('#'+iframe_id).contents().find('body').text());
    	}
    }
    var attachIframeWidgets=function(iframe_id){
		var urlWidget=$('<div id="'+iframe_id+'_urlwidget" class="popover top hidden"><div class="popover_header"><h4>Enter URL</h4></div><div class="popover_body padding05"><form class="form" onsubmit="return false;"><input class="text popover_textbox" style="min-width:20em;" type="text" id="' + iframe_id + '_URL" name="' + iframe_id + '_URL" placeholder="http://..." required="true" autofocus="on"/><div><a class="popover_button" onclick="createLink(\'' + iframe_id + '\');">Create Link</a></div><div class="clear"></div></form></div><div class="popover_arrow"></div></div>');
		var colourWidget=$('<div id="' + iframe_id + '_colorwidget" class="popover top hidden"><div class="popover_header"><h4>Choose colour</h4></div><div class="popover_body padding05"><form class="form" onsubmit="return false;"><input class="text popover_textbox" type="text" id="' + iframe_id + '_forecolor" name="' + iframe_id + '_forecolor" placeholder="#FFFFFF, red, ..." required="true" autofocus="on"/><div><a class="popover_button" onclick="foreColor(\'' + iframe_id + '\');">Apply</a></div><div class="clear"></div></form></div><div class="popover_arrow"></div></div>');
		var fileWidget=$('<div id="' + iframe_id + '_imgwidget" class="popover top hidden"><div class="popover_header"><h4>Upload File</h4></div><div class="popover_body padding05"><form id="' + iframe_id + '_img_upload" class="form" enctype="multipart/form-data" method="POST" action=""><div><input type="file" class="file" name="' + iframe_id + 'upload_file" id="' + iframe_id + 'upload_file" accept="image/*" /></div><div><label id="' + iframe_id + '_img_caption_label" for="img_caption">Image caption</label><div class="clear"></div><input type="text" class="text popover_textbox" name="' + iframe_id + '_img_caption" id="' + iframe_id + '_img_caption" /></div><div class="clear"></div><div><label id="' + iframe_id + '_img_height_label" for="img_height">Dimensions</label><div class="clear"></div><input type="text" class="text popover_img_dim" placeholder="Height" name="' + iframe_id + '_img_height" id="' + iframe_id + '_img_height" /><span class="dimension_x">x</span><input type="text" class="text popover_img_dim" placeholder="Width" name="' + iframe_id + '_img_width" id="' + iframe_id + '_img_width" /><input type="hidden" name="' + iframe_id + '_isIE8" id="' + iframe_id + '_isIE8" value="false"/><input type="hidden" name="input_id" value="' + iframe_id + '" /></div><div class="float_right"><div id="' + iframe_id + '_spinner_div" class="hidden"></div><a class="popover_button" id="' + iframe_id + '_img_button" onclick="createImg(\'' + iframe_id + '\');">Insert image</a></div></form><div class="clear"></div></div><div class="popover_arrow"></div></div>');
		var tableWidget=$('<div id="'+iframe_id+'_tablewidget" class="popover top hidden"><div class="popover_header"><h4>Create Table</h4></div><div class="popover_body padding05"><form class="form" onsubmit="return false;"><div><span>Rows</span><span style="margin-left:4.2em;">Columns</span></div><div style="clear:both;"><input class="text popover_textbox" style="width:5em;" type="text" id="' + iframe_id + '_table_rows" name="' + iframe_id + '_table_rows" placeholder="Rows" required="true" autofocus="on"/><div style="display:inline;padding:0.5em;position:relative;top:-0.7em;"> x </div><input class="text popover_textbox" style="width:5em;" type="text" id="' + iframe_id + '_table_cols" name="' + iframe_id + '_table_cols" placeholder="Columns" required="true"/></div><div><a class="popover_button" onclick="createTable(\'' + iframe_id + '\');">Create Table</a></div><div class="clear"></div></form></div><div class="popover_arrow"></div></div>');
		BODY.append(urlWidget).append(colourWidget).append(fileWidget).append(tableWidget).bind('click',function(){
			var colourPopover=$('#' + iframe_id + '_colorwidget');
			var imagePopOver=$('#' + iframe_id + '_imgwidget');
			var urlPopOver=$('#' + iframe_id + '_urlwidget');
			var tablePopOver=$('#' + iframe_id + '_tablewidget');
			imagePopOver.addClass('hidden');
			urlPopOver.addClass('hidden');
			colourPopover.addClass('hidden');
			tablePopOver.addClass('hidden');
			$('#' + iframe_id + 'upload_file').removeClass('error error_background');
		});
    }

var urldecode=function(str){
	if (typeof str!="string"){
		return str;
	} 
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

var eventNoBubble=function(ev){
	ev.preventDefault();
	ev.stopPropagation();
	return false;
}
