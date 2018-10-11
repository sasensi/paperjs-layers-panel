var gulp   = require('gulp');
var concat = require('gulp-concat');
var clean  = require('gulp-clean');

// concat angular built files into one file in build folder
gulp.task('package', function ()
{
    return gulp.src([
        './dist/runtime.js',
        './dist/polyfills.js',
        './dist/scripts.js',
        './dist/main.js'
    ])
    .pipe(concat('paperjs-layers-panel.js'))
    .pipe(gulp.dest('./build/'));
});

// remove dist folder
gulp.task('clean', function ()
{
    return gulp.src('./dist', {read: false})
    .pipe(clean());
});
