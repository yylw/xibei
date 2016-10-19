var gulp=require("gulp");
var less = require('gulp-less');
var browsersync= require('browser-sync').create();
var reload = browsersync.reload;
var sourcemaps=require("gulp-sourcemaps");
var minCss=require("gulp-clean-css");
var rjs=require("gulp-requirejs");
var uglify=require("gulp-uglify");
var rename=require("gulp-rename");

gulp.task('start',['less'],function() {
    browsersync.init({
        server:{baseDir:'./'},
        startPath:'src/html/combo.html'
    });
    gulp.watch('src/less/*.less',['less']);
    gulp.watch('src/html/*.html').on('change',reload);
    gulp.watch('src/js/*.js').on('change',reload);
    gulp.watch('src/img/*.jpg').on('change',reload);
});

gulp.task('less',function(){
    gulp.src('src/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream:true}))
});
/*gulp.task("testcss",function(){
    gulp.src("src/css/main.css")
        .pipe(gulp.dest('test/css'))
})
gulp.task("testjs",function(){
    rjs({
        baseUrl:"./src",
        name:"lib/almond",
        include:['main'],
        out:"main.min.js",
        paths:{
            'jquery':'lib/jquery',
            'fifty':'js/fifty',
            'combo':'js/combo',
            'restaurant':'js/restaurant',
            'message':'js/message',
            'detail':'js/detail'
        }
    })
        .pipe(gulp.dest('test/js'))
})
gulp.task('mincss',function(){
    gulp.src("src/css/main.css")
        .pipe(minCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'))
})
gulp.task("buildjs",function(){
    rjs({
        baseUrl:"./src",
        name:"lib/almond",
        include:['main'],
        out:"main.min.js",
        paths:{
            'jquery':'lib/jquery',
            'fifty':'js/fifty',
            'combo':'js/combo',
            'restaurant':'js/restaurant',
            'message':'js/message',
            'detail':'js/detail'
        }
    })
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})
gulp.task('build',['buildjs','mincss']);*/


