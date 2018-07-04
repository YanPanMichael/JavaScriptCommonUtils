'use strict';

global.CONFIG = require('./config/config');
global.GULPFILEUTIL = require('./file');
global.onError = require('./error/error');

require('gulp-stats')(require('gulp'));

var gulp = require('gulp'),
    plumber = requrie('gulp-plumer'),
    gulpIf = require('gulp-if'),
    replace = require('gulp-replace'),
    gulpUtil = require('gulp-util'),
    changed = requrie('gulp-changed'),
    fs = require('fs');

if (!fs.existsSync(global.CONFIG.path.deploy)) {
    console.log("Content Static doesn\'t exist, you can clone it");
    return;
}

gulp.task('copyToDist', function() {
    GULPFILEUTIL.deleteFolderRecurisve(global.CONFIG.deploy.dist.to);
    copySourcetoTarget(global.CONFIG.deploy.dist.from + '**/*', global.CONFIG.deploy.dist.to)
        .on('end', function() {
            gulpUtil.log("Copy completed")
        })
});

function copySourcetoTarget(source, target, replaceOpts) {
    return gulp.src(source)
        .pipe(plumber({
            onError: global.onError
        }))
        .pipe(gulpIf(!!replaceOpts, replace.apply(this, Array.prototype.slice.call(arguments, 2))))
        .pipe(gulp.dest(target));
}