// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

  
  $('#sign_up_form').submit(function(event) {
    event.preventDefault();
    var user = $('#username').val();
    var first= $('#first_name').val();
    var last = $('#last_name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var age = $('#age').val();
    var gender = $('#gender').val();
    var status = $('#switch').val();
  
    $.post('signup?' + $.param({user: user, first: first, last: last, email: email, password: password, age: age, gender: gender, status: status}), function() {
      $('input').val('');
      $('input').focus();
    });
  });

  
  $('#log_in_form').submit(function(event){ 
  event.preventDefault();
var user = $('#username').val();
var pass = $ ('#password').val();

    
$.post('Login?' + $.param({user:user,pass:pass}), function() {
       location.href = "https://codingmentorship.gomix.me/chatroom"
  
                            });
   });

$('#chat_form').on('click', function(event){ 
  event.preventDefault();
  console.log("hello")

// hey dweebs what's up 
    
$.post('chat', function(result) {
  var text = $ ('#text').val();
  $ ('#chat').append("<p>"+text+ "</p>")
  $ ('#chat').append("<p>"+result+"</p>")
  $('#text').val('');
                            });
   });
