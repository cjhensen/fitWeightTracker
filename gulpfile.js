// always require gulp first
var gulp = require('gulp');

// server
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

// utilities
var notify = require('gulp-notify');
var del = require('del');
var concat = require('gulp-concat');

// sass
var sass = require('gulp-sass');

// js
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

//var browserify = require('browserify');


// gulp defaults
gulp.task('default', ['connect', 'clean', 'watch'], function() {
	gulp.start('sass', 'html', 'js');
});

// watch livereload
gulp.task('watch', function() {
	gulp.watch('./src/app/sass/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.html', ['html']);
	gulp.watch('./src/app/**/*.js', ['js']);
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

// bundle app js files
gulp.task('js', function() {
	return gulp.src(['./src/app/app.js', './src/app/**/*.js'])
	.pipe(sourcemaps.init())
		.pipe(concat('app.bundle.js'))
		.pipe(ngAnnotate()) // adds angular dependency injection annotations
		.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./dev_build/js'))
	.pipe(notify({ message: 'JS compiled successfully' }));
});


// flush dist folders
gulp.task('clean', function () {
	return del(['dev_build/css']);
});