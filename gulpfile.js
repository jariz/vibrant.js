(function() {
  var browserify, coffee, gulp, runSequence, source;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  browserify = require('browserify');

  runSequence = require('run-sequence');

  source = require('vinyl-source-stream');

  gulp.task('coffee', function() {
    gulp.src('*.coffee').pipe(coffee()).pipe(gulp.dest('.'));
    return gulp.src('src/*.coffee').pipe(coffee()).pipe(gulp.dest('src'));
  });

  gulp.task('browserify', function() {
    return browserify({
      entries: 'src/Vibrant.js'
    }).bundle().pipe(source('src/Vibrant.js')).pipe(gulp.dest('dist'));
  });

  gulp.task('scripts', function() {
    return runSequence('coffee', 'browserify');
  });

  gulp.task('watch', function() {
    return gulp.watch(['**/*.coffee'], ['scripts']);
  });

  gulp.task('default', ['scripts']);

}).call(this);
