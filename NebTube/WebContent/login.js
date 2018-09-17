	function displayNotification(message) {
		$('#messageNotification').html(message);
		$('#messageDiv').show();
		$('#messageDiv').delay(1700).fadeOut(600);
	}

$(document).ready(function(e) {
	
	$('#submitButton').click(function(e) {
		var username = $('#username');
		var password = $('#password');
	
		params = {'username':username.val(), 'password':password.val()};
		
		$.post('LoginServlet',params, function(data) {
			console.log(data);
			
			
			//dodati paragrafe za failure
			if(data.message == 'success') {
				window.location.replace('index.html');
			}else{
				displayNotification("Pogresni podaci");
				
			}
			
			username.val('');
			password.val('');
		});
		
	});
	
	
	
});
