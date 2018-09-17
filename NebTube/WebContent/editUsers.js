	function replaceImage2(image) {
		image.src = 'images/default.png';
	}	

$(document).ready(function(e) {
		
		
		function initialize(params) {
		
		
		$.get('InitServlet',params,function(data) {
			console.log(data.allUsersForEdit.username);
		
			
			
			for(var i=0;i<data.allUsersForEdit.length;i++) {
				
				
				var vidsImg = $('<a href="singleUser.html?user='+data.allUsersForEdit[i].username+'"><img id="'+data.allUsersForEdit[i].username+'" class="VidsPicture" src="'+ data.allUsersForEdit[i].profilePicture + '" onerror="replaceImage2(this)" style="width:230px;height: 138px;"></img></img>');
				
				var displayVideoName = data.allUsersForEdit[i].name;
				if(data.allUsersForEdit[i].name.length > 23) {
					displayVideoName = data.allUsersForEdit[i].name.slice(0,23) + '...';
				}
				var vidsName = $('<p id="'+data.allUsersForEdit[i].username+'" class="videoName" style="font-weight: 800; font-size: 12px;" >' + displayVideoName + '</p>');				
				var vidsTime = $('<p id="'+data.allUsersForEdit[i].username+'" class="videoCreated" style="font-size:10px;">'+ new Date(data.allUsersForEdit[i].created.monthValue + '/' + data.allUsersForEdit[i].created.dayOfMonth +'/' +data.allUsersForEdit[i].created.year).toDateString() +'</p>');
				
				
				vidsImg.data('username', data.allUsersForEdit[i].username);
				//vidsUser.data('ownerUsername', data.videos[i].ownerUsername);
				
		
	 			
				
				
					//console.log('Broj reda: ' + counter);
					//var row = $('<div id="'+counter+'" class="row videoRow" style="margin-bottom:3em;padding-bottom:2em;border-style:none none solid none;border-width:1px;border-color:#f2f2f2;"></div>');
					
					var column = $('<div id="'+i+'" class="col-md-3 videoColumn" style="margin:2em 0 2em 0;background-color:transparent;font-family: \'Poiret One\', cursive; font-weight: 300; letter-spacing: 2px;color: white;"></div>');

					column.append(vidsImg);
					column.append(vidsName);
					column.append(vidsTime);
					
				
					$('#firstRowUser').append(column);
			}
		
		})
		}
		
	})