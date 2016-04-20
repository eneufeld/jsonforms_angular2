var gulp = require('gulp');
var del = require('del');
var merge = require('merge2');  // Require separate installation
var concat = require('gulp-concat');
// ts
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
var Builder = require('systemjs-builder');

gulp.task('clean', function () {
  return del([
    //'dist/report.csv',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'forms_a2/**/*',
    // we don't want to clean this file though so we negate the pattern
    //'!dist/mobile/deploy.json'
  ]);
});



// replace the Gulp task for ts with this:
gulp.task('ts',['clean'], function(done) {
  var tsResult = gulp.src([
    "node_modules/angular2/bundles/typings/angular2/angular2.d.ts",
    "node_modules/@reactivex/rxjs/dist/es6/Rx.d.ts",
    "typings/main/ambient/es6-shim/es6-shim.d.ts",
      "src/**/*.ts"
    ])
    .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
  return merge([
        tsResult.dts.pipe(gulp.dest('forms_a2')),
        tsResult.js.pipe(gulp.dest('forms_a2')),
        //tsResult.js.pipe(concat('bundle_temp.js')).pipe(gulp.dest('dist/gulp'))
    ]);
});

gulp.task('bundle', ['ts'], build);

function build(done) {
  var builder = new Builder({
      paths: {
        '*': '*.js'
      },
      map: {
        angular2: 'node_modules/angular2'
      },
      meta: {
        'angular2/*': { build: false  }
      },
      packages: {
        'angular2': {
          defaultExtension: 'js',
          main: 'core.js'
        }
      }
    });

  builder
   // start building with the root module file in the folder with the intended module name
  .bundle('forms_a2/forms_a2', 'forms_a2/bundle.js')
  .then(function(output) {
    console.log('Build complete');
  })

  .catch(function(err) {
    console.log('Build error');
    console.log(err);
  })

  .finally(done);
}

gulp.task('default',['bundle']);
