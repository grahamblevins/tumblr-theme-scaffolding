var gulp = require('gulp');
var bower = require('bower');
var compass = require('gulp-compass');
var exec = require('child_process').exec;
var imagemin = require('gulp-imagemin');

var tasks = {
	bower: function(cb) {
		bower.commands.prune();
		bower.commands.install();
		cb(null);
	},
	compass: function(cb) {
		gulp.src('sass/**/*.scss')
			.pipe(compass({
				config_file: 'config.rb',
					css: 'www/core/css'
			}))
			.on('error', function() {});
		cb(null);
	},
	imagemin: function() {
		return gulp.src('www/core/img/**/*')
			.pipe(imagemin())
			.pipe(gulp.dest('www/build/img'));
	},
	optimize: function(cb) {
		exec('node www/core/lib/r.js/dist/r.js -o build.js', function (error, stdout, stderr) {
			console.log(stdout);
		});
		cb(null);
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
