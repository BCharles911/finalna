	
	$(document).ready(function(e) {
		$('#picker').selectpicker();
		//Inicijalno sakrivanje upozorenja
		$('#videoURLMessage').hide();
		$('#videoNameMessage').hide();
		
		var recievedUsername = window.location.search.split('=')[1];
		//punjenje skrivenog paragrafa za owner username
		$('#ownerUsername').val(recievedUsername);
		
		

		
		function readURL(input) {
			if(input.files && input.files[0]) {
				var reader = new FileReader();
				
				reader.onload = function(e) {
					$('#generatedVideoImage').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(input.files[0]);
			}
		}
		
		
		$(document).on('change', '#videoImage', function(e) {
			readURL(this);
		});
		
		
		
		$(document).on('focusout', $('#videoName'), function(e) {
			var x = $('#videoName').val();
			var y = $('#videoURL').val();
			console.log(x);
			var parameter = {'videoname' : x, 'videoURL' : y};
			$.get('UploadVideoServlet', parameter, function(data){
				console.log(data);
				
				//Obradjivanje oba slucaja, ako postoji naziv videa ili njegov url
				if(data.message == 'video URL already exists' || data.message == 'video name already exists') {
					
					$('#uploadButton').hide();
					$('#buttonLabel').hide();
				} else {
					console.log('Prikazujem dugmic');
					$('#uploadButton').show();
					$('#buttonLabel').show();
				}
				
				if(data.message == 'video name already exists') {
					$('#videoNameMessage').show();
				} else {
					$('#videoNameMessage').hide();

				}
			});
		});
		
		$(document).on('focusout', $('#videoURL'), function(e) {
			var x = $('#videoURL').val();
			var y = $('#videoName').val();
			console.log(x);
			var parameter = {'videoURL' : x, 'videoname' : y};
			$.get('UploadVideoServlet', parameter, function(data){
				console.log(data);
				
				
				if(data.message == 'video URL already exists') {
					$('#videoURLMessage').show();
				}else {
					$('#videoURLMessage').hide();
				}
				
				//Obradjivanje oba slucaja, ako postoji naziv videa ili njegov url
				if(data.message == 'video URL already exists' || data.message == 'video name already exists') {
					
					$('#uploadButton').hide();
					$('#buttonLabel').hide();
				} else {
					console.log('Prikazujem dugmic');
					$('#uploadButton').show();
					$('#buttonLabel').show();
				}
			});
		});
		
		

		
		
		
	});
	