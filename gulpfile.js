var gulp = require('gulp');
var bower = require('bower');
var compass = require('gulp-compass');
var exec = require('child_process').exec;
var imagemin = require('gulp-imagemin');

var tasks = {
	bower: function(cb) {
		var complete = function() {
			cb(null);
		};
		bower.commands.prune()
		.on('error', complete)
		.on('end', function() {
			bower.commands.install()
			.on('error', complete)
			.on('end', complete);
		});
	},
	compass: function() {
		return gulp.src('sass/**/*.scss')
			.pipe(compass({
				config_file: 'config.rb',
				css: 'www/core/css'
			}));
	},
	imagemin: function(cb) {
		return gulp.src('www/core/img/**/*')
			.pipe(imagemin())
			.pipe(gulp.dest('www/build/img'));
	},
	optimize: function(cb) {
		exec('node www/core/lib/r.js/dist/r.js -o build.js', function (error, stdout, stderr) {
			console.log(stdout);
			cb(null);
		});
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
