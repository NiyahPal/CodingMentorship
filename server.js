

// init project
var express = require('express');
var app = express();
var TAFFY = require('taffydb').taffy;

var students = TAFFY([
  {"Firstname": "Anaya", "Lastname": "Joynes", "Age": "16", "Username":"abjoynes", "Password": "#Baam3306", 
   "Email":"examplestudent@gmail.com", "Gender":"F", match:""}
]);

var mentors = TAFFY([
  {"Firstname": "Anaya", "Lastname": "Joynes", "Age": "16", "Username":"abjoynes", "Password": "#Baam3306", 
   "Email":"examplestudent@gmail.com", "Gender":"F", match:""}
  ]);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/Login", function (request, response) {
  response.sendFile(__dirname + '/views/Login.html');
});

app.get("/signup", function (request, response) {
  response.sendFile(__dirname + '/views/signup.html');
});

app.get("/chatroom", function (request, response) {
  response.sendFile(__dirname + '/views/chatroom.html');
});
// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body

app.post("/signup", function (request, response) {
  if (request.query.status=0){
    var student = {"Firstname": request.query.first, "Lastname": request.query.last, "Age": request.query.age, "Username": request.query.user, "Password": request.query.password, 
   "Email": request.query.email, "Gender": request.query.gender, match:""}
    students().insert(student)
    if (mentors().filter({match:""}).count() > 0){
      var mentor = mentors().filter({match:""}).first();
      students().delete(student);
      student.match = mentor.username;
      students().insert(student);
      mentors().delete(mentor);
      mentor.match = student.username;
      mentors().insert(mentor);
    
    }
  }
  else {
    mentors.insert({"Firstname": request.query.first, "Lastname": request.query.last, "Age": request.query.age, "Username": request.query.user, "Password": request.query.password, 
   "Email": request.query.email, "Gender": request.query.gender, match:""})
  
    var mentor = {"Firstname": request.query.first, "Lastname": request.query.last, "Age": request.query.age, "Username": request.query.user, "Password": request.query.password, 
   "Email": request.query.email, "Gender": request.query.gender, match:""}
    mentors().insert(mentor)
    if (students().filter({match:""}).count() > 0){
      var student = mentors().filter({match:""}).first();
      students().delete(student);
      student.match = mentor.username;
      students().insert(student);
      mentors().delete(mentor);
      mentor.match = student.username;
      mentors().insert(mentor);
  }
}
});

app.post("/Login", function (request, response) {
  if (students().filter({Username: request.query.user, Password: request.query.pass }).count() > 0 || mentors().filter({Username: request.query.user, Password: request.query.pass }).count()) {
    if (students().filter({Username: request.query.user, Password: request.query.pass }).count() > 0) {
        var matched = students().filter({Username: request.query.user, Password: request.query.pass }).first().match;
        var mentor = mentors().filter({Username: matched}).first();
        response.redirect("/chatroom");
    }
    else {var matched = mentors().filter({username: request.query.user, password: request.query.pass }).first().match;
        var student = students().filter({username: matched}).first();
        response.send(students().stringify());
      
    }
  }else{response.send("Hi")}
    
    
  }

);
  
app.post("/chat", function (request, response){
  var discussion= ["thanks for helping", "hello world","what's up", "bye"]
  var i= Math.floor((Math.random() * 3));
  response.send (discussion[i])
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
