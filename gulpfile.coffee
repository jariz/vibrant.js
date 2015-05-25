gulp = require 'gulp'
coffee = require 'gulp-coffee'
browserify = require 'browserify'
runSequence = require 'run-sequence'
source = require 'vinyl-source-stream'

gulp.task 'coffee', ->
  gulp.src('*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('.'))

  gulp.src('src/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('src'))

gulp.task 'browserify', ->
  browserify(
    entries: 'src/Vibrant.js'
  )
    .bundle()
    .pipe(source('src/Vibrant.js'))
    .pipe(gulp.dest('dist'))

gulp.task 'scripts', ->
  runSequence('coffee', 'browserify')

gulp.task 'watch', ->
  gulp.watch ['**/*.coffee'], ['scripts']

gulp.task 'default', [
  'scripts'
]