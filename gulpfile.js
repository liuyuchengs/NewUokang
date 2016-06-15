
var gulp = require("gulp");
var sass = require("gulp-sass"); //编译sass->css
var minify = require("gulp-minify-css"); //压缩css
var uglify = require("gulp-uglify");


gulp.task("sass",function(){
    return gulp.src("stylesheets/src/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("stylesheets/dest"));
})

gulp.task("watch",function(){
	return gulp.watch("stylesheets/src/*.scss",["sass"]);
})

gulp.task("default",["watch"]);
