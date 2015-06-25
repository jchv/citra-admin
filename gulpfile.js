var fs = require('fs');
var del = require('del');
var nib = require('nib');
var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var htmlmin = require('gulp-html-minifier');
var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

var paths = {
    pages: './src/pages/*.jade',
    styles: './src/styles/**.styl',
    assets: './src/assets/**',
    dest: './dist/'
};

// The assets task.
gulp.task('assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dest));
});

// The Webpack compilation task.
var webpackTask = function (debug) {
    return function (callback) {
        var cfg = webpackConfig;
        webpack(cfg, function (err, stats) {
            if (err) throw new gutil.PluginError('webpack', err);
            gutil.log('[webpack]', stats.toString({colors: true}));
            callback();
        })
    }
};

gulp.task('webpack:dev', webpackTask(true));
gulp.task('webpack:prod', webpackTask(false));

// The Webpack development server task.
var webpackServeTask = function (debug) {
    return function (callback) {
        var serveCfg = Object.create(webpackConfig);
        serveCfg.devtool = 'cheap-module-inline-source-map';
        serveCfg.debug = true;

        var compiler = webpack(serveCfg);

        new WebpackDevServer(compiler, {
            contentBase: paths.dest + '/',
            filename: 'script.js'
        }).listen(8080, 'localhost', function (err) {
                if (err) throw new gutil.PluginError('webpack', err);
                gutil.log('[webpack-serve]', 'http://localhost:8080/');
                callback();
            })
    }
};

gulp.task('webpack-serve', webpackServeTask(true));

// The Jade interpolation task.
gulp.task('jade:dev', function () {
    return gulp.src(paths.pages)
        .pipe(plumber())
        .pipe(jade({locals: {debug: true}}))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('jade:prod', function () {
    return gulp.src(paths.pages)
        .pipe(plumber())
        .pipe(jade({locals: {debug: false}}))
        .pipe(htmlmin({
            minifyCSS: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.dest));
});

// The Stylus task.
gulp.task('stylus:dev', function () {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(stylus({'use': nib(), 'import': ['nib']}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('stylus:prod', function () {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(stylus({'use': nib(), 'import': ['nib']}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.dest));
});

// The clean task.
gulp.task('clean', function (cb) {
    del(['dist/**'], function () {
        fs.mkdirSync('./dist/');
        cb();
    });
});

// The build task.
gulp.task('build:dev', ['clean'], function () {
    return gulp.run(['assets', 'webpack:dev', 'jade:dev', 'stylus:dev']);
});

gulp.task('build:prod', ['clean'], function () {
    return gulp.run(['assets', 'webpack:prod', 'jade:prod', 'stylus:prod']);
});

gulp.task('build', ['build:dev']);

// The serve task.
gulp.task('serve', ['assets', 'jade:dev', 'stylus:dev', 'webpack-serve'], function () {
    gulp.watch(paths.pages, ['jade:dev']);
    gulp.watch(paths.styles, ['stylus:dev']);
    gulp.watch(paths.assets, ['assets']);
});

// And finally... the default task.
gulp.task('default', ['build:dev']);
