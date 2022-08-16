const exec = require('child_process').exec;
const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodeSass = require('node-sass');
const sass = require('gulp-sass')(nodeSass);
const autoprefix = require('gulp-autoprefixer');
const uglify = require('gulp-uglifyjs');

const config = {
  publicDir: '_site/',
  cssDir: 'assets/css/',
  jsDir: 'assets/js/',
  jekyllBuildMessage: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Build the Jekyll Site for development
function devBuild(done) {
  browserSync.notify(config.jekyllBuildMessage);
  return exec('bundle exec jekyll build --config "_config.yml,_config.dev.yml"', { stdio: 'inherit' })
    .on('close', done);
}


// Build the Jekyll Site for production
function prodBuild(done) {
  return exec('bundle exec jekyll build', { stdio: 'inherit' })
    .on('close', done);
}

// Rebuild Jekyll and reload page
const rebuild = gulp.series(devBuild, browserSync.reload);

// minify javaScript files
function minifyJs() {
  return gulp.src(`${config.jsDir}script.js`)
    .pipe(uglify('script.min.js', { outSourceMap: true }))
    .pipe(gulp.dest(`${config.publicDir}${config.jsDir}`))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(config.jsDir));
}

function sassBuild() {
  return gulp.src(`${config.cssDir}*.scss`)
    .pipe(sass({ includePaths: [config.cssDir].concat(require('bourbon').includePaths), outputStyle: 'compressed' }))
    .on('error', sass.logError)
    .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest(`${config.publicDir}${config.cssDir}`))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(config.cssDir));
}

// Wait for jekyll-build, then launch the server
const syncBrowser = gulp.series(sassBuild, devBuild, minifyJs, (done) => {
  browserSync({
    server: { baseDir: config.publicDir },
    notify: false
  });

  done();
});

// Watch scss files for changes & recompile
// Watch html/md files, run jekyll & reload BrowserSync
function watch(done) {
  gulp.watch(`${config.cssDir}*.scss`, sassBuild);
  gulp.watch(`${config.jsDir}script.js`, minifyJs);
  gulp.watch([
    '*.html',
    '_layouts/*.html',
    'writing/*.html',
    '_includes/**/*.html',
    '_posts/*.md',
    'assets/img/**/*',
    '*.yml'
  ], rebuild);
}

// Build site without starting server or watching files
const build = gulp.series(sassBuild, prodBuild, minifyJs);

module.exports = {
  build,
  devBuild,
  default: gulp.series(syncBrowser, watch),
};