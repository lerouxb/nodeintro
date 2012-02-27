var
    express = require('express'),
    socketio = require('socket.io'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    config = require('./config').config
    app = express.createServer();
    io = socketio.listen(app);

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.get('/config.json', function(req, res) {
    // don't give the game away
    res.send(403);
});

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

var slideNum = 1;

io.sockets.on('connection', function(socket) {
    // tell new people what slide to go to
    socket.emit('slide', {
        slideNum: slideNum
    });

    // change the current slide
    socket.on('slide', function(data) {
        if (data.key == config.key) {
            // but only "if you're logged in"
            slideNum = data.slideNum;
            socket.broadcast.emit('slide', {
                slideNum: data.slideNum
            });
            socket.emit('slide', {
                slideNum: data.slideNum
            });
        } else {
            console.log("invalid key", data.key);
        }
    });
});

app.use(express.static(__dirname));

app.listen(config.port);
console.log("listening on", config.host+':'+config.port);
