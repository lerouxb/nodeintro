#!/usr/bin/env node

var
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');
    async = require('async');
    md = require("node-markdown").Markdown,
    config = require('./config').config;

// node should have this builtin
var readText = function(filename, callback) {
    fs.readFile(filename, 'utf8', callback);
};

// we also export build() so that we could use this script as a module
var build = exports.build = function(callback) {
    var filenames = ['template.html', 'slides.md'];
    async.map(filenames, readText, function(err, files) {
        if (err) return callback(err);

        // missing dict(zip(filenames, files))...
        var
            template = files[0],
            slides = md(files[1]);

        // poor man's mustache
        var html = template
            .replace('{{slides}}', slides)
            .replace('{{host}}', config.host)
            .replace('{{port}}', config.port);
        callback(null, html);
    });
};



// this is the node equivalent of if __name__ == "__main__":
if (!module.parent) {
    build(function(err, html) {
        if (err) return console.error(err);

        // not bothering to go async in a shell script
        fs.writeFileSync("index.html", html);
    });
}

