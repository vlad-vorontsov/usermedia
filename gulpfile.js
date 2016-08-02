var gulp = require('gulp');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('copy', function () {
    gulp.src('bower_components/requirejs/require.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-css', function () {
    gulp.src('test/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    gulp.src('test/js/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(amdOptimize('app', {
            paths: {
                "jquery": "./bower_components/jquery/dist/jquery"
            }
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch('test/js/*.js', ['js']);
    gulp.watch('test/css/*.css');
});

gulp.task('default', ['copy', 'copy-css', 'js', 'watch'], function () {

});



