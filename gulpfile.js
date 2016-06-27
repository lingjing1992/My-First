/*
 * @Author: huoqishi
 * @Date:   2016-06-26 09:20:21
 * @Last Modified by:   huoqishi
 * @Last Modified time: 2016-06-26 10:36:03
 */

'use strict';

// 引入gulp;全局安装的gulp是工具,
// 引入的是包
var gulp =  require('gulp');

// 引入一个包，用来进行html压缩
// 这个包也必需进行安装:通过npm 安装进来
// 命令: npm install gulp-htmlmin --save-dev
var htmlmin = require('gulp-htmlmin');

// 引入一个包，用于js的合并
var concat = require('gulp-concat');

// 引入一个包，用于js的压缩
var uglify = require('gulp-uglify');

// 引入一个包，用于css的压缩
var cssnano = require('gulp-cssnano');

// 引入browser-sync 来实现自动刷新
var browserSync = require('browser-sync');

/*
 * 1.html压缩
 * 2.js 压缩，合并
 * 3.css 压缩 ，合并
 */

// 1.对html进行压缩
// 创建一个任务来进行html压缩
// 第一个参数
// 第二个参数是一个回调函数
gulp.task('html',function(){
    // 当我们执行这个任务的时候会自动执行这个函数
    // 匹配出我们想要在这个任务中进行处理的文件
    // 可以传入一个字符串
    // gulp.src("src/*.html")
    // 如果写字符串参数不能够匹配所有相要处理的文件
    // 可以传入一个数组
    gulp.src(["src/*.html"])// 数据中的每一个元素都会进行匹配
        .pipe(htmlmin(
            {collapseWhitespace:true} // 为true时表示会去除html中的空白符.
        )) // 这里是对html进行压缩的功能
        .pipe(gulp.dest('dist')) // 这一句是指定一下最终代码需要发布到的位置
        // 通知browser-sync,该刷新页面了：
        .pipe(browserSync.reload({
            stream:true// 为true时就会通知浏览器刷新页面
        }))
})

// 2. 对js进行处理: 压缩和合并
// 创建一个任务来进行js的压缩与合并
gulp.task('script',function(){
    // 写执行的代码
    gulp.src(["src/js/1.js","src/js/index.js"])// 匹配出我们想要处理的js文件，使用*.js匹配全部的js文件
        //合并匹配出的所有js文件，注意：需要传递一个参数，这个参数是合并之后文件的文件名
        .pipe(concat("all.js"))
        .pipe(uglify()) // 这里就是对js文件进行压缩
        .pipe(gulp.dest('dist/js')) // 这里是指定最终代码需要发布到的位置
        .pipe(browserSync.reload({
            stream:true
        }))
});

// 3. 对css进行压缩与合并
// 创建一个任务来进行css的压缩与合并
gulp.task('style',function(){
    //也需要匹配相要处理的css文件
    gulp.src(["src/css/*.css"])
        // 是对匹配到的css文件进行合并,与合并js使用的包是相同的，都是`gulp-concat`
        .pipe(concat("all.css"))
        .pipe(cssnano()) // 这里就是对我们的css进行压缩
        .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream:true
     }));
})

 //6.使用browserSync  注意WebStorm需按Ctrl加s
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:'./dist'  // 这是指定一下启动的http服务的根目录
        },
        // 指定的是想要监视的文件
        files:['dist/*.html',
            'dist/css/*.css',
            'dist/js/*.js'],
        port:63342  //端口
    },function(){
        console.log('正在运行..');
    });
});

//7监视文件的变化，自动执行任务
gulp.task('watch',function(){
});
// watch方法用于监视文件变化,
// 第二个参数，是想要执行的任务，是一个数组，数组中每一个元素对应一个任务
gulp.watch('src/*.html',['html']);
gulp.watch('src/css/*.less',['style']);
gulp.watch('src/js/*.js',['script']);
gulp.watch('src/imgs/*.*',['image']);