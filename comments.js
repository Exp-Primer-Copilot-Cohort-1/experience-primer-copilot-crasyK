//Create Web Server 
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        var htmlPath = path.join(__dirname, '/index.html');
        var htmlContent = fs.readFileSync(htmlPath);
        htmlContent = htmlContent.toString('utf8');
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlContent);
    } else if (pathname == '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        var filePath = path.join(__dirname, pathname);
        if (fs.existsSync(filePath)) {
            var fileContent = fs.readFileSync(filePath);
            res.end(fileContent);
        } else {
            res.statusCode = 404;
            res.end('404 Not Found');
        }
    }
});

server.listen(8080, 'localhost');