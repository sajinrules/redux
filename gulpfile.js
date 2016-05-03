const gulp = require('gulp');
const babel = require('gulp-babel');
const reactify = require('reactify');
//const browserify = require('browserify');
//const source = require('vinyl-source-stream');

/*gulp.task('es6',() =>{
	return gulp.src('./index.js')
			.transform('reactify')
			.pipe(babel({
				presets:['es2015']
			}))
			.pipe(gulp.dest('build'));
});*/



/*gulp.task('react', function () {
  browserify('./index.js')
    .transform(babel, {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist/js/'));
});*/

var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var browserSync = require("browser-sync").create();
var reload      = browserSync.reload;

gulp.task('babelify', function() {
	browserify({ entries: './index.js', debug: true })
		.transform(babelify,{presets: ["es2015", "react"]})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('copy',function(){
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist/'));
        
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['babelify','copy'], reload());


gulp.task('serve', ['babelify','copy'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    //gulp.watch("./**/.*", ['js-watch']);
    //gulp.watch("*.html").on("change", browserSync.reload);
});