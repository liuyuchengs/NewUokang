/// <reference path="typings/tsd.d.ts" />
var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify-css");

gulp.task("sass",function(){
    return gulp.src("stylesheets/src/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("stylesheets/dest"));
})

gulp.task("watch",function(){
	return gulp.watch("stylesheets/src/*.scss",["sass"]);
})

gulp.task("default",["watch"]);
