'use strict';

const { src, dest, watch, series } = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify-es').default,
    browsersync = require('browser-sync').create();

// SASS //
function task_sass() {
    return src('assets/css/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('assets/css/min'));
};

// JAVASCRIPT //
function task_js() {
    return src('assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('assets/js/min'));
};

// BROWSERSYNC //
function task_browsersync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
};

function task_browsersync_reload(done) {
    browsersync.reload();
    done();
};

// WATCH //
function task_watch() {
    watch('*.html', task_browsersync_reload);
    watch(['assets/css/sass/*.scss', 'assets/js/*.js'], series(task_sass, task_js, task_browsersync_reload));
};

// DEFAULT  //
exports.default = series(
    task_sass,
    task_js,
    task_browsersync,
    task_watch
);