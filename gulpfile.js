var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var html_min = require('gulp-htmlmin');
var sass = require('gulp-sass');
var imgMin = require('gulp-imagemin');
var minCss = require('gulp-clean-css');
var sm = require('gulp-sourcemaps');
var concat = require('concat');
var browser = require('browser-sync');
const source = {
    html: 'app/*.html',
    dist: 'dist/',
    css: 'app/css/style.scss',
    cssDist: 'dist/css/',
    js: ['app/js/*.js', '!app/js/*.min.js'],
    jsDist: 'dist/js/',
    jsLib: 'app/js/*.min.js',
    img: 'app/img/*.*',
    imgDist: 'dist/img/'
};

gulp.task('serve', ['html', 'sass', 'js', 'imageMin'], () => {
    browser({
        server: 'dist/'
    });

    gulp.watch(source.html, ['html']);
    gulp.watch(source.css, ['sass']);
    gulp.watch(source.js, ['js']);
    gulp.watch(source.img, ['imageMin']);

    gulp.watch('gulpfile.js', () => {
        process.exit(1);
    });
});

gulp.task('clean', () => {
    del('dist/*');
});
/////////////////////////////////
gulp.task('html', () => {
    gulp.src(source.html)
        .pipe(html_min({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(source.dist));
    browser.reload();
});

gulp.task('sass', () => {
    gulp.src(source.css)
        .pipe(sm.init())
        .pipe(sass())
        .pipe(minCss())
        .pipe(sm.write())
        .pipe(gulp.dest(source.cssDist));
    browser.reload();
});

gulp.task("js", () => {
    gulp.src(source.js)
        .pipe(uglify())
        .on('error', function (err) {
            console.log(err.cause);
        })
        .pipe(gulp.dest(source.jsDist));

    gulp.src(source.jsLib)
        .pipe(gulp.dest(source.jsDist));
    browser.reload();
});

gulp.task('imageMin', () => {
    gulp.src(source.img)
        .pipe(imgMin())
        .pipe(gulp.dest(source.imgDist));
    browser.reload();
});
/////////////////////////////////

gulp.task('default', ['serve']);
