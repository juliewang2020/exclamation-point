const express = require('express');
const app = express();
const path = require('path');

const BandwidthMessaging = require('@bandwidth/messaging');
BandwidthMessaging.Configuration.basicAuthUserName = "pearlhacks6@bandwidth.com";
BandwidthMessaging.Configuration.basicAuthPassword = "3uWM6xVZqeNCV2Ns";
const messagingController = BandwidthMessaging.APIController;
const applicationId = "";

var body = new BandwidthMessaging.MessageRequest({
    "applicationId" : applicationId ,
    "to"            : ["+16789517861"],
    "from"          : "+19193385629",
    "text"          : "hello"
});

var response = messagingController.createMessage(msgUserId, body);
console.log(response);

app.use(express.static('public'))

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
