//  载入外挂
var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	csslint      = require('gulp-csslint'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss    = require('gulp-minify-css'),
	jshint       = require('gulp-jshint'),
	uglify       = require('gulp-uglify'),
	imagemin     = require('gulp-imagemin'),
	rename       = require('gulp-rename'),
	header       = require('gulp-header'),
	size         = require('gulp-size'),
	del          = require('del'),
	concat       = require('gulp-concat'),
	cache        = require('gulp-cache'),
	sourcemaps   = require('gulp-sourcemaps'),
	
	// browserSync  = require('browser-sync').create(),
	// reload       = browserSync.reload;
	
	pkg          = require('./package.json');

// 路径配置
var paths = {
	img: {
		dev: '../src/images/**/',
    	build: '../assets/img/' 
	},
	css: {
    	dev: '../src/stylesheets/**/',
    	build: '../assets/css/'
  	},
  	js: {
    	dev: '../src/javascripts/**/',
    	build: '../assets/js/'
  	},
  	font: {
  		dev: '../src/fonts/**/',
    	build: '../assets/fonts/'
  	}
};

// 文件头部版权信息
var banner = [
`/**
 *   <%= pkg.name %>
 *   <%= pkg.description %>
 *   @author <%= pkg.author %>
 *   @email <%= pkg.email %>
 *   @version <%= pkg.version %>
 *   Copyright ${new Date().getFullYear()} <%= pkg.license %> licensed.
 */
`
].join('');

var sassOptions = {
 	outputStyle: 'expanded'
};

var browserOptions = {
	browsers: [
		'last 5 versions',
		'ie >= 6',
		'ie_mob >= 10',
		'ff >= 20',
		'chrome >= 34',
		'safari >= 6',
		'opera >= 12.1'
	]
};

// 样式
gulp.task('styles', function() {
	return gulp.src(paths.css.dev + '*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer({
            browserOptions,
            cascade: false
        }))
		.pipe(csslint('.csslintrc'))
		.pipe(header(banner, {
	      	pkg: pkg
	    }))
		.pipe(gulp.dest(paths.css.build))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(header(banner, {
	      	pkg: pkg
	    }))
	    .pipe(sourcemaps.write('./', {includeContent: true}))
		.pipe(gulp.dest(paths.css.build))
		.pipe(size({title: 'CSS 压缩完成', showFiles: true}));
});


// 脚本
gulp.task('scripts', function() {  
	return gulp.src(paths.js.dev + '*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(header(banner, {
	      	pkg: pkg
	    }))
		.pipe(gulp.dest(paths.js.build))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(header(banner, {
	      	pkg: pkg
	    }))
		.pipe(gulp.dest(paths.js.build))
		.pipe(size({title: 'Scripts 压缩完成', showFiles: true}));
});


// 图片
gulp.task('images', function() {  
  return gulp.src(paths.img.dev + '*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.img.build))
    .pipe(size({title: 'Image 复制完成', showFiles: true}));
});


//fonts
gulp.task('fonts', function() {
	return gulp.src(paths.font.dev + '*')
		.pipe(gulp.dest(paths.font.build))
		.pipe(size({title: 'Fonts 复制完成', showFiles: true}))
});


// 清理
gulp.task('clean', function() {  
    // return gulp.src([paths.css.build, paths.js.build, paths.img.build, paths.font.build], {read: false})
    //     .pipe(clean());
    del.sync([paths.css.build, paths.js.build, paths.img.build, paths.font.build], {force: true})
});


// 预设任务
gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts', 'images', 'fonts');
});


// 监听任务
gulp.task('watch', function() {
	gulp.watch(paths.css.dev + '*.scss', ['styles'])
		.on('change', (event) => {
	    	console.log(`File ${event.path} was ${event.type}`)
	    });
	gulp.watch(paths.js.dev + '*.js', ['scripts']);
	gulp.watch(paths.img.dev + '*', ['images']);


	// gulp.watch(['dist/**']).on('change', reload);
});