var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    server = require('./server'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    karma = require('gulp-karma'),
    del = require('del'),
    testFiles = 'src/test/*.js',
    port = 8080;


/*LESS TASKS*/

gulp.task('less', ['clean:css'], function() {
  return gulp.src('src/styles/*.less')
  .pipe(less())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9',
      'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('public/assets/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/assets/css'))
  .pipe(notify({ message: 'Styles task complete' }))
  .pipe(livereload());
});

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('browserify', ['clean:js'], function() {
  return browserify('./src/scripts/app.js', { debug : true })
  .bundle()
  .pipe(source('app.js'))
  // Start piping stream to tasks!
  .pipe(buffer())
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(gulp.dest('public/assets/scripts'))
  // sourcemap added
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('public/assets/scripts/min'))
  .pipe(livereload());
});

/*SCRIPTS TASKS*/

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  // sourcemap added
  .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/assets/js'))
  .pipe(notify({ message: 'Scripts task complete' }))
  .pipe(livereload());
});

/*HTML TASKS*/

gulp.task('ejs', [], function(event){
  return gulp.src('views/*.ejs')
  .pipe(gulp.dest('public/'))
  .pipe(notify({ message: 'HTML task complete : ' + event.type}))
  .pipe(livereload());
});

/*WATCH TASKS*/

gulp.task('watch', ['browserify', 'less'], function() {
  gulp.watch('src/scripts/**/*.js', ['browserify']);
  gulp.watch('src/styles/**/*.less', ['less']);
  gulp.watch('views/*.ejs', ['ejs']);
});

// TO BE USED LATER
gulp.task('clean:js', function(cb){
  del(['public/assets/scripts'], cb);
});
gulp.task('clean:css', function(cb){
  del(['public/assets/css'], cb);
});

/*SCRIPT SERVER*/

gulp.task('server', ['watch'], function(){
  server.http.listen(port);
  process.stdout.write('server listening on ' + port + '\n');
});

gulp.task('default', ['server']);
