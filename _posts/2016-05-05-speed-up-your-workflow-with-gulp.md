---
layout: post
title:  "Speed Up your Workflow with Gulp"
date:   2016-05-05 8:00:00 +0100
  - javascript
  - gulp
---

As Web developers, we carry out some repetitious and mundane tasks during our design and development process, from transpiling your TypeScript files to JavaScript, to reloading your browser as you make changes to your code. These are of course necessary, but it would be nice to just focus on being productive and not deal with these little distractions. With [Gulp](http://gulpjs.com){:target="_blank"}, you can automate your development workflow and focus on delivering your best work.

Gulp is a JavaScript task runner that allows you to define certain tasks for your project, which you can run at any time. Better still, you can define tasks that run once and watch for changes in your code, then execute other tasks. At this point your project becomes a living, breathing, autonomous being. Well not exactly.

Gulp has a great developer community behind it that maintains a huge [collection of plugins](http://gulpjs.com/plugins/){:target="_blank"} to achieve just about anything. Some simple tasks include:

- Compile SASS/LESS files to CSS.
- Compile a superset of JavaScript to pure JavaScript.
- Minify CSS and JavaScript files.
- Resize Images.
- Execute Command line commands programmatically.

Although Gulp runs on Node.js, it's application is not limited to Node.js projects. You can use Gulp to build your Wordpress theme or to compile SASS files in your ASP.NET project.


## Getting started

To setup gulp, you need to:

- Install gulp globally and in your project.
- Create a `gulpfile.js` at the root of your project.
- Define your tasks.

### Installation

Gulp is a Node.js module, so you need to have [Node.js](http://nodejs.org){:target="_blank"} installed on your machine.
To install Gulp globally, launch a Terminal session and execute the following command.

```bash
npm install --global gulp
```

Then install gulp as a project dependency.

```bash
npm install --save-dev gulp
```

<small>If you are on a Mac or Linux machine, you might need to add `sudo` in front of these commands.</small>

### Gulpfile.js

By convention you need to create a file named `gulpfile.js` at the root of your project. This is where Gulp look for defined tasks.

### Define tasks
Gulp has a simple API that makes it really easy to define your tasks. A simple gulp task `"sass"` is defined below, to compile SASS files to CSS using the `gulp-sass` plugin.

```javascript
// Import Node modules
var gulp = require('gulp'),
    sass = require('gulp-sass');

// Sass task: Compile SCSS files to CSS
gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')  // get SASS file.
    .pipe(sass())                       // compile SASS file to CSS.
    .on('error', sass.logError)         // If there are errors, log to console.
    .pipe(gulp.dest('./build/css/'));   // place compiled CSS file here.
});
```

To run a specific task, type `"gulp"` followed by the name of the task . To execute our `"sass"` task, we use the following command.

```bash
gulp sass
```

Gulp also lets us define a `"default"` task that executes when you run just `"gulp"`.

## Using Gulp

To get a good feel of Gulp, let us create a gulpfile for a project to do the following:

- Compile SCSS files to CSS.
- Compile TypeScript files to JavaScript.
- Launch a local server.
- Watch for file changes and trigger appropriate task.
- Instantly reload the browser when files change.

For this we will use the following plugins, install them by running this command.

```bash
npm install --save-dev gulp-sass browser-sync gulp-typescript
```

- [gulp-sass](https://www.npmjs.com/package/gulp-sass){:target="_blank"} to compile SCSS files,
- [browser-sync](https://www.npmjs.com/package/browser-sync){:target="_blank"} to start a static server and live CSS reloads.
- [gulp-typescript](https://www.npmjs.com/package/gulp-typescript){:target="_blank"} to compile TypeScript to JavaScript.


The project has the following folder structure.

```
gulp-setup/
 |_ build/
 |  |_ css/
 |  |_ js/
 |  |_ index.html
 |_ src/
 |  |_ sass/
 |  |  |_ style.scss
 |  |_ scripts/
 |     |_ person.ts
 |_ gulpfile.js
 |_ package.json
```


_`gulpfile.js`_: next we define our tasks.

```javascript
// Require node modules
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ts = require('gulp-typescript'),

    paths = {
      'sass': './src/sass/',
      'css': './build/css/',
      'scripts': './src/scripts/',
      'js': './build/js/',
      'site': './build/'
    };

// Sass task: Compile SCSS files to CSS
gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Browser sync task: to launch a server and auto-reload
gulp.task('browser-sync', ['sass', 'scripts'], function () {
  browserSync({ server: {
      baseDir: paths.site
    }});
});

// Scripts task: Compile TypeScript files to js
gulp.task('scripts', function () {
  return gulp.src(paths.scripts + '*.ts')
    .pipe(ts())
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Reload browser
gulp.task('reload', function () {
  browserSync.reload();
});

// Watch task: watch for file changes and
// trigger appropriate task.
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']); // Watch sass files
  gulp.watch(paths.scripts + '**/*.ts', ['scripts']); // Watch .ts files
  gulp.watch(paths.site + '**/*.html', ['reload']); // Watch html files
});

// Default task: Run `gulp` to launch browser-sync
//and watch for file changes.
gulp.task('default', ['browser-sync', 'watch']);

```

Now start gulp by running:

```bash
gulp
```

This will launch a local server `localhost:3000` and serve up files from the `"build"` directory. Changes to your code triggers the appropriate task and instant browser reloads. This code and folder setup is available on [Github](http://github.com/azemoh/gulp-setup){:target="_blank"}.

### Summary

This is just a simple setup and you can do a lot more with Gulp. Some awesome plugins include:

- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer){:target="_blank"}: Adds vendor prefixes to your CSS code so you don't have to remember them.
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify){:target="_blank"}: To minify JavaScript files.
- [gulp-concat](https://www.npmjs.com/package/gulp-concat){:target="_blank"}: To merge multiple JavaScript files.
- And so on.

Check out the Gulp [plugin directory](http://gulpjs.com/plugins/){:target="_blank"} to find more.