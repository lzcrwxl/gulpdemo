var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀
var rename = require('gulp-rename'); //重命名
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var jshint = require('gulp-jshint');
var less = require('gulp-less'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）
var uglify = require('gulp-uglify'); //js压缩
var concat = require('gulp-concat'); //合并文件
var imagemin = require('gulp-imagemin'); //图片压缩
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');
//======= gulp dev 开发环境下 ===============
function dev() {
  /**
   * HTML处理
   */
  gulp.task('html:dev', function () {
    return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({
      stream: true
    }));
  });
  /**
   * assets文件夹下的所有文件处理
   */
  gulp.task('assets:dev', function () {
    return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({
      stream: true
    }));
  });
  /**
   * CSS样式处理
   */
  gulp.task('css:dev', function () {
    return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({
      stream: true
    }));
  });

  //定义一个testLess任务（自定义任务名称）
  gulp.task('less:dev', function () {
    return gulp.src(Config.less.src) //该任务针对的文件
        .pipe(less()).pipe(gulp.dest(Config.less.dist)).pipe(reload({
      stream: true
    }));
  });
  /**
   * js处理
   */
  gulp.task('js:dev', function () {
    return gulp.src(Config.js.src).pipe(gulp.dest(Config.js.dist)).pipe(reload({
      stream: true
    }));
  });
  /**
   * 图片处理
   */
  gulp.task('images:dev', function () {
    return gulp.src(Config.img.src).pipe(imagemin({
      optimizationLevel: 3
      , progressive: true
      , interlaced: true
    })).pipe(gulp.dest(Config.img.dist)).pipe(reload({
      stream: true
    }));
  });
  gulp.task('dev', ['html:dev', 'css:dev', 'js:dev', 'assets:dev', 'images:dev','less:dev'], function () {
    browserSync.init({
      server: {
        baseDir: Config.dist
      }
      , notify: false
    });
    // Watch .html files
    gulp.watch(Config.html.src, ['html:dev']);
    // Watch .css files
    gulp.watch(Config.css.src, ['css:dev']);
    //Watch .less files
    gulp.watch(Config.less.src, ['less:dev']);
    // Watch assets files
    gulp.watch(Config.assets.src, ['assets:dev']);
    // Watch .js files
    gulp.watch(Config.js.src, ['js:dev']);
    // Watch image files
    gulp.watch(Config.img.src, ['images:dev']);
  });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;