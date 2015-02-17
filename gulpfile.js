var gulp = require('gulp');
var bower = require('bower');
var compass = require('gulp-compass');
var exec = require('child_process').exec;
var imagemin = require('gulp-imagemin');
var imprt = require('rework-import');
var rework = require('gulp-rework');

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
	},
	rework: function() {
		return gulp.src('www/core/css/theme.css')
			.pipe(rework(imprt()))
			.pipe(gulp.dest('www/core/css'));
	}
};

gulp.task('bower', tasks.bower);
gulp.task('compass', tasks.compass);
gulp.task('imagemin', tasks.imagemin);
gulp.task('optimize', tasks.optimize);
gulp.task('rework', tasks.rework);

gulp.task('build_bower', tasks.bower);
gulp.task('build_compass', ['build_bower'], tasks.compass);
gulp.task('build_rework', ['build_bower', 'build_compass'], tasks.rework);
gulp.task('build_optimize', ['build_bower', 'build_compass', 'build_rework'], tasks.optimize);
gulp.task('build_imagemin', ['build_bower', 'build_compass', 'build_rework', 'build_optimize'], tasks.imagemin);
gulp.task('build', ['build_bower', 'build_compass', 'build_rework', 'build_optimize', 'build_imagemin']);

gulp.task('default', ['build'], function () {
	gulp.watch('sass/**/*', ['compass']);
});
