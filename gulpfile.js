var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var appDir = "app/";
var destDir = "app/dist"

var sources = gulp.src([destDir + "**/*.js"]);

var injectTransform = function (filepath) {
    return "<script type=\"text/javascript\" src=\"" + filepath + "\"></script>";
};

gulp.task('babel', function() {
    gulp.src( appDir + 'js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(destDir))
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(appDir + 'js/**/*.js', ['compile']).on('change', browserSync.reload);
    gulp.watch(appDir + 'index.html', ['inject']).on('change', browserSync.reload);
    gulp.watch('gulpfile.js', ['compile', 'inject']);
});

gulp.task('inject', function () {
    return gulp.src(appDir + 'index.html')
        .pipe(inject(sources, {relative: true, transform: injectTransform}))
        .pipe(gulp.dest(appDir));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ['', appDir],
      index: "index.html"
    },
  })
});

gulp.task('compile', function() {
  gulp.src(appDir +  'js/**/*.js')
  	.pipe(babel({
            presets: ['es2015']
   	}))
    .pipe(uglify())
    .pipe(concat('term.min.js'))
    .pipe(gulp.dest(destDir))
});

gulp.task('serve', function () {
    runSequence('install', serve);
});

gulp.task('default', ['compile', 'watch', 'inject']);

