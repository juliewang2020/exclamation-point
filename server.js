const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  //res.send('Hello from App Engine!');
  res.sendFile(path.join(__dirname + '/home.html'));
  res.sendFile(path.join(__dirname + '/style.css'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
