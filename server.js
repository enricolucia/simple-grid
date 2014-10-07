// Configuration for express app

var express = require('express'),
    io = require('socket.io')(http),
    path = require('path'),
    app = express(),
    http = require('http').createServer(app),
    mongoose = require('mongoose'),
    db = mongoose.connection;

mongoose.connect('mongodb://localhost/test');
var schema = mongoose.Schema({
  name : String
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  process.stdout.write('db connection opened!');
});

var Grid = mongoose.model('Grid', schema);

app.set('views', __dirname + '/views/');

// server static file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index.ejs', {
    message : 'coming from server'
  });
});


module.exports.http = http;
