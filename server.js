// Configuration for express app

var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/grid');


// Mongoose Schema
var Schema = mongoose.Schema;
var ScoreSchema = new Schema({
  score : Number,
  player : String
},{
  collection : 'score'
});

// Mongoose Model definition

var User = mongoose.model('score', ScoreSchema);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
// server static file
app.use(express.static(path.join(__dirname, 'public')));

app.post('/score', function(req, res) {
  var e = {
    score : parseInt(req.body.score, 10),
    player : req.body.player
  };
console.log(e);
  var userDoc  = new User(e);
  userDoc.save(function(err) {
    if (!err) {
      res.json(userDoc);
    } else {
      res.status(404).send('nothing to see here...');
    }
  });
});

app.put('/score/:id', function(req, res) {
  var e = {
    score : parseInt(req.params.score, 10),
  };

  User.updateById( { id : parseInt(req.params.id, 10) }, e, function(err, score){
    if (!err) {
      res.json(score);
    }
  });
});

app.get('/score', function(req, res){
  User.find(function(err, score){
    if (err){
      res.json({ message : 'no result'});
    }
    res.json(score);
  });
});

app.get('/', function(req, res){
  res.render('index.ejs', {
    message : 'coming from server'
  });
});

module.exports.http = server;
