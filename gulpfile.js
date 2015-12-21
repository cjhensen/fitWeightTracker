// always require gulp first
var gulp = require('gulp');

// server
var browserSync = require('browser-sync').create();

// utilities
var notify = require('gulp-notify');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// sass
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

// js
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');
var order = require('gulp-order');

// html templates
var templateCache = require('gulp-angular-templatecache');


// gulp defaults
gulp.task('default', [ 'clean', 'serve'], function() {
	gulp.start('sass', 'html', 'vendor', 'js', 'templates', 'images', 'favicon');
});

// browser sync server and watch/live changes
gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './dev_build'
		},
		port: 8088,
		open: false
		//proxy: 'localhost:8088'
	});

	gulp.watch('./src/app/sass/**/*.scss', ['sass']);
	gulp.watch('./src/app/index.html', ['html']);
	gulp.watch('./src/app/images/**', ['images']);
	gulp.watch('./src/app/favicon.ico', ['favicon']);
	gulp.watch('./src/app/templates/**/*.html', ['templates']);
	gulp.watch('./src/app/**/*.js', ['js']);
	gulp.watch('./dev_build/**').on('change', browserSync.reload);

});

// compile css
gulp.task('sass', function() {
	return gulp.src('./src/app/sass/app.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(minifycss())
	.pipe(gulp.dest('dev_build/css'))
	.pipe(browserSync.stream())
	.pipe(notify({ message: 'SASS compiled successfully' }));
});

// migrate html
gulp.task('html', function() {
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('dev_build'))
	.pipe(notify({ message: 'HTML moved to dev_build successfully' }));
});

gulp.task('images', function() {
	return gulp.src('./src/app/images/**')
	.pipe(gulp.dest('dev_build/images'))
	.pipe(notify({ message: 'Images moved to dev_build successfully' }));
});

gulp.task('favicon', function() {
	return gulp.src(['./src/app/icon.png', './src/app/favicon.ico'])
	.pipe(gulp.dest('dev_build'))
	.pipe(notify({ message: 'Favicon moved to dev_build successfully' }));
});

gulp.task('templates', function() {
	return gulp.src('./src/app/templates/**/*.html')
	.pipe(templateCache('templates.bundle.min.js', {
		module: 'templatesCache',
		standalone: true
	}))
	.pipe(gulp.dest('./dev_build/js'))
	.pipe(notify({ message: 'Templates compiled to dev_build successfully' }));
})

// bundle app js files
gulp.task('js', function() {
	return gulp.src(['./src/app/app.js', './src/app/**/*.js'])
	.pipe(sourcemaps.init()) // not needed for production
		.pipe(concat('app.bundle.min.js'))
		.pipe(ngAnnotate()) // adds angular dependency injection annotations
		.pipe(uglify())
	.pipe(sourcemaps.write()) // not needed for production
	.pipe(gulp.dest('./dev_build/js'))
	.pipe(browserSync.stream())
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
  /*.pipe(order([
  	"*jquery*", 
  	"*angular*", 
  	"*bootstrap-sass*",
  	"*angular-ui-router*",
  	"*firebase*",
  	"*angularfire*"
  	]))*/
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