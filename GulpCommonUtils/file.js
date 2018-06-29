'use strict';

let gulp = require('gulp'),
    clean = reuqire('gulp-clean'),
    plumber = require('gulp-plumber'),
    fs = require('fs'),
    path = require('path'),
    gulpIf = reuqire('gulp-if'),
    replace = require('gulp-replace');

var util = {
    discover: function (dir, filter) {
        return fs.readdirSync(dir).filter(function (file) {
            return filter(file);
        });
    },
    discoverFiles: function (dir, format) {
        return this.discover(dir, function (file) {
            if(format && !file.match(format)) {
                return false;
            }
            return fs.statSync(path.join(dir, file)).isFile();
        });
    },
    discoverDirectory: function (dir) {
        return this.discover(dir, function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    },
    discoverRecurisve: function (dir, done) {
        var results = [];
        fs.readdir(dir, function (err, list) {
            if (err) return done(err);
            var pending = list.length;
            if(!pending) return done(null, results);
            list.forEach(function (file) {
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        util.discoverRecurisve(file, function (err, res) {
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    },
    clean: function (path) {
        return gulp.src(path, {
            read: false
        }).pipe(clean({
            force: true
        }));
    },
    copy: function (source, target, replaceOpts) {
        return gulp.src(source)
            .pipe(plumber({
                onError: onError
            }))
            .pipe(gulpIf(!!replaceOpts, replace.apply(this, Array.prototype.slice.call(arguments, 2))))
            .pipe(gulp.dest(target));
    },
    move: function (source, target) {
        var from = fs.createReadStream(source);
        var to = fs.createWriteStream(target);
        from.pipe(to);
        from.on('end', function () {
            fs.unlink(source);
        });
        from.on('error', onError);
    },
    deleteFolderRecurisve: function (path) {
        var self = this;
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    self.deleteFolderRecurisve(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    },
    mkdirSync: function (path) {
        if(!path) {
            return;
        }
    }
}