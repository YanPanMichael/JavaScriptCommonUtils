'use strict';

(function () {
global.CONFIG = require('./config/config');

require('gulp-stats')(require('gulp'));

var gulp = require('gulp'),
    utils = require('./FileUtils/file'),
    gulpUtil = require('gulp-util'),
    // changed = requrie('gulp-changed'),
    fs = require('fs'),
    generateFromTeplate = require('./GenerateUtil/fromTemplate');

if (!fs.existsSync(CONFIG.path.deploy)) {
    console.log("Source folder and files don\'t exist, you can clone it");
    return;
}

gulp.task('copyToDist', function() {
    utils.deleteFolderRecurisve(CONFIG.deploy.dist.to);
    utils.copy(CONFIG.deploy.dist.from + '**/*', CONFIG.deploy.dist.to)
        .on('end', function() {
            gulpUtil.log("Copy completed")
        })
});

gulp.task('readMe', function () {
    return generateFromTeplate('./template/README.md', './', './package.json');
});

gulp.task('default', ['readMe']);
})()

