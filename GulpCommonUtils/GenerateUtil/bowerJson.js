'use strict';

let path = require('path'),
    fromTemplate = require('./fromTemplate'),
    bower = require('bower'),
    path = require('yargs').argv;

module.exports = function() {
    let task = fromTemplate(path.join(__dirname, '../', 'template', 'bower.json'));
    if(!args.hard) {
        return task;
    }
    return task.on('end', function() {
        return bower({
            cmd: 'update'
        })
    })
}