	
 	function replaceFunction(image) {
		//image.attributes[0] = 'images/profileSilhuete.jpg';
		image.src = 'images/profileSilhuete.jpg';
		//image.onerror = null;
		//alert('image cant be loaded');
		//image.attr('src', 'images/profileSilhuete.jpg');
		//$(this).attr('src', 'images/profileSilhuete.jpg');
	};
 	
	function displayNotification(message) {
		$('#messageNotification').html(message);
		$('#messageDiv').show();
		$('#messageDiv').delay(1200).fadeOut(1200);
	}
	
 	$(document).ready(function(e) {
 		var recievedUsername = window.location.search.split('=')[1];
 		
 		var userUsername = $('#userUsername');
 		var description = $('#description');
 		var creted;
 		var videoContainer = $('#videoContainer');
 		
 		
 		
 		$('#eksperimentXD').val(recievedUsername);
 		$('#userOptions').hide();
 		$('#changeDescriptionButton').hide();
 		$('#messageDiv').hide();
 		$('#bannedUserNotification').hide();
 		
 		
 		
 		$.get('SingleUserServlet', {username:recievedUsername}, function(data) {
 			console.log(data);
 			
 			
 			
 			//broj followera
 			$('#numberOfFollowers').html(data.numberOfFollowers + ' followers');
 			
 			
 			//ZA FOLLOWING
 			$('#followingUsersHeadline').html(data.user.username + ' is following');
 			
 			
 			var userFollowingName = Object.keys(data.userFollowing);
 			
 	
 			var userFollowingNumOfFollowers = Object.keys(data.userFollowing).map(function(key){
 				return data.userFollowing[key];
 			});
 			
 			
 			
 			
 			
 			
 			for(var i = 0;i<userFollowingName.length;i++){ 
 				console.log('Pratim' + userFollowingName[i]  + 'I on ima: ' + userFollowingNumOfFollowers[i] + 'pratioca');
 	
 				var followingProfilesColumn = $('<div id="divUsers" class="col-md-3"></div>');
 				
 				
 				var followingProfilePicture = $('<a href="singleUser.html?user='+userFollowingName[i]+'"><img src="images/userImages/'+userFollowingName[i]+'.jpg" onerror="replaceFunction(this)" style="border-style:solid;border-color:black;border-width:0.5px;border-radius:50%;"></img></a>');
 				var followingProfileName = $('<p style="margin-top:1em;">'+userFollowingName[i]+'</p>');
 				var followingProfileNumFollowers = $('<p>Followers '+userFollowingNumOfFollowers[i]+'</p>')
 				
 				followingProfilesColumn.append(followingProfilePicture);
 				followingProfilesColumn.append(followingProfileName);
 				followingProfilesColumn.append(followingProfileNumFollowers);
 				
 				//followingProfilesRow.append(followingProfilesColumn);
 				//followingProfilePicture.onerror(replaceFunction());
 				//followingProfilePicture.attr('onerror', replaceFunction(this));
 				$('#followingUsersContainer').append(followingProfilesColumn);
 				//$('#followingUsersContainer').append($('<p>'+userFollowingNumOfFollowers[i]+'</p>'));
 			}
 			
 			
 			
 			if(data.user.profilePictureURL != null && data.user.profilePictureURL != '') {
 				$('#imageOfProfilePicture').attr('src','images/userImages/'+data.user.username+'.jpg');
 				$('#imageOfProfilePicture').attr('style', 'border-style:none;padding:1px;width:250px;height:250px;border-radius:50%;');
 			}else {
 				$('#imageOfProfilePicture').attr('src', 'images/profileSilhuete.jpg');
 			}
 			
 			
 			//Follow button handlovanje
 			
 			if(data.userStatus == 'Authenticated'){
 				if(data.loggedInUser.username == recievedUsername) {
 					$('#followUnfollowButton').hide();
 					$('#userOptions').show();
 					$('#changeDescriptionButton').show();
 					
 					
 					//$('#promoteDemoteButton').hide();
 					//$('#banUnbanButton').hide();
 				} else {
 					$('#followUnfollowButton').html('Follow ' + recievedUsername);
 				}
 				if(data.loggedInUser.role == 'ADMINISTRATOR'){
 					$('#userOptions').show();
 					$('#changeDescriptionButton').show();
 					$('#banUnbanButton').show();
 					$('#promoteDemoteButton').show();
 				} else {
 					$('#promoteDemoteButton').hide();
 					$('#banUnbanButton').hide();
 				}
 				
	 			for(var x=0;x<data.loggedInUser.following.length;x++){
	 				console.log(data.loggedInUser.following[x]);
	 				if(data.loggedInUser.following[x] == recievedUsername){
	 					$('#followUnfollowButton').html('Unfollow ' + recievedUsername);
	 					break;
	 				}else {
	 					$('#followUnfollowButton').html('Follow ' + recievedUsername);
	 				}
	 			}
 			} else {
 				$('#followUnfollowButton').html('Follow ' + recievedUsername);
 				
 				//$('#changeDescriptionButton').hide();
 			}
 			
 			
 			//POSTAVLJANJE OPCIJA ADMINSTRATORU
 			$('#userNameInput').val(data.user.name);
 			$('#userLastnameInput').val(data.user.lastname);
 			$('#userUsernameInput').val(data.user.username);
 			$('#userPasswordInput').val(data.user.password);
 			$('#userEmailInput').val(data.user.email);
 			if(data.user.role == 'ADMINISTRATOR') {
 				$('#promoteDemoteButton').html('Demote to regular user');
 			} else {
 				$('#promoteDemoteButton').html('Promote to administrator');
 			}
 			if(data.user.banned == true) {
 				$('#banUnbanButton').html('Unban this user');
 			} else {
 				$('#banUnbanButton').html('Ban this user');
 			}
 			
 			
 			
 			userUsername.html(data.user.username);
 			description.html(data.user.description);
 			
 			
 			if(data.userStatus == 'Unauthenticated') {
				var signUp = $('<li><a id="navA" href="register.html"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>');
				var signIn = $('<li><a id="navB" href="login.html"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>');
				$('#korisnikBar').append(signUp);
				$('#korisnikBar').append(signIn);
				//$('#followuploadButton').html('Follow');
				//$('#followUnfollowButton').hide();
			} else {
				var myChannel = $('<li><a id="navC" href="singleUser.html?user='+data.loggedInUser.username+'"><span class="glyphicon glyphicon-user"></span> My channel</a></li>');
				var logOut = $('<li><a  id="navC" href="LogMeOutServlet"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>');
				$('#korisnikBar').append(myChannel);
				$('#korisnikBar').append(logOut);
				
				
				
				/*f(data.loggedInUser == recievedUsername) {
					$('#followUnfollowButton').hide();
				} else {
					$('#followUnfollowButton').html('Follow '+ recievedUsername);
				}*/
			};
 			
 			if(data.user.banned == true) {
 				if(data.userStatus == 'Authenticated') {
 					if(data.loggedInUser.role != 'ADMINISTRATOR' && data.loggedInUser.username != data.user.username) {
 						$('#bannedUserNotification').show();
 						$('#glavniRed').attr('style','opacity:0.3;');
 						setTimeout(function(e){
							window.location.replace('index.html');
						}, 1200);
 					}
 				}else {
 						$('#bannedUserNotification').show();
						$('#glavniRed').attr('style','opacity:0.3;');
						setTimeout(function(e){
						window.location.replace('index.html');
						}, 1200);
 				}
 			}
 			
 			
 			
 			for(i=0;i<data.userVideos.length;i++) {
 				
 				
 				var vidsImage = $('<a href="oneVideo.html?id='+data.userVideos[i].id+'"><img id="vidsPicture" src="'+data.userVideos[i].imageURL+'" style="width:100%;height:auto;"></img></a>');
 		 		var vidsName = $('<p id="vidsName" style="margin:0;padding:0;"></p>');
 		 		var vidsCreated = $('<p id="vidsCreated" style="margin:0;padding:0;font-size:10px;"></p>');
 				
 				if(i%4==0) {
 					var row = $('<div class="row" id="videoRow" style="margin-bottom:1em;"></div');
 					var column = $('<div class="col-md-3" style="margin:0;padding:0.5em;"></div>');
 					//console.log(data.userVideos[i].imageURL);
 					$('#vidsPicture').attr('src', data.userVideos[i].imageURL);
 	 				vidsName.html(data.userVideos[i].name);
 	 				vidsCreated.html(new Date(data.userVideos[i].created.dayOfMonth+'/'+data.userVideos[i].created.monthValue+'/'+data.userVideos[i].created.year).toDateString());
 					column.append(vidsImage);
 					column.append(vidsName);
 					column.append(vidsCreated);
 					
 					row.append(column);
 					videoContainer.append(row);
 					
 					
 				} else {
 					var column = $('<div class="col-md-3" style="margin:0;padding:0.5em;"></div>');
 					vidsImage.attr('src', data.userVideos[i].imageURL);
 	 				vidsName.html(data.userVideos[i].name);
 	 				vidsCreated.html(new Date(data.userVideos[i].created.dayOfMonth+'/'+data.userVideos[i].created.monthValue+'/'+data.userVideos[i].created.year).toDateString());
 	 				column.append(vidsImage);
 					column.append(vidsName);
 					column.append(vidsCreated);
 					var row = $('#videoRow');
 					row.append(column);
 					videoContainer.append(row);
 				}
 				
 				
 			}
 			
 			if(data.loggedInUser.username == data.user.username){
 				var uploadVideoRow = $('<div class="row"><div class="col-md-4"></div><div class="col-md-4"><button id="uploadButton" type="submit" class="btn btn-default btn-lg">Upload new video</button></div><div class="col-md-4"></div></div');
 				//videoContainer.append('<div class="col-md-3"><button style="width:100%;height:6em;" id="uploadButton" type="submit" class="btn btn-default btn-lg">+</button></div>');
 				videoContainer.append(uploadVideoRow);
 			}
 			
 		
 			
 			
 		});
 		
 		
 		$(document).on('click', '#uploadButton', function(e){
 			//console.log($('#userUsername').html());
 			window.location.replace('uploadVideo.html?user='+$('#userUsername').html()+'');
 			
 		});
 		
 		$(document).on('click', '.changeUserInput', function(e) {
 			e.preventDefault();
 			
 			$(this).focus();
 			var current = ($(this).attr('id'));
 			var currentValue = $(this).val();
 			//Inicijalno sakrivanje svih glifikona
 			$('.userChange').attr('style', 'visibility:hidden;opacity:0.7;');
 			$('.cancelUserChange').attr('style', 'visibility:hidden;opacity:0.7;');
 			$('.cancelUserChange').attr('currentValue', currentValue);
 			//alert($('.cancelUserChange').attr('currentValue'));
 			//Prikazivanje glifikona samo za odredjeni textbox
 			$('#'+current+'.userChange').attr('style', 'visibility:visible;opacity:0.7;');
 			$('#'+current+'.cancelUserChange').attr('style','visibility.visible;opacity:0.7;');
 			
 		});
 		
 		$(document).on('focusout', '.changeUserInput', function(e) {
 			e.preventDefault();
 			
 			var current = ($(this).attr('id'));

 			$('#'+current+'.userChange').attr('style', 'visibility:hidden');
 			$('#'+current+'.cancelUserChange').attr('style', 'visibility:hidden');
 			
 		});
 		
 		$(document).on('mouseenter', '.userChange', function(e) {
 			$('#'+($(this).attr('id'))+'.userChange').attr('style', 'opacity:1;cursor:pointer;font-size:20px;color:green;');

 		});
 		
 		$(document).on('mouseleave', '.userChange', function(e) {
 			$('#'+($(this).attr('id'))+'.userChange').attr('style', 'opacity:0.5;cursor:pointer');

 		});
 		
 		$(document).on('mouseenter', '.cancelUserChange', function(e) {
 			$('#'+($(this).attr('id'))+'.cancelUserChange').attr('style', 'opacity:1;cursor:pointer;font-size:20px;color:red;');
 
 		});
 		
 		$(document).on('mouseleave', '.cancelUserChange', function(e) {
 			$('#'+($(this).attr('id'))+'.cancelUserChange').attr('style', 'opacity:0.5;cursor:pointer');

 		});
 		
 		$(document).on('click', '.userChange', function(e) {
 			var changing = $(this).attr('id');
 			var newValue = $('#'+changing+'.changeUserInput').val();
 			params = {'userUsername': recievedUsername};
 			var message = '';
 			switch(changing) {
 			case 'userNameInput':
 				params['action'] = 'name';
 				break;
 			case 'userLastnameInput':
 				params['action'] = 'lastname';
 				break;
 			case 'userUsernameInput':
 				params['action'] = 'username';
 				break;
 			case 'userPasswordInput':
 				params['action'] = 'password';
 				break;
 			case 'userEmailInput':
 				params['action'] = 'email';
 				break;
 			}
 			params['newValue'] = newValue;
 			$.post('SingleUserServlet', params, function(data) {
 				if(data.message == 'success') {
 					displayNotification(params['action'] + ' successfully changed');
 				}
 			});
 			$(this).hide();

 			
 		});
 		
 		$(document).on('click', '.cancelUserChange', function(e) {
 			var currentValue = $(this).attr('currentValue');
 			$('#'+$(this).attr('id')+'.changeUserInput').val(currentValue);
 			$(this).hide();
 		});
 		
 		
 		$(document).on('click', '#promoteDemoteButton', function(e) {
 			var value = $(this).html();
 			params = {'userUsername' : recievedUsername, 'action':'role'};
 			var message = '';
 			switch(value) {
 			case "Promote to administrator":
 				params['newValue'] = 'ADMINISTRATOR';
 				$(this).html('Demote to regular user');
 				message = recievedUsername + 'promoted to administrator';
 				break;
 			case "Demote to regular user":
 				params['newValue'] = 'USER';
 				$(this).html('Promote to administrator');
 				message = recievedUsername + ' demoted to regular user';
 				break;
 			}
 			$.post('SingleUserServlet', params, function(data) {
 				if(data.message == 'success'){
 					displayNotification(message);
 				}
 			});
 		});
 		
 		$(document).on('click', '#banUnbanButton', function(e) {
 			var value = $(this).html();
 			params = {'userUsername' : recievedUsername, 'action' : 'banned'};
 			var message = '';
 			switch(value) {
 			case "Ban this user":
 				params['newValue'] = true;
 				$(this).html('Unban this user');
 				message = 'You\'ve banned ' + recievedUsername;
 				break;
 			case "Unban this user":
 				params['newValue'] = false;
 				$(this).html('Ban this user');
 				message = 'You\'ve unbanned ' + recievedUsername;
 				break;
 			}
 			$.post('SingleUserServlet', params, function(data) {
 				if(data.message == 'success'){
 					displayNotification(message);
 				}
 			});
 		});
 		
 		$('#changeDescriptionButton').on('click', function(e) {
 			var currentValue = $('#description').html();
 			$('#description').hide();
 			$(this).hide();
 			
 			$('#descriptionSection').append($('<p id="changeDescriptionHeadline">New description</p>'));
 			$('#descriptionSection').append($('<input id="changeDescriptionInput" value="'+currentValue+'" style="margin:1em 0 2em 0;" type="text" class="form-control"/>'));
 			$('#descriptionSection').append($('<span id="changeDescription" style="margin:0 1em 0 0;" class="glyphicon glyphicon-ok"></span>'));
 			$('#descriptionSection').append($('<span id="cancelDescriptionChange" class="glyphicon glyphicon-remove"></span>'));
 			$('#cancelDescriptionChange').attr('currentValue', currentValue);
 			$('#changeDescriptionInput').focus();
 		});
 		
 		$(document).on('click', '#changeDescription', function(e) {
 			var newValue = $('#changeDescriptionInput').val();
 			$('#changeDescriptionInput').remove();
 			$(this).remove();
 			$('#cancelDescriptionChange').remove();
 			$('#changeDescriptionHeadline').remove();
 			$('#description').html(newValue);
 			$('#description').show();
 			$('#changeDescriptionButton').show();
 			
 			params = {'userUsername' : recievedUsername, 'action':'description', 'newValue':newValue};
 			$.post('SingleUserServlet', params, function(data) {
 				if(data.message == 'success'){
 					displayNotification(params['action'] + ' successfully changed');
 				}
 			});
 			
 		});
 		
 		
 		$(document).on('click', '#cancelDescriptionChange', function(e) {
 			var oldValue = $(this).attr('currentValue');
 			$('#changeDescriptionInput').remove();
 			$(this).remove();
 			$('#changeDescription').remove();
 			$('#changeDescriptionHeadline').remove();
 			$('#description').html(oldValue);
 			$('#description').show();
 			$('#changeDescriptionButton').show();
 			
 		});
 		
 		
 		$(document).on('change', '#profilePicture', function(e) {
 			$('#pictureData').submit();
 			displayNotification('Profile picture changed successfully');
 		});
 		
 		$(document).on('click', '#followUnfollowButton',function(e) {
 			var currentVal = $(this).html();
 			var params = {};
 			switch(currentVal) {
 			case "Follow " + recievedUsername:
 				
 				params['action'] = 'follow';
 				params['username'] = recievedUsername;
 				$(this).html('Unfollow ' + recievedUsername);
 				displayNotification('You\'ve followed ' + recievedUsername);
 				$('#numberOfFollowers').html((parseInt($('#numberOfFollowers').html()) + 1) + ' followers');
 				break;
 			case "Unfollow " + recievedUsername:
 				params['action'] = 'unfollow';
 				params['username'] = recievedUsername;
 				$(this).html('Follow ' + recievedUsername);
 				displayNotification('You\'ve unfollowed ' + recievedUsername);
 				$('#numberOfFollowers').html((parseInt($('#numberOfFollowers').html()) - 1) + ' followers');
 				break;
 			}
 			$.post('FollowServlet', params, function(data){
 				if(data.userStatus == 'Unauthenticated'){
 					window.location.replace('login.html');
 				}
 			});
 		});
 	
 	
 	
 	
 	});
 	