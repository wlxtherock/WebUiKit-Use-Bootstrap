var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean  = require('gulp-clean');
var browserSync = require("browser-sync").create();

gulp.task('clean',function(){
    gulp.src(['dist/css/*','dist/js/*'],{read:false})
        .pipe(clean());
});

gulp.task('bootstrap',['clean'], function ( done ) {
    gulp.src('./assets/fonts/bootstrap/*')
        .pipe(gulp.dest('./dist/fonts/bootstrap'));

    gulp.src('./assets/javascripts/bootstrap.js')
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/js'));

    gulp.src('./assets/stylesheets/bootstrap.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
        .on('end',done);
});

gulp.task('serve', ['bootstrap'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./assets/stylesheets/**/*.scss", ['bootstrap']);
    gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('default',['serve']);

/*
var gulp = require('gulp');
gulpif = require('gulp-if');
sass = require('gulp-sass');
concat = require('gulp-concat');
rename = require('gulp-rename');
cssmin = require('gulp-cssmin');
uglify = require('gulp-uglify');
clean  = require('gulp-clean');

gulp.task('clean',function(){
    gulp.src(['dist/css/*','dist/js/*'],{read:false})
        .pipe(clean());
});


//将bower的库文件对应到指定位置
gulp.task('bowerCopy', function() {
    //fonts
    gulp.src('bower_components/bootstrap/fonts/**')
        .pipe(gulp.dest('vender/fonts'));
    //js
    gulp.src('bower_components/jquery/dist/jquery.mim.js')
        .pipe(gulp.dest('vender/js'));
    gulp.src('bower_components/jquery/dist/jquery.mim.map')
        .pipe(gulp.dest('vender/js'));

    gulp.src('bower_components/angular/angular.min.js')
        .pipe(gulp.dest('vender/js'));
    gulp.src('bower_components/angular/angular.min.js.map')
        .pipe(gulp.dest('vender/js'));
    gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('vender/js'));

    //css
    gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('vender/css'));
    gulp.src('bower_components/bootstrap/dist/css/bootstrap-theme.min.css')
        .pipe(gulp.dest('vender/css'));
    gulp.src('bower_components/sui/dist/css/sui.min.css')
        .pipe(gulp.dest('vender/css'));
});

//Compile SASS
gulp.task('sass-complie', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
//转移js
gulp.task('src-move',function(){
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

// //合并js文件
// gulp.task('scripts-concat',function(){
//    gulp.src('src/js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('dist/js'))
// });

//压缩css文件
gulp.task('css-min',function(){
    gulp.src('dist/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/css'));
});


//压缩js文件
gulp.task('js-min',function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['bowerCopy','sass-complie','src-move']);*/