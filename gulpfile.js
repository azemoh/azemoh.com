/*global require*/
"use strict";

var cp = require('child_process');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglifyjs');

var config = {
  publicDir: '_site/',
  cssDir: 'assets/css/',
  jsDir: 'assets/js/',
  jekyllBuildMessage: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 * for development
 */
gulp.task('jekyll:devbuild', function (done) {
  browserSync.notify(config.jekyllBuildMessage);
  return cp.spawn('jekyll.bat', ['build', '--config', '_config.dev.yml'], {
      stdio: 'inherit'
    })
    .on('close', done);
});


/**
 * Build the Jekyll Site
 * for production
 */
gulp.task('jekyll:build', function (done) {
  return cp.spawn('jekyll.bat', ['build'], {
      stdio: 'inherit'
    })
    .on('close', done);
});

/**
 * Rebuild Jekyll and reload page
 */
gulp.task('jekyll:rebuild', ['jekyll:devbuild'], function () {
  browserSync.reload();
});


/**
 * Wait for jekyll:devbuild, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll:devbuild', 'minify:js'], function () {
  browserSync({
    server: {
      baseDir: config.publicDir
    },
    notify: false
  });
});


/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
  return gulp
    .src(config.cssDir + '*.scss')
    .pipe(sass({
      includePaths: [config.cssDir],
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(config.publicDir + config.cssDir))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest(config.cssDir));
});

/**
 * minify javaScript files
 */
gulp.task('minify:js', ['reload'], function () {
  return gulp.src(config.jsDir + 'script.js')
    .pipe(uglify('script.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest(config.publicDir + config.jsDir))
    .pipe(gulp.dest(config.jsDir));
});

/**
 * Reload browsersync without rebuilding
 */
gulp.task('reload', function () {
  browserSync.reload();
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(config.cssDir + '**/*.scss', ['sass']);
  gulp.watch(config.jsDir + 'script.js', ['minify:js']);
  gulp.watch([
		'*.html',
		'_layouts/*.html',
		'_includes/**/*.html',
		'_posts/*.md',
		'assets/img/**/*',
		'*.yml'
	], ['jekyll:rebuild']);
});

/**
 * Build site without starting server and watching for changes.
 */
gulp.task('build', ['sass', 'jekyll:build', 'minify:js']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
