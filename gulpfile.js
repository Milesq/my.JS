var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var html_min = require('gulp-htmlmin');
var sass = require('gulp-sass');
var imgMin = require('gulp-imagemin');
var minCss = require('gulp-clean-css');
var sm = require('gulp-sourcemaps');
//var concat = require('concat');
var browser = require('browser-sync');
var fs = require('fs');
var x = 'x';
var unload = require('unload');
var babel = require('gulp-babel');
const source = {
    html: 'app/*.html',
    dist: 'dist/',
    css: 'app/css/*.scss',
    cssMain: 'app/css/style.scss',
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
    gulp.src(source.cssMain)
        .pipe(sm.init())
        .pipe(sass())
        .pipe(minCss())
        .pipe(sm.write())
        .pipe(gulp.dest(source.cssDist))
        .pipe(browser.stream());
});

gulp.task("js", () => {
    gulp.src(source.js)
        .pipe(babel({
            presets: ['es2015']
        }))
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

gulp.task('default', ['serve', 'timer']);

gulp.task('minify', ['html', 'sass', 'js', 'imageMin'], () => {
    console.log('Tylko minifikacja.');
    process.exit(1);
});

///////////////////////////////
gulp.task('timer', () => {
    var time = new Date();
    var timeOfCode = [];
    timeOfCode[0] = time.getTime();
    var date = [];
    date[0] = '[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ']>' + time.getDate() + '.' + ((time.getMonth() - 0) + 1) + '.' + time.getFullYear();
    console.log('Praca rozpoczęta: ', date[0]);

    var stop = unload.add(() => {
        var now = new Date();
        date[1] = '[' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ']>' + now.getDate() + '.' + ((now.getMonth() - 0) + 1) + '.' + now.getFullYear();

        timeOfCode[1] = now.getTime();
        timeOfCode = Math.round((timeOfCode[1] - timeOfCode[0]) / 1000);

        function howManyTime(time) {
            let min, minT, hours, sek;
            sek = time % 60;
            minT = (time - sek) / 60;

            min = minT % 60;
            hours = (minT - min) / 60;


            return [hours, min, sek];
        }

        timeOfCode = howManyTime(timeOfCode);
        timeOfCode = timeOfCode[0] + 'H ' + timeOfCode[1] + 'min. ' + timeOfCode[2] + 's';

        date[2] = '////////////////////////////////////////\n' +
            date[0] +
            '\n////////////////////////////////////////\n' +
            date[1] +
            '\nCzas pracy: ' + timeOfCode + '\n\n';

        fs.appendFileSync('logs.md', date[2], 'utf-8', 'a');
        console.log('Koniec pracy: ' + date[1]);
        console.log('Czas pracy: ' + timeOfCode);
    });
});
