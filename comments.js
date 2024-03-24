//Create web server for comment 
// 
// 
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected to the comment database!");
});

var commentSchema = mongoose.Schema({
  name: String,
  comment: String,
  date: Date
});

var Comment = mongoose.model('Comment', commentSchema);

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/comment.html', function (req, res) {
   res.sendFile( __dirname + "/" + "comment.html" );
})

app.get('/getcomment', function (req, res) {
  Comment.find(function (err, comments) {
    if (err) return console.error(err);
    res.send(comments);
  });
})

app.post('/process_post', urlencodedParser, function (req, res) {
  var newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    date: new Date()
  });

  newComment.save(function (err) {
    if (err) return console.error(err);
  });

  res.redirect('/comment.html');
})

app.get('/deletecomment', function (req, res) {
  Comment.remove({}, function (err) {
    if (err) return console.error(err);
  });

  res.redirect('/comment.html');
})

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Comment app listening at http://%s:%s", host, port)
})
// 