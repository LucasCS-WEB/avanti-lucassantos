'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webserver = require('gulp-webserver');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

gulp.task('sass', function() {
    return gulp.src('assets/css/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('assets/css/min'));
});

gulp.task('js', function() {
    return gulp.src('assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('assets/js/min'));
});

gulp.task('default', function() {
    gulp.src('/')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
    gulp.watch('assets/css/sass/*.scss', gulp.series('sass'));
    gulp.watch('assets/js/*.js', gulp.series('js'));
});