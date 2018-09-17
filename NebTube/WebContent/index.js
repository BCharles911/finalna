	function replaceImage(image) {
		image.src = 'images/profileSilhuete.jpg';
	}
	
	function replaceImage2(image) {
		image.src = 'images/default.png';
	}
	$(document).ready(function(e) {
		
		
		//Praznjenje search boxova
		$('#searchInput').val('');
		$('#searchUserFilter').val('');
		$('#minViewsFilter').val('');
		$('#maxViewsFilter').val('');
		$('#startDateFilter').val('');
		$('#endDateFilter').val('');
		
		//inicijalno sakrivanje filtera:
		$('#filterRow').hide();
		
		//Inicijalizacija datepickera
		var startingDate = $('#startDateFilter').datepicker();
		var endingDate = $('#endDateFilter').datepicker();
	
		var params;
		

		
		
		function initialize(params) {
		
		//Praznjenje prethodno
		$('#firstRow').empty();
		$('#secondRow').empty();
		$('#thirdRow').empty();
		$('#top5Users').empty();
		
		//$('#firstRow').hide();
		//$('#secondRow').hide();
		//$('#thirdRow').hide();
		
		$('#firstRowHeadline').html('Search by name');
		$('#secondRowHeadline').html('Searched by username of video owner');
		$('#thirdRowHeadline').html('Searched by comments content inside videos');

		var korisnikBar = $('#korisnikBar').empty();
		
	
		if(jQuery.isEmptyObject(params)) {
	
			$('#gridHeadline').html(' Browse videos ');
		} else {
			$('#gridHeadline').html(' Search results ');
			$('#gridNote').html('');
			$('#searchAndFilterContainer').hide();
			
		}
		
		
		
		$.get('InitServlet',params,function(data) {
				console.log(data);
			$('.autocomplete').autocomplete({source:data.allUsers});
			
			
			
			
			if(data.initialFill == true) {
				$('#firstRowHeadline').hide();
				$('#secondRowHeadline').hide();
				$('#thirdRowHeadline').hide();
				$('#secondRowContainer').hide();
				$('#thirdRowContainer').hide();
			} else {
				$('#firstRowHeadline').show();
				$('#secondRowHeadline').show();
				$('#thirdRowHeadline').show();
				$('#secondRowContainer').show();
				$('#thirdRowContainer').show();
			}
			
			
	
			
			var usernames = Object.keys(data.top5);
	
			var numOfFollowers = Object.keys(data.top5).map(function(key){
				return data.top5[key];
			});
			
		
			//alert(numOfFollowers);
			for(it in usernames){
				console.log(usernames[it]);
				console.log(numOfFollowers[it]);
				var column = $('<div class="col-md-2" style="margin-right:1em; color:white;"></div>');
				var userImg = $('<a  href="singleUser.html?user='+usernames[it]+'"><img style="border-style:solid;border-color:white;color: black;border-width:1px;border-radius:50%;" onerror="replaceImage(image)" src="images/userImages/'+usernames[it]+'.jpg"></img></a>');
				var userFollowers = $('<p style="text-align:center;margin-left:0.5em; color: white;">'+numOfFollowers[it]+' </br>followers</p>');
		
				column.append(userImg);
				column.append(userFollowers);
				
				$('#top5Users').append(column);
		
			}
				
		
			
			if(data.userStatus == 'Unauthenticated') {
				var signUp = $('<li><a id="navA" href="register.html"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>');
				var signIn = $('<li><a id="navB" href="login.html"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>');
				korisnikBar.append(signUp);
				korisnikBar.append(signIn);
			} else {
				
				
				
	
				
				
				
				var usersEdit = $('<li><a id="editUsers" href="editusers.html"><span class="glyphicon glyphicon-upload"></span> Manage Users</a></li>')
				var myChannel = $('<li><a id="navC" href="singleUser.html?user='+data.loggedInUser+'"><span class="glyphicon glyphicon-user"></span> My channel</a></li>');
				var logOut = $('<li><a  id="navD" href="LogMeOutServlet"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>');
				korisnikBar.append(usersEdit);
				korisnikBar.append(myChannel);
				korisnikBar.append(logOut);
			}
			
			var counter = 0;
		
			if(jQuery.isEmptyObject(data.videos)){
				$('firstRowHeadline').hide();
			}
			if(jQuery.isEmptyObject(data.videosByOwnerQuery)){
				$('secondRowHeadline').hide();
			}
			if(jQuery.isEmptyObject(data.videosByCommentQuery)){
				$('thirdRowHeadline').hide();
			}
			for(var i=0;i<data.videos.length;i++) {
				
				
				var vidsImg = $('<a href="oneVideo.html?id='+data.videos[i].id+'"><img id="'+data.videos[i].id+'" class="VidsPicture" src="'+ data.videos[i].imageURL + '" onerror="replaceImage2(this)" style="width:230px;height: 138px;"></img></img>');
				
				var displayVideoName = data.videos[i].name;
				if(data.videos[i].name.length > 23) {
					displayVideoName = data.videos[i].name.slice(0,23) + '...';
				}
				var vidsName = $('<p id="'+data.videos[i].id+'" class="videoName" style="font-weight: 800; font-size: 12px;" >' + displayVideoName + '</p>');
				var vidsViews = $('<p id="'+data.videos[i].id+'" class="videoViews" style="font-size:10px;">Views '+data.videos[i].views+'  </p>');
				
				var vidsTime = $('<p id="'+data.videos[i].id+'" class="videoCreated" style="font-size:10px;">'+ new Date(data.videos[i].created.monthValue + '/' + data.videos[i].created.dayOfMonth +'/' +data.videos[i].created.year).toDateString() +'</p>');
				var vidsUser = $('<p id="'+data.videos[i].id+'" class="VidsUser">' + data.videos[i].ownerUsername + '</p>');
				
				vidsImg.data('videoID', data.videos[i].id);
				vidsUser.data('ownerUsername', data.videos[i].ownerUsername);
				
		
	 			
				
				
					//console.log('Broj reda: ' + counter);
					//var row = $('<div id="'+counter+'" class="row videoRow" style="margin-bottom:3em;padding-bottom:2em;border-style:none none solid none;border-width:1px;border-color:#f2f2f2;"></div>');
					
					var column = $('<div id="'+i+'" class="col-md-3 videoColumn" style="margin:2em 0 2em 0;background-color:transparent;font-family: \'Poiret One\', cursive; font-weight: 300; letter-spacing: 2px;color: white;"></div>');

					column.append(vidsImg);
					column.append(vidsName);
					column.append(vidsTime);
					column.append(vidsViews);
					column.append(vidsUser);
					
					
					//row.append(column);
					
					$('#firstRow').append(column);
			}

				for(var i=0;i<data.videosByOwnerQuery.length;i++) {
				
				
				var vidsImg = $('<a href="oneVideo.html?id='+data.videosByOwnerQuery[i].id+'"><img id="'+data.videosByOwnerQuery[i].id+'" class="VidsPicture" src="'+ data.videosByOwnerQuery[i].imageURL + '" onerror="replaceImage2(image)" style="width:95%;height: auto; color:white;"></img></a>');
				
				var displayVideoName = data.videosByOwnerQuery[i].name;
				if(data.videosByOwnerQuery[i].name.length > 28) {
					displayVideoName = data.videosByOwnerQuery[i].name.slice(0,23) + '...';
				}
				var vidsName = $('<p id="'+data.videosByOwnerQuery[i].id+'" class="videoName">' + displayVideoName + '</p>');
				var vidsViews = $('<p id="'+data.videosByOwnerQuery[i].id+'" class="videoViews" style="display:inline;font-size:8px;">Views '+data.videosByOwnerQuery[i].views+'  </p>');
				
				var vidsTime = $('<p id="'+data.videosByOwnerQuery[i].id+'" class="videoCreated" style="display:inline;font-size:8px;">'+ new Date(data.videosByOwnerQuery[i].created.monthValue + '/' + data.videosByOwnerQuery[i].created.dayOfMonth +'/' +data.videosByOwnerQuery[i].created.year).toDateString() +'</p>');
				var vidsUser = $('<p id="'+data.videosByOwnerQuery[i].id+'" class="VidsUser">' + data.videosByOwnerQuery[i].ownerUsername + '</p>');
				
				vidsImg.data('videoID', data.videosByOwnerQuery[i].id);
				vidsUser.data('ownerUsername', data.videosByOwnerQuery[i].ownerUsername);
				
				//soloVid.append(vidsImg);

					console.log('Broj reda: ' + counter);
					//var row = $('<div id="'+counter+'" class="row videosByOwnerRow" style="margin-bottom:3em;padding-bottom:2em;border-style:none none solid none;border-width:1px;border-color:#f2f2f2;"></div>');
					
					var column = $('<div class="col-md-3" style=""></div>');

					column.append(vidsImg);
					column.append(vidsName);
					column.append(vidsTime);
					column.append(vidsViews);
					column.append(vidsUser);
					
					
					//row.append(column);
					
					$('#secondRow').append(column);
					

				
			}
			
			for(var i=0;i<data.videosByCommentQuery.length;i++) {
				
				
				var vidsImg = $('<a href="oneVideo.html?id='+data.videosByCommentQuery[i].id+'"><img id="'+data.videosByCommentQuery[i].id+'" class="VidsPicture" src="'+ data.videosByCommentQuery[i].imageURL + '" style="width:95%;height: auto;"></img></a>');
				
				var displayVideoName = data.videosByCommentQuery[i].name;
				if(data.videosByCommentQuery[i].name.length > 23) {
					displayVideoName = data.videosByCommentQuery[i].name.slice(0,23) + '...';
				}
				var vidsName = $('<p id="'+data.videosByCommentQuery[i].id+'" class="videoName">' + displayVideoName + '</p>');
				var vidsViews = $('<p id="'+data.videosByCommentQuery[i].id+'" class="videoViews" style="display:inline;font-size:10px;">Views '+data.videosByCommentQuery[i].views+'  </p>');
				
				var vidsTime = $('<p id="'+data.videosByCommentQuery[i].id+'" class="videoCreated" style="display:inline;font-size:10px;">'+ new Date(data.videosByCommentQuery[i].created.monthValue + '/' + data.videosByCommentQuery[i].created.dayOfMonth +'/' +data.videosByCommentQuery[i].created.year).toDateString() +'</p>');
				var vidsUser = $('<p id="'+data.videosByCommentQuery[i].id+'" class="VidsUser">' + data.videosByCommentQuery[i].ownerUsername + '</p>');
				
				vidsImg.data('videoID', data.videosByCommentQuery[i].id);
				vidsUser.data('ownerUsername', data.videosByCommentQuery[i].ownerUsername);
				
				//soloVid.append(vidsImg);
				

				var column = $('<div class="col-md-3"></div>');
					
				column.append(vidsImg);
				column.append(vidsName);
				column.append(vidsTime);
				column.append(vidsViews);
				
				column.append(vidsUser);
				
					

					
				$('#thirdRow').append(column);
			}
			
			
			
		});
	}
		
		
		
		$(document).on('click', '.VidsPicture', function(e) {
			var id = $(this).data('videoID');
			//umesto href=..
			window.location.replace('oneVideo.html?id='+id+'');
			return;
		});
		
		$(document).on('click', '.VidsUser', function(e){
			var user = $(this).data('ownerUsername');
			window.location.replace('singleUser.html?user='+user+'');
			return;
		});
		
		$(document).on('click', '#showFilters', function(e) {
			$('#filterRow').toggle();
			$('#searchUserFilter').val('');
			$('#startDateFilter').datepicker('setDate', null);
			$('#endDateFilter').datepicker('setDate', null);
			$('#minViewsFilter').val('');
			$('#maxViewsFilter').val('');
			/*for(it in $('#thirdRow').attr('columnValues')){
				console.log
			}*/
			
		});
		
		
		
		
		$(document).on('click', '#searchButton', function(e) {
			var params = getAllParams();
			$('#searchInput').val('');
			initialize(params);
			
			
			

		});
		
		$(document).on('focusout', '#startDateFilter', function(e) {
			var params = getAllParams();
			initialize(params);
			
		});
		
		$(document).on('focusout', '#endDateFilter', function(e) {
			var params = getAllParams();
			initialize(params);
		});
		
		$(document).on('focusout', '#minViewsFilter', function(e) {
			//obradi poruku ako vrednost nije broj (if this != od integera ) itd
			var params = getAllParams();
			console.log(params);
			initialize(params);
		});

		$(document).on('focusout', '#maxViewsFilter', function(e) {
			//obradi poruku ako vrednost nije broj (if this != od integera ) itd
			var params = getAllParams();
			initialize(params);
			
		});
		
		$(document).on('focusout', '#searchUserFilter', function(e) {
			var params = getAllParams();
			initialize(params);
		});
		
		$(document).on('click', '#sortNameAscending', function(e) {
			var params = getAllParams();
			params['sort'] = 'nameAsc';
			initialize(params);

		});
		
		$(document).on('click', '#sortNameDescending', function(e) {
			var params = getAllParams();
			params['sort'] = 'nameDesc';
			initialize(params);
		});
		
		$(document).on('click', '#sortViewsAscending', function(e) {
			var params = getAllParams();
			params['sort'] = 'viewsAsc';
			initialize(params);
		});
		
		$(document).on('click', '#sortViewsDescending', function(e) {
			var params = getAllParams();
			params['sort'] = 'viewsDesc';
			initialize(params);
		});
		
		$(document).on('click', '#sortDateAscending', function(e) {
			var params = getAllParams();
			params['sort'] = 'dateAsc';
			initialize(params);
		});
		
		$(document).on('click', '#sortDateDescending', function(e) {
			var params = getAllParams();
			params['sort'] = 'dateDesc';
			initialize(params);
		});
		
		function getAllParams() {
			var params = {};
			
			//odraditi trimovanje
			var searchedFilter = $('#searchInput').val();
			if(searchedFilter != '') {
				params['searchedVideoFilter'] = searchedFilter;
			};
			
			var searchedUserFilter = $('#searchUserFilter').val();
			if(searchedUserFilter != '') {
				params['searchedByUserFilter'] = searchedUserFilter;
			};
			
			var searchedMinViewsFilter = $('#minViewsFilter').val();
			if(searchedMinViewsFilter != ''){
				params['searchedMinViewsFilter'] = searchedMinViewsFilter;
			};
			
			var searchedMaxViewsFilter = $('#maxViewsFilter').val();
			if(searchedMaxViewsFilter != ''){
				params['searchedMaxViewsFilter'] = searchedMaxViewsFilter;
			};
			
			var startDateFilter = moment($('#startDateFilter').datepicker('getDate')).format('YYYY-MM-DD');
			if(startDateFilter != 'Invalid date') {
				params['searchedStartDateFilter'] = startDateFilter;
			};
			
			var endDateFilter = moment($('#endDateFilter').datepicker('getDate')).format('YYYY-MM-DD');
			if(endDateFilter != 'Invalid date') {
				params['searchedEndDateFilter'] = endDateFilter;
				
			};
			
			
			//params['sort'] = 'none';
			
			
			
			//initialize(params);
			return params;
		}
		
		
		
		
		initialize(params);
		
		
		
		
		$('#jumbobutton').click(function() {
		    $('html,body').animate({
		        scrollTop: $('#firstRow').offset().top},
		        'slow');
		});
		
		$('#searchButton').click(function() {
		    $('html,body').animate({
		        scrollTop: $('#firstRow').offset().top},
		        'slow');
		});
		
		
		
		
		
		
		
		

		
		
		
		
		

});
	