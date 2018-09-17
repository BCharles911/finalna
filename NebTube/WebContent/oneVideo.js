	function displayNotification(message) {
		$('#messageNotification').html(message);
		$('#messageDiv').show();
		$('#messageDiv').delay(1100).fadeOut(300);
	}
	
	//Mora biti definisana kompletno van scopa
	function replaceImage(image) {
		image.src = 'images/profileSilhuete.jpg';
	}
	
	
	
	
	

	
	$(document).ready(function(e) {
		
		//$('.commentOptions').selectpicker('hide');
		
		$('#messageDiv').hide();
		$('#filterRow').hide();
		$('#deleteConfirmation').hide();
		
		$('#likeButton').attr('src', 'images/upvote.png');
		$('#dislikeButton').attr('src', 'images/downvote.png');
		
		var videoID = window.location.search.split('=')[1];
		
		var videoURL = $('#videoURLplaceholder');
		var videoName = $('#videoName');
		var ownerUsername = $('#ownerUsername');
		var description = $('#description');
		var descriptionSection = $('#descriptionSection');
		var created = $('#created');
		var views = $('#views');
		var lajkoviVideo = $("#divLajkovi");
		var numLike = 0;
		var numDislike = 0;
		
		
		
		
		
		var commentSection = $('#commentSection');
		
		
		
		$.get('OneVideoServlet',{videoID:videoID},function(data) {
			console.log(data);
			
			
			//Slika i button za pracenje uploadera videa
			uploaderImage = $('<a href="singleUser.html?user='+data.video.ownerUsername+'"><img src="images/userImages/'+data.video.ownerUsername+'.jpg" onerror="replaceImage(this)" id="imgProfile"></img></a>');
			$('#uploaderImageContainer').append(uploaderImage);
			
			
			if(data.videoOwnerBlocked === true){
				if(data.userStatus != 'Authenticated') {
					$('#deleteConfirmation').children().remove();
					$('#deleteConfirmation').append('<h2 style="text-align:center;margin-top:2em;">Owner of this video is banned</h2>');
					$('#deleteConfirmation').append('<p style="text-align:center;">Redirecting...</p>');
					$('#deleteConfirmation').show();
					$('#glavniRed').attr('style', 'opacity:0.05;');
					setTimeout(function(e){
						window.location.replace('index.html');
					}, 1200);
				} else if(data.userStatus == 'Authenticated' && data.loggedInUser.role == 'USER'){
					if(data.loggedInUser.username != data.video.ownerUsername) {
						$('#deleteConfirmation').children().remove();
						$('#deleteConfirmation').append('<h2 style="text-align:center;margin-top:2em;">Owner of this video is banned</h2>');
						$('#deleteConfirmation').append('<p style="text-align:center;">Redirecting...</p>');
						$('#deleteConfirmation').show();
						$('#glavniRed').attr('style', 'opacity:0.05;');
						setTimeout(function(e){
							window.location.replace('index.html');
						}, 1200);
					}
				}
				
			}
			
			
			if(data.userStatus == 'Authenticated'){
				if(data.loggedInUser.username == data.video.ownerUsername) {
					$('#followUploaderButton').hide();
				}
				
				
				
				if(data.loggedInUser.role == 'USER'){
					if(data.video.visibility == 'PRIVATE') {
						if(data.loggedInUser.username != data.video.ownerUsername) {
							$('#deleteConfirmation').children().remove();
							$('#deleteConfirmation').append('<h2 style="text-align:center;margin-top:2em;">This video is private</h2>');
							$('#deleteConfirmation').append('<p style="text-align:center;">Redirecting...</p>');
							$('#deleteConfirmation').show();
							$('#glavniRed').attr('style', 'opacity:0.05;');
							setTimeout(function(e){
								window.location.replace('index.html');
							}, 1200);
						}
					}
					
					
				}
				if(jQuery.isEmptyObject(data.loggedInUser.following)){
					$('#followUploaderButton').html('Follow ' + data.video.ownerUsername);
				}
				for(it in data.loggedInUser.following){
					if(data.loggedInUser.following[it] == data.video.ownerUsername){
						$('#followUploaderButton').html('Unfollow ' + data.video.ownerUsername);
					} else {
						$('#followUploaderButton').html('Follow ' + data.video.ownerUsername);
					}
				}
			} else {
				$('#followUploaderButton').html('Follow ' + data.video.ownerUsername);
			}
			
			$('#followUploaderButton').attr('usernameOfUploader',data.video.ownerUsername);
			
			
			//Tekst za button block video
			if(data.video.blocked == false){
				$('#blockVideo').html('Block');
			} else {
				$('#blockVideo').html('Unblock');
			}
			
			//Provera koji je user ulogovan ako je ulogovan
			if(data.userStatus == 'Unauthenticated') {
				var signUp = $('<li><a id="navA" href="register.html"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>');
				var signIn = $('<li><a id="navB" href="login.html"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>');
				$('#korisnikBar').append(signUp);
				$('#korisnikBar').append(signIn);
				
				$('#changeDescriptionButton').hide();
				$('#videoOptions').hide();
			} else {
				
				
				
				
				var myChannel = $('<li><a id="navC" href="singleUser.html?user='+data.loggedInUser.username+'"><span class="glyphicon glyphicon-user"></span> My channel</a></li>');
				var logOut = $('<li><a id="navD" href="LogMeOutServlet"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>');
				$('#korisnikBar').append(myChannel);
				$('#korisnikBar').append(logOut);
				
				if(data.loggedInUser.username != data.video.ownerUsername){
					
					if(data.loggedInUser.role == 'USER'){
						$('#changeDescriptionButton').hide();
						$('#videoOptions').hide();
					}
				} else {
					$('#blockVideo').hide();
				}
			};
			
			//ZA OWNER OPTIONS
			//console.log($('#selectVisibility').attr('title'));
			if(data.video.visibility == 'PUBLIC') {
				$('#selectVisibility').selectpicker('val', 'public');
				$('#selectVisibility').selectpicker('refresh');
			} else if(data.video.visibility == 'UNLISTED') {
				$('#selectVisibility').selectpicker('val', 'unlisted');
				$('#selectVisibility').selectpicker('refresh');
			} else if (data.video.visibility == 'PRIVATE') {
				$('#selectVisibility').selectpicker('val', 'private');
				$('#selectVisibility').selectpicker('refresh');
			}
			
			if(data.video.ratingVisibility === true) {
				$('#selectRatingVisibility').selectpicker('val','visible');
				$('#selectRatingVisibility').selectpicker('refresh');
				//$('#divLajkovi').show();
			} else if(data.video.ratingVisibility == false) {
				$('#selectRatingVisibility').selectpicker('val', 'hidden');
				$('#selectRatingVisibility').selectpicker('refresh');
				//$('#divLajkovi').hide();
			}
			
			if(data.video.commentsAllowed === true) {
				$('#selectCommentsVisibility').selectpicker('val', 'enable');
				$('#selectCommentsVisibility').selectpicker('refresh');
			} else if(data.video.commentsAllowed == false) {
				$('#selectCommentsVisibility').selectpicker('val', 'disable');
				$('#selectCommentsVisibility').selectpicker('refresh');
				commentSection.append('<p style="text-align:center;">Comments are not allowed for this video');
				$('#commentInput').hide();
				$('#commentSubmit').hide();
				$('#sortComments').hide();
		
			}
			
			if(data.video.blocked === false){
				$('#blockVideo').html('Block');
			} else if(data.video.blocked === true) {
				$('#blockVideo').html('Unblock');
			}
			
			
			
			ownerUsername.html(data.video.ownerUsername);
			ownerUsername.data('username', data.video.ownerUsername);
			
			views.html('Views ' + data.video.views);
			videoName.html(data.video.name);
			videoURL.append(data.video.videoURL);
			
			description.html(data.video.description);
			//<p id="description" style="padding:1em;margin:0;font-size:1em;text-align:center;"></p>
			descriptionSection.append('<p id="description" style="padding:1em;margin:0;text-align:center;">'+data.video.description+'</p>');
			created.html('Created ' +  new Date(data.video.created.dayOfMonth + '/' + data.video.created.monthValue + '/' + data.video.created.year).toDateString());
			
			
			//console.log(data.loggedInUser);
			//potrebna verifikacija usera, ako je user ovo vec lajkovo, skini lajk
			if(data.userStatus == 'Authenticated'){
				for(it in data.videoLikesDislikes) {
					if(data.videoLikesDislikes[it].like === true) {
						if (data.videoLikesDislikes[it].ownerUsername == data.loggedInUser.username) {
							$('#likeButton').attr('src', 'images/upvoted.png');
						}
						numLike += 1;
					} else {
						if (data.videoLikesDislikes[it].ownerUsername == data.loggedInUser.username) {
							$('#dislikeButton').attr('src', 'images/downvoted.png');
						}
						numDislike += 1;
					}
				}
			}
			
			
			if(data.userStatus == 'Unauthenticated' && data.video.commentsAllowed !== true){
				commentSection.append('<p style="text-align:center;">Comments1 are not allowed for this video');
				$('#commentInput').hide();
				$('#commentSubmit').hide();
				$('#sortComments').hide();
			}
			//console.log('Nastavak ciklusa');
			if(data.loggedInUser.role != 'ADMINISTRATOR' && data.loggedInUser.username != data.video.ownerUsername && data.userStatus == 'Unauthenticated') {
				commentSection.append('<p style="text-align:center;">Comments2 are not allowed for this video');
				$('#commentInput').hide();
				$('#commentSubmit').hide();
				$('#sortComments').hide();
			} else if(data.userStatus == 'Authenticated' || data.loggedInUser.role == 'ADMINISTRATOR' || data.loggedInUser.username == data.video.ownerUsername) {
				for(it in data.comments) {
					//console.log(data.comments[it]);
					var commentRow = $('<div class="row commentRow" id="'+data.comments[it].id+'" style="margin-top:1em;padding-bottom:1em;border-style:none none solid none;border-width:0.1px;border-color:#f1f1f1"></div>');
					//Potrebno dodati hidden it
					//console.log('Trenutno na komentaru(pre ajaxove get metode): ' + data.comments[it].id );
					//var ld = getLD(data.comments[it].id);
					//alert(getLD(data.comments[it].id));
					//console.log(getLD(data.comments[it].id));
					var comNumLike = 0;
					var comNumDislike = 0;
					var likeButtonSource = 'images/upvote.png';
					var dislikeButtonSource = 'images/downvote.png';
					
					//ZA DIV I NJEGOVO POREDJENJE
					var commentRating = 0;
					
					if(data.userStatus == 'Authenticated'){
						for(x in data.commentsLikeDislike) {
							if(data.comments[it].id == data.commentsLikeDislike[x].videoOrCommentID) {
								if(data.commentsLikeDislike[x].like == true){
									comNumLike += 1;
									commentRating += 1;
								}else if(data.commentsLikeDislike[x].like == false){
									comNumDislike += 1;
									commentRating -= 1;
								}
								if(data.commentsLikeDislike[x].ownerUsername == data.loggedInUser.username){
									if(data.commentsLikeDislike[x].like == true){
										likeButtonSource = 'images/upvoted.png';
									}else {
										dislikeButtonSource = 'images/downvoted.png';
									}
									
								}
							}
						}
					}
					
					var columnMD2 = $('<div class="col-md-2"></div>');
					var columnMD10 = $('<div class="col-md-10"></div>');
					
					var commentUserProfilePic = $('<img style="width:80px;height:80px;border-style:solid;border-color:white;border-width:1px;border-radius:50%;" src="images/userImages/'+data.comments[it].ownerUsername+'.jpg" onerror="replaceImage(this)"></img>');
					
					var commentOwnerRow = $('<div id="'+data.comments[it].id+'" class="row commentOwnerRow"></div>');
					var commentOwner = $('<a href="singleUser.html?user='+data.comments[it].ownerUsername+'"><p>id="commentOwner" style="padding: 0;margin:0;display:inline;"></p></a>');
					commentOwner.html(data.comments[it].ownerUsername);
					commentOwnerRow.append(commentOwner);
					
					var commentContentRow = $('<div id="'+data.comments[it].id+'" class="row commentContentRow"></div>');	
					var commentContent = $('<h5 id="'+data.comments[it].id+'" class="commentContent"></h5>');
					commentContent.html(data.comments[it].content);
					commentContentRow.append(commentContent);
					
					var commentCreatedRow = $('<div id="'+data.comments[it].id+'" class="row commentCreatedRow"></div>');
					var commentCreated  = $('<p id="commentCreated" style="padding: 0;margin:0;font-size:10px;display:inline;"></p>');
					commentCreated.html(new Date(data.comments[it].created.monthValue + '/' + data.comments[it].created.dayOfMonth + '/' + data.comments[it].created.year).toDateString());
					commentCreatedRow.append(commentCreated);
					
					
					//var numberOfCommentLikes = 0;
					//var numberOfCommentDislikes = 0;
					var commentLikeDislikeRow = $('<div id="'+data.comments[it].id+'" class="row commentLikeDislikeRow"></div>');
					var commentLike = $('<img class="commentLikeButton" id="'+data.comments[it].id+'" style="height:20px;width:20px;" src="'+likeButtonSource+'"></img>   <p id="'+data.comments[it].id+'" class="numberOfCommentLikes" style="display:inline;font-size:10px;">'+comNumLike+'</p>');
					var commentDislike = $('<img class="commentDislikeButton" id="'+data.comments[it].id+'" style="height:20px;width:20px;margin:0 0 0 1em;" src="'+dislikeButtonSource+'"></img>  <p id="'+data.comments[it].id+'" class="numberOfCommentDislikes" style="display:inline;font-size:10px;margin-right:2em;">'+comNumDislike+'</p>');
					commentLikeDislikeRow.append(commentLike);
					commentLikeDislikeRow.append(commentDislike);
					//var commentOptions = $('<button id="'+data.comments[it].id+'" display="'+optionsButtonDisplay+'" type="submit" class="btn btn-default btn-sm"><span class=""></span></button>');

					columnMD2.append(commentUserProfilePic);
					
					//columnMD10.append(commentOwnerRow);	
					columnMD10.append(commentCreatedRow);
					columnMD10.append(commentContentRow);
					columnMD10.append(commentLikeDislikeRow);
					commentRow.append(columnMD2);
					commentRow.append(columnMD10);
					if(data.userStatus == 'Authenticated'){
						if(data.comments[it].ownerUsername == data.loggedInUser.username || data.loggedInUser.role == 'ADMINISTRATOR' ) {
							var optionsButtonDisplay = $('<span style="color:#d8d8d8;" id="'+data.comments[it].id+'" class="glyphicon glyphicon-cog commentOptionsButton"></span>');
							//var optionsButtonDisplay = $('<select id="'+data.comments[it].id+'" style="display:inline;" class="selectpicker commentOptionsButton" data-width="fit"><option>Edit</option></select>');
							console.log('Ovaj je moj: ' + data.comments[it].id);
							//$('.commentOptions').selectpicker()
							//commentRow.append(optionsButtonDisplay);
							//optionsButtonDisplay.attr('style', 'display:inline;color:#d8d8d8;');
							var commentOptions = $('<div class="commentOptions" id="'+data.comments[it].id+'" style="display:none;background-color:transparent; color: white; width:20%;"><p id="'+data.comments[it].id+'" class="editCommentOption" style="text-align:center;padding-top:1em;">Edit</p><p id="'+data.comments[it].id+'" class="deleteCommentOption" style="text-align:center;padding-bottom:1em;">Delete</p></div>');
							
							//commentLikeDislikeRow.append(optionsButtonDisplay);
							commentLikeDislikeRow.append(optionsButtonDisplay);
							commentLikeDislikeRow.append(commentOptions);
							//columnMD10.append(comme)
							
						}
					}

					//ZA DIV I NJEGOVO POREDJENJE
					commentRow.attr('rating', commentRating);
					commentRow.attr('created', commentCreated.html());

					commentSection.append(commentRow);
					sortCommentsByDate('asc');
					
					//$('.numberOfCommentLikes').html(numberOfCommentLikes);
					//$('.numberOfCommentDislikes').html(numberOfCommentDislikes);
				}
			}else {
				commentSection.append('<p style="text-align:center;">Comments are not allowed for this video');
				$('#commentInput').hide();
				$('#commentSubmit').hide();
				$('#sortComments').hide();
			}
			
			if(data.video.ratingVisibility == false) {
				if(data.userStatus == 'Authenticated'){
					if(data.loggedInUser.role == 'ADMINISTRATOR' || data.loggedInUser.username == data.video.ownerUsername){
						$('#numberOfLikes').html(numLike);
						$('#numberOfDislikes').html(numDislike);
					}
				}
			} else {
				$('#numberOfLikes').html(numLike);
				$('#numberOfDislikes').html(numDislike);
			}
			
			if(data.video.blocked == true){
				if(data.userStatus == 'Authenticated'){
					if(data.loggedInUser.role != 'ADMINISTRATOR' && data.loggedInUser.username != data.video.ownerUsername){
						$('#deleteConfirmation').children().remove();
						$('#deleteConfirmation').append('<h2 style="text-align:center;margin-top:2em;">This video is blocked</h2>');
						$('#deleteConfirmation').append('<p style="text-align:center;">Redirecting...</p>');
						$('#deleteConfirmation').show();
						$('#glavniRed').attr('style', 'opacity:0.05;');
						setTimeout(function(e){
							window.location.replace('index.html');
						}, 1200);
					}
				}
			}
			
			
			
			
			/*for(ld in data.commentsLikesDislikes) {
				
				if(data.comments[it].id == data.commentsLikesDislikes[ld].videoOrCommentID && data.commentsLikesDislikes[ld].like == true) {
					console.log()
					numberOfCommentLikes += 1;
				}else if(data.comments[it].id == data.commentsLikesDislikes[ld].videoOrCommentID && data.commentsLikesDislikes[ld].like == false) {
					numberOfCommentDislikes += 1;
				}
			
		}*/

			
			
			
		});
		
		
		$('#ownerUsername').click(function(e){
			var username = $(this).data('username');
			
			window.location.replace('singleUser.html?username=' +username+'');
			return;
		});
		
		
		$('#commentSubmit').click(function(e) {
			
			//console.log($('#commentInput').val());
			var comment = $('#commentInput').val();
			var param = {};
			param['commentContent'] = comment;
			param['commentVideoID'] = videoID;
			$('#commentInput').val('');
			$.post('UploadCommentServlet', param, function(y) {
				if(y.message == 'success') {
					displayNotification('You\'ve successfully uploaded a comment');
					var commentID = y.newCommentID;
					
					var commentRow = $('<div class="row commentRow" id="'+commentID+'" style="margin-top:1em;padding-bottom:1em;border-style:none none solid none;border-width:0.1px;border-color:#f1f1f1"></div>');
					
					
					//-----------------------------------------------------------------
					var columnMD2 = $('<div class="col-md-2"></div>');
					var columnMD10 = $('<div class="col-md-10"></div>');
				
					var commentUserProfilePic = $('<img style="width:80px;height:80px;border-style:solid;border-color:white;border-width:1px;border-radius:50%;" src="images/userImages/'+y.loggedInUser.username+'.jpg" onerror="replaceImage(this)"></img>');
				
					var commentOwnerRow = $('<div id="'+commentID+'" class="row commentOwnerRow"></div>');
					var commentOwner = $('<a href="singleUser.html?user='+y.loggedInUser.username+'">'+y.loggedInUser.username+'</a>');
				//	commentOwner.html(data.comments[it].ownerUsername);
					commentOwnerRow.append(commentOwner);
				
					var commentContentRow = $('<div id="'+commentID+'" class="row commentContentRow"></div>');	
					var commentContent = ('<h5 id="'+commentID+'" class="commentContent">'+comment+'</h5>');	;
					//commentContent.html(data.comments[it].content);
					commentContentRow.append(commentContent);
				
					var commentCreatedRow = $('<div id="'+commentID+'" class="row commentCreatedRow"></div>');
					var commentCreated = $('<p id="commentCreated" style="padding: 0;margin:0;font-size:10px;display:inline;">'+new Date().toDateString()+'</p>');
					//commentCreated.html(new Date(data.comments[it].created.monthValue + '/' + data.comments[it].created.dayOfMonth + '/' + data.comments[it].created.year).toDateString());
					commentCreatedRow.append(commentCreated);
					
					var commentLikeDislikeRow = $('<div id="'+commentID+'" class="row commentLikeDislikeRow"></div>');
					var commentLike = $('<img class="commentLikeButton" id="'+commentID+'" style="height:20px;width:20px;display:inline;" src="images/upvote.png"></img>  <p id="'+commentID+'" class="numberOfCommentLikes" style="display:inline;font-size:10px;">0</p>');
					var commentDislike = $('<img class="commentDislikeButton" id="'+commentID+'" style="height:20px;width:20px;margin:0 0 0 1em;" src="images/downvote.png"></img>  <p id="'+commentID+'" class="numberOfCommentDislikes" style="display:inline;font-size:10px;margin-right:2em;">0</p>');
					var optionsButtonDisplay = $('<span style="display:inline;color:#d8d8d8;" id="'+commentID+'" class="glyphicon glyphicon-cog commentOptionsButton"></span>');
					var commentOptions = $('<div class="commentOptions" id="'+commentID+'" style="display:none;background-color:#f9f9f9;width:30%;"><p id="'+commentID+'" class="editCommentOption" style="text-align:center;padding-top:1em;">Edit</p><p id="'+commentID+'" class="deleteCommentOption" style="text-align:center;padding-bottom:1em;">Delete</p></div>');
					commentLikeDislikeRow.append(commentLike);
					commentLikeDislikeRow.append(commentDislike);
					commentLikeDislikeRow.append(optionsButtonDisplay);
					commentLikeDislikeRow.append(commentOptions);
					
					//var commentLike = $('<img class="commentLikeButton" id="'+data.comments[it].id+'" style="height:20px;width:20px;" src="'+likeButtonSource+'"></img>   <p id="'+data.comments[it].id+'" class="numberOfCommentLikes" style="display:inline;font-size:10px;">'+comNumLike+'</p>');
					//var commentDislike = $('<img class="commentDislikeButton" id="'+data.comments[it].id+'" style="height:20px;width:20px;margin:0 0 0 1em;" src="'+dislikeButtonSource+'"></img>  <p id="'+data.comments[it].id+'" class="numberOfCommentDislikes" style="display:inline;font-size:10px;margin-right:2em;">'+comNumDislike+'</p>');
				
				
				
					columnMD2.append(commentUserProfilePic);
					
					columnMD10.append(commentOwnerRow);	
					columnMD10.append(commentCreatedRow);
					columnMD10.append(commentContentRow);
					columnMD10.append(commentLikeDislikeRow);
					commentRow.append(columnMD2);
					commentRow.append(columnMD10);
				//-----------------------------------------------------------------
					
					$('#commentSection').append(commentRow);
					
					
					
					
					//$('')
					//$('#commentSection').append()
				} else {
					window.location.replace('login.html');
				}
			});
			sortCommentsByDate('desc');
		});
		
		
		
		$('#likeButton').click(function(e) {
						
			if($('#dislikeButton').attr('src') == 'images/downvoted.png') {
				params = {'videoOrComment' : 'video', 'videoOrCommentID': videoID,'likeOrDislike' : 'dislike' };
				$.post('LikeDislikeRemoveServlet', params, function(data) {
					$('#dislikeButton').attr('src', 'images/downvote.png');
					var current = parseInt($('#numberOfDislikes').html());
					$('#numberOfDislikes').html(current - 1);
					if(data.message == 'success'){
						displayNotification('You\'ve removed dislike from video');
					}
				});
			}
			
			
			if($('#likeButton').attr('src') == 'images/upvoted.png') {
				params = {'videoOrComment' : 'video', 'videoOrCommentID': videoID,'likeOrDislike' : 'like' };
				$.post('LikeDislikeRemoveServlet', params, function(data) {
					$('#likeButton').attr('src', 'images/upvote.png');
					var current = parseInt($('#numberOfLikes').html());
					$('#numberOfLikes').html(current - 1);
					if(data.message == 'success'){
						displayNotification('You\'ve removed like from video');
					}
				});
			} else {
				params = {'videoOrComment' : 'video', 'videoOrCommentID' : videoID, 'likeOrDislike' : 'like'};
				
				$.post('LikeDislikeServlet', params , function(data) {
					if(data.userStatus == 'Unauthenticated') {
						window.location.replace('login.html');
					} else {
						$('#likeButton').attr('src', 'images/upvoted.png');
						var current = parseInt($('#numberOfLikes').html());
						$('#numberOfLikes').html(current + 1);
						if(data.message == 'success'){
							displayNotification('You\'ve liked video');
						}
						
					}
				});
			}
			
		});
		
		
		
		
		$('#dislikeButton').click(function(e) {
			
			if($('#likeButton').attr('src') == 'images/upvoted.png') {
				params = {'videoOrComment' : 'video', 'videoOrCommentID': videoID,'likeOrDislike' : 'like' };
				$.post('LikeDislikeRemoveServlet', params, function(data) {
					$('#likeButton').attr('src', 'images/upvote.png');
					var current = parseInt($('#numberOfLikes').html());
					$('#numberOfLikes').html(current - 1);
					if(data.message == 'success'){
						displayNotification('You\'ve removed like from this video');
					}
				});
			}
			
			
			if($('#dislikeButton').attr('src') == 'images/downvoted.png') {
				params = {'videoOrComment' : 'video', 'videoOrCommentID' : videoID, 'likeOrDislike' : 'dislike'};
				
				params = {'videoOrComment' : 'video', 'videoOrCommentID': videoID,'likeOrDislike' : 'dislike' };
				$.post('LikeDislikeRemoveServlet', params, function(data) {
					$('#dislikeButton').attr('src', 'images/downvote.png');
					var current = parseInt($('#numberOfDislikes').html());
					$('#numberOfDislikes').html(current - 1);
					if(data.message == 'success'){
						displayNotification('You\'ve removed dislike from video');
					}
				});
			} else {
				params = {'videoOrComment' : 'video', 'videoOrCommentID': videoID,'likeOrDislike' : 'dislike' };
				
				$.post('LikeDislikeServlet', params , function(data) {
					if(data.userStatus == 'Unauthenticated') {
						window.location.replace('login.html');
					} else {
						$('#dislikeButton').attr('src', 'images/downvoted.png');
						var current = parseInt($('#numberOfDislikes').html());
						$('#numberOfDislikes').html(current + 1);
						if(data.message == 'success'){
							displayNotification('You\'ve disliked video');
						}
					}
				});
			}
		});
		
		
		
		
		
		$(document).on('click', '.commentLikeButton', function(e) {
			var current = $(this).attr('id');
			
			if($('#'+current+'.commentDislikeButton').attr('src') == 'images/downvoted.png') {
				params = {'videoOrComment' : 'comment', 'videoOrCommentID': $('#'+current+'.commentLikeButton').attr('id'),'likeOrDislike':'dislike' };
				$.post('LikeDislikeRemoveServlet',params,function(data) {
					$('#'+current+'.commentDislikeButton').attr('src','images/downvote.png');
					var currentNumber = parseInt($('#'+current+'.numberOfCommentDislikes').html());
					$('#'+current+'.numberOfCommentDislikes').html(currentNumber - 1);
					if(data.message == 'success'){
						displayNotification('Removed dislike');
					}
				});
				
			}
			
			
			if($(this).attr('src') == 'images/upvote.png') {
				params = {'videoOrComment' : 'comment', 'videoOrCommentID': $(this).attr('id'), 'likeOrDislike' : 'like'};
				$.post('LikeDislikeServlet',params, function(data) {
					if(data.userStatus == 'Unauthenticated') {
						window.location.replace('login.html');
						
					} else {
						
						var currentNumber = parseInt($('#'+current+'.numberOfCommentLikes').html());
						$('#'+current+'.numberOfCommentLikes').html(currentNumber + 1);
						$('#'+current+'.commentLikeButton').attr('src', 'images/upvoted.png');
						if(data.message == 'success'){
							displayNotification('You\'ve liked a comment');
						}
						
						
					}
				})
			} else {
				params = {'videoOrComment' : 'comment', 'videoOrCommentID': $(this).attr('id'), 'likeOrDislike' : 'like'};
				$.post('LikeDislikeRemoveServlet', params, function(data) {
					$('#'+current+'.commentLikeButton').attr('src', 'images/upvote.png');
					//location.reload();
					var currentNumber = parseInt($('#'+current+'.numberOfCommentLikes').html());
					$('#'+current+'.numberOfCommentLikes').html(currentNumber - 1);
					if(data.message == 'success'){
						displayNotification('You\'ve removed like from comment');
					}
				});
				
			}
		});
		
		
		
		
		$(document).on('click', '.commentDislikeButton', function(e) {
			var current = $(this).attr('id');
			//alert($('#'+current+'.commentLikeButton').attr('src'));
			
			if($('#'+current+'.commentLikeButton').attr('src') == 'images/upvoted.png') {
				params = {'videoOrComment' : 'comment', 'videoOrCommentID': $('#'+current+'.commentLikeButton').attr('id'),'likeOrDislike':'dislike' };
				$.post('LikeDislikeRemoveServlet',params,function(data) {
					$('#'+current+'.commentLikeButton').attr('src','images/upvote.png');
					var currentNumber = parseInt($('#'+current+'.numberOfCommentLikes').html());
					$('#'+current+'.numberOfCommentLikes').html(currentNumber - 1);
				});
				
			}
			
			if($(this).attr('src') == 'images/downvote.png') {
				params = {'videoOrComment' : 'comment', 'videoOrCommentID': $(this).attr('id'), 'likeOrDislike' : 'dislike'};
				$.post('LikeDislikeServlet',params, function(data) {
					if(data.userStatus == 'Unauthenticated') {
						window.location.replace('login.html');
					} else {
						$('#'+current+'.commentDislikeButton').attr('src', 'images/downvoted.png');
						//location.reload();
						var currentNumber = parseInt($('#'+current+'.numberOfCommentDislikes').html());
						$('#'+current+'.numberOfCommentDislikes').html(currentNumber + 1);
					}
				})
			} else {
				params = {'videoOrComment' : 'comment', 'videoOrCommentID': $(this).attr('id'), 'likeOrDislike' : 'dislike'};
				$.post('LikeDislikeRemoveServlet', params, function(data) {
					$('#'+current+'.commentDislikeButton').attr('src', 'images/downvote.png');
					//location.reload();
					var currentNumber = parseInt($('#'+current+'.numberOfCommentDislikes').html());
					$('#'+current+'.numberOfCommentDislikes').html(currentNumber - 1);
					
				});
			}
		});
		
		
		$(document).on('mouseenter', '#okChangeDescriptionButton', function(e){
			$(this).attr('style', 'cursor:pointer;font-size:18px;');
		});
		
		$(document).on('mouseenter', '#cancelChangeDescriptionButton', function(e){
			$(this).attr('style', 'cursor:pointer;font-size:18px;');
		});
		
		$(document).on('mouseleave', '#okChangeDescriptionButton', function(e){
			$(this).attr('style', 'cursor:pointer;font-size:15px;');
		});
		
		$(document).on('mouseleave', '#cancelChangeDescriptionButton', function(e){
			$(this).attr('style', 'cursor:pointer;font-size:15px;');
		});
		
		$(document).on('click', '#okChangeDescriptionButton', function(e){
			 var newDescription = $('#newDescription').val();
			 $('#newDescription').remove();
			 $(this).remove();
			 $('#cancelChangeDescriptionButton').remove();
			 $('#description').html(newDescription);
			 $('#description').show();
			 $('#changeDescriptionButton').show();
			 var params = {'videoID':videoID,'parameter' : 'description', 'value':newDescription};
			 $.post('OneVideoServlet', params, function(data){
				if(data.message == 'success'){
					displayNotification(params['parameter'] + ' changed successfully');
				} 
			 });
		});
		
		$(document).on('click', '#cancelChangeDescriptionButton', function(e) {
			var oldDescription = $(this).attr('oldValue');
			$('#newDescription').remove();
			$('#description').html(oldDescription);
			$('#description').show();
			$(this).remove();
			$('#okChangeDescriptionButton').remove();
			$('#changeDescriptionButton').show();
			
		});
		
		$(document).on('click', '#followUploaderButton', function(e){
			var username = $(this).attr('usernameofuploader');
			console.log(username);
			if($(this).html() == 'Follow ' + username) {
				params = {'action': 'follow', 'username':username};
				$(this).html('Unfollow ' + username);
				$.post('FollowServlet', params, function(data){
					if(data.userStatus == 'Authenticated'){
						displayNotification('You are now following ' + username);
						
					}else {
						window.location.replace('login.html');
					}
				});
			} else {
				$(this).html('Follow ' + username);
				params = {'action': 'unfollow', 'username':username};
				$.post('FollowServlet',params, function(data){
					displayNotification('You are not following ' + username + ' anymore');
						
				});
			}
		});
		
		
		$('#changeDescriptionButton').click(function(e) {
			
			var currentDescription = $('#description').html();
				$('#okChangeDescriptionButton').attr('style', 'visibility:visible');
				var okChangeButton = $('<div class="col-md-5"></div><div class="col-md-1"><span id="okChangeDescriptionButton" class="glyphicon glyphicon-ok" ></span></div>');
				var cancelChangeButton = $('<div class="col-md-1"><span id="cancelChangeDescriptionButton" oldValue="'+currentDescription+'" class="glyphicon glyphicon-remove" ></span></div><div class="col-md-5"></div>');
				
				$('#description').hide();
				$('#descriptionSection').append('<input style="margin-bottom:2em;" value="'+currentDescription+'" id="newDescription" type="text" class="form-control input-lg"/>');
				var okCancelRow = $('<div class="row"></div>');
				okCancelRow.append(okChangeButton);
				okCancelRow.append(cancelChangeButton);
				$('#descriptionSection').append(okCancelRow);
				//$('#descriptionSection').append(okChangeButton);
				//$('#descriptionSection').append(cancelChangeButton);
				$('#newDescription').html(currentDescription);
				$('#newDescription').focus();
				$(this).hide();
				
				
				//var newDescription = $('#newDescription').val();
				
				
				//$('#description').html(newDescription);
				//$('#description').show();
				
				//$('#newDescription').remove();
				
				
				//var selectedVisibilityOption = $('#selectVisibility').val();
				//var selectedRatingVisibility = $('#selectRatingVisibility').val();
				//var selectedCommentVisibility = $('#selectCommentVisibility').val();
				//var params = {'videoID':videoID,'parameter' : 'description', 'value':newDescription};
				
				/*$.post('OneVideoServlet', params, function(e) {
					
				});*/
				
			/*} else {
				var currentDescription = $('#description').html();
				$(this).attr('class', 'glyphicon glyphicon-ok');
				$('#cancelChangeDescription').attr('style', 'visibility:visible;');
				$('#description').hide();
				
				$('#newDescription').focus();
			}*/
			
			
		});
		
		
		
		$('#selectVisibility').change(function(e) {
			var selectedValue = $(this).val();
			var params= {'videoID':videoID, 'parameter':'visibility', 'value':selectedValue};
			$.post('OneVideoServlet', params, function(data) {
				if(data.message == 'success'){
					displayNotification('Video visibility changed to ' + selectedValue);
				}
			});
		});
		
		$('#selectRatingVisibility').change(function(e) {
			var selectedValue = $(this).val();
			var passingValue;
			if(selectedValue == 'visible') {
				passingValue = 1;
			} else {
				passingValue = 0;
			}
			var params = {'videoID':videoID, 'parameter':'rating_visibility', 'value':passingValue};
			$.post('OneVideoServlet', params, function(data) {
				if(data.message == 'success'){
					displayNotification('Video rating visibility changed to ' + selectedValue);
					$('#divLikes').hide();
				}
			});
		});
		
		$('#selectCommentsVisibility').change(function(e){
			var selectedValue = $(this).val();
			var passingValue;
			if(selectedValue == 'enable') {
				passingValue = 1;
			} else {
				passingValue = 0;
			}
			var params = {'videoID':videoID, 'parameter':'comments_allowed', 'value':passingValue};
			$.post('OneVideoServlet', params, function(data) {
				if(data.message == 'success'){
					displayNotification('Comments enabled changed to ' + selectedValue);
				}
			});
		});
		
		$('#blockVideo').click(function(e) {
			var params = {'videoID':videoID, 'parameter':'blocked', 'value':1};
			if($(this).html() == 'Block') {
				$(this).html('Unblock');
				$.post('OneVideoServlet', params, function(data) {
					if(data.message == 'success'){
						displayNotification('You\ve successfully blocked this video');
						$(this).html('Unblock video');
					}
				});
			} else {
				params['value'] = 0;
				$(this).html('Block');
				$.post('OneVideoServlet', params, function(data) {
					if(data.message == 'success'){
						displayNotification('You\ve successfully unblocked this video');
					}
				});
			}
			
		});
		
		$('#deleteVideoButton').click(function(e){
			//Neki popup
			var params = {'videoID':videoID, 'parameter':'deleted', 'value':1};
			$('#deleteConfirmation').show();
			$('#glavniRed').attr('style', 'opacity:0.3;');
			
		});
		
		$('#okDeleteVideo').click(function(e){
			var params = {'videoID':videoID, 'parameter':'deleted', 'value':1};
			$.post('OneVideoServlet', params, function(data){
				if(data.message == 'success'){
					
					$('#deleteConfirmation').hide();
					$('#glavniRed').attr('style', 'opacity:1');
					window.location.replace('index.html');
				}
			});
		});
		
		$('#cancelDeleteVideo').click(function(e){
			$('#deleteConfirmation').hide();
			$('#glavniRed').attr('style','opacity:1');
		});
		
		
		
		$(document).on('mouseenter', '.commentOptionsButton', function(e) {
			$(this).attr('style', 'cursor:pointer;color:#8d8d8d;display:inline;');
		});
		
		$(document).on('mouseleave', '.commentOptionsButton', function(e) {
			$(this).attr('style', 'cursor:default;color:#d8d8d8;display:inline;');
		});
		
		$(document).on('click', '.commentOptionsButton', function(e) {
			var currentID =  $(this).attr('id');
			$('#'+currentID+'.commentOptions').toggle();
		});
		
		$(document).on('click', '.editCommentOption', function(e) {
			var currentID = $(this).attr('id');
			var currentCommentContent = $('#'+(currentID)+'.commentContent').html();
			$('#'+(currentID)+'.commentContent').hide();
			$('#'+currentID+'.commentContentRow').append('<input style="width:70%;display:inline;" value="'+currentCommentContent+'" id="editCommentInput" type="text" class="form-control input-sm"/>');
			$('#'+currentID+'.commentContentRow').append('<span id="'+currentID+'" style="display:inline;margin-left:1em;" class="glyphicon glyphicon-ok updateCommentOption"></span>');
			$('#'+currentID+'.commentContentRow').append('<span id="'+currentID+'" style="display:inline;margin-left:1em;" class="glyphicon glyphicon-remove cancelCommentUpdateOption"></span>');
			$('#editCommentInput').focus();
			$('#'+currentID+'.commentOptions').hide();
		});
		
		$(document).on('click', '.updateCommentOption', function(e){
			var currentID = $(this).attr('id');
			var newValue = $('#editCommentInput').val();
			$('#editCommentInput').remove();
			$('#'+currentID+'.commentContent').html(newValue);
			$('#'+currentID+'.commentContent').show();
			
			
			params = {'action' : 'update', 'commentID' : $(this).attr('id'), 'content': newValue};
			$.post('CommentServlet', params, function(data) {
				console.log(data);
			});
			$(this).remove();
			$('#'+currentID+'.cancelCommentUpdateOption').remove();
		});
		
		$(document).on('click', '.cancelCommentUpdateOption', function(e) {
			var currentID = $(this).attr('id');
			var oldValue = $('#editCommentInput').val();
			$('#editCommentInput').remove();
			$('#'+currentID+'.commentContent').show();
			$(this).remove();
			$('#'+currentID+'.updateCommentOption').remove();
		});
		
		
		
		$(document).on('click', '.deleteCommentOption', function(e) {
			var currentID = $(this).attr('id');
			//OVDE KOD ZA BRISANJE CELOG REDA SA ODREDJENIM IDOM
			params = {'action' : 'delete', 'commentID' : currentID};
			$.post('CommentServlet', params, function(data) {
				//OBRADITI MESSAGE
				location.reload();
			});
		});
		
		
		function sortCommentsByDate(parameter){
			var allComments = $('#commentSection').children();
			
			var sortCommentsByDate = {};
			
			for(it in allComments) {
				if(allComments[it].attributes != null) {
					var id = allComments[it].id;
					var created = allComments[it].attributes['created'].values;
					sortCommentsByDate[id] = created;
				}
			}
			
			var sortableDate = [];
			for(var date in sortCommentsByDate) {
				sortableDate.push([date, sortCommentsByDate[date]])
			}
			//console.log(sortableDate);
			
			switch(parameter){
			case "asc":
				sortableDate.sort(function(a,b){
					return new Date(b[1]) - new Date(a[1]);
				});
				break;
			case "desc":
				sortableDate.sort(function(a,b){
					return new Date(a[1]) - new Date(b[1]);
				});
			}
			
			for(x in sortableDate) {
				$('#commentSection').append($('#'+sortableDate[x][0]+'.row.commentRow'));
			}
			
		}
		
		function sortCommentsByRating(parameter) {
			
			var allComments = $('#commentSection').children();
			//console.log($('#'+1+'.row.commentRow'));
			//$('#commentSection').empty();
			var sortCommentsByRating = {};
			var sortCommentsByDate = {};
			//console.log(allComments);
			for(it in allComments) {
				
				if(allComments[it].attributes != null) {
					var id = allComments[it].id;
					var rating = allComments[it].attributes['rating'].value;
					var created = allComments[it].attributes['created'].value;
					sortCommentsByRating[id] = rating;
					sortCommentsByDate[id] = created;
				}

			}
			
			var sortableRating = [];
			for(var rating in sortCommentsByRating) {
				sortableRating.push([rating, sortCommentsByRating[rating]]);
			}
			console.log(sortableRating);
			
			switch(parameter){
			case "asc":
				sortableRating.sort(function(ratingVal1,ratingVal2) {
					return ratingVal2[1] - ratingVal1[1];
				});
				break;
			case "desc":
				sortableRating.sort(function(ratingVal1,ratingVal2) {
					return ratingVal1[1] - ratingVal2[1];
				});
				break;
				
			}
			//return sortableRating;
			
			for(x in sortableRating){
				$('#commentSection').append($('#'+sortableRating[x][0]+'.row.commentRow'));
			}
			
			//console.log(sortableRating);
			//console.log('Punjenje diva');
			//console.log(sortableRating.length);
			
			/*for(x in sortableRating) {
				//console.log('ID vrednost diva' + sortableRating[x][0]);
				$('#commentSection').append($('#'+sortableRating[x][0]+'.row.commentRow'));
				console.log($('#'+sortableRating[x][0]+'.row.commentRow'));
			}*/
			
			
			//console.log(sortCommentsByRating);
			//console.log(typeof sortCommentsByRating);
		}
		
		$(document).on('change', '#eksperimentPicker', function(e) {
			//console.log($('#eksperimentPicker').val());
			var parameter = $(this).val();
			var sorted;
			switch(parameter) {
			case "ratingAsc":
				sorted = sortCommentsByRating('asc');
				break;
			case "ratingDesc":
				sorted = sortCommentsByRating('desc')
				break;
			case "postedAsc":
				sorted = sortCommentsByDate('asc');
				break;
			case "postedDesc":
				sorted = sortCommentsByDate('desc');
				break;
			}
			
			/*for(var rou in sorted){
				$('#commentSection').append($('#'+sorted[rou][0]+'.row.commentRow'));
			}*/
			
		});

			
		
		
	

	});