var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var server = require('gulp-server-livereload');

gulp.task('bundle', ['copy'], function () {
  return browserify({
    entries: 'app/router.jsx',
    extensions: ['.jsx'],
    debug: true
  })
    .transform(babelify.configure({
      presets: ["es2015", "react","stage-0"],
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('buildApp'));
});

gulp.task('copy', function () {
  gulp.src('app/public/**/*')
    .pipe(gulp.dest('buildApp'));
});

gulp.task('build', ['copy', 'bundle'], function () {

});

gulp.task('watch', ['build'], function () {
  gulp.watch('app/**/*.jsx', ['bundle']);
});

gulp.task('default', ['webserver']);

gulp.task('webserver', function() {
  gulp.src('buildApp')
    .pipe(server({
      port: 9000
    }));
});
