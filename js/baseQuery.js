//DocumentReady
$(function(){
	//Basics
	introQuery();
	//MobileSwipe
	Swipe();
	//CenterView
	Size();
});
//BaseQuery
function Base(meow){
	//ImgErrorHide -- meh.
	$('img').error(function(){
  		$(this).hide();
		$(this).parent().css({background : '#333'});
	});
	//DragRanking
	if(meow !== 'tag'){
		$('#'+meow).sortable({
			placeholder: 'entityHighlight',
			cancel: '.disabled,button,form',
			opacity: 0.9,
			revert: true,
			scroll: true,
			start:function(event,ui){
				ui.item.data('startPos', ui.item.index());
			},
			update: function(event,ui){
				var endPos = ui.item.index();
				var entityId = ui.item.attr('id');
				voteRank(entityId, ui.item.data('startPos'), endPos);
			}
		}).disableSelection();
	}
	//FadeInMainEntries
	$('.entity').fadeIn();
}
//IntroLoad
function introQuery(){
	document.title = 'omg... | nullist';
	//CheckUrl
	var hash = location.hash.replace('#/','');
	if(hash == ''){var hash = 'hott'};
	var m3ow = $('#'+hash).prevAll().length;
	$('.type:lt('+m3ow+')').css({left : -$(window).width()});
	if(m3ow != 8){$('.type:gt('+m3ow+')').css({left : $(window).width()*1.5})};
	$('#'+hash).css({left : 0, display : 'block' }).addClass('visible');
	$('.page[name$='+hash+']').addClass('selected');
	//LoadFirstUrl
	if(hash == 'tag'){
		openChat(hash)
	}else{
		Type(hash);
	}
	//MenuSlide
	$('#name').hover(function(){
		$(this).stop().animate({'margin-top' : '0'});
		},function() {
			$(this).stop().animate({'margin-top' : '-20px'});
	});
	//ClickAnimatePageChange
	$('.page').click(function(){
		animateType(this);
	});
	//WelcomeMessage
	var Cookie = getCookie('Welcome');
	if(Cookie == null){
		$('#message').show().animate({top : -1});
		$('#message').click(function(){
			$(this).animate({top : -350},function(){
				$(this).hide();
			});
		});
		setCookie('Welcome','No',2222,01,22);
	};
	//AddEntryOverlay
	$('.addOverlay').click(function(event){
		if(!$(event.target).closest('#add').length && $('.openMenu').text() == 'close') {
			addForm();
		}
	});
	//QuickLookOverlay
	$('.quickOverlay').click(function(event){
		if(!$(event.target).closest('.peek').length){
			$('.quickOverlay').fadeOut(function(){
				var current = $('.visible').attr('id');
				document.title = current + '. | nullist';
				$('.peek').remove();
			});
		}
	});
	//CheckUrl
	//setInterval('checkUrl()', 250);
	window.onhashchange = checkUrl;
	//reSize
	$(window).resize(function(){
		Size();
	});
}
//AnimateType
function animateType(obj){
	var type = $(obj).attr('name');
	if(type == undefined){
		type = obj;
	}
	var typeID = '#' + type;
	if(!$('.type').is(':animated') && !$('#'+type).is(':visible')){
		if($(typeID).text() == ''){
			Type(type);
		}else{
			document.title = type + '. | nullist';
		}
		$('span').removeClass('selected');
		$(obj).addClass('selected');
		if($.browser.safari){
			$('body').animate({scrollTop: 0}, 300);
		}else{
			$('html').animate({scrollTop: 0}, 300);
		}		
		$(typeID).show();
		if($(typeID).offset().left > 0){
			var move = -$(window).width();
		}else{
			var move = $(window).width()*1.5;
		}
		$('.visible').animate({left : move, opacity : 0},function(){
			$(this).hide().removeClass('visible');
		});
		$(typeID).animate({left : 0, opacity : 1},function(){
			$(this).addClass('visible');
			var m3ow = $(this).prevAll().length;
			$('.type:lt('+m3ow+')').css({left : -$(window).width()});
			$('.type:gt('+m3ow+')').css({left : $(window).width()*1.5});
		});
		document.location = 'http://' + location.hostname + '#/' + type;
	}
	return false;
}
//VoteRank
function voteRank(entity,startPos,endPos){
	var getdate = new Date();
	var rank = $('#rank'+entity).text();

	if(startPos > endPos){
		var vote = '%2B1';
		var newRank = ++rank;
	}else{
		var vote = '-1';
		var newRank = --rank;
	}
	
	if(navigator.cookieEnabled == false){
		alert('enable cookies. kthxbai.');
	}else{
		if(getCookie(entity) == vote){
			document.title = 'Already Voted. | nullist';
			setTimeout("var visible = $('.visible').attr('id'); document.title = visible + '. | nullist'", 2000);
			return false;
		}else{
			
			$.ajax({
				type: 'POST',
				url: 'rankEntity.php',
				data: 'id=' + entity + '&vote=' + vote,
				success: function(Txt){
					$('.id'+entity).text(newRank);
					$('#'+entity).fadeTo('slow',.75).delay(100).fadeTo('slow',1);
					setCookie(entity,vote,2222,01,22);
					document.title = 'Voted. | nullist';
					setTimeout("var visible = $('.visible').attr('id'); document.title = visible + '. | nullist'", 2000);	
				},
				error: function(){
					$('#load').text('3RR0R.');
					document.title = 'Vote 3RR0R. | nullist';
				}
			});
		}
	}
}
//AddForm
function addForm() {
	if($('.openMenu').text() == 'add'){
		$('.openMenu').text('close');
		document.title = 'Add. | nullist';
		$('#add').show().stop().animate({top : -75});
		$('.addOverlay').show();
		$('#add input:text:visible:first').focus();
	}else{
		$('#add').stop().animate({top : -400},function(){$(this).hide();});
		$('.openMenu').text('add');
		$('.addOverlay').hide();
		document.title = 'Closed. | nullist';
		setTimeout("var visible = $('.visible').attr('id'); document.title = visible + '. | nullist'", 2000);
	}
}
//AddEntity
function addEntity(obj){
	var getdate = new Date();
	var days = getdate.getDay();
	var dayarray = new Array('Sun','Mon','Tues','Wed','Thurs','Fri','Sat');
	var day = dayarray[days];
	var title = $('#title').val();
	var txt = $('#txt').val();
	var folio = $('#folio').val();
	var image = $('#image').val();
	var math = $('#math').val();
	var type = $('input:checked').val();
	var Cookie = getCookie('Owner');

	if(Cookie == null){
		if(title.length > 0 && txt.length > 0){
			if(image.indexOf('http://') != -1  && folio.indexOf('http://') != -1){
				if(type != undefined){
					if(math == '1+1=2' ){
						$('#error').html('<img src="gif.gif" />');
						
						$.ajax({
							type: 'POST',
							url: 'addEntity.php',
							data: 'title=' + title + '&txt=' + txt + '&image=' + image + '&dated=' + day + '&type=' + type + '&folio=' + folio,
							success: function(Txt){
								document.title = 'added. | nullist';
								setCookie('Owner',folio,2222,01,22);
								$('#error').text('YAY');
								addForm();
								$(obj).attr('disabled','disabled');
								var New = '#new';
								Type(New);
								if($.browser.safari){
									$('body').animate({scrollTop: 0}, 300);
								}else{
									$('html').animate({scrollTop: 0}, 300);
								}
								if($('#new').is(':visible')){
									$('#new').fadeIn();
								}else{
									$('#new').show();
										if($('#new').offset().left > 0) {var move = -$(window).width();}else{ var move = $(window).width()*1.5;}
									$('.visible').animate({left : move},function() {
										$(this).hide().removeClass('visible');
									});
									$('#new').animate({left : 0},function() {
										$(this).addClass('visible');
									});
									$('span').removeClass('selected');
									$('.page:eq(1)').addClass('selected');
								}
								setTimeout("var visible = $('.visible').attr('id'); document.title = visible + '. | nullist'", 2000);
							},
							error: function(){
								$('#load').text('3RR0R.');
								document.title = 'Add 3RR0R. | nullist';
							}
						});
					}else{
						$('#error').text('Learn Maths.');
					}
				}else{
					$('#error').text('type.');
				}
			}else{
				$('#error').text('missing http://');
			}
		}else{
			$('#error').text('missing info.');
		}
	}else{
		$('#error').text('already posted.');
	}
}
//InsertEntities
function Insert(obj){
	document.title = 'omg... | nullist';
	$(obj).attr('disabled','true').text('omg...');
	var getdate = new Date();
	var more = $(obj).attr('name');
	var type = $(obj).parent().attr('id');
	var Cookie = getCookie('Owner');
	var mix = $(obj).attr('title');

	$.ajax({
		type: 'POST',
		url: 'insertEntities.php',
		data: 'more=' + more + '&type=' + type + '&cookie=' + Cookie,
		success: function(Txt){
			$('#'+type).append(Txt);
			if($.browser.safari){
				$('body').animate({scrollTop: '+=225'}, 1000);
			}else{
				$('html').animate({scrollTop: '+=225'}, 1000);
			}
			$(obj).remove();
			Base();
			if(mix == 'mix'){Mix()};
			document.title = type + '. | nullist';
		},
		error: function(){
			$('#load').text('3RR0R.');
			document.title = 'Insert 3RR0R. | nullist';
		}
	});
}
//EntityType
function Type(obj){
	$('#load').text('omg...');
	document.title = 'omg... | nullist';
	var getdate = new Date();
	var Cookie = getCookie('Owner');
	$('#content').css({'background' : 'url(gif.gif) no-repeat center center'});

	$.ajax({
		type: 'POST',
		url: 'typeEntities.php',
		data: 'type=' + obj + '&cookie=' + Cookie,
		success: function(Txt){
			$('#content').css({'background' : ''});
			$('#'+obj).html(Txt);
			Base(obj);
			document.title = obj + '. | nullist';
			$('#load').text('');
		},
		error: function(){
			$('#load').text('3RR0R.');
			$('#'+obj).text('3RR0R.').show();
			document.title = 'Type 3RR0R. | nullist';
		}
	});
}
//DeleteEntity
function Remove(obj){
	var getdate = new Date();
	var entityId = $(obj).attr('name');
	if($(obj).text() != 'Sure?'){
		$(obj).text('Sure?');
	}else{
		
		$.ajax({
			type: 'POST',
			url: 'deleteEntity.php',
			data: 'remove=' + entityId,
			success: function(Txt){
				$('.'+entityId).fadeTo('slow',.1).addClass('disabled');	
				deleteCookie('Owner');	
			},
			error: function(){
				$('#load').text('3RR0R.');
				document.title = 'Remove 3RR0R. | nullist';
			}
		});
	}
}
//QuickView
function quickView(obj){
	var folio = $(obj).attr('name');
	$('.quickOverlay').fadeIn().html('<div class="peek"><iframe src="' + folio + '" width=100% height=100% frameBorder=0></iframe></div>');
}
//AddComment
function addComment(obj){
	var getdate = new Date();
	var name = $('#callSign').val();
	var comment = $('#comment').val();
	var math = $('#math2').val();
	var entity = $('.cId').attr('name');
	var cAmount = $('#'+entity+' .cAmount').text();
	var cCount = ++cAmount;
	
	if(name.length > 0 && comment.length > 0){
		if(math == '1+1=2' ){
			
			$.ajax({
				type: 'POST',
				url: 'addComment.php',
				data: 'name=' + name + '&comment=' + comment + '&entity=' + entity,
				success: function(Txt){
					$('#newComment').hide().append(Txt).fadeIn();
					$('#commentError').text('YAY');
					$(obj).attr('disabled','disabled');
					$('#'+entity+' .cAmount').text(cCount);
					setCookie('comment',name,2222,01,22);
				},
				error: function(){
					$('#load').text('3RR0R.');
					document.title = 'Add Comment 3RR0R. | nullist';
				}
			});
		}else{
			$('#commentError').text('Learn Maths.');
		}
	}else{
		$('#commentError').text('missing info.');
	}
}
//ViewComments
function viewComments(obj){
	var getdate = new Date();
	var entity = $(obj).attr('name');
	var title = $(obj).parent().find('.title').text();
	var cookie = getCookie('comment');

	$.ajax({
		type: 'POST',
		url: 'viewComments.php',
		data: 'entity=' + entity + '&cookie=' + cookie,
		success: function(Txt){
			$('.cOverlay').show();
			document.title = title + ' comments. | nullist';		
			$('.cOverlay').html(Txt);
			$('#comments').css({'margin-top' : -$('#comments').height()*.5}).animate({top : $(window).height()/2}).draggable();
			$('.cOverlay').click(function(event) {
    			if (!$(event.target).closest('#comments').length) {
        			$('#comments').stop().animate({top : -$(window).height()/2}, function(){
						$('.cOverlay').hide();
						$('#comments').remove();
						document.title = 'comments closed. | nullist';
						setTimeout("var visible = $('.visible').attr('id'); document.title = visible + '. | nullist'", 2000);
					});
   				};
			});
		},
		error: function(){
			$('#load').text('3RR0R.');
			document.title = 'Comment 3RR0R. | nullist';
		}
	});
}
//Reply
function Reply(obj){
	var name = $(obj).attr('name');
	var reply = '@' + name + ': ';
	
	$('.addButton').hide();
	$('#addComment').fadeIn();
	$('#comment').val(reply);
	$('#comments').animate({scrollTop: '+=' + $("#comments").attr("scrollHeight")}, 1000);
	$("#addComment input:first").focus();
}
//ShowCommentForm
function showCommentForm(obj){
	$(obj).hide();
	$('#addComment').fadeIn();
	$('#comments').animate({scrollTop: '+=250'}, 1000);
	$("#addComment input:first").focus();
}
//DeleteComment
function cRemove(obj){
	var getdate = new Date();
	var id = $(obj).attr('id');
	if($(obj).text() != 'Sure?'){
		$(obj).text('Sure?');
	}else{
		
		$.ajax({
			type: 'POST',
			url: 'deleteComment.php',
			data: 'remove=' + id,
			success: function(Txt){
				$(obj).parent().remove();
			},
			error: function(){
				$('#load').text('3RR0R.');
				document.title = 'Remove Comment 3RR0R. | nullist';
			}
		});
	}
}
//SetCookies
function setCookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
  var cookie_string = name + "=" + escape ( value );
  if (exp_y) {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }
  if (path)
        cookie_string += "; path=" + escape ( path );
  if (domain)
        cookie_string += "; domain=" + escape ( domain );
  if (secure)
        cookie_string += "; secure";
  document.cookie = cookie_string;
}
//GetCookies
function getCookie(cookie_name){
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
//DeleteCookie
function deleteCookie(cookie_name){
  var cookie_date = new Date ( );
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}
//OpenWall
function openChat(tag){
	document.title = 'omg... | nullist';
	$('#content').css({'background' : 'url(gif.gif) no-repeat center center'});
	
	$.ajax({
			type: 'POST',
			url: 'wall.php',
			success: function(Txt){
				$('#content').css({'background' : ''});
				$('#tag').html(Txt);
				if(!$('#tag').hasClass('visible')){
					$('#tag ul').show();
					animateType(tag);			
				}else{
					$('#tag ul').fadeIn();
				};
				document.title = 'tag. | nullist';	
			},
			error: function(){
				$('#load').text('3RR0R.');
				document.title = 'Tag 3RR0R. | nullist';
			}
		});
}
//CheckMessage
function wallCheck(obj){
	if(obj !='' || obj != 'Enter a message'){
		$('#postWall').removeAttr('disabled');
	}
}
//DisbableButton
function wallDisable(obj){
		obj.setAttribute('disabled');
}
//PostMessage
function wallPost(obj){
	var name = $('#pasteName').val();
	var text = $('#pasteText').val();
	document.title = 'omg... | nullist';
		
	$.ajax({
			type: 'POST',
			url: 'wallPost.php',
			data: 'name=' + name + '&text=' + text,
			success: function(Txt){
				document.title = 'posted. | nullist';
				if($.browser.safari){
					$('body').animate({scrollTop: 0}, 300);
				}else{
					$('html').animate({scrollTop: 0}, 300);
				}	
				$('ul#list').prepend(Txt);
				$('#pasteText').val('');
			},
			error: function(){
				$('#load').text('3RR0R.');
				document.title = 'Tag Post 3RR0R. | nullist';
			}
	});
}
//OpenFolioUrl
function openFolio(obj){
	var folio = $(obj).attr('name');
	window.open(folio, '_blank');
}
//CheckBrowserUrl
function checkUrl(){
	var hash = location.hash.replace('#/','');
	var type = $('.visible').attr('id');
	
	if(hash == ''){var hash = 'hott'};
	if(type == ''){var type = 'hott'};
	if(hash != type){
		animateType(hash);
		$('.page[name$='+hash+']').addClass('selected');
	};
}
//Swipe
function Swipe(){
	var startSwipe;
	var endSwipe;
	$(window).mousedown(function(e){
		startSwipe = e.pageX;
	});
	$(window).mouseup(function(e){
		endSwipe = e.pageX;
		funk();
	});
	
	$('#content').bind('touchstart', function(e){
    	startSwipe = e.originalEvent.touches[0].pageX;
		$('body').unbind();
		$('body').bind('touchmove', function(e){
            endSwipe = e.originalEvent.touches[0].pageX;
		});
		$('body').bind('touchend', function(e){
			$(this).unbind();
			funk();
        });
  	});
  
	function funk(){
		if ((startSwipe - endSwipe) > 150){
			var type = $('.visible').next().attr('id');
			if(type == 'tag'){
				openChat(type);
			}else if(type != null){
				animateType(type);
			}
		}else if ((endSwipe - startSwipe) > 150){
			var type = $('.visible').prev().attr('id');
			if(type == 'tag'){
				openChat(type);
			}else if(type != null){
				animateType(type);
			}
		}
	}
}
//HelpMessage
function Faq(){
	$('#message').show().animate({top : -1});
	$('#message').click(function(){
		$(this).animate({top : -350},function(){
			$(this).hide();
		});
	});
}
//MixUpLayOut
function Mix(){
	$('.entity:visible').each(function(index){
	    var x = $(window).width()-150;
		var y = $(window).height()-250;
		x = Math.floor(Math.random()*x);
		y = Math.floor(Math.random()*y);
		$(this).css({'position' : 'absolute'}).animate({left : x, top : y});
	}).draggable({zIndex : 2000});
	$('.more:visible').attr('title', 'mix');
}
//CenterEntities
function Size(){
	var width = $(window).width();
	var view = Math.floor((width-15)/265)*265+15;
	if(view < 280){view = 280};
	var left = (width-view)/2;
	if(left < 0 || width < 280){left = 0};
	$('.type').css({width : view,'padding-left' : left});
}