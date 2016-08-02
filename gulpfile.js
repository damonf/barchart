var
  config     = require('./gulpfile.config.js'),
  gulp       = require('gulp'),
  del        = require('del'),
  merge      = require('merge-stream'),
  babel      = require('gulp-babel'),
  sourceMaps = require('gulp-sourcemaps'),
  _inject    = require('gulp-inject'),
  _eslint    = require('gulp-eslint')
  ;
  
gulp.task(clean);

function clean(done) {
  var
    targets = [
      `${config.buildDir}/**`,
      `!${config.buildDir}`
    ];

  del(targets, done);
}

function eslint () {
  return gulp.src(config.appFiles.js)
    .pipe(_eslint({ useEslintrc: true }))
    .pipe(_eslint.format())
    .pipe(_eslint.failAfterError());
}

// Copy files into the build directory.
//
function copy() {
  var
    doCopy = function (srcFiles, base, destSubDir) {
      destSubDir = destSubDir || '';
      return gulp.src(srcFiles, {
        base: base || './src'
      })
      .pipe(gulp.dest(config.buildDir + destSubDir));
    },

    streams = [],

    appJs, vendorJs, vendorCss;

  if (config.appFiles.js.length) {
    appJs = doCopy(config.appFiles.js);
    streams.push(appJs);
  }

  if (config.vendorFiles.js.length) {
    vendorJs = doCopy(config.vendorFiles.js, '.', '/public');
    streams.push(vendorJs);
  }

  if (config.vendorFiles.css.length) {
    vendorCss = doCopy(config.vendorFiles.css);
    streams.push(vendorCss);
  }

  return merge(streams);
}

function transpile () {
  return gulp.src([`${config.buildDir}/**/*.js`, '!**/bower_components/**'])
    .pipe(sourceMaps.init())
    .pipe(babel())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(config.buildDir));
}

function inject() {
  var
    files = config.vendorFiles.js.concat(
      '**/*.js'
    ),

    sources = gulp.src(files, { read : false, cwd: config.buildDir + '/public' });

  return gulp.src(config.appFiles.html)
    .pipe(_inject(sources, { addRootSlash: false }))
    .pipe(gulp.dest(config.buildDir + '/public'));
}

gulp.task('default', gulp.series(clean, eslint, copy, transpile, inject));
