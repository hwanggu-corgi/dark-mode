const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const rename = require('gulp-rename');

gulp.task('styles', () => {
    return gulp.src('css/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('override.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('clean', () => {
    return del([
        './css/override.css',
    ]);
});

/*REMOTE DEPLOY*/

// const gulp = require('gulp');
const gutil = require('gutil');
const ftp = require('vinyl-ftp');

function getFtpConnection(user, password){
     return ftp.create({
            host: "capfsc.morwebcms.com",
            port: 21,
            user: user,
            password: password,
            log: gutil.log,
            secure:   true,
            secureOptions: {
              rejectUnauthorized: false
            }
      });
}

gulp.task('remote-deploy', function(){
  const localFiles = ['./css/test.css'];
  const user = process.env.FTP_USER;
  const password = process.env.FTP_PWD;
  const remoteLocation = '/public_html';
  const conn = getFtpConnection(user, password);
  return gulp.src(localFiles, {base: '.', buffer: false})
            .pipe(conn.newer(remoteLocation))
            .pipe(conn.dest(remoteLocation))
})

gulp.task('watch', () => {
  gulp.watch('./css/sass/**/*.scss', (done) => {
    gulp.series(['clean', 'styles', 'remote-deploy'])(done);
  });
});

gulp.task('default', gulp.series('watch'));