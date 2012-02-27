var
    express = require('express'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');


app = express.createServer();

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.get('/config.json', function(req, res) {
    res.send(403);
});

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

app.use(express.static(__dirname));

app.listen(4000);
console.log("listening on", 4000);
