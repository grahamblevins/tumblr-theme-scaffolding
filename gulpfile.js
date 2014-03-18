var gulp = require('gulp');
var bower = require('bower');
var compass = require('gulp-compass');
var exec = require('child_process').exec;
var imagemin = require('gulp-imagemin');

gulp.task('bower', function () {

	bower.commands.prune();
	bower.commands.install();

	return gulp;
});

gulp.task('compass', ['bower'], function () {

    gulp.src('sass/**/*.scss')
        .pipe(compass({
        	config_file: 'config.rb',
            css: 'www/core/css'
        }))
        .on('error', function () {});
});

gulp.task('imagemin', ['optimize'], function () {

	gulp.src('www/core/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('www/build/img'));
});

gulp.task('optimize', ['bower', 'compass'], function () {

	exec('node www/core/lib/r.js/dist/r.js -o build.js', function (error, stdout, stderr) {

		console.log(stdout);
	});

	return gulp;
});

gulp.task('default', ['bower', 'compass'], function () {

	gulp.watch('sass/**/*', ['compass']);
});

gulp.task('build', ['bower', 'compass', 'optimize', 'imagemin']);