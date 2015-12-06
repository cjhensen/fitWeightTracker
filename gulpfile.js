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
var minifycss = require('gulp-minify-css');

// js
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');
var order = require('gulp-order');


// gulp defaults
gulp.task('default', ['connect', 'clean', 'watch'], function() {
	gulp.start('sass', 'html', 'vendor', 'js');
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
	.pipe(minifycss())
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
		.pipe(concat('app.bundle.min.js'))
		.pipe(ngAnnotate()) // adds angular dependency injection annotations
		.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./dev_build/js'))
	.pipe(notify({ message: 'JS compiled successfully' }));
});

// vendor files
gulp.task('vendor', function(){  
  return gulp.src(mainBowerFiles({
  	paths: {
  		bowerJson: 'bower.json',
			bowerDirectory: './bower_components'
  	}
  }))
  .pipe(order(["*jquery*", "*angular*", "*bootstrap-sass*"]))
  .pipe(concat('vendor.bundle.min.js'))
  .pipe(uglify().on('error', function(e) {
  	console.log('\x07',e.message); return this.end(); 
  }))
  .pipe(gulp.dest('./dev_build/js'))
  .pipe(notify({ message: 'Vendor JS files compiled successfully' }));
});

// flush dist folders
gulp.task('clean', function () {
	return del(['!dev_build/favicon.ico', 'dev_build/**/*']);
});