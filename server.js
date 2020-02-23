const express = require('express');
const app = express();
const path = require('path');


app.use(express.static('public'))

const Bandwidth = require('node-bandwidth');
var client = new Bandwidth({
	userId    : "u-7imsptfpg3nagvxl5fdvfky", // <-- note, this is not the same as the username you used to login to the portal
	apiToken  : "t-ep3pkbuf4kp7i65ligizjby",
	apiSecret : "pqqflfggm62xbi245zz2xxwdthul36zuygcgo2y"
});

document.getElementById("padRequestButton").addEventListener("click", textAlert());

function textAlert(){
  client.Message.send({
    from : "+19193385629", // This must be a Catapult number on your account
    to   : "+14045104491",
    text : "pee pee poo poo"
  })
  .then(function(message) {
    console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
    console.log(err.message);
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/style.css");
});

app.get('/homeHeader.png', function(req, res) {
  res.sendFile(__dirname + "/public/homeHeader.png");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
