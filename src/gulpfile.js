const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');

const handle_error = notify.onError({
    title: "Oops!",
    message: "<%= error.message %>",
});
const plumber_notifier = ()=>
    plumber({ errorHandler: handle_error });

function compile(watch) {
  var bundler = watchify(browserify(
    { entries: ['./assets/app.jsx'], debug: true, extensions: ['.js', '.jsx'] }
  ).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function (err) { 
        console.error(err); 
        this.emit('end'); 
       })
      .pipe(source('app.js')) 
      .pipe(buffer())
      .pipe(gulp.dest('./public/js'))
      .pipe(rename('app.min.js'))
      .pipe(uglify()) 
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/js'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task('watch', function () { return watch(); });

gulp.task('sass', [],  function () {
    return gulp.src('./assets/sass/**/*.s[ac]ss')
        .pipe(plumber_notifier())
        .pipe(rename('ml_mvp.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
    ;
});

gulp.task('default', [
    'watch',
    'sass'
], function () {
    gulp.watch('./assets/sass/**/*.s[ac]ss', [ 'sass' ]);
});
