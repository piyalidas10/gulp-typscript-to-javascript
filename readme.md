# Typecript implementation using Gulp
As You know, you can use Typescript in Nodejs or Reactjs project beside Angular. Like this you can also use Typescript in other Front-end projects where you are using Gulp. 

Using Typescript, you will get type-checking, ECMAScript features, Interface, Enum etc.

1. Default TypeScript Compiler to compile single typescript file
The simplest way to compile your TypeScript code is to use the default compiler. Install typecript globally to run tsc command from any directory.

npm -g install typescript
Now create one typescript file (main.ts) and run the following command to covert typescript to JavaScript.

tsc main.ts
If TypeScript is installed local to your project you need to use the path of TypeScript from node_modules as shown:

node_modules/typescript/bin/tsc main.ts
2. Compile TypeScript using Gulp
An alternative to the default compiler is to use gulp! To get gulp to compile your TypeScript code, start by installing the gulp and gulp-typescript modules.

```
npm install --save-dev gulp
npm install --save-dev gulp-typescript
```

## package.json

```
"devDependencies": {
    "browser-sync": "^2.26.14",
    "del": "^6.0.0",
    "gulp": "^4.0.2",
    "gulp-typescript": "^6.0.0-alpha.1"
  },
  "dependencies": {
    "npm": "^7.19.0",
    "rxjs": "^7.1.0"
  }
```

## gulpfile
Need to create gulp task to build the TypeScript code

```
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
```

## To build your TypeScript code, run the following

```
gulp build
```

### In order to use your tsconfig.json file, setup your gulpfile.js as such:

```
const { src, dest, watch, parallel, series } = require("gulp");

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');


function typeScripts() {
    return src(paths.ts.src) // or tsProject.src()
      .pipe(tsProject())
      .pipe(dest(paths.ts.dest));
}
```

