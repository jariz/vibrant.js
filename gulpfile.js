(function() {
  var browserify, closureCompiler, coffee, del, gulp, runSequence, source;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  browserify = require('browserify');

  runSequence = require('run-sequence');

  source = require('vinyl-source-stream');

  del = require('del');

  closureCompiler = require('gulp-closure-compiler');

  gulp.task('coffee', function() {
    gulp.src('*.coffee').pipe(coffee()).pipe(gulp.dest('.'));
    return gulp.src('src/*.coffee').pipe(coffee()).pipe(gulp.dest('src'));
  });

  gulp.task('browserify', function() {
    return browserify({
      entries: 'src/Vibrant.js'
    }).bundle().pipe(source('Vibrant.js')).pipe(gulp.dest('dist'));
  });

  gulp.task('default', function() {
    return runSequence('coffee', 'browserify', 'cleanup', 'closure');
  });

  gulp.task('cleanup', function(cb) {
    return del(['src/Vibrant.js'], cb);
  });

  gulp.task('closure', function() {
    return gulp.src('dist/Vibrant.js').pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
      fileName: 'Vibrant.min.js',
      continueWithWarnings: true
    })).pipe(gulp.dest('dist'));
  });

  gulp.task('watch', function() {
    return gulp.watch(['**/*.coffee'], ['default']);
  });

}).call(this);
