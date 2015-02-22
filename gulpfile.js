var gulp = require('gulp');
var sass = require('gulp-sass');
var markdown = require('gulp-markdown');
var fileincluder = require('gulp-file-includer');
var cssBase64 = require('gulp-css-base64');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-html-minifier');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('markdown', function () {
  return gulp.src('./src/content/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./src/templates/'));
});
 
gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssBase64({
      extensionsAllowed: ['.svg']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('buildpage', function() {
  gulp.src(['./src/index.html'])
    .pipe(fileincluder())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('serve', ['sass'], function() {
  browserSync({
      server: "./public"
  });

  gulp.watch("./src/sass/*.scss", ['sass']);
  gulp.watch('./src/content/*.md', ['markdown']);
  gulp.watch(['./src/templates/*.html', './src/css/*css'], ['buildpage']);
  gulp.watch("public/*.html").on('change', reload);
});

gulp.task('default', ['serve']);
