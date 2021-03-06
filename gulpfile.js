const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const csscomb = require('gulp-csscomb');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const bs = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

gulp.task('serv', () => {
  bs.init({
    server: {
      baseDir: './App/'
    }
  });
});

gulp.task('html', () => {
  return gulp
    .src('./dev/*.html')
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'HTML Error',
            message: err.message
          };
        })
      })
    )
    .pipe(gulp.dest('./App/'))
    .pipe(bs.stream());
});

gulp.task('css', () => {
  let processors = [cssnext];

  return gulp
    .src('./dev/css/**/*.css')
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'CSS Error',
            message: err.message
          };
        })
      })
    )
    .pipe(postcss(processors))
    .pipe(csscomb())
    .pipe(gulp.dest('./App/css/'))
    .pipe(bs.stream());
});

gulp.task('js', () => {
  return gulp
    .src('./dev/js/**/*.js')
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'JS Error',
            message: err.message
          };
        })
      })
    )
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest('./App/js/'))
    .pipe(bs.stream());
});

gulp.task('imagemin', () => {
  return gulp
    .src('./dev/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./App/img'));
});

gulp.task('ttf2woff', () => {
  gulp
    .src(['./dev/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('./App/fonts/'));
});

gulp.task('ttf2woff2', () => {
  gulp
    .src(['./dev/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./App/fonts/'));
});

gulp.task('watch', () => {
  gulp.watch('./dev/*.html', ['html']);
  gulp.watch('./dev/css/**/*.css', ['css']);
  gulp.watch('./dev/js/**/*.js', ['js']);
  gulp.watch('./App/img/*', ['imagemin']);
  gulp.watch('./App/fonts/*.ttf', ['ttf2woff']);
  gulp.watch('./App/fonts/*.ttf', ['ttf2woff2']);
});

gulp.task('default', [
  'serv',
  'html',
  'css',
  'js',
  'imagemin',
  'ttf2woff',
  'ttf2woff2',
  'watch'
]);
