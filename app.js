'use strict';
const PORT = process.env.PORT || 4321;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
  var indexPath = path.join(__dirname, 'index.html');

  res.sendFile(indexPath);
});

app.use('/destinations', require('./routes/destinations'));
//the only line that points to –our– code. everything else points to
//already written modules.

var server = http.createServer(app);
server.listen(PORT, function(){
  console.log(`Server listening on port ${PORT}`);
});
