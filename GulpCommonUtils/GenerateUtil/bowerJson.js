let path = require('path'),
    fromTemplate = require('./fromTemplate'),
    bower = require('bower'),
    path = require('yargs').argv;

module.exports = function() {
    let task = fromTemplate();
    if(!args.hard) {
        return task;
    }
    return task.on('end', function() {
        return bower({
            cmd: 'update'
        })
    })
}