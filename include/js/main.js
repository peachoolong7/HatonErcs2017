var token = {
  
}

function getAccessToken(){

}

function test(){
  $.ajax({
    url: "http://localhost/PlatformPortal/Buyers/Account/SignIn",
    data: { signature: authHeader },
    type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
    success: function() { console.log('Success!' + authHeader); }
  });
}
