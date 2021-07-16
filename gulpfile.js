const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require('browser-sync').create();
const del = require('del');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'output/'
  },
  ts: {
    src: 'src/js/**/*.ts',
    dest: 'output/assets/ts'
  }
};

function clean() {
  return del([
      'output/css/*.css',
      'output/js/*.js'
  ]);
}

function html() {
  return src(paths.html.src)
        .pipe(dest(paths.html.dest))
}

function typeScripts() {
    return src(paths.ts.src) // or tsProject.src()
      .pipe(tsProject())
      .pipe(dest(paths.ts.dest));
}

function watchFiles() {  
  browserSync.init({
    server: {
      baseDir: "./output",
      index: "/index.html"
    }
  }); 
  watch(paths.html.src, html);  
  watch(paths.ts.src, typeScripts); 
  watch(paths.html.src).on('change', browserSync.reload); // any change in output folder, reload page
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = series(clean, parallel(html, typeScripts), watchFiles);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.typeScripts = typeScripts;
exports.watch = watchFiles;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;