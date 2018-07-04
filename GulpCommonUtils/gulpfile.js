'use strict';

global.CONFIG = require('./config/config');
global.GULPFILEUTIL = require('./file');

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
    copySourcetoTarget(global.CONFIG.deploy.dist.from + '**/*')
})