const {src, dest, watch, series} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

function minifyJS(){
    return src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(concat('formaddress.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/js'));
}

function watchTasks(){
    watch('src/js/*.js', minifyJS);
}

exports.default = series(minifyJS,watchTasks);