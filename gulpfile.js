var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
const notifier = require('node-notifier');


gulp.task('dev', ['sass:development', 'watch:development', 'browser-sync']);
gulp.task('default', ['dev']);
gulp.task('prod', ['sass:production', 'uglify:production']);

// browser sync
gulp.task('browser-sync', function() {

    var file_path = __dirname;
    var explode = file_path.split('htdocs');

    browserSync.init({
        proxy: "localhost"+explode[1]+'/web'
    });

});

// watch file changes
gulp.task('watch:development', function() {
  gulp.watch('web/static/styles/**/*.scss', ['sass:development']);
  gulp.watch("templates/**/*.twig").on('change', browserSync.reload);
});


// compile scss
gulp.task('sass:development', function() {
  gulp.src('web/static/styles/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .on('error', swallowError)
  .pipe(concat('main.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('web/static'))
  .pipe(browserSync.stream());
});


// concat and minify JS
gulp.task('uglify:production', function() {
  return gulp.src([
    'web/static/js/main.js',
    // file paths here..
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write())
  .pipe(uglify())
  .on('error', swallowError)
  .pipe(gulp.dest('web/static'));
});


// concat and minify CSS
gulp.task('sass:production', function() {
  gulp.src([
    'web/static/main.css',
    // file paths here...
  ])
  .pipe(sass())
  .on('error', swallowError) 
  .pipe(concat('main.min.css'))
  .pipe(autoprefixer())
  .pipe(cleanCSS())
  .pipe(gulp.dest('web/static'))
});


// handle errors
function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
  notifier.notify({
    title: 'gulp css error',
    message: error.relativePath + ' line '+ error.line,
    sound: false,
  });
}
