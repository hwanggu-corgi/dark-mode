const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const rename = require('gulp-rename');

gulp.task('styles', () => {
    return gulp.src('css/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('test.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('clean', () => {
    return del([
        './css/test.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));


// const gulp = require('gulp');
// const gutil = require('gutil');
// const ftp = require('vinyl-ftp');

// var localFiles = ['./assets/**/*'];

// var user = process.env.FTP_USER;
// var password = process.env.FTP_PASSWORD;
// function getFtpConnection(){
//      return ftp.create({
//             host: "capfsc.morwebcms.com",
//             port: 21,
//             user: user,
//             password: password,
//             log: gutil.log
//       });
// }

// const remoteLocation = '/public_html';
// gulp.task('remote-deploy', function(){
//      var conn = getFtpConnection();
//      return gulp.src(localFiles, {base: '.', buffer: false})
//                 .pipe(conn.newer(remoteLocation))
//                 .pipe(conn.dest(remoteLocation))
// })