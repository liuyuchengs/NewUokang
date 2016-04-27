/// <reference path="typings/tsd.d.ts" />
var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify-css");

gulp.task("sass",function(){
    gulp.src("public/stylesheets/src/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/stylesheets/dest"));
})
