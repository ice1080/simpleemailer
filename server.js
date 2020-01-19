const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/email', function(req, res) {
  console.log(req.body);
  res.redirect('/');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('simple emailer app is running');
});

