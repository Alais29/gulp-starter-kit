const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      changed = require('gulp-changed'),
      uglify = require('gulp-uglify'),
      lineec = require('gulp-line-ending-corrector'),
      pug = require('gulp-pug'),
      babel = require('gulp-babel');

const root = '../',
      scss = root + 'src/sass/',
      js = root + 'src/js/',
      jsdist = root + 'dist/assets/js/',
      cssdist = root + 'dist/assets/css/';

const imgSRC = root + 'src/images/**/*',
      imgDEST = root + 'dist/assets/images';

const styleWatchFiles = root + 'src/**/*.scss',
      pugWatchFiles = root + 'src/**/*.pug';

const jsSRC = [js + 'main.js'];

function html() {
  return gulp.src(root + 'src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(root + 'dist'))
}

function css() {
  return gulp.src([scss + 'style.scss'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest(cssdist));
}

function concatCSS() {
  return gulp.src([root + 'dist/assets/css/style.css'])
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(lineec())
    .pipe(gulp.dest(cssdist));
}

function javascript() {
  return gulp.src(jsSRC)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    // .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsdist));
}

function imageminFn() {
  return gulp.src(imgSRC)
    .pipe(changed(imgDEST))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
    ]))
    .pipe(gulp.dest(imgDEST));
}

function watch() {
  browserSync.init({
    open: 'external',
    browser: "chrome",
    server: {
      baseDir: '../dist'
    }
  });
  gulp.watch(styleWatchFiles, gulp.series(css, concatCSS));
  gulp.watch(jsSRC, javascript);
  gulp.watch(imgSRC, imageminFn);
  gulp.watch(pugWatchFiles, html);
  gulp.watch([pugWatchFiles, jsdist + 'script.js', cssdist + 'style.css']).on('change', reload);
}

exports.html = html;
exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.imageminFn = imageminFn;
exports.watch = watch;

exports.default = gulp.parallel(html, gulp.series(css, concatCSS), javascript, imageminFn, watch);