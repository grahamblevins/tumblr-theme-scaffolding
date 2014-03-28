var gulp = require('gulp');
var bower = require('bower');
var compass = require('gulp-compass');
var exec = require('child_process').exec;
var imagemin = require('gulp-imagemin');
var q = require('Q');

var tasks = {
	bower: function() {
		var deferred = q.defer();
		bower.commands.prune();
		bower.commands.install();
		deferred.resolve();
		return deferred.promise;
	},
	compass: function() {
	    return gulp.src('sass/**/*.scss')
	        .pipe(compass({
	        	config_file: 'config.rb',
	            css: 'www/core/css'
	        }))
	        .on('error', function() {});
	},
	imagemin: function() {
		return gulp.src('www/core/img/**/*')
			.pipe(imagemin())
			.pipe(gulp.dest('www/build/img'));
	},
	optimize: function() {
		var deferred = q.defer();
		exec('node www/core/lib/r.js/dist/r.js -o build.js', function (error, stdout, stderr) {
			console.log(stdout);
			deferred.resolve();
		});
		return deferred.promise;
	}
};

gulp.task('bower', tasks.bower);
gulp.task('compass', tasks.compass);
gulp.task('optimize', tasks.optimize);
gulp.task('imagemin', tasks.imagemin);

gulp.task('build-bower', tasks.bower);
gulp.task('build-compass', ['build-bower'], tasks.compass);
gulp.task('build-optimize', ['build-bower', 'build-compass'], tasks.optimize);
gulp.task('build-imagemin', ['build-optimize'], tasks.imagemin);
gulp.task('build', ['build-bower', 'build-compass', 'build-optimize', 'build-imagemin']);

gulp.task('default', ['build-bower', 'build-compass'], function() {
	gulp.watch('sass/**/*', ['compass']);
});
