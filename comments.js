// Create Web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/comments');

var commentSchema = new Schema({
    name: String,
    comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
    Comment.find({}, function(err, comments) {
        res.send(comments);
    });
});

app.post('/comments', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) throw err;
        res.send('Success');
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
```

```html
<!-- Path: index.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>Comment Box</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <h1>Comment Box</h1>
            <div class="row">
                <div class="col-md-6">
                    <form id="commentForm">
                        <div class="form-group