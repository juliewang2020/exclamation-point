const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
var http = require('http');
// TODO initialize bandwidth API here (including credentials)
const Bandwidth = require('node-bandwidth');
var client = new Bandwidth({
	userId    : "u-7imsptfpg3nagvxl5fdvfky", // <-- note, this is not the same as the username you used to login to the portal
	apiToken  : "t-ep3pkbuf4kp7i65ligizjby",
	apiSecret : "pqqflfggm62xbi245zz2xxwdthul36zuygcgo2y"
});
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'))

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

function textAlert(mes){
  client.Message.send({
    from : "+19193385629", // This must be a Catapult number on your account
    to   : "+14045104491",
    text : mes
  })
  .then(function(message) {
    console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
    console.log(err.message);
  });
  client.Message.send({
    from : "+19193385629", // This must be a Catapult number on your account
    to   : "+14049604404",
    text : mes
  })
  .then(function(message) {
    console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
    console.log(err.message);
  });
  client.Message.send({
    from : "+19193385629", // This must be a Catapult number on your account
    to   : "+17708912523",
    text : mes
  })
  .then(function(message) {
    console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
    console.log(err.message);
  });
  client.Message.send({
    from : "+19193385629", // This must be a Catapult number on your account
    to   : "+16789517861",
    text : mes
  })
  .then(function(message) {
    console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
    console.log(err.message);
  });
}


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/style.css");
});

app.get('/homeHeader.png', function(req, res) {
  res.sendFile(__dirname + "/public/homeHeader.png");
});
var myVar;
app.post('/', function(req, res) {
  console.log(req);
  var name = req.body.name;
  var item = req.body.item;
  var phone = req.body.phone;
  var location = req.body.location;
  var specRequest = req.body.specRequest;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var mes = "Hey Period Pals! " + name + " needs a " + item + "! Please reply with Yes if you'd like to help.";
  if(specRequest==""){
    textAlert(mes);
  }else{
    mes="Hey Period Pals! " + name + " needs a " + item + "! Her special request is: \"" + specRequest + "\". Please reply with \"YES\" if you'd like to help.";
    textAlert(mes)
  }

  console.log("sent message");
  res.sendStatus(200);
  myVar = setTimeout(function() { textCathy(req.body) },30000);
  
});

function textCathy(body){
  client.Message.send({
    from : "+19193385629", // This must be a Catapult number on your account
    to   : "+14049604404",
    text : "Thanks for your help! Your Period Pal is waiting for you at " + body.location + ". https://maps.google.com/?q=" + body.latitude + "," + body.longitude
  })
  .then(function(message) {
    console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
    console.log(err.message);
  });
  client.Message.send({
    from : "+19193385629", // This must be a Catapult number on your account
    to   : "+1" + body.phone,
    text : "Thank you for your request! Your Period Pal Cathy is on the way!"
  })
  .then(function(message) {
    console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
    console.log(err.message);
  });
  clearTimeout(myVar);
}

