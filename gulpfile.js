'use strict';

const { src, dest, watch, series } = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

function task_browsersync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

function task_browsersync_reload(done) {
    browsersync.reload();
    done();
}

function task_sass() {
    return src('assets/css/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('assets/css/min'));
}

function task_js() {
    return src('assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('assets/js/min'));
}

function task_watch() {
    watch('*.html', task_browsersync_reload);
    watch(['assets/css/sass/*.scss', 'assets/js/*.js'], series(task_sass, task_js, task_browsersync_reload));
}

exports.default = series(
    task_browsersync,
    task_sass,
    task_js,
    task_watch
);
