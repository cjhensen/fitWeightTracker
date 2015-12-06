var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var browserify = require('browserify');
var del = require('del');
var sass = require('gulp-sass');

// gulp defaults
gulp.task('default', ['connect', 'clean', 'watch'], function() {
	gulp.start('sass', 'html', 'browserify');
});

// watch livereload
gulp.task('watch', function() {
	gulp.watch('./src/app/sass/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.html', ['html']);
	gulp.watch('./src/app/app.js', ['browserify']);
	livereload.listen();
	gulp.watch(['dev_build/**']).on('change', livereload.changed);
});

// connect to web server
gulp.task('connect', function() {
	connect.server({
		root: 'dev_build',
		livereload: true,
		port: 8088
	});
});

// compile css
gulp.task('sass', function() {
	return gulp.src('./src/app/sass/app.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('dev_build/css'))
	.pipe(notify({ message: 'SASS compiled successfully' }));
});

// migrate html
gulp.task('html', function() {
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('dev_build'))
	.pipe(notify({ message: 'HTML moved to dev_build successfully' }));
});

// bundle js (only moves app.js to dev_build right now just to get things up)
gulp.task('browserify', function() {
	return gulp.src('./src/app/app.js')
	.pipe(gulp.dest('dev_build/js'))
	.pipe(notify({ message: 'JS compiled and moved to dev_build successfully' }));
});

// flush dist folders
gulp.task('clean', function () {
	return del(['dev_build/css']);
});