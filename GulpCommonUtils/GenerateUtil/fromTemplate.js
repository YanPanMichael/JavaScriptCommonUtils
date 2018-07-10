'use strict';

let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    gulpIf = require('gulp-if'),
    onError = require('../Error/error');

let options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    partials : {
        footer : '<footer>the end</footer>'
    },
    batch : ['./src/partials'],
    helpers : {
        capitals : function(str){
            return str.toUpperCase();
        }
    }
}

module.exports = function(tpl, dest, data, newName) {
    return gulp.src(tpl)
        .pipe(plumber({onError: onError}))
        .pipe(handlebars(data || require('../package.json', options)))
        .pipe(gulpIf(!!newName, rename(newName)))
        .pipe(gulp.dest(dest || './'));
};