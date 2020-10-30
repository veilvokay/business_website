const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
// import gulp from 'gulp';



const path = {
    src: {
        html: 'app/index.html',
        styles: [
            'app/styles/sass/main.scss',
            'app/styles/css/*.css'
        ],
        js: [
            'app/js/scripts.js'
        ],
        images: 'app/img/**/*'
    },
    build: {
        html: 'build/',
        styles: 'build/styles/css/',
        js: 'build/js/',
        images: 'build/images/'
    }
};

function style() {
    return gulp.src('./app/styles/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/styles/css'))
    .pipe(browserSync.stream());
};

function css() {
    return gulp.src('./app/styles/css/*.css')
    .pipe(minifyCss())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(path.build.styles))
    .pipe(reload({stream: true}))
};

function html() {
    return gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}))
};

function watch() {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
    gulp.watch('./app/styles/**/*.scss', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
// exports.js = js;
exports.css = css;
exports.html = html;
// exports.fonts = fonts;
// exports.img = img;
