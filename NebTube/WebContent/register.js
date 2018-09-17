	function displayNotification(message) {
			$('#messageNotification').html(message);
			$('#messageDiv').show();
			$('#messageDiv').delay(1200).fadeOut(1200);
		}

	$(document).ready(function(e) {
		var name = $('#name');
		var lastname =$('#lastname');
		var username = $('#username');
		var password = $('#password');
		var email = $('#email');
		
		
		
		
		$('#messageDiv').hide();
		
		$('#submitButton').click(function(e) {
			//console.log(params);
			var params = {'name':$.trim(name.val()),'lastname':$.trim(lastname.val()),'username':$.trim(username.val()),'password':$.trim(password.val()),'email':$.trim(email.val())};
			$.post('RegisterServlet',params, function(data) {
				console.log(data);
				
				if(data.message == 'failed') {
					displayNotification('Registration failed.Try again.');
					username.val('');
					return;
				}
				
				if(data.message == 'usernameFail'){
					displayNotification('username already exists!');
					username.val('');
					return;
				}
				
				
				if(data.message == 'success'){
					displayNotification('Success!');
					setTimeout(function(e){
						window.location.replace('login.html');
					}, 1500);
				}
				
				return;
			})
			
			
			
		})
		
	
		


	
		
		
		


		
		
		
		
		
	

/*	
	var name = $('#name');
	var lastname =$('#lastname');
	var username = $('#username');
	var password = $('#password');
	var email = $('#email');
	
	
	
	
	
	
	
	
	
	$('#messageDiv').hide();
	
	$('#submitButton').click(function(e) {
		//console.log(params);
		var params = {'name':$.trim(name.val()),'lastname':$.trim(lastname.val()),'username':$.trim(username.val()),'password':$.trim(password.val()),'email':$.trim(email.val())};
		$.post('RegisterServlet',params, function(data) {
			console.log(data);
			
			if(data.message == 'failed') {
				displayNotification('Registration failed.Try again.');
				
			}
			
			if(data.message == 'success'){
				displayNotification('Success!');
				setTimeout(function(e){
					window.location.replace('./login.html');
				}, 1500);
			}
			
			return;	
	
		})
		
	})

*/
});

