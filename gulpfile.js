'use strict';

const { src, dest, watch, series } = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

function custom_browsersync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

function custom_browsersync_reload(done) {
    browsersync.reload();
    done();
}

function custom_sass() {
    return src('assets/css/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('assets/css/min'));
}

function custom_js() {
    return src('assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('assets/js/min'));
}

function custom_watch() {
    watch('*.html', custom_browsersync_reload);
    watch('assets/css/sass/*.scss', series(custom_sass, custom_browsersync_reload));
    watch('assets/js/*.js', series(custom_js, custom_browsersync_reload));
}

exports.default = series(
    custom_browsersync,
    custom_sass,
    custom_js,
    custom_watch
);
