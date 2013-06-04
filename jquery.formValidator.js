(function($) {
  $.fn.formValidator = function(options) {
  	
  	// CREATE SETTINGS
  	var settings =  $.extend({
            requiredTxt : "This Field Is Required!",
            invalidTxt : "These are invalid values",
            popGenTxt : "There are errors in the form"
        }, options);
   	
   	 	
  	return this.each( function() {
  		var $form = $(this);   		
 		var $btn = $(this).find('input[type=submit]');   		 		   	
   		// CREATE FLAG
   		var isFormInError = false;
   		
   		// CREATE THE POPUP  		
  		var $pop = $('<div />').addClass('sq-pop sq-pop-message is-error').append($('<div />').append($('<p>' + settings.popGenTxt + '</p>')));
  		var $popOverlay = $('<div />').addClass('sq-pop sq-pop-overlay');
  		
  		$popOverlay.appendTo('body').hide();   		
  		$pop.appendTo('body').hide();
  		
  		// CENTER THE POPUP
  		$pop.css({
			top :  ($(window).height() / 2) - ($pop.outerHeight() / 2),
  			left : ($(window).width() / 2) - ($pop.outerWidth() / 2)	
  		})	  
   		
   		 
  		// ON SUBMIT CHECK THE FORM
  		$btn.on('click', function(e) {
  			e.preventDefault();
  			
  			// LOOP THROUGH ALL INPUTS & TEXTAREAS AND FIND REQUIRED 
  			$form.find('input, textarea, select').each(function() {
  				
  				// STORE EACH ONE
  				$itm = $(this);
  				$itmVal = $itm.val();
  				$itmPos = $itm.position();
  				$itmWdth = $itm.outerWidth();
  				$itmHght = $itm.outerHeight();
  				
  				var $mes = $('<div class="is-error is-error-pop" />');
  						
  				// Create a function to position the message. 
  				function mesPos(){
  					
  					var $mesPosL = ($itmPos.left + $itmWdth - $mes.outerWidth());
					var $mesPosT = 	($itmPos.top + $itmHght + 5);
  					
  					// CHECK FOR TINYMCE EDITOR 																
					if ($itm.hasClass('tiny-mce')) {  
						$tnyMce = $itm.siblings('.mceEditor');
						$tnyMcePos = $tnyMce.position();
						$tnyMceH = $tnyMce.outerHeight(); 
						$tnyMceW = $tnyMce.outerWidth();
						   							   
						$mes.css({
							"left" : ($tnyMcePos.left + $itmWdth) - $mes.outerWidth() + 'px',
							"top" : $tnyMcePos.top + $tnyMceH +  5 + 'px'
						});
						  							  						  						
					} else if ($mesPosL <= 0 ) {
						
  						$mes.css({
  							"left" : 0 + 'px',
  							"top" : $mesPosT + 'px'
  						});		  				
  						
					} else {
						
						$mes.css({
							"left" : $mesPosL + 'px',
							"top" : $mesPosT + 'px'
						});  						
						  							
					}
										  											
					// ADD PADDING TO PARENT
					$itm.closest('.field').css('padding-bottom', $mes.outerHeight() + 5 );												
					$itm.addClass('is-error');
  					
  				}; // End Message Positioning Function
  						
  				// CREATE A FUNCTION TO HIDE ERROR ON FOCUS
  				function remError() {
	  				$itm.focus(function() {	  						
	  					var focus = $(this);
	  					
	  					focus.removeClass('is-error');	  						  						  					  							
	  					focus.siblings('div.is-error').fadeOut('fast', function() {
	  						$(this).remove();
	  					});
	  					
		  			});	
  				}
  				
  				
  				// FIND ALL INPUT REQUIRED FIELDS  				
  				if ($itm.data('req') && $itmVal == "") {  					
					
					
					// ADD THE MESSAGE TO THE ERROR  						  					 	  					 	 
					$mes.append($('<p>' + settings.requiredTxt + '</p>')).append('<span />');
					
					// Place the message after the input  											  		
					$itm.after($mes);
					
					// Position the message to the input
					mesPos();
					  							
					// Update the form error flag
														  						  
					isFormInError = true;							
					remError();
					
					return;
												  					  					  							  				
  				} 
				
				// TEST FOR REGULAR EXPRESSION				
	  			if ($itm.data('regex')) {
	  				
	  				// GET THE STRING & CONVERT TO AN OBJECT 
 	  				var regex = new RegExp($itm.data('regex')); 										
					
					// TEST THE EXPRESSION AGAINST THE VALUE 	  				
	  				if (!regex.test($itmVal)) {
	  					
	  					// ADD THE ERROR MESSAGE TO THE DIV
	  					$mes.append($('<p>' + settings.invalidTxt + '</p>')).append('<span />');
	  					
	  					// APPEND THE MESSAGE AFTER THE INPUT  											  		
						$itm.after($mes);
						
						// POSITION THE MESSAGE TO THE INPUT
						mesPos();
						
						// UPDATE THE ERROR FLAG							  					
	  					isFormInError = true;			  			  					
	  					remError();
	  						  					
	  				}
	  				
	  			}
  				
  			});
  			  			
	  		// SHOW/HIDE THE POPUP
	  		if ( isFormInError == true ) {  				  		
	  			
	  			$pop.fadeIn(function() {
	  				$pop.click(function() {
	  					$pop.fadeOut();
	  					$popOverlay.fadeOut();
	  				});
	  			});
	  			
	  			$popOverlay.fadeIn(function() {
	  				$popOverlay.click(function() {
	  					$pop.fadeOut();
	  					$popOverlay.fadeOut();	
	  				});	
	  			});	  		
	  			
	  		} 	  			  			
	  		
  		});  		
  		
    });
    
  }
  
})(jQuery);