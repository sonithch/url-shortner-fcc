'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const urlHandler = require('./handlers/urlHandler.js');
// Basic Configuration 
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});

app.get('/api/shorturl/:shortUrl',urlHandler.redirectUrl)

app.post('/api/shorturl/new',urlHandler.addUrl)

app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});
