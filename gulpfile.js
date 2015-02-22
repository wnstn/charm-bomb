var gulp = require('gulp');
var sass = require('gulp-sass');
var markdown = require('gulp-markdown');
var fileincluder = require('gulp-file-includer');
inline_base64 = require('gulp-inline-base64');

gulp.task('markdown', function () {
  return gulp.src('./src/content/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./src/templates/'));
});
 
gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(inline_base64({
        baseDir: 'path_src',
        debug: true
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('fileincluder', function() {
  gulp.src(['./src/index.html'])
    .pipe(fileincluder())
    .pipe(gulp.dest('./public/'));
});

gulp.task('automate', function(){
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./src/content/*.md', ['markdown', 'buildBody']);
  gulp.watch('./src/templates/*.html', ['fileincluder']);
})

gulp.task('default', ['markdown', 'sass','fileincluder']);
