
var gulp = require("gulp");
var sass = require("gulp-sass"); //编译sass->css
var cleanCSS = require("gulp-clean-css"); //压缩css
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps"); //压缩时建立map文件

//编译sass
gulp.task("sass",function(){
    return gulp.src("stylesheets/src/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("stylesheets/dest"));
})

/*
//压缩css
gulp.task("cleanCSS",function(){
    return gulp.src("stylesheets/css/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("../maps"))
        .pipe(gulp.dest("stylesheets/dest"));
})
*/

/*
//压缩js
gulp.task("uglify",function(){
    return gulp.src("javascripts/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("../maps"))
        .pipe(gulp.dest("javascripts/dest"))
})
*/

//监视
gulp.task("watch",function(){
	//return gulp.watch(["stylesheets/src/*.scss","javascripts/js/*.js"],["sass","cleanCSS","uglify"]);
    //开发环境
    return gulp.watch(["stylesheets/src/*.scss"],["sass"]);
})

gulp.task("default",["watch"]);
