'use strict';

let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    handlebars = require('gulp-comile-handlebars'),
    rename = require('gulp-rename'),
    gulpIf = require('gulp-if'),
    onError = require('../Error/error');

module.exports = function(tpl, dest, data, newName) {
    return gulp.src(tpl)
        .pipe(plumber({onError: onError}))
        .pipe(handlebars(data || require('../package.json')))
        .pipe(gulpIf(!!newName, rename(newName)))
        .pipe(gulp.dest(dest || './'));
};